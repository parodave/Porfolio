import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChatWidget from "./AgentIA";

export default function FloatingAgentIA() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget affiché quand ouvert */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-black rounded-2xl shadow-xl border border-white overflow-hidden">
            <ChatWidget />
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center border ${
          isOpen
            ? "bg-white text-black border-white hover:bg-gray-100"
            : "bg-black text-white border-white hover:bg-gray-900"
        }`}
        aria-label={isOpen ? t('floatingAi.close') : t('floatingAi.open')}
      >
        {/* Icône de chat ou croix */}
        <div>
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z" />
            </svg>
          )}
        </div>

        {/* Badge notification si besoin */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-black animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
