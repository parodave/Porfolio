import { useState, useRef, useEffect } from "react";

// Configuration API - SÉCURISÉ avec variables d'environnement
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || "";
const LIBRETRANSLATE_URL = "https://libretranslate.de/translate";

// Langues supportées
const SUPPORTED_LANGUAGES = {
  fr: { name: "Français", flag: "🇫🇷" },
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Español", flag: "🇪🇸" },
  ja: { name: "日本語", flag: "🇯🇵" },
  zh: { name: "中文", flag: "🇨🇳" },
  ar: { name: "العربية", flag: "🇸🇦" },
  th: { name: "ไทย", flag: "🇹🇭" }
};

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Fonction de traduction avec LibreTranslate (principal) et Hugging Face (fallback)
async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
    // Essayer LibreTranslate en premier
    const libreResponse = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
        format: "text"
      }),
    });

    if (libreResponse.ok) {
      const libreData = await libreResponse.json();
      if (libreData.translatedText && libreData.translatedText.trim()) {
        console.log("✅ Traduction LibreTranslate réussie:", fromLang, "→", toLang);
        return libreData.translatedText.trim();
      }
    }

    // Fallback vers Hugging Face pour fr/en seulement
    if (HF_TOKEN && ((fromLang === "fr" && toLang === "en") || (fromLang === "en" && toLang === "fr"))) {
      return await translateWithHuggingFace(text, fromLang === "fr" ? "fr-en" : "en-fr");
    }

    console.log("⚠️ Traduction échouée, utilisation du texte original");
    return text;

  } catch (error) {
    console.error("❌ Erreur de traduction:", error);
    return text;
  }
}

// Fonction de traduction Hugging Face (fallback pour fr/en)
async function translateWithHuggingFace(text: string, direction: "fr-en" | "en-fr"): Promise<string> {
  try {
    if (!HF_TOKEN) {
      return text;
    }

    const model = direction === "fr-en"
      ? "Helsinki-NLP/opus-mt-fr-en"
      : "Helsinki-NLP/opus-mt-en-fr";

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        options: { wait_for_model: true }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const translatedText = data?.[0]?.translation_text;
      if (translatedText && translatedText.trim()) {
        console.log("✅ Traduction Hugging Face réussie");
        return translatedText.trim();
      }
    }

    return text;
  } catch (error) {
    console.error("❌ Erreur Hugging Face:", error);
    return text;
  }
}

// Détection de langue améliorée
function detectLanguage(text: string): SupportedLanguage {
  const lowerText = text.toLowerCase();

  // Mots-clés par langue
  const frenchWords = ["le", "la", "et", "est", "un", "une", "pour", "dans", "que", "qui", "comment", "quel", "bonjour", "merci"];
  const spanishWords = ["el", "la", "y", "es", "un", "una", "para", "en", "que", "hola", "gracias", "como", "donde"];
  const englishWords = ["the", "and", "is", "a", "an", "for", "in", "that", "hello", "thank", "how", "what"];

  // Patterns par langue
  const frenchPattern = /[éèàêùçœîôâû]/i;
  const spanishPattern = /[ñáéíóúü]/i;
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  const chinesePattern = /[\u4E00-\u9FFF]/;
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const thaiPattern = /[\u0E00-\u0E7F]/;

  // Détection par scripts (priorité haute)
  if (japanesePattern.test(text)) return "ja";
  if (chinesePattern.test(text)) return "zh";
  if (arabicPattern.test(text)) return "ar";
  if (thaiPattern.test(text)) return "th";

  // Calcul des scores
  const frenchScore = frenchWords.filter(word => lowerText.includes(word)).length + (frenchPattern.test(text) ? 2 : 0);
  const spanishScore = spanishWords.filter(word => lowerText.includes(word)).length + (spanishPattern.test(text) ? 2 : 0);
  const englishScore = englishWords.filter(word => lowerText.includes(word)).length;

  if (frenchScore > spanishScore && frenchScore > englishScore) return "fr";
  if (spanishScore > englishScore) return "es";

  return "en";
}

// IA avec Hugging Face
const askHuggingFaceAI = async (question: string): Promise<string> => {
  try {
    if (!HF_TOKEN) {
      console.warn("⚠️ Token Hugging Face manquant, utilisation des réponses de secours");
      return askFallbackAI(question);
    }

    // GPT-2 (principal)
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: question,
        parameters: {
          max_length: 100,
          temperature: 0.8,
          do_sample: true,
          pad_token_id: 50256
        },
        options: { wait_for_model: true }
      }),
    });

    if (!response.ok) {
      return await askDistilBertAI(question);
    }

    const data = await response.json();
    let generatedText = data?.[0]?.generated_text || "";

    // Nettoyer la réponse
    if (generatedText && generatedText.length > question.length) {
      generatedText = generatedText.substring(question.length).trim();
      const sentences = generatedText.split(/[.!?]/);
      if (sentences.length > 0 && sentences[0].trim()) {
        generatedText = sentences[0].trim() + ".";
      }
    }

    return generatedText || askFallbackAI(question);

  } catch (error) {
    console.error("❌ Erreur GPT-2:", error);
    return await askDistilBertAI(question);
  }
};

