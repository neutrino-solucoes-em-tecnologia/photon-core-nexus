import { ReactNode, Children, Fragment } from 'react';
import DynamicAd from './DynamicAd';

interface ContentWithViewportAdsProps {
  children: ReactNode;
  adSlot: string;
  adClient?: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  itemsPerViewport?: number; // Aproximadamente quantos itens cabem em 1 viewport (default: 4)
}

export default function ContentWithViewportAds({
  children,
  adSlot,
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  adFormat = 'horizontal',
  itemsPerViewport = 4,
}: ContentWithViewportAdsProps) {
  // Converte children em array
  const childrenArray = Children.toArray(children);
  const result: ReactNode[] = [];
  let adCounter = 0;

  childrenArray.forEach((child, index) => {
    // Adiciona o elemento filho
    result.push(child);

    // A cada N itens (viewport), adiciona um ad
    if ((index + 1) % itemsPerViewport === 0 && index !== childrenArray.length - 1) {
      adCounter++;
      result.push(
        <div key={`viewport-ad-${adCounter}`} className="my-6 md:my-8 w-full max-w-full overflow-hidden px-4 sm:px-6 lg:px-8">
          <DynamicAd
            slot={adSlot}
            format={adFormat}
            position={adCounter}
            client={adClient}
            className="mx-auto max-w-4xl"
          />
        </div>
      );
    }
  });

  return <>{result}</>;
}
