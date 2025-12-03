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
