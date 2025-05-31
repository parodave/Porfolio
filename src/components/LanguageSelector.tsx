import i18n from "i18next";

const LanguageSelector = () => (
  <select
    onChange={(e) => i18n.changeLanguage(e.target.value)}
    defaultValue={i18n.language}
    className="bg-black text-white border px-2 py-1 rounded ml-4"
  >
    <option value="fr">🇫🇷 Français</option>
    <option value="en">🇬🇧 English</option>
    <option value="ar">🇸🇦 العربية</option>
    <option value="th">🇹🇭 ไทย</option>
  </select>
);

export default LanguageSelector;
