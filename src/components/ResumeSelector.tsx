import React from 'react';

const resumes = [
  { label: '🇫🇷 Français - CV', file: '/cv-fr.pdf' },
  { label: '🇬🇧 Anglais - Resume', file: '/cv-en.pdf' },
  { label: '🇪🇸 Espagnol - CV', file: '/cv-es.pdf' },
  { label: '🇷🇺 Russe - Резюме', file: '/cv-ru.pdf' },
  { label: '🇨🇳 Chinois - 简历', file: '/cv-zh.pdf' },
  { label: '🇯🇵 Japonais - 履歴書', file: '/cv-ja.pdf' },
  { label: '🇹🇭 Thaï - ประวัติย่อ', file: '/cv-th.pdf' },
  { label: '🇸🇦 Arabe - السيرة الذاتية', file: '/cv-ar.pdf' },
  { label: '🌐 Universel - CV (EN)', file: '/cv-universal.pdf' },
];

const ResumeSelector: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = e.target.value;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      e.target.selectedIndex = 0;
    }
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="bg-zinc-800 text-white border border-zinc-600 rounded-md px-4 py-2"
      aria-label="Sélectionner un CV"
    >
      <option value="" disabled>
        Choisissez un CV
      </option>
      {resumes.map(({ label, file }) => (
        <option key={file} value={file}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default ResumeSelector;
