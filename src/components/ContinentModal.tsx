import React from 'react';

interface ContinentModalProps {
  continent: string;
  onClose: () => void;
}

const ContinentModal: React.FC<ContinentModalProps> = ({ continent, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative rounded-lg bg-white p-6 text-black dark:bg-zinc-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-center text-xl font-semibold capitalize">{continent}</h2>
        <p className="text-center text-sm">Information about {continent}</p>
      </div>
    </div>
  );
};

export default ContinentModal;
