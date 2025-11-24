import { ReactNode } from 'react';
import DynamicAd from './DynamicAd';

interface InfiniteScrollWithAdsProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsBetweenAds?: number;
  adSlot: string;
  adClient?: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  containerClassName?: string;
  itemClassName?: string;
  adClassName?: string;
}

export default function InfiniteScrollWithAds<T>({
  items,
  renderItem,
  itemsBetweenAds = 6,
  adSlot,
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  adFormat = 'auto',
  containerClassName = '',
  itemClassName = '',
  adClassName = '',
}: InfiniteScrollWithAdsProps<T>) {
  const itemsWithAds: (T | 'ad')[] = [];
  let adCounter = 0;

  items.forEach((item, index) => {
    itemsWithAds.push(item);
    
    // Adiciona ad a cada X itens
    if ((index + 1) % itemsBetweenAds === 0 && index !== items.length - 1) {
      itemsWithAds.push('ad');
    }
  });

  return (
    <div className={containerClassName}>
      {itemsWithAds.map((item, index) => {
        if (item === 'ad') {
          adCounter++;
          return (
            <div key={`ad-${index}`} className={adClassName}>
              <DynamicAd
                slot={adSlot}
                format={adFormat}
                position={adCounter}
                client={adClient}
                infiniteScroll={true}
                className="my-4 md:my-6"
              />
            </div>
          );
        }
        
        return (
          <div key={index} className={itemClassName}>
            {renderItem(item as T, index)}
          </div>
        );
      })}
    </div>
  );
}
