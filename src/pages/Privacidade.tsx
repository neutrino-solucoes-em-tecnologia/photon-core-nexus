import { Shield, Lock, Eye, Database, Users, FileText, AlertCircle, CheckCircle, Mail, Cookie } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/lib/site-config';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Privacidade() {
  const lastUpdate = "13 de Novembro de 2024";

  const sections = [
    {
      id: 1,
      icon: FileText,
      title: '1. Introdução',
      content: `A ${siteConfig.name} ("nós", "nosso" ou "Plataforma") está comprometida em proteger sua privacidade e seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais.

Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis de privacidade.

Ao usar nossa Plataforma, você concorda com a coleta e uso de informações de acordo com esta política. Se você não concordar com os termos desta Política de Privacidade, por favor, não use nossos serviços.`
    },
    {
      id: 2,
      icon: Database,
      title: '2. Dados Coletados',
      content: `Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:

Dados Fornecidos por Você:
• Nome completo
• Endereço de e-mail
• Número de telefone
• Preferências de conteúdo
• Comentários e feedback
• Informações de perfil (quando aplicável)

Dados Coletados Automaticamente:
• Endereço IP
• Tipo e versão do navegador
• Sistema operacional
• Páginas visitadas e tempo de permanência
• Origem da visita (site de referência)
• Dados de localização aproximada
• Cookies e tecnologias similares
• Interações com conteúdo (cliques, leituras, compartilhamentos)

Dados de Terceiros:
• Informações de redes sociais (quando você conecta suas contas)
• Dados de parceiros de publicidade
• Informações de provedores de análise`
    },
    {
      id: 3,
      icon: Eye,
      title: '3. Como Usamos Seus Dados',
      content: `Utilizamos suas informações pessoais para os seguintes fins:

Prestação de Serviços:
• Fornecer acesso ao conteúdo da Plataforma
• Personalizar sua experiência de leitura
• Processar suas solicitações e comunicações
• Gerenciar sua conta e preferências

Melhoria e Desenvolvimento:
• Analisar padrões de uso e tendências
• Desenvolver novos recursos e funcionalidades
• Realizar pesquisas e análises
• Testar e melhorar a performance da Plataforma

Comunicação:
• Enviar newsletters e atualizações de conteúdo
• Responder suas perguntas e solicitações
• Enviar notificações importantes sobre o serviço
• Compartilhar ofertas e promoções (com seu consentimento)

Segurança e Legal:
• Proteger contra fraudes e abusos
• Cumprir obrigações legais
• Resolver disputas
• Fazer cumprir nossos termos de uso`
    },
    {
      id: 4,
      icon: Users,
      title: '4. Compartilhamento de Dados',
      content: `Podemos compartilhar suas informações nas seguintes circunstâncias:

Provedores de Serviço:
Compartilhamos dados com fornecedores terceiros que nos ajudam a operar a Plataforma:
• Serviços de hospedagem e infraestrutura
• Ferramentas de análise (Google Analytics, etc.)
• Plataformas de e-mail marketing
• Provedores de CDN e segurança

Parceiros de Negócios:
Com seu consentimento explícito, podemos compartilhar dados com:
• Parceiros de publicidade
• Plataformas de mídia social
• Parceiros de conteúdo

Requisitos Legais:
Podemos divulgar informações quando:
• Exigido por lei ou ordem judicial
• Necessário para proteger nossos direitos
• Para prevenir fraude ou questões de segurança
• Em caso de fusão, aquisição ou venda de ativos

Importante: Nunca vendemos seus dados pessoais a terceiros.`
    },
    {
      id: 5,
      icon: Lock,
      title: '5. Segurança dos Dados',
      content: `Implementamos medidas técnicas e organizacionais para proteger suas informações:

Medidas Técnicas:
• Criptografia SSL/TLS para transmissão de dados
• Armazenamento seguro com criptografia
• Firewall e sistemas de detecção de intrusão
• Autenticação de dois fatores (quando disponível)
• Backups regulares e seguros

Medidas Organizacionais:
• Acesso restrito aos dados (princípio do menor privilégio)
• Treinamento de equipe em segurança de dados
• Políticas internas de proteção de dados
• Contratos de confidencialidade com fornecedores
• Auditorias de segurança regulares

Resposta a Incidentes:
Em caso de violação de dados, notificaremos você e as autoridades competentes dentro do prazo legal (72 horas), informando:
• Natureza da violação
• Dados afetados
• Medidas tomadas
• Recomendações de proteção`
    },
    {
      id: 6,
      icon: CheckCircle,
      title: '6. Seus Direitos (LGPD)',
      content: `De acordo com a LGPD, você tem os seguintes direitos sobre seus dados:

Confirmação e Acesso:
• Confirmar se tratamos seus dados pessoais
• Acessar seus dados pessoais que possuímos

Correção e Atualização:
• Corrigir dados incompletos, inexatos ou desatualizados
• Atualizar informações quando necessário

Anonimização e Exclusão:
• Solicitar anonimização de dados desnecessários
• Solicitar bloqueio ou eliminação de dados
• Direito ao esquecimento (quando aplicável)

Portabilidade:
• Receber seus dados em formato estruturado
• Transferir dados para outro fornecedor de serviços

Revogação e Oposição:
• Revogar consentimento a qualquer momento
• Opor-se ao tratamento de dados
• Não consentir com tratamento de dados não essenciais

Informação:
• Saber com quem compartilhamos seus dados
• Conhecer a possibilidade de não consentir
• Ser informado sobre consequências da negativa

Para exercer seus direitos, entre em contato: privacidade@photonmedia.com.br`
    },
    {
      id: 7,
      icon: Cookie,
      title: '7. Cookies e Tecnologias Similares',
      content: `Usamos cookies e tecnologias semelhantes para melhorar sua experiência:

Tipos de Cookies:

Cookies Essenciais:
• Necessários para o funcionamento da Plataforma
• Não podem ser desativados
• Incluem cookies de sessão e autenticação

Cookies de Desempenho:
• Coletam informações sobre uso da Plataforma
• Ajudam a melhorar funcionalidades
• Podem ser desativados

Cookies de Funcionalidade:
• Lembram suas preferências
• Personalizam sua experiência
• Podem ser desativados

Cookies de Publicidade:
• Exibem anúncios relevantes
• Medem eficácia de campanhas
• Podem ser desativados

Gerenciar Cookies:
Você pode controlar cookies através das configurações do navegador ou usando nossa ferramenta de consentimento de cookies. Note que desativar alguns cookies pode afetar a funcionalidade da Plataforma.

Para mais informações, consulte nossa Política de Cookies completa.`
    },
    {
      id: 8,
      icon: Users,
      title: '8. Dados de Menores',
      content: `Proteção de Crianças e Adolescentes:

Nossa Plataforma não é direcionada a menores de 16 anos. Não coletamos intencionalmente dados pessoais de crianças sem o consentimento dos pais ou responsáveis legais.

Se você é menor de 16 anos:
• É necessário consentimento dos pais/responsáveis
• Alguns recursos podem ter restrições de idade
• Dados podem ser tratados com proteção adicional

Se tomarmos conhecimento de que coletamos dados de menores sem consentimento apropriado:
• Excluiremos as informações imediatamente
• Notificaremos os responsáveis legais
• Tomaremos medidas para prevenir coletas futuras

Responsáveis Legais:
Se você acredita que podemos ter coletado dados de um menor, entre em contato imediatamente: privacidade@photonmedia.com.br`
    },
    {
      id: 9,
      icon: Database,
      title: '9. Retenção de Dados',
      content: `Mantemos seus dados pessoais apenas pelo tempo necessário:

Período de Retenção:

Dados de Conta Ativa:
• Enquanto sua conta estiver ativa
• Até você solicitar exclusão
• Conforme necessário para fornecer serviços

Dados Legais:
• Conforme exigido por lei (geralmente 5 anos)
• Para resolver disputas
• Para fazer cumprir acordos

Dados de Marketing:
• Até você cancelar inscrição
• Máximo de 2 anos de inatividade
• Renovado mediante interação

Após o período de retenção:
• Dados são anonimizados ou excluídos
• Backups são eliminados conforme política
• Registros de exclusão são mantidos para auditoria

Exclusão de Conta:
Ao excluir sua conta:
• Dados pessoais são removidos em até 30 dias
• Alguns dados podem ser mantidos por obrigações legais
• Dados anonimizados podem ser retidos para estatísticas`
    },
    {
      id: 10,
      icon: Shield,
      title: '10. Transferência Internacional de Dados',
      content: `Seus dados podem ser transferidos e processados em países diferentes do seu:

Proteções Implementadas:

Cláusulas Contratuais Padrão:
• Usamos cláusulas aprovadas pela ANPD
• Garantem nível adequado de proteção
• Aplicadas a todos os fornecedores internacionais

Medidas de Segurança:
• Criptografia em trânsito e repouso
• Avaliação de riscos de cada transferência
• Monitoramento contínuo de compliance

Países de Destino:
• União Europeia (GDPR)
• Estados Unidos (fornecedores com certificações adequadas)
• Outros países com nível adequado de proteção

Você tem o direito de:
• Conhecer os países de destino
• Obter cópia das salvaguardas
• Opor-se a transferências específicas`
    },
    {
      id: 11,
      icon: AlertCircle,
      title: '11. Alterações nesta Política',
      content: `Podemos atualizar esta Política de Privacidade periodicamente:

Notificações de Mudanças:
• Atualizaremos a data no topo da página
• Mudanças significativas serão notificadas por e-mail
• Continuação do uso implica aceitação das mudanças

Tipos de Alterações:

Mudanças Menores:
• Correções de texto
• Esclarecimentos
• Atualizações de contato
→ Sem notificação específica

Mudanças Significativas:
• Novos usos de dados
• Compartilhamento com novas categorias de terceiros
• Redução de direitos dos usuários
→ Notificação com 30 dias de antecedência

Recomendamos:
• Revisar esta política periodicamente
• Verificar a data de última atualização
• Entrar em contato com dúvidas`
    },
    {
      id: 12,
      icon: Mail,
      title: '12. Encarregado de Dados (DPO)',
      content: `Contato do Encarregado de Proteção de Dados:

Nome: Maria Silva Santos
Cargo: Data Protection Officer (DPO)
Email: dpo@photonmedia.com.br
Email alternativo: privacidade@photonmedia.com.br
Telefone: +55 11 3333-4447

Horário de Atendimento:
Segunda a Sexta: 9h às 18h (horário de Brasília)

O DPO é responsável por:
• Receber e responder solicitações de titulares
• Orientar funcionários sobre proteção de dados
• Monitorar conformidade com LGPD
• Servir como canal de comunicação com a ANPD
• Realizar auditorias de privacidade

Endereço para Correspondência:
${siteConfig.name} - Encarregado de Dados
Av. Paulista, 1000 - 10º andar
São Paulo, SP - CEP 01310-100

Prazo de Resposta:
Responderemos todas as solicitações dentro de 15 dias úteis. Em casos complexos, este prazo pode ser estendido por mais 15 dias, com notificação prévia.`
    }
  ];

  const dataTypes = [
    { icon: Users, label: 'Dados Pessoais', description: 'Nome, email, telefone' },
    { icon: Eye, label: 'Dados de Navegação', description: 'Páginas visitadas, cliques' },
    { icon: Database, label: 'Dados Técnicos', description: 'IP, navegador, dispositivo' },
    { icon: Cookie, label: 'Cookies', description: 'Preferências e rastreamento' },
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
                <Shield className="h-4 w-4 mr-2" />
                LGPD Compliance
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Política de Privacidade
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4">
                Transparência e segurança no tratamento dos seus dados pessoais
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
            <Shield className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base leading-relaxed ml-2">
              <strong className="font-semibold">Seu controle, sua privacidade:</strong> Esta política explica 
              como coletamos, usamos e protegemos seus dados. Você tem total controle sobre suas informações 
              e pode exercer seus direitos a qualquer momento.
            </AlertDescription>
          </Alert>
        </RevealOnScroll>

        {/* Data Types Overview */}
        <RevealOnScroll>
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Tipos de Dados Coletados</h2>
              <p className="text-muted-foreground">Resumo das informações que processamos</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {dataTypes.map((type, index) => (
                <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <type.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Privacy Sections */}
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

        {/* Rights Summary */}
        <RevealOnScroll>
          <Card className="max-w-4xl mx-auto mt-12 border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                Resumo dos Seus Direitos LGPD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Acesso e Confirmação</h4>
                      <p className="text-sm text-muted-foreground">Saber quais dados temos sobre você</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Correção</h4>
                      <p className="text-sm text-muted-foreground">Atualizar dados incorretos ou incompletos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Exclusão</h4>
                      <p className="text-sm text-muted-foreground">Solicitar remoção de seus dados</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Portabilidade</h4>
                      <p className="text-sm text-muted-foreground">Transferir dados para outro serviço</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Revogação</h4>
                      <p className="text-sm text-muted-foreground">Retirar consentimento a qualquer momento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Oposição</h4>
                      <p className="text-sm text-muted-foreground">Não concordar com uso específico</p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Como Exercer Seus Direitos
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Para qualquer solicitação relacionada aos seus dados pessoais:
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> <a href="mailto:privacidade@photonmedia.com.br" className="text-primary hover:underline">privacidade@photonmedia.com.br</a></p>
                  <p><strong>DPO:</strong> <a href="mailto:dpo@photonmedia.com.br" className="text-primary hover:underline">dpo@photonmedia.com.br</a></p>
                  <p><strong>Telefone:</strong> +55 11 3333-4447</p>
                  <p className="text-muted-foreground mt-2">Resposta em até 15 dias úteis</p>
                </div>
              </div>
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
                onClick={() => window.location.href = '/termos'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Termos de Uso
              </Badge>
              <Badge 
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => window.location.href = '/cookies'}
              >
                <Cookie className="h-4 w-4 mr-2" />
                Política de Cookies
              </Badge>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