// DistilGPT2 (fallback)
const askDistilBertAI = async (question: string): Promise<string> => {
  try {
    if (!HF_TOKEN) {
      return askFallbackAI(question);
    }

    const response = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Question: ${question}\nAnswer:`,
        parameters: {
          max_length: 80,
          temperature: 0.7,
          do_sample: true,
          pad_token_id: 50256
        },
        options: { wait_for_model: true }
      }),
    });

    if (!response.ok) {
      return askFallbackAI(question);
    }

    const data = await response.json();
    let result = data?.[0]?.generated_text || "";

    if (result.includes("Answer:")) {
      result = result.split("Answer:")[1]?.trim() || "";
    }

    return result || askFallbackAI(question);

  } catch (error) {
    console.error("❌ Erreur DistilGPT2:", error);
    return askFallbackAI(question);
  }
};

// Réponses de secours multilingues
const askFallbackAI = (question: string): string => {
  const lowerQ = question.toLowerCase();
  const detectedLang = detectLanguage(question);

  const responses = {
    fr: {
      greeting: ["Bonjour ! Comment puis-je vous aider ?", "Salut ! Que puis-je faire pour vous ?"],
      howAreYou: ["Je vais bien, merci ! Et vous ?", "Ça va très bien, merci de demander !"],
      name: ["Je suis votre assistant IA personnel.", "Je suis une IA créée pour vous aider."],
      help: ["Je peux vous aider avec vos questions.", "Je suis là pour discuter avec vous."],
      generic: ["C'est une question intéressante !", "Pouvez-vous me donner plus de détails ?"]
    },
    en: {
      greeting: ["Hello! How can I help you?", "Hi there! What can I do for you?"],
      howAreYou: ["I'm doing well, thank you! How are you?", "I'm great, thanks for asking!"],
      name: ["I'm your personal AI assistant.", "I'm an AI created to help you."],
      help: ["I can help you with questions.", "I'm here to chat with you."],
      generic: ["That's interesting!", "Could you tell me more?"]
    },
    es: {
      greeting: ["¡Hola! ¿Cómo puedo ayudarte?", "¡Buenos días! ¿En qué puedo asistirte?"],
      howAreYou: ["¡Estoy bien, gracias! ¿Y tú?", "¡Muy bien, gracias por preguntar!"],
      name: ["Soy tu asistente personal de IA.", "Soy una IA creada para ayudarte."],
      help: ["Puedo ayudarte con preguntas.", "Estoy aquí para charlar contigo."],
      generic: ["¡Eso es interesante!", "¿Podrías contarme más?"]
    },
    ja: {
      greeting: ["こんにちは！どのようにお手伝いできますか？", "おはようございます！"],
      howAreYou: ["元気です、ありがとう！あなたはいかがですか？", "とても良いです！"],
      name: ["私はあなたの個人AIアシスタントです。", "私はAIです。"],
      help: ["質問にお答えできます。", "チャットができます。"],
      generic: ["それは興味深いですね！", "もう少し詳しく教えてください。"]
    },
    zh: {
      greeting: ["你好！我能帮你什么吗？", "早上好！"],
      howAreYou: ["我很好，谢谢！你怎么样？", "很棒，谢谢！"],
      name: ["我是你的个人AI助手。", "我是AI。"],
      help: ["我可以帮你回答问题。", "我可以和你聊天。"],
      generic: ["这很有趣！", "你能告诉我更多吗？"]
    },
    ar: {
      greeting: ["مرحبا! كيف يمكنني مساعدتك؟", "صباح الخير!"],
      howAreYou: ["أنا بخير، شكراً! وأنت؟", "رائع، شكراً!"],
      name: ["أنا مساعدك الشخصي للذكاء الاصطناعي.", "أنا ذكاء اصطناعي."],
      help: ["يمكنني مساعدتك في الأسئلة.", "أنا هنا للدردشة."],
      generic: ["هذا مثير للاهتمام!", "هل يمكنك إخباري أكثر؟"]
    },
    th: {
      greeting: ["สวัสดี! ฉันช่วยอะไรคุณได้บ้าง?", "สวัสดีตอนเช้า!"],
      howAreYou: ["ฉันสบายดี ขอบคุณ! คุณเป็นอย่างไรบ้าง?", "ดีมาก ขอบคุณ!"],
      name: ["ฉันเป็นผู้ช่วย AI ส่วนตัวของคุณ", "ฉันเป็น AI"],
      help: ["ฉันสามารถช่วยตอบคำถามได้", "ฉันอยู่ที่นี่เพื่อแชท"],
      generic: ["น่าสนใจมาก!", "คุณช่วยเล่าให้ฟังมากกว่านี้ได้ไหม?"]
    }
  };

  const langResponses = responses[detectedLang] || responses.en;

  // Détection d'intentions
  if (lowerQ.includes("hello") || lowerQ.includes("hi") || lowerQ.includes("bonjour") ||
      lowerQ.includes("hola") || lowerQ.includes("こんにちは") || lowerQ.includes("你好") ||
      lowerQ.includes("مرحبا") || lowerQ.includes("สวัสดี")) {
    return langResponses.greeting[Math.floor(Math.random() * langResponses.greeting.length)];
  }

  if (lowerQ.includes("how are you") || lowerQ.includes("comment allez") || lowerQ.includes("comment vas") ||
      lowerQ.includes("como estas") || lowerQ.includes("元気") || lowerQ.includes("你好吗") ||
      lowerQ.includes("كيف حالك") || lowerQ.includes("สบายดี")) {
    return langResponses.howAreYou[Math.floor(Math.random() * langResponses.howAreYou.length)];
  }

  if (lowerQ.includes("name") || lowerQ.includes("qui es") || lowerQ.includes("quien eres") ||
      lowerQ.includes("名前") || lowerQ.includes("你是谁") || lowerQ.includes("من أنت") || lowerQ.includes("คุณคือใคร")) {
    return langResponses.name[Math.floor(Math.random() * langResponses.name.length)];
  }

  if (lowerQ.includes("help") || lowerQ.includes("aide") || lowerQ.includes("ayuda") ||
      lowerQ.includes("助け") || lowerQ.includes("帮助") || lowerQ.includes("مساعدة") || lowerQ.includes("ช่วย")) {
    return langResponses.help[Math.floor(Math.random() * langResponses.help.length)];
  }

  return langResponses.generic[Math.floor(Math.random() * langResponses.generic.length)];
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  lang: SupportedLanguage;
};

export default function AgentIA() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading, typing]);

  useEffect(() => {
    if (!HF_TOKEN) {
      console.warn("⚠️ ATTENTION: Variable VITE_HF_TOKEN non trouvée dans .env");
    } else {
      console.log("✅ Token Hugging Face chargé correctement");
    }
  }, []);

  const handleReset = () => {
    setHistory([]);
    setTyping("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && question.trim()) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setTyping("");

    const detectedLang: SupportedLanguage = detectLanguage(question);
    console.log("🔍 Question détectée en:", detectedLang, "Question:", question);

    setHistory((prev) => [
      ...prev,
      { role: "user", content: question, lang: detectedLang },
    ]);

    try {
      let prompt = question;
      let needsTranslation = false;

      // Traduire vers l'anglais si nécessaire
      if (detectedLang !== "en") {
        try {
          prompt = await translateText(question, detectedLang, "en");
          needsTranslation = true;
          console.log("🔄 Question traduite:", prompt);
        } catch (error) {
          console.log("⚠️ Traduction échouée, utilisation du texte original");
          prompt = question;
        }
      }

      // Appel à l'IA
      const response = await askHuggingFaceAI(prompt);

      let answer = response;
      let responseLanguage: SupportedLanguage = detectedLang;

      // Traduire la réponse si nécessaire
      if (needsTranslation && detectedLang !== "en" && response) {
        try {
          const translatedAnswer = await translateText(response, "en", detectedLang);
          if (translatedAnswer && translatedAnswer !== response) {
            answer = translatedAnswer;
            console.log("🔄 Réponse traduite:", answer);
          }
        } catch (error) {
          console.log("⚠️ Traduction de la réponse échouée");
        }
      }

      // Vérifier la validité de la réponse
      if (!answer || answer.trim().length === 0) {
        const fallbackMessages: Record<SupportedLanguage, string> = {
          fr: "Je réfléchis à votre question...",
          en: "I'm thinking about your question...",
          es: "Estoy pensando en tu pregunta...",
          ja: "あなたの質問について考えています...",
          zh: "我正在思考你的问题...",
          ar: "أفكر في سؤالك...",
          th: "ฉันกำลังคิดเกี่ยวกับคำถามของคุณ..."
        };
        answer = fallbackMessages[detectedLang] || fallbackMessages.en;
      }

      // Effet de frappe
      let i = 0;
      setTyping("");
      const interval = setInterval(() => {
        setTyping(answer.slice(0, i + 1));
        i++;
        if (i >= answer.length) {
          clearInterval(interval);
          setHistory((prev) => [
            ...prev,
            { role: "assistant", content: answer, lang: responseLanguage },
          ]);
          setTyping("");
        }
      }, 25);

    } catch (error) {
      console.error("❌ Erreur générale:", error);
      const errorMessages: Record<SupportedLanguage, string> = {
        fr: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        en: "Sorry, an error occurred. Please try again.",
        es: "Lo siento, ocurrió un error. Por favor intenta de nuevo.",
        ja: "申し訳ございませんが、エラーが発生しました。もう一度お試しください。",
        zh: "抱歉，发生了错误。请重试。",
        ar: "آسف، حدث خطأ. يرجى المحاولة مرة أخرى.",
        th: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      };

      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessages[detectedLang] || errorMessages.en,
          lang: detectedLang,
        },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="bg-black rounded-2xl shadow-2xl p-4 flex flex-col items-center w-full max-w-sm mx-auto border border-white">
      {/* Avatar animé */}
      <div className="relative">
        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-2 border border-white animate-pulse">
          <span className="text-white text-xl">🤖</span>
        </div>
        {loading && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        )}
        {!HF_TOKEN && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full" title="Token API manquant"></div>
        )}
      </div>

      <h2 className="text-lg text-white font-semibold tracking-wide mb-2">
        IA Multilingue 🌍
      </h2>

      <button
        type="button"
        className="text-xs text-neutral-400 hover:text-white hover:underline mb-3 transition-colors"
        onClick={handleReset}
        disabled={loading}
      >
        🗑️ Effacer la conversation
      </button>

      {/* Zone de chat */}
      <div className="w-full max-h-64 overflow-y-auto bg-neutral-950 rounded-xl p-3 mb-3 border border-neutral-800 shadow-inner">
        {history.length === 0 && !loading && !typing && (
          <div className="text-neutral-500 italic text-center py-4">
            🤖 IA multilingue prête !
            <br />
            <span className="text-xs">Français • English • Español • 日本語 • 中文 • العربية • ไทย</span>
            {!HF_TOKEN && (
              <div className="text-yellow-400 text-xs mt-2">
                ⚠️ Token API manquant - Mode limité
              </div>
            )}
          </div>
        )}

        {history.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {/* Avatar IA */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white flex-shrink-0">
                  <span className="text-white text-sm">🤖</span>
                </div>
              )}

              {/* Avatar utilisateur */}
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center border border-white flex-shrink-0">
                  <span className="text-white text-sm">👤</span>
                </div>
              )}

              <div
                className={`px-3 py-2 rounded-xl shadow border relative ${
                  msg.role === "user"
                    ? "bg-white text-black border-neutral-300 rounded-br-sm"
                    : "bg-neutral-900 text-white border-neutral-700 rounded-bl-sm"
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.flag || "🌍"}</span>
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.name || msg.lang}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Message en cours de frappe */}
        {typing && (
          <div className="mb-3 flex justify-start">
            <div className="flex items-end gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-neutral-900 text-white border border-neutral-700 rounded-bl-sm">
                <div className="text-sm">{typing}<span className="animate-pulse">|</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Indicateur de chargement */}
        {loading && !typing && (
          <div className="flex justify-start mb-3">
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-neutral-900 text-white shadow-md flex items-center gap-2 border border-neutral-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">IA en cours de chargement...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="w-full flex flex-col items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Posez votre question (🇫🇷🇬🇧🇪🇸🇯🇵🇨🇳🇸🇦🇹🇭)..."
          className="w-full p-3 rounded-xl bg-neutral-900 text-white placeholder-neutral-400 border border-white focus:outline-none focus:ring-2 focus:ring-white transition mb-3"
          disabled={loading}
        />

        <button
          onClick={(e) => handleSubmit(e)}
          disabled={loading || !question.trim()}
          className={`w-full bg-white text-black font-bold py-3 rounded-xl transition-all shadow-md border border-white ${
            loading || !question.trim()
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-neutral-100 active:scale-95"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-t-transparent border-neutral-900 rounded-full animate-spin"></div>
              Génération...
            </span>
          ) : (
            "Envoyer"
          )}
        </button>
      </div>

      <div className="mt-2 text-xs text-neutral-400 text-center">
        ✨ LibreTranslate + Hugging Face
        {!HF_TOKEN && <span className="text-yellow-400"> (Mode limité)</span>}
      </div>
    </div>
  );
}
