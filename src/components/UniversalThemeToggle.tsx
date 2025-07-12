
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const UniversalThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white/90 dark:hover:bg-gray-800/90 border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500 transition-transform duration-300" />
        )}
      </Button>
    </div>
  );
};

export default UniversalThemeToggle;
