import React from 'react';

export interface DownloadPDFButtonsProps {
  pdfLinks: Record<string, string>;
}

const DownloadPDFButtons: React.FC<DownloadPDFButtonsProps> = ({ pdfLinks }) => (
  <div className="flex gap-4 my-4">
    {Object.entries(pdfLinks).map(([lang, url]) => (
      <a
        key={lang}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        PDF {lang.toUpperCase()}
      </a>
    ))}
  </div>
);

export default DownloadPDFButtons;
