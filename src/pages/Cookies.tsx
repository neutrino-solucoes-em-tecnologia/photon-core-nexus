import { Cookie, Settings, Eye, BarChart, Target, Shield, CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useToast } from '@/hooks/use-toast';

export default function Cookies() {
  const { toast } = useToast();
  const lastUpdate = "13 de Novembro de 2024";

  const [cookieSettings, setCookieSettings] = useState({
    essenciais: true, // Sempre ativado
    desempenho: true,
    funcionalidade: true,
    publicidade: false,
  });

  const handleSavePreferences = () => {
    // Salvar preferências (simulado)
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings));
    
    toast({
      title: "Preferências salvas!",
      description: "Suas configurações de cookies foram atualizadas com sucesso.",
    });
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      essenciais: true,
      desempenho: true,
      funcionalidade: true,
      publicidade: true,
    });
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essenciais: true,
      desempenho: true,
      funcionalidade: true,
      publicidade: true,
    }));
    
    toast({
      title: "Todos os cookies aceitos",
      description: "Você aceitou todos os tipos de cookies.",
    });
  };

  const handleRejectOptional = () => {
    setCookieSettings({
      essenciais: true,
      desempenho: false,
      funcionalidade: false,
      publicidade: false,
    });
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essenciais: true,
      desempenho: false,
      funcionalidade: false,
      publicidade: false,
    }));
    
    toast({
      title: "Cookies opcionais rejeitados",
      description: "Apenas cookies essenciais estão ativos.",
    });
  };

  const cookieTypes = [
    {
      id: 'essenciais',
      icon: Shield,
      title: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site',
      required: true,
      examples: [
        'Cookie de sessão do usuário',
        'Cookie de segurança CSRF',
        'Cookie de preferência de idioma',
        'Cookie de estado de autenticação'
      ],
      duration: 'Sessão ou até 1 ano',
      canDisable: false
    },
    {
      id: 'desempenho',
      icon: BarChart,
      title: 'Cookies de Desempenho',
      description: 'Coletam informações sobre como você usa o site',
      required: false,
      examples: [
        'Google Analytics (_ga, _gid)',
        'Métricas de velocidade de página',
        'Rastreamento de erros',
        'Dados de uso agregados'
      ],
      duration: 'Até 2 anos',
      canDisable: true
    },
    {
      id: 'funcionalidade',
      icon: Settings,
      title: 'Cookies de Funcionalidade',
      description: 'Lembram suas escolhas e preferências',
      required: false,
      examples: [
        'Tema escuro/claro',
        'Tamanho de fonte preferido',
        'Preferências de layout',
        'Idioma selecionado'
      ],
      duration: 'Até 1 ano',
      canDisable: true
    },
    {
      id: 'publicidade',
      icon: Target,
      title: 'Cookies de Publicidade',
      description: 'Usados para mostrar anúncios relevantes',
      required: false,
      examples: [
        'Google Ads',
        'Facebook Pixel',
        'Cookies de retargeting',
        'Medição de conversão'
      ],
      duration: 'Até 1 ano',
      canDisable: true
    }
  ];

  const sections = [
    {
      id: 1,
      icon: Cookie,
      title: '1. O que são Cookies?',
      content: `Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles ajudam o site a lembrar informações sobre sua visita, como suas preferências e ações anteriores.

Como funcionam:
• O site envia cookies para o seu navegador
• O navegador armazena esses cookies localmente
• Em visitas futuras, o navegador envia os cookies de volta ao site
• O site usa essas informações para personalizar sua experiência

Tipos de armazenamento:
• Cookies: Pequenos arquivos de texto
• Local Storage: Armazenamento local mais permanente
• Session Storage: Dados temporários da sessão
• IndexedDB: Banco de dados no navegador`
    },
    {
      id: 2,
      icon: Eye,
      title: '2. Como Usamos Cookies',
      content: `Usamos cookies para diversos fins na Photon Media:

Funcionamento do Site:
• Manter você conectado durante a navegação
• Lembrar itens no seu carrinho ou lista de leitura
• Garantir segurança e prevenir fraudes
• Processar suas preferências de idioma

Análise e Melhoria:
• Entender como você usa nosso site
• Identificar páginas e recursos mais populares
• Detectar e corrigir problemas técnicos
• Medir eficácia de campanhas de marketing

Personalização:
• Recomendar conteúdo relevante
• Adaptar a interface às suas preferências
• Lembrar configurações (tema, layout, etc.)
• Personalizar anúncios baseados em interesses

Marketing:
• Medir eficácia de campanhas publicitárias
• Limitar frequência de exibição de anúncios
• Rastrear conversões e ROI
• Retargeting e remarketing`
    },
    {
      id: 3,
      icon: Info,
      title: '3. Cookies de Terceiros',
      content: `Além dos nossos próprios cookies, usamos serviços de terceiros que também podem definir cookies:

Serviços de Análise:
• Google Analytics - Análise de tráfego e comportamento
• Hotjar - Mapas de calor e gravações de sessão
• Mixpanel - Análise de produto e engajamento

Redes Sociais:
• Facebook - Integração e compartilhamento
• Twitter - Botões de compartilhamento
• LinkedIn - Funcionalidades sociais
• Instagram - Incorporação de posts

Publicidade:
• Google Ads - Publicidade display e busca
• Facebook Ads - Anúncios nas redes Meta
• Programmatic Advertising - Leilões de anúncios

Infraestrutura:
• Cloudflare - CDN e segurança
• AWS - Hospedagem e serviços
• Vercel - Deployment e edge computing

Controle:
Você pode gerenciar cookies de terceiros através das configurações do navegador ou usando nossas preferências de cookies abaixo.`
    },
    {
      id: 4,
      icon: Settings,
      title: '4. Gerenciar Cookies',
      content: `Você tem total controle sobre os cookies em nosso site:

Através do Navegador:

Google Chrome:
Settings → Privacy and security → Cookies and other site data

Mozilla Firefox:
Options → Privacy & Security → Cookies and Site Data

Safari:
Preferences → Privacy → Manage Website Data

Microsoft Edge:
Settings → Cookies and site permissions → Manage and delete cookies

Através das Nossas Configurações:
Use o painel de preferências de cookies abaixo nesta página para:
• Ativar/desativar categorias específicas
• Ver detalhes sobre cada tipo de cookie
• Salvar suas preferências
• Aceitar ou rejeitar todos os cookies opcionais

Extensões de Navegador:
• Privacy Badger (EFF)
• uBlock Origin
• Ghostery
• Cookie AutoDelete

Importante: Desativar cookies essenciais pode afetar o funcionamento do site.`
    },
    {
      id: 5,
      icon: Shield,
      title: '5. Segurança e Privacidade',
      content: `Levamos a segurança dos seus dados muito a sério:

Proteções Implementadas:

Cookies Seguros:
• Flag "Secure" - Transmissão apenas via HTTPS
• Flag "HttpOnly" - Inacessível via JavaScript
• Flag "SameSite" - Proteção contra CSRF
• Criptografia de dados sensíveis

Tempo de Vida:
• Cookies de sessão expiram ao fechar o navegador
• Cookies persistentes têm prazo de validade definido
• Limpeza automática de cookies expirados
• Rotação regular de tokens de segurança

Dados Coletados:
• Não armazenamos senhas em cookies
• Dados pessoais são minimizados
• Informações sensíveis são criptografadas
• Conformidade com LGPD e GDPR

Transparência:
• Lista completa de cookies utilizados disponível
• Finalidade clara de cada cookie
• Opção de opt-out sempre disponível
• Atualizações regulares desta política`
    },
    {
      id: 6,
      icon: Info,
      title: '6. Cookies Específicos Utilizados',
      content: `Lista detalhada dos principais cookies:

Cookies Próprios:

_photon_session
• Finalidade: Manter sessão do usuário
• Tipo: Essencial
• Duração: Sessão
• Domínio: photonmedia.com.br

photon_preferences
• Finalidade: Armazenar preferências do usuário
• Tipo: Funcionalidade
• Duração: 1 ano
• Domínio: photonmedia.com.br

photon_theme
• Finalidade: Tema escuro/claro
• Tipo: Funcionalidade
• Duração: 1 ano
• Domínio: photonmedia.com.br

Cookies de Terceiros:

_ga, _gid (Google Analytics)
• Finalidade: Análise de tráfego
• Tipo: Desempenho
• Duração: 2 anos / 24 horas
• Domínio: .photonmedia.com.br

_fbp (Facebook Pixel)
• Finalidade: Rastreamento de conversões
• Tipo: Publicidade
• Duração: 90 dias
• Domínio: .photonmedia.com.br

Para lista completa e atualizada, consulte as configurações de cookies do seu navegador.`
    }
  ];

  return (
    <div className="page-transition">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="wide-container py-20 md:py-32 relative z-10">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm px-4 py-1.5">
                <Cookie className="h-4 w-4 mr-2" />
                Transparência
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Política de Cookies
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4">
                Como usamos cookies e tecnologias similares para melhorar sua experiência
              </p>
              <p className="text-sm text-muted-foreground">
                Última atualização: {lastUpdate}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-16">
        {/* Important Notice */}
        <RevealOnScroll>
          <Alert className="mb-12 max-w-4xl mx-auto border-primary/20 bg-primary/5">
            <Cookie className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base leading-relaxed ml-2">
              <strong className="font-semibold">Seu controle:</strong> Você pode gerenciar suas preferências 
              de cookies a qualquer momento usando o painel abaixo ou as configurações do seu navegador.
            </AlertDescription>
          </Alert>
        </RevealOnScroll>

        {/* Cookie Preferences Panel */}
        <RevealOnScroll>
          <Card className="max-w-4xl mx-auto mb-16 border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                Gerenciar Preferências de Cookies
              </CardTitle>
              <CardDescription>
                Escolha quais tipos de cookies você permite que usemos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieTypes.map((type) => (
                <div key={type.id} className="border border-border/50 rounded-lg p-4 hover:border-primary/20 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <type.icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{type.title}</h3>
                          {type.required && (
                            <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p><strong>Exemplos:</strong></p>
                          <ul className="ml-4 space-y-0.5">
                            {type.examples.map((example, idx) => (
                              <li key={idx}>• {example}</li>
                            ))}
                          </ul>
                          <p className="mt-2"><strong>Duração:</strong> {type.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Switch
                        id={type.id}
                        checked={cookieSettings[type.id as keyof typeof cookieSettings]}
                        onCheckedChange={(checked) => {
                          if (!type.required) {
                            setCookieSettings({
                              ...cookieSettings,
                              [type.id]: checked
                            });
                          }
                        }}
                        disabled={!type.canDisable}
                      />
                      <Label htmlFor={type.id} className="sr-only">{type.title}</Label>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex flex-wrap gap-3 justify-end">
                <Button variant="outline" onClick={handleRejectOptional}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar Opcionais
                </Button>
                <Button variant="outline" onClick={handleAcceptAll}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aceitar Todos
                </Button>
                <Button onClick={handleSavePreferences} className="group">
                  Salvar Preferências
                  <Settings className="h-4 w-4 ml-2 group-hover:rotate-90 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>

        {/* Cookie Types Overview */}
        <RevealOnScroll>
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Tipos de Cookies</h2>
              <p className="text-muted-foreground">Entenda cada categoria e seu propósito</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {cookieTypes.map((type, index) => (
                <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <type.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2 text-sm">{type.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{type.description}</p>
                    <Badge variant={type.required ? "default" : "outline"} className="text-xs">
                      {type.required ? "Obrigatório" : "Opcional"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Detailed Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <RevealOnScroll key={section.id} delay={index * 50}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl flex items-start gap-3">
                    <section.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line space-y-4">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        {/* Browser Instructions */}
        <RevealOnScroll>
          <Card className="max-w-4xl mx-auto mt-12 border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                Como Desativar Cookies no Navegador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Google Chrome</h4>
                  <p className="text-sm text-muted-foreground">
                    Configurações → Privacidade e segurança → Cookies e outros dados do site
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Mozilla Firefox</h4>
                  <p className="text-sm text-muted-foreground">
                    Opções → Privacidade e Segurança → Cookies e Dados de Sites
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Safari</h4>
                  <p className="text-sm text-muted-foreground">
                    Preferências → Privacidade → Gerenciar Dados de Sites
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Microsoft Edge</h4>
                  <p className="text-sm text-muted-foreground">
                    Configurações → Cookies e permissões de site → Gerenciar e excluir cookies
                  </p>
                </div>
              </div>
              <Separator />
              <Alert className="border-amber-500/20 bg-amber-500/5">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-sm ml-2">
                  <strong>Atenção:</strong> Desativar cookies pode afetar sua experiência no site e 
                  limitar algumas funcionalidades.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </RevealOnScroll>

        {/* Related Links */}
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-muted-foreground mb-4">Documentos relacionados:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge 
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => window.location.href = '/privacidade'}
              >
                <Shield className="h-4 w-4 mr-2" />
                Política de Privacidade
              </Badge>
              <Badge 
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => window.location.href = '/termos'}
              >
                <Eye className="h-4 w-4 mr-2" />
                Termos de Uso
              </Badge>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
