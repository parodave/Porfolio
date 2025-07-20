import React from 'react';

interface CountryInfoProps {
  country: string | null;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ country }) => {
  if (!country) return null;

  return (
    <div className="absolute top-4 left-4 bg-white dark:bg-darker p-4 shadow">
      <p className="text-sm">Selected: {country}</p>
    </div>
  );
};

export default CountryInfo;
