import { useEffect, useRef } from 'react';

export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    function handleScroll() {
      const offset = window.scrollY * speed;
      el!.style.transform = `translateY(${offset}px)`;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
