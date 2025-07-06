import { useState, useRef, useEffect } from "react";

// Configuration API
// The translation endpoint can be customized via environment variable.
const LIBRETRANSLATE_URL =
  import.meta.env.VITE_LIBRETRANSLATE_URL || "https://libretranslate.de/translate";

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

// Fonction de traduction avec LibreTranslate
async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
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
        return libreData.translatedText.trim();
      }
    }

    return text;

  } catch (error) {
    console.error("❌ Erreur de traduction:", error);
    return text;
  }
}

// Détection de langue
function detectLanguage(text: string): SupportedLanguage {
  const lowerText = text.toLowerCase();

  const frenchWords = ["le", "la", "et", "est", "un", "une", "pour", "dans", "que", "qui", "comment", "quel", "bonjour", "merci"];
  const spanishWords = ["el", "la", "y", "es", "un", "una", "para", "en", "que", "hola", "gracias", "como", "donde"];
  const englishWords = ["the", "and", "is", "a", "an", "for", "in", "that", "hello", "thank", "how", "what"];

  const frenchPattern = /[éèàêùçœîôâû]/i;
  const spanishPattern = /[ñáéíóúü]/i;
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  const chinesePattern = /[\u4E00-\u9FFF]/;
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const thaiPattern = /[\u0E00-\u0E7F]/;

  if (japanesePattern.test(text)) return "ja";
  if (chinesePattern.test(text)) return "zh";
  if (arabicPattern.test(text)) return "ar";
  if (thaiPattern.test(text)) return "th";

  const frenchScore = frenchWords.filter(word => lowerText.includes(word)).length + (frenchPattern.test(text) ? 2 : 0);
  const spanishScore = spanishWords.filter(word => lowerText.includes(word)).length + (spanishPattern.test(text) ? 2 : 0);
  const englishScore = englishWords.filter(word => lowerText.includes(word)).length;

  if (frenchScore > spanishScore && frenchScore > englishScore) return "fr";
  if (spanishScore > englishScore) return "es";

  return "en";
}

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

function ChatWidget() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading, typing]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    setHistory([]);
    setTyping("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && question.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent,
  ) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setTyping("");

    const detectedLang: SupportedLanguage = detectLanguage(question);

    setHistory((prev) => [
      ...prev,
      { role: "user", content: question, lang: detectedLang },
    ]);

    try {
      let prompt = question;
      let needsTranslation = false;

      if (detectedLang !== "en") {
        try {
          prompt = await translateText(question, detectedLang, "en");
          needsTranslation = true;
        } catch {
          prompt = question;
        }
      }

      const response = askFallbackAI(prompt);

      let answer = response;
      const responseLanguage: SupportedLanguage = detectedLang;

      if (needsTranslation && detectedLang !== "en" && response) {
        try {
          const translatedAnswer = await translateText(response, "en", detectedLang);
          if (translatedAnswer && translatedAnswer !== response) {
            answer = translatedAnswer;
          }
        } catch {
          // Keep original answer
        }
      }

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

      let i = 0;
      setTyping("");
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      typingIntervalRef.current = setInterval(() => {
        setTyping(answer.slice(0, i + 1));
        i++;
        if (i >= answer.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
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
    <div className="bg-black rounded-lg shadow-2xl p-4 flex flex-col w-80 border border-white/20">
      {/* Header minimaliste */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Agent IA</h3>
            <p className="text-gray-400 text-xs">Assistant multilingue</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="text-gray-400 hover:text-white transition-colors text-xs"
        >
          Effacer
        </button>
      </div>

      {/* Zone de chat */}
      <div className="w-full h-64 overflow-y-auto mb-4 space-y-3">
        {history.length === 0 && !loading && !typing && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/60">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
              </svg>
            </div>
            <p className="text-white/80 text-sm mb-2">IA prête</p>
            <p className="text-gray-400 text-xs">7 langues supportées</p>
          </div>
        )}

        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start gap-2 max-w-[85%]">
              {msg.role === "assistant" && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              )}

              {msg.role === "user" && (
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}

              <div
                className={`px-3 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-white text-black"
                    : "bg-white/10 text-white border border-white/20"
                }`}
              >
                <div className="leading-relaxed">{msg.content}</div>
                <div className="text-xs mt-1 opacity-60 flex items-center gap-1">
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.flag || "🌍"}</span>
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.name || msg.lang}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Message en cours de frappe */}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm">
                {typing}<span className="animate-pulse ml-1">|</span>
              </div>
            </div>
          </div>
        )}

        {/* Indicateur de chargement */}
        {loading && !typing && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-black rounded-full animate-spin"></div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span>IA réfléchit...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="space-y-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Posez votre question..."
          className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 transition text-sm"
          disabled={loading}
        />

        <button
          onClick={(e) => handleSubmit(e)}
          disabled={loading || !question.trim()}
          className={`w-full bg-white text-black font-medium py-2 rounded-lg transition text-sm ${
            loading || !question.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white/90"
          }`}
        >
          {loading ? "Génération..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;

export function FloatingAgentIA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget de chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 animate-in slide-in-from-bottom-2 duration-200">
          <ChatWidget />
        </div>
      )}

      {/* Bouton flottant minimaliste */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center border ${
          isOpen
            ? 'bg-white text-black border-white hover:bg-gray-100'
            : 'bg-black text-white border-white hover:bg-gray-900'
        }`}
      >
        {/* Icône */}
        <div className="transition-transform duration-200">
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"/>
            </svg>
          )}
        </div>

        {/* Point de notification */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-black">
            <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </button>
    </div>
  );
}
