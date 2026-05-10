import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only scroll if pathname actually changed (not on initial mount)
    if (prevPathname.current !== pathname) {
      // Delay scroll to allow AnimatePresence exit animations to complete
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 150);
      prevPathname.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
