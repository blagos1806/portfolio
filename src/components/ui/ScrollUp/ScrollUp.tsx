import { ArrowUp } from 'lucide-react';
import './ScrollUp.css';

interface ScrollUpProps {
  isVisible: boolean;
  onClick?: () => void;
}

export default function ScrollUp({ isVisible, onClick }: ScrollUpProps) {
  if (!isVisible) return null;
  return (
    <button className="scroll-up" onClick={onClick} aria-label="Scroll to top">
      <ArrowUp size={16} />
    </button>
  );
}
