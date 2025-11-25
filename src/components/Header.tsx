import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="wide-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile/Desktop menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="flex-shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex-shrink-0">
                <span className="text-lg md:text-xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight hidden sm:inline-block">
                Photon <span className="text-primary">Media</span>
              </span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
