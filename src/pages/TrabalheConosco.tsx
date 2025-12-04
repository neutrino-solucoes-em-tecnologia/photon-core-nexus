import { useState } from 'react';
import { Upload, Briefcase, Users, TrendingUp, Heart, Zap, Award, Send, CheckCircle2, Globe, Coffee } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TrabalheConosco() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    linkedin: '',
    portfolio: '',
    message: '',
    cv: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Candidatura enviada com sucesso!",
        description: "Entraremos em contato em breve. Boa sorte!",
      });
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        linkedin: '',
        portfolio: '',
        message: '',
        cv: null,
      });
    }, 2000);
  };

  const benefits = [
    {
      icon: Users,
      title: 'Ambiente Colaborativo',
      description: 'Trabalhe com profissionais talentosos em um ambiente dinâmico e inclusivo.',
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Profissional',
      description: 'Plano de carreira estruturado com oportunidades de desenvolvimento contínuo.',
    },
    {
      icon: Heart,
      title: 'Saúde e Bem-estar',
      description: 'Plano de saúde, vale alimentação e programas de qualidade de vida.',
    },
    {
      icon: Zap,
      title: 'Flexibilidade',
      description: 'Trabalho híbrido com horários flexíveis para melhor equilíbrio.',
    },
    {
      icon: Globe,
      title: 'Trabalho Remoto',
      description: 'Possibilidade de trabalho 100% remoto para algumas posições.',
    },
    {
      icon: Coffee,
      title: 'Cultura Descontraída',
      description: 'Ambiente informal com espaços de convivência e eventos regulares.',
    },
  ];

  const openPositions = [
    {
      title: 'Desenvolvedor(a) Full Stack',
      department: 'Tecnologia',
      location: 'São Paulo / Remoto',
      type: 'CLT',
    },
    {
      title: 'Jornalista / Redator(a)',
      department: 'Conteúdo',
      location: 'São Paulo / Híbrido',
      type: 'CLT',
    },
    {
      title: 'Designer UI/UX',
      department: 'Design',
      location: 'Remoto',
      type: 'PJ',
    },
    {
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      location: 'São Paulo',
      type: 'CLT',
    },
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
                Carreiras
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Trabalhe com a Gente
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Faça parte de uma equipe que está revolucionando a forma como as pessoas 
                <br className="hidden md:block" />
                consomem conteúdo inteligente.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-16">
        {/* Benefits Section */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que trabalhar na {siteConfig.name}?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos muito mais que um emprego. Aqui você cresce profissionalmente enquanto faz a diferença.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        {/* Open Positions */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Vagas Abertas</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className="text-xs">{position.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{position.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4" />
                        {position.department}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4" />
                        {position.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Send className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Candidate-se</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Preencha o formulário abaixo com suas informações. Analisaremos sua candidatura com atenção.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">
                        Nome Completo <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Seu nome completo" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">
                        Telefone <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(11) 98765-4321" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-base">
                        Vaga de Interesse <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={formData.position}
                        onValueChange={(value) => setFormData({ ...formData, position: value })}
                        required
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione a vaga" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desenvolvedor">Desenvolvedor(a) Full Stack</SelectItem>
                          <SelectItem value="jornalista">Jornalista / Redator(a)</SelectItem>
                          <SelectItem value="designer">Designer UI/UX</SelectItem>
                          <SelectItem value="marketing">Analista de Marketing Digital</SelectItem>
                          <SelectItem value="outro">Outra posição</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-base">
                        LinkedIn
                      </Label>
                      <Input 
                        id="linkedin" 
                        placeholder="linkedin.com/in/seu-perfil" 
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="text-base">
                        Portfólio / Site
                      </Label>
                      <Input 
                        id="portfolio" 
                        placeholder="seusite.com" 
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv" className="text-base">
                      Currículo (PDF) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="cv" 
                        type="file" 
                        accept=".pdf"
                        required
                        onChange={handleFileChange}
                        className="h-11"
                      />
                      <Upload className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                    {formData.cv && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {formData.cv.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">
                      Mensagem / Carta de Apresentação <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={`Conte-nos um pouco sobre você, suas experiências e por que quer trabalhar na ${siteConfig.name}...`}
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full hover-lift-enhanced shadow-lg group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Enviando candidatura...</span>
                      </>
                    ) : (
                      <>
                        Enviar Candidatura
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Ao enviar sua candidatura, você concorda com nossa Política de Privacidade e uso de dados.
                  </p>
                </form>
              </CardContent>
            </Card>
          </RevealOnScroll>
        </div>

        {/* Culture Section */}
        <RevealOnScroll>
          <div className="mt-16 p-10 rounded-2xl hero-gradient-rich text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Award className="h-12 w-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nossa Cultura
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Na {siteConfig.name}, acreditamos em liberdade criativa, colaboração genuína e impacto real. 
                Somos uma equipe diversa, apaixonada por tecnologia e comprometida em criar conteúdo 
                que faz a diferença no mundo.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 text-sm px-4 py-2">
                  Inovação
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 text-sm px-4 py-2">
                  Diversidade
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 text-sm px-4 py-2">
                  Transparência
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 text-sm px-4 py-2">
                  Crescimento
                </Badge>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
