import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock, MessageSquare, Linkedin, Twitter, Facebook, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from '@/components/RevealOnScroll';
import AdSlot from '@/components/AdSlot';

export default function Contato() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio (você pode integrar com um backend real aqui)
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve. Obrigado!",
      });
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <div className="page-transition">
      {/* First Fold Ad */}
      <RevealOnScroll>
        <div className="py-4 md:py-6 px-4 sm:px-6">
          <div className="not-prose">
            <AdSlot
              slot={import.meta.env.VITE_ADSENSE_SLOT_CONTATO_TOP}
              format="auto"
              position={0}
              mockLabel="CONTATO PRIMEIRA DOBRA"
            />
          </div>
        </div>
      </RevealOnScroll>

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="wide-container py-20 md:py-32 relative z-10">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm px-4 py-1.5">
                Fale Conosco
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Vamos Conversar?
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Tem uma pergunta, sugestão ou quer fazer parte do Photon Media? 
                <br className="hidden md:block" />
                Estamos aqui para ouvir você.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <RevealOnScroll delay={100}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Email</CardTitle>
                  <CardDescription>Envie-nos uma mensagem</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:contato@photonmedia.com.br" 
                    className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 group/link"
                  >
                    contato@photonmedia.com.br
                    <Send className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Respondemos em até 24 horas
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Telefone</CardTitle>
                  <CardDescription>Fale diretamente conosco</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+551133334444" 
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    +55 11 3333-4444
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock className="h-4 w-4" />
                    Seg-Sex, 9h às 18h
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Endereço</CardTitle>
                  <CardDescription>Nossa sede</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium">
                    Av. Paulista, 1000
                  </p>
                  <p className="text-muted-foreground">
                    Bela Vista<br />
                    São Paulo - SP, 01310-100<br />
                    Brasil
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll>
                <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      Preencha o formulário abaixo e entraremos em contato o mais breve possível.
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
                            placeholder="João Silva" 
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
                            placeholder="joao@exemplo.com" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base">
                          Telefone
                        </Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="(11) 98765-4321" 
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-base">
                          Assunto <span className="text-destructive">*</span>
                        </Label>
                        <Input 
                          id="subject" 
                          placeholder="Como podemos ajudar?" 
                          required 
                          value={formData.subject}
                          onChange={handleChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base">
                          Mensagem <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Conte-nos mais detalhes sobre sua solicitação..."
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
                            <span className="animate-pulse">Enviando...</span>
                          </>
                        ) : (
                          <>
                            Enviar Mensagem
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Ao enviar este formulário, você concorda com nossa Política de Privacidade.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* FAQ */}
              <RevealOnScroll delay={100}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Perguntas Frequentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Quanto tempo para resposta?
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">
                        Respondemos todas as mensagens em até 24 horas úteis.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Posso enviar conteúdo?
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">
                        Sim! Enviamos diretrizes para colaboradores em até 48 horas.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Parcerias comerciais?
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">
                        Entre em contato pelo email comercial@photonmedia.com.br
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnScroll>

              {/* Social Media */}
              <RevealOnScroll delay={200}>
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Redes Sociais</CardTitle>
                    <CardDescription>Siga-nos nas redes sociais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="icon" className="hover-lift" asChild>
                        <a href="https://linkedin.com/company/photonmedia" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" className="hover-lift" asChild>
                        <a href="https://twitter.com/photonmedia" target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" className="hover-lift" asChild>
                        <a href="https://facebook.com/photonmedia" target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnScroll>

              {/* Working Hours */}
              <RevealOnScroll delay={300}>
                <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Segunda - Sexta</span>
                      <span className="font-medium">9h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábado</span>
                      <span className="font-medium">9h às 13h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domingo</span>
                      <span className="font-medium">Fechado</span>
                    </div>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            </div>
          </div>

          {/* Newsletter Section */}
          <RevealOnScroll>
            <div className="mt-16 p-10 rounded-2xl hero-gradient-rich text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Assine Nossa Newsletter
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Receba análises exclusivas, tendências e insights direto no seu email. 
                  Junte-se a milhares de leitores inteligentes.
                </p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Seu melhor email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 backdrop-blur-sm"
                    required
                  />
                  <Button type="submit" variant="secondary" size="lg" className="hover-lift-enhanced shadow-lg whitespace-nowrap">
                    Assinar Grátis
                  </Button>
                </form>
                <p className="text-xs mt-4 opacity-75">
                  Sem spam. Cancele quando quiser. 100% gratuito.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
