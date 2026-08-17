import { useThemeContext } from '../context/ThemeContext';

export function useDarkMode() {
  return useThemeContext()
}