# Estratégia de Monetização - Página de Artigo

## Visão Geral
A página de artigo foi otimizada para **maximizar a receita com anúncios** mantendo uma excelente experiência do usuário, especialmente no **mobile** (nosso público principal).

## Distribuição de Ads (10 posições estratégicas)

### 📱 Mobile-First Approach

#### 1. **Top Mobile Ad** (Position 1)
- **Slot**: `article-top-mobile`
- **Formato**: Horizontal (320x50 ou 320x100)
- **Visibilidade**: Apenas mobile (`lg:hidden`)
- **Viewability**: ⭐⭐⭐⭐⭐ (Primeira coisa que usuário vê)
- **Estratégia**: Captura atenção imediata após breadcrumbs

#### 2. **After Hero Image** (Position 2)
- **Slot**: `article-after-hero`
- **Formato**: Horizontal (728x90 desktop, 320x100 mobile)
- **Viewability**: ⭐⭐⭐⭐⭐ (Alta engajamento pós-imagem)
- **Estratégia**: Usuário acabou de ver imagem impactante, alta atenção

#### 3. **Mid-Content #1** (Position 3)
- **Slot**: `article-mid-content-1`
- **Formato**: Horizontal
- **Posição**: Após introdução (~25% do conteúdo)
- **Viewability**: ⭐⭐⭐⭐⭐
- **Estratégia**: Usuário já está engajado com conteúdo

#### 4. **Mid-Content #2** (Position 4)
- **Slot**: `article-mid-content-2`
- **Formato**: Horizontal
- **Posição**: Após lista de aplicações práticas (~50% do conteúdo)
- **Viewability**: ⭐⭐⭐⭐⭐
- **Estratégia**: Meio do artigo, leitura ativa

#### 5. **Mid-Content #3** (Position 5)
- **Slot**: `article-mid-content-3`
- **Formato**: Horizontal
- **Posição**: Antes da conclusão (~75% do conteúdo)
- **Viewability**: ⭐⭐⭐⭐
- **Estratégia**: Usuário comprometido, chegou até aqui

#### 6. **Bottom Content** (Position 6)
- **Slot**: `article-bottom-content`
- **Formato**: Horizontal
- **Posição**: Após tags, antes do autor
- **Viewability**: ⭐⭐⭐⭐
- **Estratégia**: Final do conteúdo principal, alta taxa de leitura

### 💻 Desktop Sidebar (Sticky)

#### 7. **Sidebar Top** (Position 7)
- **Slot**: `article-sidebar-top`
- **Formato**: Vertical (300x600 - Half Page)
- **Visibilidade**: Apenas desktop (`hidden lg:block`)
- **Viewability**: ⭐⭐⭐⭐⭐ (Sempre visível durante scroll)
- **Estratégia**: Sticky position, acompanha leitura

#### 8. **Sidebar Bottom** (Position 8)
- **Slot**: `article-sidebar-bottom`
- **Formato**: Rectangle (300x250 - Medium Rectangle)
- **Visibilidade**: Apenas desktop
- **Viewability**: ⭐⭐⭐⭐
- **Estratégia**: Segundo ad na sidebar, scroll prolongado

### 📱 Mobile Bottom Section

#### 9. **Before Related (Mobile)** (Position 9)
- **Slot**: `article-before-related-mobile`
- **Formato**: Horizontal
- **Visibilidade**: Apenas mobile (`lg:hidden`)
- **Viewability**: ⭐⭐⭐⭐
- **Estratégia**: Transição entre artigo e conteúdo relacionado

### 🔄 Related Articles Section

#### 10. **Final Bottom** (Position 10)
- **Slot**: `article-final-bottom`
- **Formato**: Horizontal
- **Viewability**: ⭐⭐⭐
- **Estratégia**: Captura usuários que chegaram ao fim da página

## Métricas de Performance Esperadas

### Mobile (70% do tráfego)
- **Ads por página**: 7-8 anúncios
- **Viewability esperada**: 65-75%
- **RPM estimado**: 2-4x maior que layout anterior
- **Ads visíveis**: Média de 5-6 por sessão

### Desktop (30% do tráfego)
- **Ads por página**: 8-9 anúncios
- **Viewability esperada**: 70-80%
- **RPM estimado**: 3-5x maior que layout anterior
- **Sticky ads**: 2 sempre visíveis

