/**
 * Configurações do site vindas de variáveis de ambiente
 * Centraliza todas as referências para facilitar manutenção
 */

export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Photon Media',
  url: import.meta.env.VITE_SITE_URL || 'https://www.ozonio.site',
  logo: import.meta.env.VITE_SITE_LOGO || '/photon-logo.svg',
  icon: import.meta.env.VITE_SITE_ICON || '/photon-logo.svg',
  favicon: import.meta.env.VITE_SITE_FAVICON || '/favicon.ico',
  title: import.meta.env.VITE_SITE_TITLE || 'Ozônio.site - Terapias com Ozônio Medicinal',
  description: import.meta.env.VITE_SITE_DESCRIPTION || 'Portal especializado em terapias com ozônio medicinal',
  author: import.meta.env.VITE_SITE_AUTHOR || 'Ozônio.site',
  gtmId: import.meta.env.VITE_GTM_ID || '',
} as const;
