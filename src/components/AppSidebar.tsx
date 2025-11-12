import { 
  Home, 
  Search, 
  ChevronRight, 
  MoreHorizontal, 
  ChevronLeft, 
  Gamepad2,
  FileText,
  Dice5,
  Film,
  Sparkles,
  Cpu,
  Tag,
  Video,
  Image as ImageIcon,
  TrendingUp,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import photonLogoUrl from '@/assets/photon-logo.svg';

// Menu items da navegação principal
const menuItems = [
  { name: 'Início', icon: Home, href: '/' },
  { name: 'Trending', icon: TrendingUp, href: '/trending', badge: '🔥' },
  { name: 'PS5', icon: Gamepad2, href: '/categoria/ps5', badge: 'NEW' },
  { name: 'Xbox Series X/S', icon: Gamepad2, href: '/categoria/xbox-series-x' },
  { name: 'Switch', icon: Gamepad2, href: '/categoria/nintendo-switch' },
  { name: 'Reviews', icon: FileText, href: '/categoria/reviews', badge: '24' },
  { name: 'Tabletop', icon: Dice5, href: '/categoria/tabletop' },
  { name: 'Cinema & TV', icon: Film, href: '/categoria/cinema-tv' },
  { name: 'Anime', icon: Sparkles, href: '/categoria/anime' },
  { name: 'Tech', icon: Cpu, href: '/categoria/tech' },
  { name: 'Descontos', icon: Tag, href: '/descontos', badge: '70%' },
  { name: 'Vídeos', icon: Video, href: '/videos' },
  { name: 'Galerias', icon: ImageIcon, href: '/galerias' },
];

const moreItems = [
  { name: 'Fale Conosco', href: '/fale-conosco' },
  { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { name: 'Imprensa', href: '/imprensa' },
  { name: 'Termos de Utilização', href: '/termos' },
  { name: 'Privacidade', href: '/privacidade' },
];

export function AppSidebar() {
  const { state, toggleSidebar, setOpen } = useSidebar();
  const { theme, setTheme } = useTheme();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar o estado salvo da sidebar apenas na primeira montagem
  useEffect(() => {
    if (!isInitialized) {
      const savedState = localStorage.getItem('sidebar-state');
      if (savedState) {
        const shouldBeOpen = savedState === 'expanded';
        setOpen(shouldBeOpen);
      }
      setIsInitialized(true);
    }
  }, [isInitialized, setOpen]);

  // Salvar o estado da sidebar sempre que mudar (após inicialização)
  useEffect(() => {
    if (isInitialized) {
      const stateToSave = isCollapsed ? 'collapsed' : 'expanded';
      localStorage.setItem('sidebar-state', stateToSave);
    }
  }, [isCollapsed, isInitialized]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-[450ms] cubic-bezier-[0.34,-0.09,0.45,1.18]"
    >
      <SidebarContent className="border-r border-border/25 bg-white dark:bg-gray-900 shadow-sm overflow-y-auto overflow-x-hidden sidebar-scroll">
        {/* Toggle Button */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                className="absolute top-9 z-50 w-9 h-9 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-md hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200 flex items-center justify-center group right-[-18px]"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-foreground group-hover:text-primary transition-all duration-200 group-hover:scale-110" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-foreground group-hover:text-primary transition-all duration-200 group-hover:scale-110" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="whitespace-nowrap">
              <p>{isCollapsed ? 'Expandir' : 'Colapsar'} menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Logo & Header */}
        <SidebarHeader className={`border-b border-border/25 transition-all duration-200 ${isCollapsed ? 'p-4' : 'p-6'}`}>
          <div className={`flex items-center transition-all duration-200 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <img 
                      src={photonLogoUrl} 
                      alt="Photon Logo" 
                      className="flex-shrink-0 transition-all duration-200 group-hover:scale-110 w-10 h-10"
                    />
                    {isCollapsed && (
                      <div className="absolute -inset-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-sm" />
                    )}
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-bold whitespace-nowrap">
                    <p className="text-lg">PHOTON</p>
                    <p className="text-xs text-muted-foreground">Brasil</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
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
                <TooltipProvider key={item.name} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {isCollapsed ? (
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                        >
                          {({ isActive }) => (
                            <button
                            className={`flex items-center justify-center p-2.5 rounded-lg transition-colors group relative w-full ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary'
                                : 'text-foreground/70 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                            }`}
                            >
                              <item.icon className="h-5 w-5 transition-colors" />
                              {isActive && (
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                              )}
                              {item.badge && (
                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
                              )}
                            </button>
                          )}
                        </NavLink>
                      ) : (
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          className={({ isActive }) =>
                            `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold'
                                : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-lg shadow-primary/50" />
                              )}
                              <item.icon className="flex-shrink-0 h-5 w-5" />
                              <span className="flex-1 text-sm font-medium">{item.name}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5 bg-primary/10 text-primary border-primary/20">
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </NavLink>
                      )}
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="whitespace-nowrap">
                        <p>{item.name} {item.badge && <span className="text-xs text-muted-foreground ml-1">{item.badge}</span>}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Ver Mais */}
              {!isCollapsed && (
                <>
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary w-full"
                  >
                    <MoreHorizontal className="h-5 w-5 flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium">Ver Mais</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${showMore ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Submenu Ver Mais */}
                  {showMore && (
                    <div className="pl-6 flex flex-col gap-1 mt-1">
                      {moreItems.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary text-sm"
                        >
                          <span>{item.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
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
          <SidebarGroup className="px-3 py-3">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/30 border-border/50 rounded-lg focus:ring-2 focus:ring-primary/20 transition-all text-sm h-9"
              />
            </form>
          </SidebarGroup>
        )}

        {/* Quick Actions */}
        {!isCollapsed ? (
          <SidebarGroup className="px-2 pb-3">
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground mb-2">
              Ações Rápidas
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex gap-2 px-1">
                <button className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                  <Bell className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-medium text-foreground/70 group-hover:text-primary transition-colors">Notificações</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                  <Settings className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-medium text-foreground/70 group-hover:text-primary transition-colors">Config</span>
                </button>
                <button onClick={toggleTheme} className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors" />
                  ) : (
                    <Moon className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors" />
                  )}
                  <span className="text-[10px] font-medium text-foreground/70 group-hover:text-primary transition-colors">Tema</span>
                </button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup className="px-2 pb-3">
            <SidebarGroupContent>
              <div className="flex flex-col gap-1">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative">
                        <Bell className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-white shadow-sm" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="whitespace-nowrap">
                      <p>Notificações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                        <Settings className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="whitespace-nowrap">
                      <p>Configurações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={toggleTheme} className="flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                        {theme === 'dark' ? (
                          <Sun className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                        ) : (
                          <Moon className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="whitespace-nowrap">
                      <p>{theme === 'dark' ? 'Modo claro' : 'Modo escuro'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="border-t border-border/25 bg-muted/10">
        {!isCollapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all group">
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">PH</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Photon User</p>
                  <p className="text-xs text-muted-foreground">user@photon.com</p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" side="top">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notificações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all group relative">
                      <Avatar className="h-9 w-9 ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">PH</AvatarFallback>
                      </Avatar>
                      <div className="absolute -inset-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56" side="right">
                    <DropdownMenuLabel>
                      <div>
                        <p className="font-semibold">Photon User</p>
                        <p className="text-xs text-muted-foreground font-normal">user@photon.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notificações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right" className="whitespace-nowrap">
                <p className="font-semibold">Photon User</p>
                <p className="text-xs text-muted-foreground">Clique para opções</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
