import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdSense } from '@/hooks/use-adsense';

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
  client,
  infiniteScroll = false,
  itemsBetweenAds = 6,
}: DynamicAdProps) {
  const { isEnabled, clientId } = useAdSense();
  const finalClient = client || clientId;
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [lastLoadY, setLastLoadY] = useState(0);
  const [lastLoadTime, setLastLoadTime] = useState(0);
  const hasLoadedRef = useRef(false);
  const insRef = useRef<HTMLModElement>(null);
  const adInstanceRef = useRef<string>(`ad-${slot}-${Date.now()}`);

  const MIN_RELOAD_INTERVAL = 45000; // 45 segundos em milissegundos

  // Se AdSense não está habilitado, não renderiza nada
  if (!isEnabled) {
    return null;
  }

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
    if (hasLoadedRef.current) return; // Carrega apenas uma vez
    
    try {
      // Push no array adsbygoogle para carregar o anúncio
      if (window.adsbygoogle && insRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`[AdSense ${slot}] Anúncio carregado - Posição: ${position}`);
        hasLoadedRef.current = true;
      }
    } catch (error) {
      console.error('[AdSense] Erro ao carregar anúncio:', error);
    }
  }, [slot, position]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoadedRef.current) {
            setIsVisible(true);
            // Delay para garantir que o DOM está pronto
            setTimeout(() => loadAd(), 100);
          }
        });
      },
      {
        threshold: 0.1, // 10% do ad visível
        rootMargin: '200px', // Começa a carregar 200px antes
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
  }, [loadAd]);

  return (
    <div
      ref={adRef}
      className={`relative w-full max-w-full min-h-[100px] md:min-h-[90px] bg-muted/20 backdrop-blur-sm rounded-lg transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      data-ad-slot={slot}
      data-ad-position={position}
      style={{ 
        overflow: 'visible',
        contain: 'layout style',
      }}
    >
      {/* Google AdSense Tag */}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          ...adConfig.style,
          display: 'block',
          overflow: 'visible',
          minWidth: '100%',
          minHeight: '90px',
        }}
        data-ad-client={finalClient}
        data-ad-slot={slot}
        data-ad-format={adConfig.dataAdFormat}
        data-full-width-responsive={adConfig.dataFullWidthResponsive}
      />

      {/* Development indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 z-10">
          <div className="text-xs bg-black/50 text-white px-2 py-1 rounded">
            Slot: {slot} | {hasLoadedRef.current ? '✅ Loaded' : '⏳ Loading...'}
          </div>
        </div>
      )}
    </div>
  );
}
