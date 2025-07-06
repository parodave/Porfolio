import { useState, useRef, useEffect } from "react";
import i18n from "i18next";

type FlagProps = React.SVGProps<SVGSVGElement>;

const FRFlag = (props: FlagProps) => (
  <svg viewBox="0 0 3 2" {...props}>
    <rect width="1" height="2" x="0" fill="#0055A4" />
    <rect width="1" height="2" x="1" fill="#ffffff" />
    <rect width="1" height="2" x="2" fill="#EF4135" />
  </svg>
);

const ENFlag = (props: FlagProps) => (
  <svg viewBox="0 0 3 2" {...props}>
    <rect width="3" height="2" fill="#ffffff" />
    <rect x="1.25" width="0.5" height="2" fill="#C8102E" />
    <rect y="0.75" width="3" height="0.5" fill="#C8102E" />
  </svg>
);

const JAFlag = (props: FlagProps) => (
  <svg viewBox="0 0 3 2" {...props}>
    <rect width="3" height="2" fill="#ffffff" />
    <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
  </svg>
);

const RUFlag = (props: FlagProps) => (
  <svg viewBox="0 0 9 6" {...props}>
    <rect width="9" height="2" y="0" fill="#ffffff" />
    <rect width="9" height="2" y="2" fill="#0039A6" />
    <rect width="9" height="2" y="4" fill="#D52B1E" />
  </svg>
);

const languages = [
  { code: "fr", name: "Français", Flag: FRFlag },
  { code: "en", name: "English", Flag: ENFlag },
  { code: "ja", name: "日本語", Flag: JAFlag },
  { code: "ru", name: "Русский", Flag: RUFlag },
];

const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block ml-4">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="bg-black text-white border px-3 py-2 rounded flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <current.Flag className="w-5 h-4" />
        <span className="sr-only sm:not-sr-only">{current.name}</span>
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 bg-black text-white border rounded shadow-lg z-10"
          role="listbox"
        >
          {languages.map(({ code, name, Flag }) => (
            <button
              key={code}
              onClick={() => {
                i18n.changeLanguage(code);
                setOpen(false);
              }}
              className="flex items-center w-full space-x-2 px-3 py-2 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
              role="option"
            >
              <Flag className="w-5 h-4" />
              <span className="text-sm">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
