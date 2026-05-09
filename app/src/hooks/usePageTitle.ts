import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · Kalasag` : 'Kalasag';
    return () => {
      document.title = previous;
    };
  }, [title]);
}
