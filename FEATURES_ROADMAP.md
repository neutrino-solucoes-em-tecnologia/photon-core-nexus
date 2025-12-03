# 🗺️ Features Roadmap - Ozônio.site

Este documento mapeia as funcionalidades planejadas e pendentes de implementação no portal Ozônio.site.

---

## 📊 Status Geral

- ✅ **Implementado e em Produção**
- 🚧 **Em Desenvolvimento**
- 📋 **Planejado / Aguardando Implementação**
- ❌ **Descontinuado / Não Aplicável**

---

## 🎯 Features Principais

### 1. 📈 Trending Articles (Artigos em Alta)

**Status:** 📋 **Planejado**

**Descrição:**
Sistema de identificação e exibição de artigos em alta baseado em métricas de engajamento em tempo real.

**Características:**
- **Algoritmo de Trending Score:**
  - Visualizações nas últimas 24h (peso maior)
  - Taxa de crescimento de visualizações
  - Comentários recentes
  - Compartilhamentos sociais
  - Tempo médio de leitura (completion rate)
  
- **Períodos de Análise:**
  - Últimas 24 horas (padrão)
  - Últimos 7 dias
  - Últimos 30 dias
  
- **Exibição:**
  - Widget sidebar "Trending Now" com top 5-10 artigos
  - Badge visual "🔥 Em Alta" em cards de artigos
  - Indicador de tendência: ⬆️ Subindo / ⬇️ Caindo / ➡️ Estável
  
- **API Endpoint:**
  ```typescript
  GET /api/v1/stats/trending
  
  Query Parameters:
  - limit: number (default: 10, max: 20)
  - period: '24h' | '7d' | '30d' (default: '24h')
  
  Response:
  {
    data: [
      {
        article: Article,
        score: number,
        views_24h: number,
        trend: 'up' | 'down' | 'stable',
        position_change: number  // +2, -1, 0
      }
    ]
  }
  ```

- **Frontend Components:**
  ```typescript
  // src/components/TrendingArticles.tsx
  interface TrendingArticlesProps {
    limit?: number;
    period?: '24h' | '7d' | '30d';
    showTrendIndicator?: boolean;
  }
  
  // src/hooks/use-trending.ts
  export const useTrending = (limit: number, period: string) => {
    return useQuery({
      queryKey: ['trending', limit, period],
      queryFn: () => statsService.getTrending(limit, period),
      staleTime: 5 * 60 * 1000, // Atualiza a cada 5 min
      refetchInterval: 5 * 60 * 1000,
    });
  };
  ```

**Casos de Uso:**
- Usuário vê sidebar com "🔥 Trending Now"
- Artigos em alta recebem badge visual de destaque
- Homepage pode ter seção "Mais Lidos nas Últimas 24h"
- Newsletter semanal com top 10 artigos em alta

**Métricas de Sucesso:**
- CTR em artigos trending vs normais
- Tempo médio de sessão aumentado
- Taxa de retorno de visitantes

**Prioridade:** 🔴 **Alta** (aumenta engajamento e descoberta de conteúdo)

**Dependências Técnicas:**
- Sistema de tracking de visualizações (Analytics)
- Cache Redis para cálculo de scores
- Background job para atualização de rankings
- Webhook ou cron job a cada 5-15 minutos

---

### 2. 💰 Descontos / Ofertas (Deals & Promotions)

**Status:** 📋 **Planejado**

**Descrição:**
Sistema de curadoria e exibição de descontos, ofertas e promoções relacionadas ao nicho do portal (saúde, bem-estar, terapias com ozônio).

**Características:**

- **Tipo de Ofertas:**
  - Descontos em equipamentos de ozonioterapia
  - Cupons de clínicas parceiras
  - Cursos e treinamentos com desconto
  - Livros e materiais educativos
  - Suplementos e produtos de saúde
  
- **Estrutura de Dados:**
  ```typescript
  interface Deal {
    id: number;
    title: string;
    description: string;
    image_url: string;
    original_price: number;
    discount_price: number;
    discount_percentage: number;
    affiliate_link: string;
    merchant: string;
    category: DealCategory;
    expires_at?: Date;
    coupon_code?: string;
    is_featured: boolean;
    clicks_count: number;
    created_at: Date;
  }
  
  type DealCategory = 
    | 'equipamentos'
    | 'cursos'
    | 'consultas'
    | 'suplementos'
    | 'livros'
    | 'outros';
  ```

- **API Endpoints:**
  ```typescript
  GET /api/v1/deals
  GET /api/v1/deals/{id}
  GET /api/v1/deals/featured
  GET /api/v1/deals/category/{category}
  POST /api/v1/deals/{id}/click  // Tracking de conversão
  ```

- **Frontend Components:**
  ```typescript
  // src/components/DealCard.tsx
  interface DealCardProps {
    deal: Deal;
    variant?: 'horizontal' | 'vertical' | 'compact';
    showExpiry?: boolean;
  }
  
  // src/pages/Descontos.tsx
  // Página dedicada com filtros por categoria, ordenação, etc.
  
  // src/components/DealsBanner.tsx
  // Banner rotativo de ofertas em destaque
  ```

- **Monetização:**
  - Links de afiliado (Amazon, Hotmart, Eduzz)
  - Parcerias com clínicas e fabricantes
  - Cupons exclusivos para audiência do portal
  - Tracking de conversão via UTM parameters
  
