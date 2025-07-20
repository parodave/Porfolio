import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { countries } from '../data/countries';
import { useCountryStore } from '../store/countrySearch';

const CountrySearch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const search = useCountryStore((s) => s.search);
  const setSearch = useCountryStore((s) => s.setSearch);
  const setSelected = useCountryStore((s) => s.setSelected);

  const results = useMemo(() => {
    return countries.filter((c) =>
      c.name[i18n.language as 'fr' | 'en']
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, i18n.language]);

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('world.searchPlaceholder')}
        className="w-full p-2 border rounded"
      />
      {search && (
        <ul className="max-h-48 overflow-auto border rounded bg-white dark:bg-dark text-black dark:text-white">
          {results.length === 0 && (
            <li className="p-2 text-center">{t('world.noResults')}</li>
          )}
          {results.map((c) => (
            <li
              key={c.code}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => {
                setSelected(c);
                setSearch('');
              }}
            >
              {c.name[i18n.language as 'fr' | 'en']}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySearch;
