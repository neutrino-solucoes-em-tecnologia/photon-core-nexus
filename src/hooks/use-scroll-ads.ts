import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar ads dinâmicos baseados em scroll
 * @param scrollInterval - Pixels de scroll entre cada ad (padrão: 1500px)
 * @param maxAds - Número máximo de ads a exibir (padrão: 3)
 */
export function useScrollAds(scrollInterval: number = 1500, maxAds: number = 3) {
  const [visibleAds, setVisibleAds] = useState(1); // Sempre mostra 1 ad inicial

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newVisibleAds = Math.min(
        Math.floor(scrollY / scrollInterval) + 1,
        maxAds
      );
      
      if (newVisibleAds !== visibleAds) {
        setVisibleAds(newVisibleAds);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollInterval, maxAds, visibleAds]);

  return visibleAds;
}