- **Exibição:**
  - Página dedicada `/descontos`
  - Widget sidebar em artigos relacionados
  - Newsletter semanal "Melhores Ofertas da Semana"
  - Banner rotativo na homepage (opcional)
  - Badge "Oferta Expira em X horas" para urgência

**Casos de Uso:**
- Usuário pesquisa sobre ozonioterapia → vê oferta de curso com desconto
- Clínica parceira lança promoção → aparece em destaque
- Newsletter com cupom exclusivo para assinantes
- Comparação de preços de equipamentos

**Métricas de Sucesso:**
- CTR em deals vs outros conteúdos
- Taxa de conversão (clicks → compras)
- Receita de afiliados por mês
- Engajamento em newsletter de ofertas

**Prioridade:** 🟡 **Média** (potencial de monetização significativo)

**Dependências Técnicas:**
- Integração com plataformas de afiliados
- Sistema de tracking de clicks e conversões
- Scraper/API para atualização automática de preços (opcional)
- Sistema de expiração automática de ofertas

**Considerações Legais:**
- Disclosure de links de afiliado (compliance FTC/CONAR)
- Política de transparência sobre parcerias
- Termos de uso para ofertas de terceiros

---

### 3. 🔔 Newsletter / Email Marketing

**Status:** 📋 **Planejado**

**Descrição:**
Sistema de captura de leads e envio de newsletters segmentadas.

**Características:**
- Formulário de cadastro com double opt-in
- Segmentação por interesse (categorias)
- Templates responsivos
- Automação de envio semanal
- Integração com Mailchimp/SendGrid/Brevo

**Prioridade:** 🟡 **Média**

---

### 4. 💬 Sistema de Comentários

**Status:** 📋 **Planejado**

**Descrição:**
Sistema de comentários nativos ou integração com Disqus/Hyvor Talk.

**Características:**
- Autenticação via email/Google/Facebook
- Moderação de comentários
- Sistema de likes/replies
- Notificações de respostas
- Anti-spam (Akismet/reCAPTCHA)

**Prioridade:** 🟡 **Média**

---

### 5. 🔍 Busca Avançada

**Status:** 📋 **Planejado**

**Descrição:**
Sistema de busca com Algolia ou ElasticSearch.

**Características:**
- Busca full-text em artigos
- Autocomplete/suggestions
- Filtros por categoria, data, popularidade
- Busca por tags
- Histórico de pesquisas

**Prioridade:** 🟢 **Baixa** (implementar quando acervo crescer)

---

### 6. 📱 PWA / App Mobile

**Status:** 📋 **Planejado**

**Descrição:**
Progressive Web App com instalação e notificações push.

**Características:**
- Service Worker para cache offline
- Push notifications de novos artigos
- Ícone de instalação na home screen
- Modo offline para artigos salvos

**Prioridade:** 🟢 **Baixa**

---

### 7. 📊 Dashboard de Analytics Interno

**Status:** 📋 **Planejado**

**Descrição:**
Painel administrativo com métricas editoriais.

**Características:**
- Artigos mais visualizados
- Taxa de rejeição por categoria
- Origem do tráfego
- Performance de SEO
- Receita de ads/afiliados

**Prioridade:** 🟢 **Baixa**

---

## ✅ Features Já Implementadas

### 1. Sistema de Artigos
- ✅ Listagem paginada
- ✅ Detalhe de artigo
- ✅ Artigos relacionados
- ✅ Featured articles (Hero)
- ✅ Highlights secundários
- ✅ Latest news

### 2. Sistema de Categorias
- ✅ Listagem de categorias
- ✅ Artigos por categoria
- ✅ Breadcrumbs
- ✅ Contagem de artigos

### 3. SEO
- ✅ Meta tags dinâmicas
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD
- ✅ Robots.txt dinâmico
- ✅ Sitemap XML

### 4. AdSense
- ✅ Integração AdSense
- ✅ 9 slots configurados
- ✅ Mock mode para desenvolvimento
- ✅ Auto-inicialização de ads
- ✅ Ads responsivos

### 5. UI/UX
- ✅ Design responsivo (mobile-first)
- ✅ Tema dark/light
- ✅ Animações (RevealOnScroll)
- ✅ Skeleton loaders
- ✅ Scroll to top navigation
- ✅ Floating share buttons

### 6. Infraestrutura
- ✅ React + Vite + TypeScript
- ✅ TailwindCSS + shadcn/ui
- ✅ React Query (cache)
- ✅ React Router DOM
- ✅ Deploy Vercel
- ✅ Environment variables

---

## 🚀 Próximos Passos Recomendados

### Curto Prazo (1-2 meses)
1. **Trending Articles** - Alto impacto em engajamento
2. **Newsletter Básica** - Captura de leads desde o início
3. **Comentários** - Aumenta tempo de sessão e interação

### Médio Prazo (3-6 meses)
4. **Sistema de Descontos** - Monetização adicional
5. **Busca Avançada** - Quando houver 50+ artigos
6. **Analytics Dashboard** - Decisões baseadas em dados

### Longo Prazo (6-12 meses)
7. **PWA** - Quando audiência mobile > 60%
8. **App Nativo** - Se PWA mostrar alta taxa de instalação

---

## 📝 Notas

- Prioridades podem mudar baseado em métricas reais de produção
- Trending e Descontos têm maior potencial de ROI imediato
- Newsletter é fundamental para criar audiência própria (não depender só de SEO/Ads)
- Comentários aumentam engajamento mas requerem moderação

---

**Última atualização:** 03/12/2025
**Responsável:** Equipe Neutrino Soluções em Tecnologia
