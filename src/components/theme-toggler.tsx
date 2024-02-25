import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const element = document.documentElement;

export function ThemeToggler() {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleClick = () => {
    setChecked((prev) => !prev);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    element.classList.remove(theme === 'light' ? 'dark' : 'light');
    element.classList.add(theme);

    setChecked(theme === 'dark')
  }, [setChecked, theme]);
  return (
    <div className="flex justify-center items-center gap-2 pb-2">
      <Sun />
      <button
        className="w-12 h-6 rounded-full p-1 bg-gray-300 dark:bg-slate-700 relative
        transition-colors
        duration-500
        ease-in
      "
        onClick={handleClick}
      >
        <div
          className={`${checked ? 'ml-6' : 'ml-0'} rounded-full size-4 bg-sky-600 dark:bg-rose-500 relative pointer-events-none
        transition-all
        duration-300
        ease-out`}
        />
      </button>
      <Moon />
    </div>
  );
}
