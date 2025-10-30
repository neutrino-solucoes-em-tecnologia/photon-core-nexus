import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedNumber({ 
  value, 
  suffix = '', 
  prefix = '',
  className = ''
}: AnimatedNumberProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 });
  const count = useCounterAnimation(value, 2000, 0, isVisible);

  return (
    <div ref={ref} className={className}>
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </div>
  );
}
