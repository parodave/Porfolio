import React from 'react';

interface CountryModalProps {
  country: string | null;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-darker p-6 rounded">
        <p className="mb-4 text-center">Information about {country}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CountryModal;
