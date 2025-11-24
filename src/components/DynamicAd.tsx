import { useEffect, useRef, useState, useCallback } from 'react';

interface DynamicAdProps {
  slot: string;
  className?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  position?: number;
  client?: string; // ca-pub-XXXXXXXXXXXXXXXX
  infiniteScroll?: boolean; // Habilita modo infinite scroll
  itemsBetweenAds?: number; // Número de itens entre ads (default: 6)
}

// Declara o objeto AdSense global
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function DynamicAd({ 
  slot, 
  className = '', 
  format = 'auto',
  position = 0,
  client = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-8616282875609147',
  infiniteScroll = false,
  itemsBetweenAds = 6,
}: DynamicAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [lastLoadY, setLastLoadY] = useState(0);
  const [lastLoadTime, setLastLoadTime] = useState(0);
  const hasLoadedRef = useRef(false);
  const insRef = useRef<HTMLModElement>(null);
  const adInstanceRef = useRef<string>(`ad-${slot}-${Date.now()}`);

  const MIN_RELOAD_INTERVAL = 45000; // 45 segundos em milissegundos

  // Dimensões e estilos baseados no formato para AdSense
  const adFormats = {
    auto: { 
      style: { display: 'block' },
      dataAdFormat: 'auto',
      dataFullWidthResponsive: 'true'
    },
    horizontal: { 
      style: { display: 'block' },
      dataAdFormat: 'horizontal',
      dataFullWidthResponsive: 'true'
    },
    vertical: { 
      style: { display: 'block' },
      dataAdFormat: 'vertical',
      dataFullWidthResponsive: 'false'
    },
    rectangle: { 
      style: { display: 'inline-block', width: '300px', height: '250px' },
      dataAdFormat: 'rectangle',
      dataFullWidthResponsive: 'false'
    },
  };

  const adConfig = adFormats[format];

  // Carrega/recarrega o AdSense
  const loadAd = useCallback(() => {
    const currentY = window.scrollY;
    const currentTime = Date.now();
    
    // Verifica se já passou tempo suficiente desde o último load (45s)
    const timeSinceLastLoad = currentTime - lastLoadTime;
    if (timeSinceLastLoad < MIN_RELOAD_INTERVAL && loadCount > 0) {
      console.log(`[AdSense ${slot}] Aguardando... ${Math.ceil((MIN_RELOAD_INTERVAL - timeSinceLastLoad) / 1000)}s restantes`);
      return;
    }
    
    // Para infinite scroll, sempre carrega quando visível
    if (!infiniteScroll) {
      // Evita reload se rolou menos de 400px desde o último load
      if (Math.abs(currentY - lastLoadY) < 400 && loadCount > 0) {
        return;
      }
    }

    setLastLoadY(currentY);
    setLastLoadTime(currentTime);
    setLoadCount(prev => prev + 1);

    try {
      // Push no array adsbygoogle para carregar o anúncio
      if (window.adsbygoogle && insRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`[AdSense ${slot}] Anúncio carregado - Posição: ${position}, Carga #${loadCount + 1}${infiniteScroll ? ' (Infinite Scroll)' : ''}`);
      }
    } catch (error) {
      console.error('[AdSense] Erro ao carregar anúncio:', error);
    }
  }, [slot, position, loadCount, lastLoadY, lastLoadTime, infiniteScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Carrega o ad quando entra no viewport
            if (!hasLoadedRef.current) {
              loadAd();
              hasLoadedRef.current = true;
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // 50% do ad visível
        rootMargin: '100px', // Começa a carregar 100px antes
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, []);

  // Recarrega ad quando sai e volta ao viewport (apenas se não for infinite scroll)
  useEffect(() => {
    if (!infiniteScroll && isVisible && hasLoadedRef.current) {
      const timer = setTimeout(() => {
        const timeSinceLastLoad = Date.now() - lastLoadTime;
        
        // Só recarrega se passou tempo suficiente
        if (timeSinceLastLoad >= MIN_RELOAD_INTERVAL) {
          // Remove o anúncio anterior
          if (insRef.current) {
            insRef.current.innerHTML = '';
          }
          loadAd();
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, infiniteScroll, loadAd, lastLoadTime]);

  // Listener para scroll e reload baseado em distância (apenas se não for infinite scroll)
  useEffect(() => {
    if (infiniteScroll) return; // Skip para infinite scroll
    
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        if (isVisible && adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Se o ad está completamente visível por tempo suficiente
          if (rect.top >= 0 && rect.bottom <= viewportHeight) {
            const currentY = window.scrollY;
            const currentTime = Date.now();
            const timeSinceLastLoad = currentTime - lastLoadTime;
            
            // Reload se rolou mais de uma viewport E passou tempo suficiente (45s)
            if (Math.abs(currentY - lastLoadY) > viewportHeight && timeSinceLastLoad >= MIN_RELOAD_INTERVAL) {
              // Remove o anúncio anterior
              if (insRef.current) {
                insRef.current.innerHTML = '';
              }
              loadAd();
            }
          }
        }
      }, 1500); // Aguarda 1.5s após parar de rolar
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible, lastLoadY, lastLoadTime, infiniteScroll, loadAd]);

  return (
    <div
      ref={adRef}
      className={`relative w-full max-w-full min-h-[100px] md:min-h-[90px] bg-muted/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      data-ad-slot={slot}
      data-ad-position={position}
    >
      {/* Google AdSense Tag */}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={adConfig.style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={adConfig.dataAdFormat}
        data-full-width-responsive={adConfig.dataFullWidthResponsive}
      />

      {/* Development indicator (remova em produção) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 z-10">
          <div className="text-xs bg-black/50 text-white px-2 py-1 rounded">
            Slot: {slot} | Cargas: {loadCount} | {isVisible ? '👁️' : '💤'}
            {lastLoadTime > 0 && (
              <div className="text-[10px] mt-0.5">
                Último reload: {new Date(lastLoadTime).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
