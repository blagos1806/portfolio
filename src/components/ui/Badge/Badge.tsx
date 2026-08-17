import './Badge.css';

interface BadgeProps {
  text: string;
  type?: 'advanced' | 'intermediate' | 'beginner' | 'default';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export default function Badge({ text, type = 'default', size = 'md', dot = false, className = '' }: BadgeProps) {
  const classes = ['badge', `badge--${type}`, `badge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {text}
    </span>
  )
}