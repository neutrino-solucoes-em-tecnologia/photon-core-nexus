import { useEffect } from 'react';

/**
 * Hook para controlar a exibição e inicialização de anúncios do Google AdSense
 * @returns objeto com propriedades de controle do AdSense
 */
export function useAdSense() {
  // Verifica se o AdSense está habilitado via variável de ambiente
  const isEnabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
  
  // Configurações do AdSense
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  const showErrors = import.meta.env.VITE_SHOW_ADSENSE_ERRORS === 'true';

  /**
   * Inicializa os anúncios do AdSense na página
   * @param count número de anúncios a inicializar (padrão: 3)
   */
  const initializeAds = (count: number = 3) => {
    if (!isEnabled) return;

    try {
      setTimeout(() => {
        for (let i = 0; i < count; i++) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }, 100);
    } catch (err) {
      if (showErrors) {
        console.error('AdSense error:', err);
      }
    }
  };

  return {
    isEnabled,
    clientId,
    initializeAds,
  };
}

/**
 * Hook que inicializa automaticamente os anúncios do AdSense ao montar o componente
 * @param count número de anúncios a inicializar (padrão: 3)
 */
export function useAdSenseInit(count: number = 3) {
  const { isEnabled, initializeAds } = useAdSense();

  useEffect(() => {
    if (isEnabled) {
      initializeAds(count);
    }
  }, [isEnabled, count]);

  return { isEnabled };
}
