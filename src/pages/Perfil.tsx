import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Settings, Bell, Shield, Bookmark, Clock, Eye, Pencil, Camera, Save, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Perfil() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 98765-4321',
    bio: 'Apaixonado por tecnologia, inovação e conteúdo de qualidade. Leitor assíduo da Photon Media há 2 anos.',
    location: 'São Paulo, SP',
    birthDate: '1990-05-15',
    website: 'https://joaosilva.com.br',
    avatar: '',
  });

  const [preferences, setPreferences] = useState({
    newsletter: true,
    pushNotifications: true,
    emailArticles: true,
    emailComments: false,
    emailDigest: true,
    darkMode: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Upload de foto",
      description: "Funcionalidade de upload de foto em desenvolvimento.",
    });
  };

  const savedArticles = [
    {
      id: 1,
      title: 'O Futuro da Inteligência Artificial no Brasil',
      category: 'Tecnologia',
      date: '2 dias atrás',
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'Startups Brasileiras que Estão Mudando o Mercado',
      category: 'Negócios',
      date: '1 semana atrás',
      readTime: '8 min',
    },
    {
      id: 3,
      title: 'Inovações em Energia Renovável',
      category: 'Inovação',
      date: '2 semanas atrás',
      readTime: '6 min',
    },
  ];

  const readingHistory = [
    {
      id: 1,
      title: 'Como a IA Está Transformando a Educação',
      category: 'Tecnologia',
      date: 'Hoje às 14:30',
      progress: 100,
    },
    {
      id: 2,
      title: 'Tendências de Marketing Digital para 2025',
      category: 'Negócios',
      date: 'Ontem às 09:15',
      progress: 75,
    },
    {
      id: 3,
      title: 'Blockchain Além das Criptomoedas',
      category: 'Inovação',
      date: 'Há 2 dias',
      progress: 50,
    },
  ];

  const stats = [
    { icon: Eye, label: 'Artigos Lidos', value: '247' },
    { icon: Bookmark, label: 'Artigos Salvos', value: '32' },
    { icon: Clock, label: 'Tempo de Leitura', value: '42h' },
    { icon: Calendar, label: 'Membro desde', value: '2023' },
  ];

  return (
    <div className="page-transition">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="wide-container py-12 relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleAvatarUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{userData.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {userData.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Membro desde 2023
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="group">
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-12">
        {/* Stats */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RevealOnScroll>

        {/* Main Content - Tabs */}
        <RevealOnScroll>
          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-auto">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Informações</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Preferências</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Salvos</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Histórico</span>
              </TabsTrigger>
            </TabsList>

            {/* Informações Pessoais */}
            <TabsContent value="info">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Dados Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={userData.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Informações Adicionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        value={userData.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={userData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={userData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferências */}
            <TabsContent value="preferences">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notificações
                    </CardTitle>
                    <CardDescription>
                      Gerencie como e quando você recebe notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="newsletter" className="text-base font-medium">
                          Newsletter Semanal
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receba nossa newsletter com os melhores artigos da semana
                        </p>
                      </div>
                      <Switch
                        id="newsletter"
                        checked={preferences.newsletter}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, newsletter: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="pushNotifications" className="text-base font-medium">
                          Notificações Push
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre novos artigos e atualizações
                        </p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, pushNotifications: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailArticles" className="text-base font-medium">
                          Novos Artigos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Email quando novos artigos forem publicados
                        </p>
                      </div>
                      <Switch
                        id="emailArticles"
                        checked={preferences.emailArticles}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, emailArticles: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailComments" className="text-base font-medium">
                          Respostas a Comentários
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Email quando alguém responder seus comentários
                        </p>
                      </div>
                      <Switch
                        id="emailComments"
                        checked={preferences.emailComments}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, emailComments: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailDigest" className="text-base font-medium">
                          Resumo Diário
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Email diário com resumo de atividades e artigos
                        </p>
                      </div>
                      <Switch
                        id="emailDigest"
                        checked={preferences.emailDigest}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, emailDigest: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacidade e Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Autenticação em Duas Etapas
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Sessões Ativas
                    </Button>
                    <Separator />
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair de Todas as Sessões
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Artigos Salvos */}
            <TabsContent value="saved">
              <div className="max-w-3xl mx-auto space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bookmark className="h-5 w-5 text-primary" />
                      Artigos Salvos ({savedArticles.length})
                    </CardTitle>
                    <CardDescription>
                      Seus artigos favoritos para ler mais tarde
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {savedArticles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-start justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 hover:bg-accent/5 transition-all cursor-pointer group"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Bookmark className="h-4 w-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Histórico de Leitura */}
            <TabsContent value="history">
              <div className="max-w-3xl mx-auto space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Histórico de Leitura
                    </CardTitle>
                    <CardDescription>
                      Artigos que você leu recentemente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {readingHistory.map((article) => (
                      <div
                        key={article.id}
                        className="p-4 rounded-lg border border-border/50 hover:border-primary/20 hover:bg-accent/5 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Badge variant="secondary">{article.category}</Badge>
                              <span>{article.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progresso de leitura</span>
                            <span className="font-medium text-primary">{article.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-full transition-all duration-300"
                              style={{ width: `${article.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </RevealOnScroll>
      </div>
    </div>
  );
}
