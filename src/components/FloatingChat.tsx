import { useState, useEffect } from "react";
import AgentIA from "./AgentIA";

const notifSound = typeof window !== "undefined"
  ? new Audio("/notif.mp3")
  : null;

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (!open) {
        setHasNewMsg(true);
        setUnread((u) => u + 1);
        notifSound?.play().catch(() => {});
        if ("vibrate" in navigator) navigator.vibrate(50);
      }
    };
    window.addEventListener("agentia-new-message", handler);
    return () => window.removeEventListener("agentia-new-message", handler);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setHasNewMsg(false);
    setUnread(0);
  };

  return (
    <>
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        className="fixed bottom-8 right-8 z-50 bg-cyan-500 hover:bg-cyan-600 rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl text-white focus:outline-none transition duration-300"
        aria-label={open ? "Fermer l'agent IA" : "Ouvrir l'agent IA"}
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,.3)", position: "fixed" }}
      >
        🤖
        {/* Badge de notif */}
        {hasNewMsg && !open && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-2 py-1 shadow-md animate-bounce">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="fixed bottom-28 right-8 z-50 max-w-sm w-[92vw] sm:w-full"
          style={{ maxHeight: "80vh" }}>
          <div className="animate-fadeIn bg-neutral-900 rounded-2xl shadow-2xl border border-cyan-400 overflow-hidden">
            <AgentIA />
          </div>
        </div>
      )}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn .38s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px) scale(.95);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </>
  );
}
