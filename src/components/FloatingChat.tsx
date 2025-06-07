import { useState, useEffect } from "react";
import AgentIA from "./AgentIA";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  // Badge notification quand nouveau message IA
  useEffect(() => {
    const notifHandler = () => {
      if (!open) setHasNewMsg(true);
    };
    window.addEventListener("agentia-new-message", notifHandler);
    return () => window.removeEventListener("agentia-new-message", notifHandler);
  }, [open]);

  // Fermer le chat en cliquant sur overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Place la bulle en bas à droite et la fenêtre juste au-dessus
  return (
    <>
      {/* Bulle flottante */}
      <button
        onClick={open ? () => setOpen(false) : () => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-white hover:bg-neutral-200 border border-white rounded-full shadow-2xl w-14 h-14 flex items-center justify-center text-3xl text-black focus:outline-none transition duration-300`}
        aria-label={open ? "Fermer l'agent IA" : "Ouvrir l'agent IA"}
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,.28)" }}
      >
        {/* Avatar IA dans la bulle */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-black flex items-center justify-center">
          {videoOk ? (
            <video
              src="/avatars/robot-video.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-8 h-8 object-cover"
              style={{ display: "block" }}
              onError={() => setVideoOk(false)}
            />
          ) : (
            <img
              src="/avatars/robot.png"
              alt="Agent IA"
              className="w-8 h-8 object-cover"
            />
          )}
        </div>
        {hasNewMsg && !open && (
          <span className="absolute -top-1 -right-1 bg-black text-xs text-white rounded-full px-2 py-1 shadow-md animate-pulse">
            ●
          </span>
        )}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleOverlayClick}
          style={{ background: "rgba(20,20,20,0.24)" }}
        >
          <div className="fixed bottom-24 right-7 z-50 w-[350px] max-w-[95vw] sm:w-[360px]"
            style={{ maxHeight: "480px" }}>
            <div className="animate-fadeIn bg-black rounded-2xl shadow-2xl border border-white overflow-hidden">
              <AgentIA />
            </div>
          </div>
        </div>
      )}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn .38s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px) scale(.96);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        `}
      </style>
    </>
  );
}
