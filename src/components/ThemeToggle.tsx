import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      onClick={toggle}
      aria-label={t('header.toggleTheme')}
      className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white text-black dark:bg-black dark:text-white"
    >
      <Icon size={18} />
    </button>
  );
};

export default ThemeToggle;
