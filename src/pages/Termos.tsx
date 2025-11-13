import { Shield, FileText, AlertTriangle, Scale, Lock, UserCheck, Globe, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Termos() {
  const lastUpdate = "13 de Novembro de 2024";

  const sections = [
    {
      id: 1,
      icon: FileText,
      title: '1. Aceitação dos Termos',
      content: `Ao acessar e usar o site Photon Media ("Plataforma"), você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.

Estes Termos de Uso constituem um acordo legal entre você ("Usuário") e a Photon Media ("nós", "nosso" ou "Plataforma"). Reservamo-nos o direito de atualizar ou modificar estes termos a qualquer momento, sem aviso prévio.`
    },
    {
      id: 2,
      icon: UserCheck,
      title: '2. Uso da Plataforma',
      content: `Você concorda em usar a Plataforma apenas para fins legais e de acordo com estes Termos de Uso. É proibido:

• Usar a Plataforma de qualquer maneira que viole leis ou regulamentos aplicáveis
• Transmitir qualquer material que seja difamatório, obsceno, ofensivo ou ilegal
• Tentar obter acesso não autorizado a qualquer parte da Plataforma
• Interferir ou interromper a integridade ou desempenho da Plataforma
• Coletar ou rastrear informações pessoais de outros usuários
• Usar qualquer dispositivo, software ou rotina que interfira no funcionamento adequado da Plataforma
• Reproduzir, duplicar, copiar ou revender qualquer parte da Plataforma sem autorização expressa`
    },
    {
      id: 3,
      icon: Lock,
      title: '3. Propriedade Intelectual',
      content: `Todo o conteúdo presente na Plataforma, incluindo mas não limitado a textos, gráficos, logos, imagens, vídeos, áudio e software, é propriedade da Photon Media ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.

Você não pode:
• Modificar, publicar, transmitir, participar da transferência ou venda de, criar trabalhos derivados ou explorar de qualquer forma qualquer conteúdo da Plataforma
• Usar nosso conteúdo para fins comerciais sem autorização prévia por escrito
• Remover quaisquer avisos de direitos autorais ou outros avisos de propriedade

Uso permitido: Você pode visualizar, baixar e imprimir páginas da Plataforma apenas para uso pessoal e não comercial, desde que mantenha intactos todos os avisos de direitos autorais.`
    },
    {
      id: 4,
      icon: Shield,
      title: '4. Privacidade e Proteção de Dados',
      content: `Levamos sua privacidade a sério. A coleta e uso de informações pessoais são regidos pela nossa Política de Privacidade, que está incorporada a estes Termos de Uso por referência.

Ao usar a Plataforma, você concorda com:
• A coleta e processamento de dados conforme descrito em nossa Política de Privacidade
• O uso de cookies e tecnologias similares para melhorar sua experiência
• Receber comunicações relacionadas aos serviços (pode cancelar inscrição a qualquer momento)

Seus direitos (LGPD):
• Acesso aos seus dados pessoais
• Correção de dados incompletos, inexatos ou desatualizados
• Anonimização, bloqueio ou eliminação de dados desnecessários
• Portabilidade dos dados
• Eliminação dos dados tratados com seu consentimento
• Revogação do consentimento`
    },
    {
      id: 5,
      icon: Globe,
      title: '5. Conteúdo do Usuário',
      content: `Se você enviar, publicar ou exibir qualquer conteúdo na Plataforma (comentários, avaliações, etc.), você concede à Photon Media uma licença mundial, não exclusiva, livre de royalties para usar, reproduzir, modificar, adaptar, publicar e distribuir tal conteúdo em qualquer meio.

Você declara e garante que:
• Possui ou controla todos os direitos sobre o conteúdo que publica
• O conteúdo não viola direitos de terceiros
• O conteúdo não é difamatório, ofensivo ou ilegal
• O conteúdo não contém vírus ou outros códigos maliciosos

Reservamo-nos o direito de remover ou editar qualquer conteúdo que viole estes termos.`
    },
    {
      id: 6,
      icon: AlertTriangle,
      title: '6. Isenção de Responsabilidade',
      content: `A Plataforma e todo o conteúdo são fornecidos "como estão" e "conforme disponíveis", sem garantias de qualquer tipo, expressas ou implícitas.

Não garantimos que:
• A Plataforma estará sempre disponível ou livre de erros
• Os defeitos serão corrigidos
• A Plataforma está livre de vírus ou outros componentes prejudiciais
• Os resultados do uso da Plataforma atenderão suas expectativas

Conteúdo de Terceiros: A Plataforma pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.

Precisão do Conteúdo: Embora nos esforcemos para fornecer informações precisas e atualizadas, não garantimos a precisão, integridade ou atualidade do conteúdo.`
    },
    {
      id: 7,
      icon: Scale,
      title: '7. Limitação de Responsabilidade',
      content: `Na extensão máxima permitida por lei, a Photon Media não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos resultantes de:

• Uso ou incapacidade de usar a Plataforma
• Acesso não autorizado ou alteração de suas transmissões ou dados
• Declarações ou conduta de terceiros na Plataforma
• Qualquer outra questão relacionada à Plataforma

Nossa responsabilidade total para com você por todas as reivindicações relacionadas à Plataforma não excederá o valor que você nos pagou (se houver) nos últimos 12 meses.

Algumas jurisdições não permitem a limitação de responsabilidade por danos, portanto as limitações acima podem não se aplicar a você.`
    },
    {
      id: 8,
      icon: FileText,
      title: '8. Modificações e Rescisão',
      content: `Modificações da Plataforma:
Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto da Plataforma a qualquer momento, sem aviso prévio.

Modificações dos Termos:
Podemos atualizar estes Termos de Uso periodicamente. A data da última atualização será sempre indicada no topo da página. O uso continuado da Plataforma após alterações constitui aceitação dos novos termos.

Rescisão:
Podemos encerrar ou suspender seu acesso à Plataforma imediatamente, sem aviso prévio, por qualquer motivo, incluindo violação destes Termos de Uso.

Você pode parar de usar a Plataforma a qualquer momento.`
    },
    {
      id: 9,
      icon: Globe,
      title: '9. Lei Aplicável e Jurisdição',
      content: `Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, sem considerar conflitos de disposições legais.

Jurisdição:
Qualquer disputa relacionada a estes Termos de Uso será submetida à jurisdição exclusiva dos tribunais de São Paulo, SP, Brasil.

Resolução de Disputas:
Encorajamos você a nos contatar primeiro para resolver qualquer disputa informalmente através do email: legal@photonmedia.com.br

Se não conseguirmos resolver a disputa informalmente, você concorda em tentar mediar a disputa antes de iniciar qualquer processo judicial.`
    },
    {
      id: 10,
      icon: Mail,
      title: '10. Contato',
      content: `Se você tiver dúvidas, comentários ou preocupações sobre estes Termos de Uso, entre em contato conosco:

Email: legal@photonmedia.com.br
Telefone: +55 11 3333-4444
Endereço: Av. Paulista, 1000 - São Paulo, SP - CEP 01310-100

Horário de atendimento: Segunda a Sexta, 9h às 18h (horário de Brasília)

Responderemos a todas as consultas dentro de 5 dias úteis.`
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
                <Scale className="h-4 w-4 mr-2" />
                Legal
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Termos de Uso
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4">
                Leia atentamente os termos e condições de uso da Photon Media
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
            <AlertTriangle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base leading-relaxed ml-2">
              <strong className="font-semibold">Importante:</strong> Ao continuar navegando e usando este site, 
              você aceita cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com 
              qualquer parte destes termos, por favor, não use nossos serviços.
            </AlertDescription>
          </Alert>
        </RevealOnScroll>

        {/* Terms Sections */}
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

        {/* Summary Card */}
        <RevealOnScroll>
          <Card className="max-w-4xl mx-auto mt-12 border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Resumo dos Seus Direitos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    Você tem direito a:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Acessar seus dados pessoais</li>
                    <li>• Corrigir informações incorretas</li>
                    <li>• Solicitar exclusão de dados</li>
                    <li>• Revogar consentimentos</li>
                    <li>• Portabilidade de dados</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Nós nos comprometemos a:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Proteger suas informações</li>
                    <li>• Ser transparentes sobre coleta de dados</li>
                    <li>• Respeitar sua privacidade</li>
                    <li>• Fornecer serviços de qualidade</li>
                    <li>• Responder suas solicitações</li>
                  </ul>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Para exercer seus direitos ou esclarecer dúvidas sobre estes Termos de Uso, 
                entre em contato através do email <a href="mailto:legal@photonmedia.com.br" className="text-primary hover:underline">legal@photonmedia.com.br</a>
              </p>
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
                <Lock className="h-4 w-4 mr-2" />
                Política de Privacidade
              </Badge>
              <Badge 
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => window.location.href = '/cookies'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Política de Cookies
              </Badge>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
