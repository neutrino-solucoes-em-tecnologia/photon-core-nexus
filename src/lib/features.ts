/**
 * Feature Flags Configuration
 * 
 * Centraliza a lógica de habilitação/desabilitação de features
 * baseado em variáveis de ambiente.
 */

export const features = {
  /**
   * Trending Articles - Artigos em alta
   * 
   * Quando habilitado:
   * - Exibe item "Trending" no menu de navegação
   * - Ativa rota `/trending`
   * - Mostra widget lateral com artigos em alta
   * - Exibe badges "🔥 Em Alta" em cards de artigos
   */
  trending: {
    enabled: import.meta.env.VITE_FEATURE_TRENDING_ENABLED === 'true',
    menuLabel: 'Trending',
    route: '/trending',
  },

  /**
   * Descontos / Ofertas
   * 
   * Quando habilitado:
   * - Exibe item "Descontos" no menu de navegação
   * - Ativa rota `/descontos`
   * - Mostra banners de ofertas no site
   * - Exibe widget lateral de ofertas
   */
  descontos: {
    enabled: import.meta.env.VITE_FEATURE_DESCONTOS_ENABLED === 'true',
    menuLabel: 'Descontos',
    route: '/descontos',
  },

  /**
   * Imprensa
   * 
   * Quando habilitado:
   * - Exibe item "Imprensa" no menu "Mais"
   * - Ativa rota `/imprensa`
   * - Mostra link no footer
   */
  imprensa: {
    enabled: import.meta.env.VITE_FEATURE_IMPRENSA_ENABLED === 'true',
    menuLabel: 'Imprensa',
    route: '/imprensa',
  },

  /**
   * Trabalhe Conosco
   * 
   * Quando habilitado:
   * - Exibe item "Trabalhe Conosco" no menu "Mais"
   * - Ativa rota `/trabalhe-conosco`
   * - Mostra link no footer
   */
  trabalheConosco: {
    enabled: import.meta.env.VITE_FEATURE_TRABALHE_CONOSCO_ENABLED === 'true',
    menuLabel: 'Trabalhe Conosco',
    route: '/trabalhe-conosco',
  },

  /**
   * Fale Conosco (Contato)
   * 
   * Quando habilitado:
   * - Exibe item "Fale Conosco" no menu "Mais"
   * - Ativa rota `/fale-conosco`
   * - Mostra link no footer e formulário de contato
   * - Exibe CTA de newsletter
   */
  faleConosco: {
    enabled: import.meta.env.VITE_FEATURE_FALE_CONOSCO_ENABLED === 'true',
    menuLabel: 'Fale Conosco',
    route: '/fale-conosco',
  },
} as const;

/**
 * Helper para verificar se uma feature está habilitada
 */
export const isFeatureEnabled = (featureName: keyof typeof features): boolean => {
  return features[featureName]?.enabled || false;
};

/**
 * Lista de todas as features disponíveis
 */
export type FeatureName = keyof typeof features;

/**
 * Configuração de feature
 */
export type Feature = {
  enabled: boolean;
  menuLabel: string;
  route: string;
};
