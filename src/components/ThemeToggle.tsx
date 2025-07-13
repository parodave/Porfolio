import { Moon, Sun } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';

const ThemeToggle = () => {
  const [theme, toggleTheme] = useDarkMode();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white text-black dark:bg-black dark:text-white"
    >
      <Icon size={18} />
    </button>
  );
};

export default ThemeToggle;
