import { useState } from "react";
import { motion } from "framer-motion";

// 👉 Fonction d'appel à Hugging Face Inference API (gratuit, pas de clé)
const askHF = async (question: string, context: string) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: {
          question,
          context,
        },
      }),
    }
  );
  const data = await response.json();
  return data?.answer || data?.error || "Erreur ou aucune réponse IA.";
};

export default function AgentIA() {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState(
    "Je m'appelle Karim Hammouche, je suis développeur web full stack, expert en création de site, gestion de projet, et passionné par l’IA. J’ai travaillé sur des projets en React, Next.js, Python. Voici mes compétences principales : React, TypeScript, Node.js, gestion de projet, e-commerce. Je propose des prestations de développement web sur-mesure, audit technique, et consulting IA. N'hésitez pas à poser des questions sur mes compétences ou services !"
  );
  const [answer, setAnswer] = useState("La réponse IA apparaîtra ici...");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    try {
      const res = await askHF(question, context);
      setAnswer(res);
    } catch {
      setAnswer("Erreur lors de la communication avec l’agent IA.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-black rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-2xl mx-auto my-12">
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="h-14 w-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg mb-4"
      >
        <span className="text-2xl text-white font-bold">🤖</span>
      </motion.div>
      <h2 className="text-2xl text-white font-semibold tracking-wide mb-6">Pose ta question à l'IA !</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Contexte (ex: ton CV, tes compétences, services, etc.)"
          className="w-full p-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition mb-3"
          rows={3}
          disabled={loading}
        />
        <motion.input
          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #22d3ee" }}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pose ta question ici..."
          className="w-full p-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition mb-3"
          disabled={loading}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-2 rounded-xl mt-2 transition-all shadow-md ${
            loading ? "opacity-70 cursor-wait" : ""
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className={`mt-6 w-full rounded-xl bg-black/50 p-4 min-h-[60px] text-cyan-200 border border-neutral-800 transition-all duration-300 ${
          loading ? "opacity-60" : ""
        }`}
      >
        <span className={answer === "La réponse IA apparaîtra ici..." ? "italic text-neutral-400" : "text-cyan-200"}>
          {answer}
        </span>
      </motion.div>
    </div>
  );
}
