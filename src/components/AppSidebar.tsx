import { Cpu, Lightbulb, TrendingUp, Video, Home, Search, Flame } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  {
    name: 'Início',
    icon: Home,
    href: '/',
  },
  {
    name: 'Tecnologia',
    icon: Cpu,
    href: '/categoria/tecnologia',
  },
  {
    name: 'Inovação',
    icon: Lightbulb,
    href: '/categoria/inovacao',
  },
  {
    name: 'Negócios',
    icon: TrendingUp,
    href: '/categoria/negocios',
  },
  {
    name: 'Vídeos',
    icon: Video,
    href: '/categoria/videos',
  },
];

const trendingArticles = [
  {
    id: 1,
    title: 'IA Generativa Transforma Indústria Tech',
    views: '12.5K',
    category: 'Tecnologia'
  },
  {
    id: 2,
    title: 'Startup Brasileira Levanta R$ 50M',
    views: '8.3K',
    category: 'Negócios'
  },
  {
    id: 3,
    title: 'Nova Descoberta em Computação Quântica',
    views: '7.1K',
    category: 'Inovação'
  },
  {
    id: 4,
    title: 'Tendências Tech para 2025',
    views: '6.8K',
    category: 'Tecnologia'
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Sidebar
      className={isCollapsed ? 'w-16' : 'w-72'}
      collapsible="icon"
    >
      <SidebarContent className="border-r border-border bg-card">
        {/* Search Section */}
        {!isCollapsed && (
          <SidebarHeader className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50 border-border focus:bg-background transition-colors"
              />
            </div>
          </SidebarHeader>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-muted-foreground font-medium px-4 py-2'}>
            Categorias
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                            : 'text-foreground hover:bg-muted hover:text-primary'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Trending Section */}
        {!isCollapsed && (
          <SidebarGroup className="mt-4 border-t border-border pt-4">
            <SidebarGroupLabel className="flex items-center gap-2 text-secondary font-medium px-4 py-2">
              <Flame className="h-4 w-4" />
              Em Alta
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <div className="space-y-1">
                {trendingArticles.map((article, index) => (
                  <NavLink
                    key={article.id}
                    to={`/artigo/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block group p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-bold text-muted-foreground/40 group-hover:text-secondary transition-colors">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2 transition-colors">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {article.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
