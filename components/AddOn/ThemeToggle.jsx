'use client';

import { Moon, Sun } from 'lucide-react'; // Optional: prettier icons
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid mismatch on hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
    </button>
  );
}
