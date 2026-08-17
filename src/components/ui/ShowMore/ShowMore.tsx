import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import './ShowMore.css';

interface ShowMoreProps<T> {
  items: T[];
  initialCount?: number;
  /** Receives the always-visible slice and the expandable slice (empty when collapsed). */
  children: (initialItems: T[], extraItems: T[]) => ReactNode;
  className?: string;
}

export default function ShowMore<T>({
  items,
  initialCount = 5,
  children,
  className = '',
}: ShowMoreProps<T>) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  if (items.length <= initialCount) {
    return <>{children(items, [])}</>;
  }

  const extraItems = expanded ? items.slice(initialCount) : [];
  const remaining = items.length - initialCount;

  return (
    <div className={`show-more${className ? ` ${className}` : ''}`}>
      {children(items.slice(0, initialCount), extraItems)}

      <div className="show-more__footer">
        <button
          className="show-more__btn"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? 'less' : 'more'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {expanded
                ? t('common.show_less')
                : t('common.show_more', { count: remaining })}
            </motion.span>
          </AnimatePresence>

          <motion.span
            className="show-more__chevron"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <ChevronDown size={15} />
          </motion.span>
        </button>
      </div>
    </div>
  );
}
