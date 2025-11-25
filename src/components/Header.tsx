import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, Settings, LogOut, Bookmark, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Tecnologia', href: '/categoria/tecnologia' },
  { name: 'Negócios', href: '/categoria/negocios' },
  { name: 'Inovação', href: '/categoria/inovacao' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Imprensa', href: '/imprensa' },
  { name: 'Fale Conosco', href: '/fale-conosco' },
  { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="wide-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Sidebar trigger - visible on all screen sizes */}
            <SidebarTrigger className="flex-shrink-0" />
            
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
