import { useState } from 'react';
import { Download, Image as ImageIcon, FileText, Users, Phone, Mail, Calendar, ExternalLink, Newspaper, Award, TrendingUp, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Imprensa() {
  const { toast } = useToast();

  const handleDownload = (type: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${type}...`,
    });
  };

  const pressReleases = [
    {
      date: '15 de Outubro, 2024',
      title: `${siteConfig.name} alcança 5 milhões de leitores mensais`,
      excerpt: 'Plataforma de conteúdo inteligente registra crescimento de 150% no último semestre, consolidando posição como referência em jornalismo digital.',
      category: 'Milestone',
    },
    {
      date: '02 de Setembro, 2024',
      title: 'Lançamento da nova plataforma de IA para personalização de conteúdo',
      excerpt: 'Tecnologia proprietária utiliza machine learning para oferecer experiência única a cada leitor, aumentando engajamento em 80%.',
      category: 'Produto',
    },
    {
      date: '20 de Agosto, 2024',
      title: `${siteConfig.name} vence prêmio de Inovação Digital 2024`,
      excerpt: 'Reconhecimento destaca excelência em jornalismo investigativo e uso de tecnologia para democratização da informação.',
      category: 'Premiação',
    },
    {
      date: '10 de Julho, 2024',
      title: `Expansão internacional: ${siteConfig.name} chega a 15 países`,
      excerpt: 'Nova rodada de investimentos possibilita expansão para América Latina e Europa, com conteúdo localizado e parcerias estratégicas.',
      category: 'Expansão',
    },
  ];

  const mediaAssets = [
    {
      icon: ImageIcon,
      title: 'Logos e Identidade Visual',
      description: 'Pacote completo com logos em diferentes formatos (PNG, SVG, EPS), paleta de cores e guia de uso.',
      size: '15 MB',
      format: 'ZIP',
    },
    {
      icon: FileText,
      title: 'Press Kit Completo',
      description: 'Documento com informações corporativas, dados estatísticos, histórico e principais conquistas.',
      size: '2.5 MB',
      format: 'PDF',
    },
    {
      icon: Users,
      title: 'Fotos da Equipe',
      description: 'Imagens em alta resolução da equipe executiva e principais editores para uso em matérias.',
      size: '25 MB',
      format: 'ZIP',
    },
    {
      icon: TrendingUp,
      title: 'Infográficos e Dados',
      description: 'Gráficos, estatísticas de audiência e métricas de impacto em formatos editáveis.',
      size: '8 MB',
      format: 'ZIP',
    },
  ];

  const contacts = [
    {
      name: 'Ana Paula Rodrigues',
      role: 'Diretora de Comunicação',
      email: 'ana.rodrigues@photonmedia.com.br',
      phone: '+55 11 3333-4445',
    },
    {
      name: 'Carlos Mendes',
      role: 'Relações com a Imprensa',
      email: 'carlos.mendes@photonmedia.com.br',
      phone: '+55 11 3333-4446',
    },
  ];

  const stats = [
    { label: 'Leitores Mensais', value: '5M+' },
    { label: 'Artigos Publicados', value: '50K+' },
    { label: 'Países Alcançados', value: '15' },
    { label: 'Prêmios Conquistados', value: '12' },
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
                <Newspaper className="h-4 w-4 mr-2" />
                Sala de Imprensa
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Imprensa
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Recursos, releases e contatos para jornalistas e profissionais de comunicação.
                <br className="hidden md:block" />
                Informações sempre atualizadas sobre a {siteConfig.name}.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-16">
        {/* Stats */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
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

        {/* Press Releases */}
        <div className="mb-16">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comunicados à Imprensa</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Últimas notícias e anúncios oficiais da {siteConfig.name}
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-4 max-w-4xl mx-auto">
            {pressReleases.map((release, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {release.date}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {release.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {release.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {release.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group/btn">
                      Ler comunicado completo
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Media Assets */}
        <RevealOnScroll>
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kit de Mídia</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Materiais prontos para download e uso editorial
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {mediaAssets.map((asset, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <asset.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{asset.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {asset.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="secondary">{asset.format}</Badge>
                        <span>{asset.size}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(asset.title)}
                        className="group/btn"
                      >
                        <Download className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Press Contacts */}
        <div className="mb-16">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contatos para Imprensa</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nossa equipe está pronta para atender jornalistas e veículos de comunicação
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contacts.map((contact, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{contact.name}</CardTitle>
                    <CardDescription className="text-base">{contact.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Company Info Section */}
        <RevealOnScroll>
          <Card className="max-w-4xl mx-auto border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                Sobre a {siteConfig.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-foreground">{siteConfig.name}</strong> é uma plataforma de conteúdo digital que revoluciona 
                a forma como as pessoas consomem informação. Fundada em 2020, combinamos jornalismo de qualidade 
                com tecnologia de ponta para oferecer experiências personalizadas e relevantes.
              </p>
              <Separator />
              <p>
                Com mais de <strong className="text-foreground">5 milhões de leitores mensais</strong> e presença em 
                <strong className="text-foreground"> 15 países</strong>, somos referência em inovação digital e compromisso 
                com a verdade. Nossa equipe multidisciplinar de jornalistas, desenvolvedores e cientistas de dados 
                trabalha para democratizar o acesso a conteúdo de qualidade.
              </p>
              <Separator />
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Principais Conquistas
                </h3>
                <ul className="space-y-2 ml-7">
                  <li>• Prêmio de Inovação Digital 2024</li>
                  <li>• Melhor Plataforma de Conteúdo - Tech Awards 2023</li>
                  <li>• Reconhecimento em Jornalismo Investigativo 2023</li>
                  <li>• Certificação de Transparência e Ética Editorial</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>

        {/* Call to Action */}
        <RevealOnScroll>
          <div className="mt-16 p-10 rounded-2xl hero-gradient-rich text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Newspaper className="h-12 w-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Precisa de Mais Informações?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Nosso time de comunicação está sempre disponível para fornecer dados adicionais, 
                agendar entrevistas ou esclarecer dúvidas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="group shadow-lg"
                  onClick={() => window.location.href = 'mailto:imprensa@photonmedia.com.br'}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  imprensa@photonmedia.com.br
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/20 border-white/30 hover:bg-white/30 text-white shadow-lg"
                  onClick={() => window.location.href = 'tel:+551133334444'}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +55 11 3333-4444
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
