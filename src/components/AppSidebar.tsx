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
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/use-categories';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { features } from '@/lib/features';
import photonLogoUrl from '@/assets/photon-logo.svg';

// Menu items da navegação principal (fixos)
const baseMenuItems = [
  { name: 'Início', icon: Home, href: '/', badge: undefined },
];

// Menu items condicionais baseados em feature flags
const conditionalMenuItems = [
  { 
    name: features.trending.menuLabel, 
    icon: TrendingUp, 
    href: features.trending.route, 
    badge: '🔥' as string | undefined,
    enabled: features.trending.enabled,
  },
  { 
    name: features.descontos.menuLabel, 
    icon: Tag, 
    href: features.descontos.route, 
    badge: '70%' as string | undefined,
    enabled: features.descontos.enabled,
  },
];

// Combina items fixos + condicionais (filtra desabilitados)
const fixedMenuItems = [
  ...baseMenuItems,
  ...conditionalMenuItems.filter(item => item.enabled).map(({ enabled, ...item }) => item),
];

const additionalMenuItems: typeof fixedMenuItems = [];

// More items condicionais baseados em feature flags
const baseMoreItems = [
  { name: 'Termos de Utilização', href: '/termos', enabled: true },
  { name: 'Privacidade', href: '/privacidade', enabled: true },
];

const conditionalMoreItems = [
  { name: features.faleConosco.menuLabel, href: features.faleConosco.route, enabled: features.faleConosco.enabled },
  { name: features.trabalheConosco.menuLabel, href: features.trabalheConosco.route, enabled: features.trabalheConosco.enabled },
  { name: features.imprensa.menuLabel, href: features.imprensa.route, enabled: features.imprensa.enabled },
];

// Combina more items fixos + condicionais (filtra desabilitados)
const moreItems = [
  ...conditionalMoreItems.filter(item => item.enabled),
  ...baseMoreItems,
];

export function AppSidebar() {
  const { state, toggleSidebar, setOpen, isMobile, setOpenMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Skeleton items para quando está carregando
  const skeletonItems = Array(5).fill(null);

  // Função para fechar sidebar no mobile ao clicar em um link
  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

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
              {/* Fixed menu items sempre visíveis */}
              {fixedMenuItems.map((item) => (
                <TooltipProvider key={item.name} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {isCollapsed ? (
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          onClick={handleLinkClick}
                        >
                          {({ isActive }) => (
                            <button
                            className={`flex items-center justify-center p-2.5 rounded-lg transition-colors group relative w-full ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary'
                                : 'text-foreground/70 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                            }`}
                            >
                              {item.icon && <item.icon className="h-5 w-5 transition-colors" />}
                              {isActive && (
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                              )}
                              {'badge' in item && item.badge && (
                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
                              )}
                            </button>
                          )}
                        </NavLink>
                      ) : (
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          onClick={handleLinkClick}
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
                              {item.icon && <item.icon className="flex-shrink-0 h-5 w-5" />}
                              <span className="flex-1 text-sm font-medium">{item.name}</span>
                              {'badge' in item && item.badge && (
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
                        <p>{item.name} {'badge' in item && item.badge && <span className="text-xs text-muted-foreground ml-1">{item.badge}</span>}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Categories from API with loading state */}
              {categoriesLoading ? (
                // Skeleton loading state
                skeletonItems.map((_, index) => (
                  <div key={`skeleton-${index}`}>
                    {isCollapsed ? (
                      <div className="flex items-center justify-center p-2.5 rounded-lg">
                        <Skeleton className="h-5 w-5 rounded-md" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <Skeleton className="h-4 w-full max-w-[120px] rounded-md" />
                        <Skeleton className="h-5 w-8 rounded-md ml-auto" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Actual categories
                categories?.map((category) => (
                  <TooltipProvider key={category.slug} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {isCollapsed ? (
                          <NavLink
                            to={`/categoria/${category.slug}`}
                            onClick={handleLinkClick}
                          >
                            {({ isActive }) => (
                              <button
                                className={`flex items-center justify-center p-2.5 rounded-lg transition-colors group relative w-full ${
                                  isActive
                                    ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary'
                                    : 'text-foreground/70 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                                }`}
                              >
                                <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-foreground/70">
                                  {category.name.charAt(0)}
                                </div>
                                {isActive && (
                                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                                )}
                                {category.articles_count && (
                                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
                                )}
                              </button>
                            )}
                          </NavLink>
                        ) : (
                          <NavLink
                            to={`/categoria/${category.slug}`}
                            onClick={handleLinkClick}
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
                                <span className="flex-1 text-sm font-medium">{category.name}</span>
                                {category.articles_count && (
                                  <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5 bg-primary/10 text-primary border-primary/20">
                                    {category.articles_count}
                                  </Badge>
                                )}
                              </>
                            )}
                          </NavLink>
                        )}
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="whitespace-nowrap">
                          <p>{category.name} {category.articles_count && <span className="text-xs text-muted-foreground ml-1">{category.articles_count}</span>}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))
              )}

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
                          onClick={handleLinkClick}
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
                      <button onClick={toggleTheme} className="w-full flex items-center justify-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
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


    </Sidebar>
  );
}