## Otimizações Implementadas

### ✅ Viewability
- Ads posicionados entre conteúdo natural
- Espaçamento adequado (45s entre reloads)
- Sticky sidebar para desktop
- Mobile-first com ads em pontos de alta atenção

### ✅ User Experience
- Classe `not-prose` nos ads para não afetar tipografia
- Espaçamento consistente (`my-8`)
- Ads não quebram fluxo de leitura
- Integração visual suave

### ✅ Revenue Optimization
- **Densidade ideal**: 1 ad a cada 200-300 palavras
- **Formatos premium**: Half Page (300x600) na sidebar
- **Mobile priority**: Ads nas primeiras dobras
- **Strategic placement**: Após conteúdo de alto engajamento

### ✅ Technical
- Sistema de reload inteligente (45s mínimo)
- Lazy loading de imagens
- Overflow prevention
- Responsive breakpoints

## Recomendações AdSense

### Formatos Recomendados por Slot

**Mobile (Priority)**:
- `article-top-mobile`: 320x100 (Large Mobile Banner)
- `article-after-hero`: 320x100 ou 300x250
- `article-mid-content-*`: 320x100 ou Responsive
- `article-bottom-content`: 320x100 ou 300x250
- `article-before-related-mobile`: 320x100

**Desktop**:
- `article-after-hero`: 728x90 (Leaderboard) ou 970x90 (Large Leaderboard)
- `article-mid-content-*`: 728x90 ou Responsive
- `article-sidebar-top`: 300x600 (Half Page) ⭐ Premium
- `article-sidebar-bottom`: 300x250 (Medium Rectangle)
- `article-bottom-content`: 728x90

**Universal**:
- `article-related-ads`: Horizontal Responsive
- `article-final-bottom`: Horizontal Responsive

## A/B Testing Sugerido

### Teste 1: Densidade de Ads
- **A**: Layout atual (10 posições)
- **B**: Reduzir para 7 posições (remover 1 mid-content e related)
- **Métrica**: RPM vs Bounce Rate

### Teste 2: Formato Sidebar
- **A**: 300x600 + 300x250 (atual)
- **B**: 300x600 + 300x600 (2 Half Pages)
- **Métrica**: Sidebar CPM

### Teste 3: Mobile Top Position
- **A**: Ad imediatamente após breadcrumb (atual)
- **B**: Ad após título do artigo
- **Métrica**: Viewability + CTR

## Compliance & Best Practices

### ✅ AdSense Policies
- Densidade dentro dos limites (max 3 ads por viewport)
- Não mais de 1 ad por fold em mobile
- Reload mínimo de 45 segundos
- Ads claramente separados do conteúdo

### ✅ Core Web Vitals
- Ads lazy-loaded
- No layout shift (espaços reservados)
- Overflow prevention
- Async loading

### ✅ UX Guidelines
- Conteúdo primeiro, ads segundo
- Espaçamento respirável
- Não interrompe leitura crítica
- Mobile scroll otimizado

## ROI Projetado

### Cenário Conservador
- **Mobile RPM**: $3-5
- **Desktop RPM**: $5-8
- **Viewability**: 60%
- **Fill Rate**: 85%

### Cenário Otimista
- **Mobile RPM**: $6-10
- **Desktop RPM**: $10-15
- **Viewability**: 75%
- **Fill Rate**: 95%

### Incremento vs Layout Anterior
- **Receita total**: +200-350%
- **Por 1000 visualizações**: +$8-15
- **Por artigo (média)**: +$0.08-0.15

## Próximos Passos

1. ✅ Implementar ads no código
2. ⏳ Criar ad units no AdSense dashboard
3. ⏳ Configurar slots com IDs reais
4. ⏳ Monitorar viewability primeiras 48h
5. ⏳ A/B test densidade após 1 semana
6. ⏳ Otimizar formatos baseado em data
7. ⏳ Implementar heatmaps para análise de scroll

## Notas Importantes

- **Público mobile**: 70% - priorizamos experiência mobile
- **Tempo de leitura**: ~8 min - ads distribuídos estrategicamente
- **Scroll depth**: Média 60% - ads concentrados no primeiro 75%
- **Bounce rate alvo**: <40% - manter UX premium

---

**Última atualização**: 24/11/2025
**Versão**: 1.0
**Status**: ✅ Implementado - Aguardando configuração AdSense
