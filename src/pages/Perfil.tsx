import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Settings, Bell, Shield, Bookmark, Clock, Eye, Pencil, Camera, Save, Lock, Palette, Globe, Smartphone, EyeOff, Trash2, Download, Upload, AlertTriangle } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Perfil() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsletterDaily: true,
    newsletterWeekly: true,
    commentReplies: true,
    articleRecommendations: true,
    profileVisibility: 'public',
    showEmail: false,
    showReadingHistory: true,
    allowDataCollection: true,
    fontSize: 'medium',
    articleLayout: 'comfortable',
    autoPlayVideos: false,
    language: 'pt-BR',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configurações salvas!",
        description: `As configurações de ${section} foram atualizadas com sucesso.`,
      });
    }, 1000);
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Upload de foto",
      description: "Funcionalidade de upload de foto em desenvolvimento.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo preparados para download. Você receberá um email em breve.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Atenção",
      description: "Para excluir sua conta, entre em contato com nosso suporte.",
      variant: "destructive",
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
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-5 h-auto gap-2">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Dados</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Salvos</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Histórico</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Preferências</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurações</span>
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
                      <Lock className="h-4 w-4 mr-2" />
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Autenticação em Duas Etapas
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Sessões Ativas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Configurações */}
            <TabsContent value="settings">
              <div className="max-w-3xl mx-auto">
                <Tabs defaultValue="appearance" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="appearance">
                      <Palette className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Aparência</span>
                    </TabsTrigger>
                    <TabsTrigger value="privacy">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Privacidade</span>
                    </TabsTrigger>
                    <TabsTrigger value="security">
                      <Lock className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Segurança</span>
                    </TabsTrigger>
                    <TabsTrigger value="account">
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Conta</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Aparência */}
                  <TabsContent value="appearance">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          Aparência
                        </CardTitle>
                        <CardDescription>
                          Customize a aparência da plataforma
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-base font-medium">Tema</Label>
                          <RadioGroup value={theme} onValueChange={(value: any) => setTheme(value)}>
                            <div className="grid grid-cols-3 gap-3">
                              <div className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}>
                                <RadioGroupItem value="light" id="light" className="sr-only" />
                                <Label htmlFor="light" className="cursor-pointer text-center">
                                  <div className="mb-2 text-2xl">☀️</div>
                                  <p className="font-medium">Claro</p>
                                </Label>
                              </div>
                              <div className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}>
                                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                                <Label htmlFor="dark" className="cursor-pointer text-center">
                                  <div className="mb-2 text-2xl">🌙</div>
                                  <p className="font-medium">Escuro</p>
                                </Label>
                              </div>
                              <div className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}>
                                <RadioGroupItem value="system" id="system" className="sr-only" />
                                <Label htmlFor="system" className="cursor-pointer text-center">
                                  <div className="mb-2 text-2xl">💻</div>
                                  <p className="font-medium">Sistema</p>
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Label htmlFor="fontSize" className="text-base font-medium">Tamanho da Fonte</Label>
                          <Select
                            value={settings.fontSize}
                            onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
                          >
                            <SelectTrigger id="fontSize">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Pequena</SelectItem>
                              <SelectItem value="medium">Média (Padrão)</SelectItem>
                              <SelectItem value="large">Grande</SelectItem>
                              <SelectItem value="xlarge">Muito Grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Label htmlFor="language" className="text-base font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            Idioma
                          </Label>
                          <Select
                            value={settings.language}
                            onValueChange={(value) => setSettings({ ...settings, language: value })}
                          >
                            <SelectTrigger id="language">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="es-ES">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <Button onClick={() => handleSaveSettings('aparência')} disabled={isSaving} className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Privacidade */}
                  <TabsContent value="privacy">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Privacidade
                        </CardTitle>
                        <CardDescription>
                          Controle quem pode ver suas informações
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <Label className="text-base font-medium">Visibilidade do Perfil</Label>
                          <RadioGroup
                            value={settings.profileVisibility}
                            onValueChange={(value) =>
                              setSettings({ ...settings, profileVisibility: value })
                            }
                          >
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                              <RadioGroupItem value="public" id="public" />
                              <Label htmlFor="public" className="flex-1 cursor-pointer">
                                <p className="font-medium">Público</p>
                                <p className="text-sm text-muted-foreground">Qualquer pessoa pode ver seu perfil</p>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                              <RadioGroupItem value="followers" id="followers" />
                              <Label htmlFor="followers" className="flex-1 cursor-pointer">
                                <p className="font-medium">Apenas Seguidores</p>
                                <p className="text-sm text-muted-foreground">Somente quem você segue pode ver</p>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                              <RadioGroupItem value="private" id="private" />
                              <Label htmlFor="private" className="flex-1 cursor-pointer">
                                <p className="font-medium">Privado</p>
                                <p className="text-sm text-muted-foreground">Apenas você pode ver seu perfil</p>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="showEmail" className="text-base font-medium">
                              Mostrar Email no Perfil
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Permitir que outros usuários vejam seu email
                            </p>
                          </div>
                          <Switch
                            id="showEmail"
                            checked={settings.showEmail}
                            onCheckedChange={(checked) =>
                              setSettings({ ...settings, showEmail: checked })
                            }
                          />
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar Meus Dados (LGPD)
                          </Button>
                        </div>

                        <Separator />

                        <Button onClick={() => handleSaveSettings('privacidade')} disabled={isSaving} className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Segurança */}
                  <TabsContent value="security">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          Segurança
                        </CardTitle>
                        <CardDescription>
                          Proteja sua conta
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Senha</h4>
                          
                          <div className="space-y-3">
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Digite sua senha atual"
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="newPassword">Nova Senha</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder="Digite sua nova senha"
                            />
                          </div>

                          <Button variant="outline" className="w-full">
                            Alterar Senha
                          </Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Autenticação em Duas Etapas</h4>
                          
                          <Alert className="border-primary/20 bg-primary/5">
                            <Shield className="h-4 w-4 text-primary" />
                            <AlertDescription className="ml-2">
                              Adicione uma camada extra de segurança
                            </AlertDescription>
                          </Alert>

                          <Button variant="outline" className="w-full">
                            Ativar 2FA
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Conta */}
                  <TabsContent value="account">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Gerenciar Conta
                        </CardTitle>
                        <CardDescription>
                          Opções avançadas de conta
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Dados</h4>
                          
                          <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar Dados (LGPD)
                          </Button>
                          
                          <Button variant="outline" className="w-full justify-start">
                            <Upload className="h-4 w-4 mr-2" />
                            Importar Dados
                          </Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Zona de Perigo</h4>
                          
                          <Alert variant="destructive" className="border-destructive/50">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="ml-2">
                              As ações abaixo são permanentes e não podem ser desfeitas
                            </AlertDescription>
                          </Alert>

                          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive border-destructive/30">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Limpar Histórico
                          </Button>

                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleDeleteAccount}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir Conta Permanentemente
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </RevealOnScroll>
      </div>
    </div>
  );
}
