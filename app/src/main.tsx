import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { LanguageProvider } from "@/providers/LanguageProvider"
import App from './App.tsx'

const preloader = document.getElementById('kalasag-preloader');

function hidePreloader() {
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <TRPCProvider>
            <App />
          </TRPCProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

// Hide preloader after React has mounted and initial paint is done
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTimeout(hidePreloader, 100);
  });
});
