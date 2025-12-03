import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RobotsTxt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.ozonio.site';
    
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# Specific bot rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# Block bad bots (optional)
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /`;

    // Create blob and download
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Redirect to 404 after serving
    navigate('/404', { replace: true });
    
    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [navigate]);

  return null;
};

export default RobotsTxt;
