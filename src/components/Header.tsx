import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="wide-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile/Desktop menu button - ALWAYS VISIBLE */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="flex-shrink-0 h-10 w-10 min-w-[40px] min-h-[40px]"
              aria-label="Toggle menu"
              style={{ display: 'flex', visibility: 'visible', opacity: 1 }}
            >
              <Menu className="h-6 w-6" style={{ display: 'block' }} />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
