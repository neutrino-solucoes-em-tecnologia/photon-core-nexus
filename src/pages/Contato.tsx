import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Contato() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling logic here
  };

  return (
    <div className="wide-container py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="mb-4">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground">
            Tem uma pergunta, sugestão ou quer fazer parte do Photon Media? Estamos aqui para ouvir.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:contato@photonmedia.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contato@photonmedia.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+551133334444" className="text-muted-foreground hover:text-primary transition-colors">
                  +55 11 3333-4444
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  São Paulo, SP<br />
                  Brasil
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Envie sua Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Como podemos ajudar?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Conte-nos mais detalhes..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 p-8 rounded-2xl hero-gradient text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Assine Nossa Newsletter</h2>
          <p className="text-lg mb-6 opacity-90">
            Receba análises exclusivas, tendências e insights direto no seu email.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Seu melhor email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button type="submit" variant="secondary">
              Assinar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
