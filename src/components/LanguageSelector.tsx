import i18n from "i18next";

const LanguageSelector = () => (
  <select
    onChange={(e) => i18n.changeLanguage(e.target.value)}
    defaultValue={i18n.language}
    className="bg-black text-white border px-2 py-1 rounded ms-4"
    aria-label="Select language"
  >
    <option value="fr">🇫🇷 Français</option>
    <option value="en">🇬🇧 English</option>
    <option value="es">🇪🇸 Español</option>
    <option value="ja">🇯🇵 日本語</option>
    <option value="zh">🇨🇳 中文</option>
    <option value="ar">🇸🇦 العربية</option>
    <option value="th">🇹🇭 ไทย</option>
    <option value="ru">🇷🇺 Русский</option>
  </select>
);

export default LanguageSelector;
