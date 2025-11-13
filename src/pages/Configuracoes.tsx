import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Mail, Smartphone, Lock, Eye, EyeOff, Trash2, Download, Upload, Save, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

export default function Configuracoes() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsletterDaily: true,
    newsletterWeekly: true,
    commentReplies: true,
    articleRecommendations: true,
    
    // Privacidade
    profileVisibility: 'public',
    showEmail: false,
    showReadingHistory: true,
    allowDataCollection: true,
    
    // Aparência
    fontSize: 'medium',
    articleLayout: 'comfortable',
    autoPlayVideos: false,
    
    // Idioma e Região
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configurações salvas!",
        description: `As configurações de ${section} foram atualizadas com sucesso.`,
      });
    }, 1000);
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

  return (
    <div className="page-transition">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="wide-container py-16 relative z-10">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm px-4 py-1.5">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Personalização
              </Badge>
              <h1 className="mb-4 text-4xl md:text-5xl font-bold leading-tight">
                Configurações
              </h1>
              <p className="text-xl text-muted-foreground">
                Personalize sua experiência na Photon Media
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-12">
        <RevealOnScroll>
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-5 h-auto gap-2">
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacidade</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Aparência</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Conta</span>
              </TabsTrigger>
            </TabsList>

            {/* Notificações */}
            <TabsContent value="notifications">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Preferências de Notificação
                    </CardTitle>
                    <CardDescription>
                      Escolha como e quando você deseja receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Canais de Comunicação</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="emailNotifications" className="text-base font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            Email
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações por email
                          </p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, emailNotifications: checked })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="pushNotifications" className="text-base font-medium flex items-center gap-2">
                            <Bell className="h-4 w-4 text-primary" />
                            Notificações Push
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações no navegador
                          </p>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, pushNotifications: checked })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="smsNotifications" className="text-base font-medium flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-primary" />
                            SMS
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações por mensagem de texto
                          </p>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, smsNotifications: checked })
                          }
                        />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Conteúdo</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="newsletterDaily" className="text-base font-medium">
                            Newsletter Diária
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Resumo dos melhores artigos do dia
                          </p>
                        </div>
                        <Switch
                          id="newsletterDaily"
                          checked={settings.newsletterDaily}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, newsletterDaily: checked })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="newsletterWeekly" className="text-base font-medium">
                            Newsletter Semanal
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Os destaques da semana todos os domingos
                          </p>
                        </div>
                        <Switch
                          id="newsletterWeekly"
                          checked={settings.newsletterWeekly}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, newsletterWeekly: checked })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="commentReplies" className="text-base font-medium">
                            Respostas a Comentários
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Quando alguém responder seus comentários
                          </p>
                        </div>
                        <Switch
                          id="commentReplies"
                          checked={settings.commentReplies}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, commentReplies: checked })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="articleRecommendations" className="text-base font-medium">
                            Recomendações Personalizadas
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Artigos selecionados com base nos seus interesses
                          </p>
                        </div>
                        <Switch
                          id="articleRecommendations"
                          checked={settings.articleRecommendations}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, articleRecommendations: checked })
                          }
                        />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <Button onClick={() => handleSave('notificações')} disabled={isSaving} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar Preferências'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacidade */}
            <TabsContent value="privacy">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Privacidade e Dados
                    </CardTitle>
                    <CardDescription>
                      Controle quem pode ver suas informações e atividades
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

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="showReadingHistory" className="text-base font-medium">
                          Histórico de Leitura Público
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Outros podem ver os artigos que você leu
                        </p>
                      </div>
                      <Switch
                        id="showReadingHistory"
                        checked={settings.showReadingHistory}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showReadingHistory: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="allowDataCollection" className="text-base font-medium">
                          Análise e Melhorias
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Ajude-nos a melhorar com dados anônimos de uso
                        </p>
                      </div>
                      <Switch
                        id="allowDataCollection"
                        checked={settings.allowDataCollection}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, allowDataCollection: checked })
                        }
                      />
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar Meus Dados
                      </Button>
                      <p className="text-xs text-muted-foreground px-1">
                        Baixe uma cópia de todos os seus dados (LGPD)
                      </p>
                    </div>

                    <Separator className="my-6" />

                    <Button onClick={() => handleSave('privacidade')} disabled={isSaving} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aparência */}
            <TabsContent value="appearance">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Aparência e Personalização
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
                      <Label htmlFor="articleLayout" className="text-base font-medium">Layout de Artigos</Label>
                      <Select
                        value={settings.articleLayout}
                        onValueChange={(value) => setSettings({ ...settings, articleLayout: value })}
                      >
                        <SelectTrigger id="articleLayout">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compacto</SelectItem>
                          <SelectItem value="comfortable">Confortável (Padrão)</SelectItem>
                          <SelectItem value="spacious">Espaçoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoPlayVideos" className="text-base font-medium">
                          Reprodução Automática de Vídeos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Vídeos começam automaticamente sem som
                        </p>
                      </div>
                      <Switch
                        id="autoPlayVideos"
                        checked={settings.autoPlayVideos}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, autoPlayVideos: checked })
                        }
                      />
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

                    <Separator className="my-6" />

                    <Button onClick={() => handleSave('aparência')} disabled={isSaving} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Salvando...' : 'Salvar Preferências'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Segurança */}
            <TabsContent value="security">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Segurança da Conta
                    </CardTitle>
                    <CardDescription>
                      Proteja sua conta e gerencie o acesso
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

                      <div className="space-y-3">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme sua nova senha"
                        />
                      </div>

                      <Button variant="outline" className="w-full">
                        Alterar Senha
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Autenticação em Duas Etapas (2FA)</h4>
                      
                      <Alert className="border-primary/20 bg-primary/5">
                        <Shield className="h-4 w-4 text-primary" />
                        <AlertDescription className="ml-2">
                          Adicione uma camada extra de segurança à sua conta
                        </AlertDescription>
                      </Alert>

                      <Button variant="outline" className="w-full">
                        Ativar Autenticação em Duas Etapas
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Sessões Ativas</h4>
                      
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">Windows - Chrome</p>
                              <p className="text-sm text-muted-foreground">São Paulo, Brasil</p>
                            </div>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                              Atual
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Última atividade: Agora</p>
                        </div>

                        <div className="p-4 rounded-lg border border-border/50">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">iPhone - Safari</p>
                              <p className="text-sm text-muted-foreground">São Paulo, Brasil</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              Encerrar
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Última atividade: há 2 horas</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                        Encerrar Todas as Outras Sessões
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Conta */}
            <TabsContent value="account">
              <div className="max-w-3xl mx-auto space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Gerenciar Conta
                    </CardTitle>
                    <CardDescription>
                      Opções avançadas de conta e dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Exportar Dados</h4>
                      
                      <Alert className="border-primary/20 bg-primary/5">
                        <Download className="h-4 w-4 text-primary" />
                        <AlertDescription className="ml-2">
                          De acordo com a LGPD, você pode solicitar uma cópia de todos os seus dados
                        </AlertDescription>
                      </Alert>

                      <Button variant="outline" className="w-full" onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Solicitar Exportação de Dados
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Importar Dados</h4>
                      
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Importar Favoritos e Preferências
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Zona de Perigo</h4>
                      
                      <Alert variant="destructive" className="border-destructive/50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="ml-2">
                          <strong>Atenção:</strong> As ações abaixo são permanentes e não podem ser desfeitas
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive border-destructive/30">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Limpar Todo Histórico de Leitura
                        </Button>

                        <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive border-destructive/30">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover Todos os Artigos Salvos
                        </Button>

                        <Separator />

                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleDeleteAccount}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir Minha Conta Permanentemente
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          Esta ação excluirá permanentemente sua conta e todos os dados associados
                        </p>
                      </div>
                    </div>
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
