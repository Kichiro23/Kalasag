import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollReveal(amount = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  return { ref, isInView };
}
