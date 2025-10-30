import { Globe, Zap, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const values = [
  {
    icon: Globe,
    title: 'Rede Global',
    description: 'Uma rede internacional de portais conectando audiências em múltiplos idiomas e culturas.',
  },
  {
    icon: Zap,
    title: 'Tecnologia Neutrino',
    description: 'Infraestrutura de ponta garantindo performance, segurança e escalabilidade.',
  },
  {
    icon: Users,
    title: 'Foco em Pessoas',
    description: 'Conteúdo criado por especialistas para mentes curiosas e profissionais exigentes.',
  },
  {
    icon: TrendingUp,
    title: 'Crescimento Sustentável',
    description: 'Monetização inteligente através de conteúdo de qualidade e valor genuíno.',
  },
];

export default function Sobre() {
  return (
    <div>
      {/* Hero */}
      <section className="wide-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <h1 className="mb-6">Sobre o Photon Media</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Somos o núcleo que move o universo do conhecimento digital. Uma rede internacional
            de portais de conteúdo, dedicada a expandir horizontes e conectar ideias.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/30 py-16">
        <div className="editorial-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Democratizar o acesso ao conhecimento de qualidade através de uma rede internacional
                de portais multilíngue, conectando pessoas, ideias e oportunidades.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que informação de qualidade tem o poder de transformar vidas, impulsionar
                negócios e construir um futuro melhor para todos.
              </p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Países Alcançados</p>
              <div className="text-6xl font-bold text-secondary my-6">10M+</div>
              <p className="text-muted-foreground">Leitores Mensais</p>
              <div className="text-6xl font-bold text-accent mt-6 mb-2">50+</div>
              <p className="text-muted-foreground">Especialistas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="wide-container py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nossos Pilares</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="text-center hover-lift">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="bg-muted/30 py-16">
        <div className="editorial-container text-center">
          <h2 className="mb-6">Visão de Futuro</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Queremos ser a principal rede de conteúdo inteligente do mundo, reconhecida pela qualidade,
            relevância e impacto positivo que geramos nas vidas de nossos leitores e parceiros.
          </p>
        </div>
      </section>

      {/* Technology */}
      <section className="wide-container py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-6 text-center">Tecnologia de Ponta</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center leading-relaxed">
            Nossa infraestrutura Neutrino garante performance excepcional, segurança robusta
            e escalabilidade ilimitada para suportar nosso crescimento global.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg border">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime Garantido</p>
            </div>
            <div className="p-6 rounded-lg border">
              <div className="text-4xl font-bold text-secondary mb-2">&lt;1s</div>
              <p className="text-sm text-muted-foreground">Tempo de Carregamento</p>
            </div>
            <div className="p-6 rounded-lg border">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Dados Seguros</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
