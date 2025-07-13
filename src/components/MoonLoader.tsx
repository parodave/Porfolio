import { useTranslation } from 'react-i18next';

export default function MoonLoader() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="animate-pulse text-gray-500 dark:text-gray-400">
        {t('moon.loader')}
      </p>
    </div>
  );
}
