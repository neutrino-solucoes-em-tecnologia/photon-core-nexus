import { useAdSense } from '@/hooks/use-adsense';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  position?: number;
  className?: string;
  style?: React.CSSProperties;
  mockLabel?: string;
}

export default function AdSlot({ 
  slot, 
  format = 'auto',
  position = 0,
  className = '',
  style = {},
  mockLabel = 'Ad'
}: AdSlotProps) {
  const { isEnabled, clientId } = useAdSense();

  // Mock ad placeholder quando desabilitado ou slot indefinido
  if (!isEnabled || !slot) {
    const mockDimensions = {
      auto: { width: '100%', minHeight: '90px' },
      horizontal: { width: '100%', minHeight: '90px' },
      vertical: { width: '300px', height: '600px' },
      rectangle: { width: '300px', height: '250px' },
    };
    
    const dimensions = mockDimensions[format];
    const formatLabel = {
      auto: 'Responsive',
      horizontal: 'Horizontal Banner',
      vertical: '300x600 Half Page',
      rectangle: '300x250 Rectangle',
    };
    
    return (
      <div
        className={`relative bg-gradient-to-br from-muted/40 to-muted/20 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center ${className}`}
        style={{ 
          ...dimensions,
          ...style,
        }}
      >
        <div className="text-center p-4">
          <div className="text-xs font-mono text-primary/70 mb-1">
            {mockLabel} - Position {position}
          </div>
          <div className="text-xs font-bold text-primary uppercase mb-1">
            {formatLabel[format]}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono opacity-60">
            {slot ? `Slot: ...${slot.slice(-4)}` : 'Slot: Not configured'}
          </div>
        </div>
      </div>
    );
  }

  // Real AdSense tag quando habilitado
  const adFormats = {
    auto: {
      dataAdFormat: 'auto',
      dataFullWidthResponsive: 'true',
    },
    horizontal: {
      dataAdFormat: 'horizontal',
      dataFullWidthResponsive: 'true',
    },
    vertical: {
      dataAdFormat: 'vertical',
      dataFullWidthResponsive: 'false',
    },
    rectangle: {
      dataAdFormat: 'rectangle',
      dataFullWidthResponsive: 'false',
    },
  };

  const config = adFormats[format];

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        ...style,
      }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={config.dataAdFormat}
      data-full-width-responsive={config.dataFullWidthResponsive}
    />
  );
}
