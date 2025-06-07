import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const CHAT_HISTORY_KEY = "agentia-history";

async function translate(text: string, direction: "fr-en" | "en-fr") {
  const model =
    direction === "fr-en"
      ? "Helsinki-NLP/opus-mt-fr-en"
      : "Helsinki-NLP/opus-mt-en-fr";
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });
  const data = await res.json();
  return data?.[0]?.translation_text || text;
}

function detectLanguage(text: string) {
  const FRWORDS = ["le", "la", "et", "est", "un", "une", "pour", "dans", "que", "qui"];
  const isFrenchQuick =
    /[éèàêùçœîôâû]/i.test(text) ||
    FRWORDS.some((w) => text.toLowerCase().includes(` ${w} `));
  return isFrenchQuick ? "fr" : "en";
}

const askHF = async (question: string) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: question }),
    }
  );
  const data = await response.json();
  return data?.generated_text || "";
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  lang: "fr" | "en";
  showImgFallback?: boolean;
};

export default function AgentIA() {
  const [history, setHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading, typing]);

  const handleReset = () => setHistory([]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && question.trim()) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    let detectedLang: "fr" | "en" = detectLanguage(question) as "fr" | "en";
    setHistory((prev) => [
      ...prev,
      { role: "user", content: question, lang: detectedLang },
    ]);

    try {
      let prompt = question;
      if (detectedLang === "fr") prompt = await translate(question, "fr-en");
      const res = await askHF(prompt);

      let answer = res;
      let langResponse: "fr" | "en" = "en";
      if (detectedLang === "fr" && res) {
        answer = await translate(res, "en-fr");
        langResponse = "fr";
      }
      setHistory((prev) => {
        const newHistory = [
          ...prev,
          { role: "assistant", content: answer || "Pas de réponse IA.", lang: langResponse },
        ];
        if (typeof window !== "undefined" && window.dispatchEvent) {
          window.dispatchEvent(new Event("agentia-new-message"));
        }
        return newHistory;
      });
      if (answer) {
        let i = 0;
        setTyping("");
        const interval = setInterval(() => {
          setTyping(answer.slice(0, i + 1));
          i++;
          if (i >= answer.length) clearInterval(interval);
        }, 17);
      }
    } catch {
      setHistory((prev) => {
        const newHistory = [
          ...prev,
          {
            role: "assistant",
            content: "Erreur lors de la communication avec l’agent IA.",
            lang: detectedLang,
          },
        ];
        if (typeof window !== "undefined" && window.dispatchEvent) {
          window.dispatchEvent(new Event("agentia-new-message"));
        }
        return newHistory;
      });
    }
    setLoading(false);
    setQuestion("");
  };

  const handleVideoError = (i: number) => {
    setHistory((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], showImgFallback: true };
      return copy;
    });
  };

  return (
    <div className="bg-black rounded-2xl shadow-2xl p-4 flex flex-col items-center w-full max-w-sm mx-auto border border-white">
      <motion.div
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="h-12 w-12 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg mb-2 border border-white"
      >
        <img
          src="/avatars/robot.png"
          alt="IA"
          className="w-8 h-8 rounded-full object-cover"
        />
      </motion.div>
      <h2 className="text-lg text-white font-semibold tracking-wide mb-2">Pose ta question à l'IA !</h2>
      <button
        type="button"
        className="text-xs text-neutral-400 hover:underline mb-1"
        onClick={handleReset}
        disabled={loading}
      >
        🗑️ Effacer la conversation
      </button>
      <div className="w-full max-h-64 overflow-y-auto bg-neutral-950 rounded-xl p-3 mb-3 border border-neutral-800 shadow-inner">
        <AnimatePresence>
          {history.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-neutral-500 italic text-center"
            >
              La réponse IA apparaîtra ici...
            </motion.div>
          )}
          {history.map((msg, i) => {
            const isLastAssistant = i === history.length - 1 && msg.role === "assistant";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className={`mb-1 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {/* Avatar pour l'IA : vidéo si dispo, sinon image */}
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-black border border-white flex items-center justify-center relative">
                      {msg.showImgFallback ? (
                        <img
                          src="/avatars/robot.png"
                          alt="IA"
                          className="w-7 h-7 object-cover"
                        />
                      ) : (
                        <video
                          src="/avatars/robot-video.webm"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-7 h-7 object-cover"
                          style={{ display: "block" }}
                          onError={() => handleVideoError(i)}
                        />
                      )}
                    </div>
                  )}
                  {/* Avatar image pour user */}
                  {msg.role === "user" && (
                    <img
                      src="/avatars/user.png"
                      alt="Moi"
                      className="w-7 h-7 rounded-full shadow object-cover border border-white"
                    />
                  )}
                  <div
                    className={`px-3 py-2 rounded-xl shadow border ${
                      msg.role === "user"
                        ? "bg-white text-black border-neutral-300 rounded-br-sm"
                        : "bg-neutral-900 text-white border-neutral-700 rounded-bl-sm"
                    }`}
                  >
                    <span>
                      {isLastAssistant && typing ? typing : msg.content}
                    </span>
                    <span className="block text-xs text-neutral-500 mt-1">
                      {msg.lang === "fr" ? "🇫🇷" : "🇬🇧"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-start"
          >
            <div className="px-3 py-2 rounded-xl bg-neutral-900 text-white shadow-md flex items-center gap-2 border border-neutral-700">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-neutral-400 rounded-full" />
              <span>L’IA réfléchit...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <motion.input
          whileFocus={{ scale: 1.03, boxShadow: "0 0 0 2px #fff" }}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Pose ta question en français ou anglais... (Entrée pour envoyer)"
          className="w-full p-2 rounded-xl bg-neutral-900 text-white placeholder-neutral-400 border border-white focus:outline-none focus:ring-2 focus:ring-white transition mb-2"
          disabled={loading}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          animate={{ x: loading ? [0, 6, -6, 6, -6, 0] : 0 }}
          transition={{ duration: 0.5 }}
          type="submit"
          disabled={loading || !question.trim()}
          className={`w-full bg-white text-black font-bold py-2 rounded-xl mt-1 transition-all shadow-md border border-white
            ${loading || !question.trim() ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-neutral-900 rounded-full" />
              Génération...
            </span>
          ) : (
            "Envoyer"
          )}
        </motion.button>
      </form>
      <div className="mt-1 text-xs text-neutral-400 text-center">
        ✨ IA
      </div>
    </div>
  );
}
