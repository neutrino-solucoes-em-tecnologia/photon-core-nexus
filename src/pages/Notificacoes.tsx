import { useState } from "react";
import { Bell, Check, X, Settings, Trash2, CheckCheck, Filter, MessageCircle, Heart, UserPlus, Newspaper, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Notification {
  id: string;
  type: "comment" | "like" | "follow" | "article" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  link?: string;
  user?: string;
}

export default function Notificacoes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("todas");
  const [filterType, setFilterType] = useState<string>("all");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "comment",
      title: "Novo comentário",
      message: "comentou no artigo 'O Futuro da IA'",
      time: "há 5 minutos",
      read: false,
      avatar: "AS",
      user: "Ana Silva",
      link: "/artigo/futuro-ia",
    },
    {
      id: "2",
      type: "like",
      title: "Curtida no artigo",
      message: "curtiu seu comentário em 'TypeScript Avançado'",
      time: "há 15 minutos",
      read: false,
      avatar: "CS",
      user: "Carlos Santos",
    },
    {
      id: "3",
      type: "follow",
      title: "Novo seguidor",
      message: "começou a seguir você",
      time: "há 1 hora",
      read: false,
      avatar: "MC",
      user: "Mariana Costa",
    },
    {
      id: "4",
      type: "article",
      title: "Artigo recomendado",
      message: "Novo artigo de Tecnologia: 'Blockchain em 2025'",
      time: "há 2 horas",
      read: true,
      link: "/artigo/blockchain-2025",
    },
    {
      id: "5",
      type: "comment",
      title: "Resposta ao comentário",
      message: "respondeu seu comentário em 'Machine Learning Básico'",
      time: "há 3 horas",
      read: true,
      avatar: "PO",
      user: "Pedro Oliveira",
      link: "/artigo/machine-learning-basico",
    },
    {
      id: "6",
      type: "system",
      title: "Atualização de privacidade",
      message: "Atualizamos nossa política de privacidade. Confira as mudanças.",
      time: "há 5 horas",
      read: true,
      link: "/privacidade",
    },
    {
      id: "7",
      type: "like",
      title: "Artigo em destaque",
      message: "Seu artigo salvo 'React Hooks' alcançou 100 curtidas",
      time: "há 1 dia",
      read: true,
    },
    {
      id: "8",
      type: "article",
      title: "Sugestão personalizada",
      message: "Com base no seu histórico: 'TypeScript Performance'",
      time: "há 1 dia",
      read: true,
      link: "/artigo/typescript-performance",
    },
    {
      id: "9",
      type: "follow",
      title: "Novo seguidor",
      message: "começou a seguir você",
      time: "há 2 dias",
      read: true,
      avatar: "JS",
      user: "João Silva",
    },
    {
      id: "10",
      type: "system",
      title: "Manutenção programada",
      message: "Haverá manutenção no sistema em 15/11 das 2h às 4h",
      time: "há 3 dias",
      read: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return MessageCircle;
      case "like":
        return Heart;
      case "follow":
        return UserPlus;
      case "article":
        return Newspaper;
      case "system":
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getNotificationGradient = (type: string) => {
    switch (type) {
      case "comment":
        return "from-blue-500 to-cyan-500";
      case "like":
        return "from-pink-500 to-rose-500";
      case "follow":
        return "from-purple-500 to-indigo-500";
      case "article":
        return "from-green-500 to-emerald-500";
      case "system":
        return "from-orange-500 to-amber-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "comment":
        return "Comentário";
      case "like":
        return "Curtida";
      case "follow":
        return "Seguidor";
      case "article":
        return "Artigo";
      case "system":
        return "Sistema";
      default:
        return type;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "nao-lidas" && notification.read) return false;
    if (activeTab === "lidas" && !notification.read) return false;
    if (filterType !== "all" && notification.type !== filterType) return false;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast({
      title: "✓ Marcada como lida",
      description: "Notificação marcada como lida com sucesso.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast({
      title: "✓ Todas marcadas como lidas",
      description: `${unreadCount} notificações foram marcadas como lidas.`,
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast({
      title: "✓ Notificação excluída",
      description: "A notificação foi removida com sucesso.",
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "✓ Notificações limpas",
      description: "Todas as notificações foram removidas.",
    });
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const Icon = getNotificationIcon(notification.type);
    
    return (
      <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg border ${
        !notification.read
          ? "bg-gradient-to-br from-primary/5 via-background to-background border-primary/30 shadow-sm"
          : "hover:border-primary/20"
      }`}>
        {/* Subtle gradient overlay for unread */}
        {!notification.read && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        )}
        
        {/* Unread indicator dot */}
        {!notification.read && (
          <div className="absolute top-4 left-4 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
        )}

        <div className="relative p-5 flex items-start gap-4">
          {/* Icon/Avatar */}
          <div className="flex-shrink-0">
            {notification.avatar ? (
              <Avatar className="h-12 w-12 ring-2 ring-background shadow-md">
                <AvatarFallback className={`bg-gradient-to-br ${getNotificationGradient(notification.type)} text-white font-semibold text-sm`}>
                  {notification.avatar}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getNotificationGradient(notification.type)} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {notification.user && (
                  <p className="font-bold text-foreground mb-0.5">
                    {notification.user}
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
              </div>
              <Badge variant="outline" className="flex-shrink-0 font-medium">
                {getTypeLabel(notification.type)}
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                {notification.time}
              </span>
              {notification.link && (
                <>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <NavLink
                    to={notification.link}
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                  >
                    Ver detalhes →
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => markAsRead(notification.id)}
                className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                title="Marcar como lida"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNotification(notification.id)}
              className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
              title="Excluir notificação"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="container relative mx-auto px-4 py-20">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 mb-6 shadow-2xl">
                <Bell className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
                Central de Notificações
              </h1>
              <p className="text-xl text-white/90 mb-8 font-medium">
                Acompanhe todas as suas interações e atualizações em um só lugar
              </p>

              {/* Stats Cards */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 min-w-[140px]">
                  <div className="text-4xl font-black mb-1">{unreadCount}</div>
                  <div className="text-sm text-white/80 font-medium">Não lidas</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/20" />
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 min-w-[140px]">
                  <div className="text-4xl font-black mb-1">{notifications.length}</div>
                  <div className="text-sm text-white/80 font-medium">Total</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/20" />
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 min-w-[140px]">
                  <div className="text-4xl font-black mb-1">{notifications.length - unreadCount}</div>
                  <div className="text-sm text-white/80 font-medium">Lidas</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Action Bar */}
          <RevealOnScroll delay={0.1}>
            <Card className="p-4 mb-6 shadow-lg border-border/50">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    variant="default"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Marcar todas como lidas
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="shadow-sm">
                        <Filter className="w-4 h-4 mr-2" />
                        {filterType === "all" ? "Filtrar" : getTypeLabel(filterType)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuItem onClick={() => setFilterType("all")}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Todas as notificações
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("comment")}>
                        <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                        Comentários
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("like")}>
                        <Heart className="mr-2 h-4 w-4 text-pink-500" />
                        Curtidas
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("follow")}>
                        <UserPlus className="mr-2 h-4 w-4 text-purple-500" />
                        Seguidores
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("article")}>
                        <Newspaper className="mr-2 h-4 w-4 text-green-500" />
                        Artigos
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("system")}>
                        <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                        Sistema
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-3">
                  <NavLink to="/configuracoes">
                    <Button variant="outline" size="icon" className="shadow-sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </NavLink>
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    disabled={notifications.length === 0}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive shadow-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar tudo
                  </Button>
                </div>
              </div>
            </Card>
          </RevealOnScroll>

          {/* Tabs */}
          <RevealOnScroll delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50 backdrop-blur-sm shadow-sm">
                <TabsTrigger value="todas" className="data-[state=active]:shadow-md">
                  Todas
                  <Badge variant="secondary" className="ml-2 px-1.5 min-w-[24px] justify-center">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="nao-lidas" className="data-[state=active]:shadow-md">
                  Não lidas
                  {unreadCount > 0 && (
                    <Badge className="ml-2 px-1.5 min-w-[24px] justify-center bg-primary">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="lidas" className="data-[state=active]:shadow-md">
                  Lidas
                  <Badge variant="secondary" className="ml-2 px-1.5 min-w-[24px] justify-center">
                    {notifications.length - unreadCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todas" className="space-y-4 mt-6">
                {filteredNotifications.length === 0 ? (
                  <Card className="p-12 text-center border-dashed">
                    <Bell className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma notificação</h3>
                    <p className="text-muted-foreground">
                      {filterType !== "all" 
                        ? `Você não tem notificações do tipo "${getTypeLabel(filterType)}".`
                        : "Você está em dia! Não há notificações no momento."
                      }
                    </p>
                  </Card>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <RevealOnScroll key={notification.id} delay={0.05 * index}>
                      <NotificationCard notification={notification} />
                    </RevealOnScroll>
                  ))
                )}
              </TabsContent>

              <TabsContent value="nao-lidas" className="space-y-4 mt-6">
                {filteredNotifications.length === 0 ? (
                  <Card className="p-12 text-center border-dashed bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 mb-4">
                      <CheckCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Tudo em dia! 🎉</h3>
                    <p className="text-muted-foreground">
                      Você não tem notificações não lidas.
                    </p>
                  </Card>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <RevealOnScroll key={notification.id} delay={0.05 * index}>
                      <NotificationCard notification={notification} />
                    </RevealOnScroll>
                  ))
                )}
              </TabsContent>

              <TabsContent value="lidas" className="space-y-4 mt-6">
                {filteredNotifications.length === 0 ? (
                  <Card className="p-12 text-center border-dashed">
                    <Bell className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma notificação lida</h3>
                    <p className="text-muted-foreground">
                      Notificações marcadas como lidas aparecerão aqui.
                    </p>
                  </Card>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <RevealOnScroll key={notification.id} delay={0.05 * index}>
                      <NotificationCard notification={notification} />
                    </RevealOnScroll>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
