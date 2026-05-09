import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    document.title = title ? `${title} · Kalasag` : 'Kalasag';

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', previousDescription);
    };
  }, [title, description]);
}
