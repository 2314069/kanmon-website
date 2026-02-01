import { useInView } from '../../hooks/useInView';
import './SectionDivider.css';

const SectionDivider = () => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3, rootMargin: '0px 0px -30px 0px' });

  return (
    <div className={`section-divider ${isInView ? 'divider-visible' : ''}`} ref={ref} aria-hidden="true">
      <div className="book-gate">
        <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left pillar */}
          <rect x="4" y="10" width="8" height="30" fill="currentColor" />
          <line x1="6" y1="12" x2="6" y2="38" stroke="#fff" strokeWidth="1" opacity="0.3" />
          {/* Right pillar */}
          <rect x="48" y="10" width="8" height="30" fill="currentColor" />
          <line x1="54" y1="12" x2="54" y2="38" stroke="#fff" strokeWidth="1" opacity="0.3" />
          {/* Open book (kasagi) */}
          <path d="M30 4 L10 8 L10 12 L30 8 Z" fill="currentColor" />
          <path d="M30 4 L50 8 L50 12 L30 8 Z" fill="currentColor" />
          <rect x="10" y="6" width="40" height="4" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default SectionDivider;
