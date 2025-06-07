import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🔑 Token Hugging Face
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const CHAT_HISTORY_KEY = "agentia-history"; // Clé pour le localStorage

// Fonction de traduction FR → EN ou EN → FR
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

// Détection rapide (heuristique)
function detectLanguage(text: string) {
  const FRWORDS = ["le", "la", "et", "est", "un", "une", "pour", "dans", "que", "qui"];
  const isFrenchQuick =
    /[éèàêùçœîôâû]/i.test(text) ||
    FRWORDS.some((w) => text.toLowerCase().includes(` ${w} `));
  return isFrenchQuick ? "fr" : "en";
}

// 👉 Appel Zephyr Chat API
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
};

export default function AgentIA() {
  // Historique persistant (localStorage)
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sauvegarde auto dans localStorage à chaque changement d’historique
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  // Scroll auto en bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  // Envoi avec Entrée (pas Shift+Entrée)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && question.trim()) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Bouton pour effacer l’historique (optionnel)
  const handleReset = () => setHistory([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    // Détection langue
    let detectedLang: "fr" | "en" = detectLanguage(question) as "fr" | "en";

    // Ajoute la question à l’historique
    setHistory((prev) => [
      ...prev,
      { role: "user", content: question, lang: detectedLang },
    ]);

    try {
      let prompt = question;
      if (detectedLang === "fr") {
        prompt = await translate(question, "fr-en");
      }
      // Appel IA
      const res = await askHF(prompt);

      // Traduction si besoin
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
        // ⚡️ Notifie la bulle Messenger !
        if (typeof window !== "undefined" && window.dispatchEvent) {
          window.dispatchEvent(new Event("agentia-new-message"));
        }
        return newHistory;
      });
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
        // ⚡️ Notifie la bulle Messenger aussi en cas d’erreur
        if (typeof window !== "undefined" && window.dispatchEvent) {
          window.dispatchEvent(new Event("agentia-new-message"));
        }
        return newHistory;
      });
    }
    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-black rounded-2xl shadow-2xl p-6 flex flex-col items-center max-w-2xl mx-auto my-12">
      <motion.div
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="h-14 w-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg mb-4"
      >
        <span className="text-2xl text-white font-bold">🤖</span>
      </motion.div>
      <h2 className="text-2xl text-white font-semibold tracking-wide mb-4">Pose ta question à l'IA !</h2>
      <button
        type="button"
        className="text-xs text-cyan-400 hover:underline mb-3"
        onClick={handleReset}
        disabled={loading}
      >
        🗑️ Effacer la conversation
      </button>
      <div className="w-full max-h-96 overflow-y-auto bg-black/40 rounded-xl p-4 mb-5 border border-neutral-800 shadow-inner">
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
          {history.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className={`mb-2 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end gap-2 max-w-[80%]">
                {/* Avatar */}
                {msg.role === "assistant" && (
                  <span className="bg-cyan-500 rounded-full flex items-center justify-center w-8 h-8 text-xl shadow">
                    🤖
                  </span>
                )}
                <div
                  className={`px-4 py-2 rounded-xl shadow-md ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white rounded-br-sm"
                      : "bg-neutral-800 text-cyan-200 rounded-bl-sm"
                  }`}
                >
                  <span>{msg.content}</span>
                  <span className="block text-xs text-cyan-300 mt-1">
                    {msg.lang === "fr" ? "🇫🇷" : "🇬🇧"}
                  </span>
                </div>
                {msg.role === "user" && (
                  <span className="bg-gray-700 rounded-full flex items-center justify-center w-8 h-8 text-xl shadow">
                    👤
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-start"
          >
            <div className="px-4 py-2 rounded-xl bg-neutral-800 text-cyan-200 shadow-md flex items-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-cyan-400 rounded-full" />
              <span>L’IA réfléchit...</span>
            </div>
          </motion.div>
        )}
        {/* Réf pour scroll auto */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <motion.input
          whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #22d3ee" }}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Pose ta question en français ou anglais... (Entrée pour envoyer)"
          className="w-full p-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition mb-3"
          disabled={loading}
          autoFocus
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          animate={{ x: loading ? [0, 6, -6, 6, -6, 0] : 0 }}
          transition={{ duration: 0.5 }}
          type="submit"
          disabled={loading || !question.trim()}
          className={`w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-2 rounded-xl mt-2 transition-all shadow-md ${
            loading || !question.trim() ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-cyan-800 rounded-full" />
              Génération...
            </span>
          ) : (
            "Envoyer"
          )}
        </motion.button>
      </form>
      <div className="mt-2 text-xs text-neutral-500 text-center">
        ✨ IA multilingue avec avatars, chat animé, historique persistant, notif Messenger, scroll auto, envoi rapide (Entrée).
      </div>
    </div>
  );
}
