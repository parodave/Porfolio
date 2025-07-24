import React from 'react';
import { useTranslation } from 'react-i18next';
import CountrySearch from './CountrySearch';

const CountriesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="countries" className="py-10 space-y-4">
      <h2 className="text-center text-2xl font-bold">{t('countries.title')}</h2>
      <CountrySearch />
    </section>
  );
};

export default CountriesSection;
