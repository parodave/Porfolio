import React from 'react';

const resumes = [
  { label: 'FR - Développeur Web', file: '/cv-fr-dev.pdf' },
  { label: 'EN - Project Manager', file: '/cv-en-pm.pdf' },
  { label: 'AR - Fullstack', file: '/cv-ar-fullstack.pdf' },
  { label: 'ES - Marketing', file: '/cv-es-marketing.pdf' },
  { label: 'DE - Data Scientist', file: '/cv-de-data.pdf' },
  { label: 'IT - DevOps Engineer', file: '/cv-it-devops.pdf' },
  { label: 'CN - Product Manager', file: '/cv-cn-product.pdf' },
  { label: 'JA - Software Engineer', file: '/cv-ja-software.pdf' },
  { label: 'PT - Cybersecurity', file: '/cv-pt-cyber.pdf' }
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
      className="bg-zinc-800 text-white border px-3 py-2 rounded"
      aria-label="Sélectionner un CV"
    >
      <option value="" disabled>
        Choisissez un CV
      </option>
      {resumes.map((r) => (
        <option key={r.file} value={r.file}>
          {r.label}
        </option>
      ))}
    </select>
  );
};

export default ResumeSelector;
