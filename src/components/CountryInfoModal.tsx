import React from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../data/countries';
import { getCurrentLang } from '../utils/getCurrentLang';

interface CountryInfoModalProps {
  country: Country | null;
  onClose: () => void;
}

const CountryInfoModal: React.FC<CountryInfoModalProps> = ({ country, onClose }) => {
  const { t } = useTranslation();
  const lang = getCurrentLang();

  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-black dark:bg-zinc-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold capitalize text-center">
          {country.name[lang]}
        </h2>
        <p className="text-center text-sm">{t(country.descriptionKey)}</p>
      </div>
    </div>
  );
};

export default CountryInfoModal;
