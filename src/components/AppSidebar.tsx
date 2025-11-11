import { 
  Home, 
  Search, 
  ChevronRight, 
  MoreHorizontal, 
  ChevronLeft, 
  Gamepad2,
  Star,
  FileText,
  Dice5,
  Film,
  Sparkles,
  Cpu,
  Tag,
  ShoppingCart,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import photonLogoUrl from '@/assets/photon-logo.svg';

// Menu items da navegação principal
const menuItems = [
  {
    name: 'Início',
    icon: Home,
    href: '/',
  },
  {
    name: 'PS5',
    icon: Gamepad2,
    href: '/categoria/ps5',
    submenu: true,
  },
  {
    name: 'Xbox Series X/S',
    icon: Gamepad2,
    href: '/categoria/xbox-series-x',
    submenu: true,
  },
  {
    name: 'Switch',
    icon: Gamepad2,
    href: '/categoria/nintendo-switch',
    submenu: true,
  },
  {
    name: 'Reviews',
    icon: FileText,
    href: '/categoria/reviews',
    submenu: true,
  },
  {
    name: 'Tabletop',
    icon: Dice5,
    href: '/categoria/tabletop',
    submenu: true,
  },
  {
    name: 'Cinema & TV',
    icon: Film,
    href: '/categoria/cinema-tv',
    submenu: true,
  },
  {
    name: 'Anime',
    icon: Sparkles,
    href: '/categoria/anime',
    submenu: true,
  },
  {
    name: 'Tech',
    icon: Cpu,
    href: '/categoria/tech',
    submenu: true,
  },
  {
    name: 'Descontos',
    icon: Tag,
    href: '/descontos',
    submenu: true,
  },
  {
    name: 'Vídeos',
    icon: Video,
    href: '/videos',
    submenu: true,
  },
  {
    name: 'Galerias',
    icon: ImageIcon,
    href: '/galerias',
    submenu: true,
  },
];

const moreItems = [
  { name: 'Fale Conosco', href: '/fale-conosco' },
  { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { name: 'Imprensa', href: '/imprensa' },
  { name: 'Termos de Utilização', href: '/termos' },
  { name: 'Privacidade', href: '/privacidade' },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);

  return (
    <Sidebar
      collapsible="icon"
      style={{
        width: isCollapsed ? '80px' : '300px',
      }}
      className="transition-all duration-[450ms] cubic-bezier-[0.34,-0.09,0.45,1.18]"
    >
      <SidebarContent className="border-r border-border/25 bg-white shadow-sm overflow-y-auto overflow-x-hidden">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-9 z-50 w-9 h-9 bg-white border border-border rounded-lg shadow-md hover:bg-muted transition-all duration-200 flex items-center justify-center group ${isCollapsed ? 'right-[-18px]' : 'right-[-18px]'}`}
          title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-foreground group-hover:text-primary transition-transform duration-100" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-foreground group-hover:text-primary transition-transform duration-100" />
          )}
        </button>

        {/* Logo & Header */}
        <SidebarHeader className={`border-b border-border/25 transition-all duration-200 ${isCollapsed ? 'p-4' : 'p-6'}`}>
          <div className={`flex items-center transition-all duration-200 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <img 
              src={photonLogoUrl} 
              alt="Photon Logo" 
              className={`flex-shrink-0 transition-all duration-200 ${isCollapsed ? 'w-10 h-10' : 'w-10 h-10'}`}
            />
            <div className={`flex-1 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
              <h1 className="text-2xl font-black text-primary tracking-tight">PHOTON</h1>
              <p className="text-xs font-bold text-foreground/80 mt-0.5">Brasil</p>
            </div>
          </div>
        </SidebarHeader>

        {/* Navigation Menu */}
        <SidebarGroup className={`py-4 ${isCollapsed ? 'px-2' : 'px-2'}`}>
          <SidebarGroupContent>
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                isCollapsed ? (
                  <TooltipProvider key={item.name} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          className={({ isActive }) =>
                            `flex items-center justify-center p-2.5 rounded-lg transition-colors group relative ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary'
                                : 'text-foreground/70 hover:bg-gray-100 hover:text-primary'
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5 transition-colors" />
                        </NavLink>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold'
                          : 'text-foreground hover:bg-gray-100 hover:text-primary'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                        )}
                        <item.icon className="flex-shrink-0 h-5 w-5" />
                        <span className="flex-1 text-sm font-medium">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                )
              ))}

              {/* Ver Mais */}
              {!isCollapsed && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-foreground hover:bg-gray-100 hover:text-primary w-full"
                >
                  <MoreHorizontal className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium">Ver Mais</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${showMore ? 'rotate-90' : ''}`} />
                </button>
              )}

              {/* Submenu Ver Mais */}
              {!isCollapsed && showMore && (
                <div className="pl-6 flex flex-col gap-1 mt-1">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-foreground hover:bg-gray-100 hover:text-primary text-sm"
                    >
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        {!isCollapsed && (
          <div className="mx-6 border-t border-border/25" />
        )}

        {/* Search Section */}
        {!isCollapsed && (
          <SidebarGroup className="px-6 py-4">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Pesquisar no Photon Brasil"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </form>
          </SidebarGroup>
        )}

        {/* Footer - Brand */}
        {!isCollapsed && (
          <div className="mt-auto p-6 border-t border-border/25 bg-muted/20">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Neutrino" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  O Photon Brasil é um site do grupo{' '}
                  <a href="https://neutrino.dev.br/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Neutrino
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
