import { useTranslation } from 'react-i18next';

export default function MoonError() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-red-500">{t('moon.error')}</p>
    </div>
  );
}
