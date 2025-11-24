# Google AdSense - Guia de Configuração

## 🔧 Configuração Inicial

### 1. Obter Client ID do AdSense

1. Acesse [Google AdSense](https://www.google.com/adsense)
2. Faça login com sua conta Google
3. Vá em **Anúncios** → **Visão Geral**
4. Copie seu **Client ID** (formato: `ca-pub-XXXXXXXXXXXXXXXX`)

### 2. Configurar o Client ID no Projeto

**Arquivo: `index.html`**
```html
<!-- Substitua XXXXXXXXXXXXXXXX pelo seu Client ID real -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 crossorigin="anonymous"></script>
```

**Arquivo: `src/components/DynamicAd.tsx`**
```typescript
// Linha 13 - Substitua pelo seu Client ID
client = 'ca-pub-XXXXXXXXXXXXXXXX'
```

**Arquivo: `src/components/InfiniteScrollWithAds.tsx`**
```typescript
// Linha 20 - Substitua pelo seu Client ID
adClient = 'ca-pub-XXXXXXXXXXXXXXXX'
```

### 3. Criar Blocos de Anúncios no AdSense

No painel do AdSense:

1. Vá em **Anúncios** → **Por unidade de anúncio**
2. Clique em **+ Novo bloco de anúncios**
3. Escolha **Anúncio gráfico** (display ad)
4. Configure:
   - **Nome**: `Home After Hero` (ou outro nome descritivo)
   - **Tamanho**: Responsivo
   - **Tipo**: Auto-adaptável
5. Clique em **Criar**
6. Copie o **ID do bloco de anúncio** (formato: `XXXXXXXXXXX`)

### 4. Atualizar Slots dos Anúncios

**Arquivo: `src/pages/Home.tsx`**

Substitua os slots pelos IDs reais dos blocos criados:

```tsx
{/* Ad Block 1 - Após Hero */}
<DynamicAd 
  slot="1234567890"  // ← Substitua pelo ID real
  format="auto" 
  position={1}
/>

{/* Ad Block 2 - Após Highlights */}
<DynamicAd 
  slot="0987654321"  // ← Substitua pelo ID real
  format="auto" 
  position={2}
/>
```

## 📋 Blocos de Anúncios Criados

Crie os seguintes blocos no AdSense e anote os IDs:

| Posição | Nome Sugerido | Formato | Slot ID | Status |
|---------|---------------|---------|---------|--------|
| 1 | Home - After Hero | Auto | `_________` | ⬜ |
| 2 | Home - After Highlights | Auto | `_________` | ⬜ |
| 3 | Home - After NewsFeed | Auto | `_________` | ⬜ |
| 4 | Home - After Featured | Auto | `_________` | ⬜ |

## 🎨 Formatos Disponíveis

O componente `DynamicAd` suporta os seguintes formatos:

### `auto` (Recomendado)
- **Uso**: Anúncios responsivos automáticos
- **Vantagem**: Se adapta a qualquer tamanho de tela
- **Config**: `format="auto"`

### `horizontal`
- **Uso**: Banners horizontais (728x90, 320x50)
- **Melhor para**: Desktop e mobile
- **Config**: `format="horizontal"`

### `vertical`
- **Uso**: Skyscraper vertical (160x600, 120x600)
- **Melhor para**: Sidebars
- **Config**: `format="vertical"`

### `rectangle`
- **Uso**: Retângulo médio (300x250)
- **Melhor para**: Conteúdo inline
- **Config**: `format="rectangle"`

## ⚙️ Configuração Avançada

### Reload Dinâmico

O componente já está configurado para:
- ✅ Carregar anúncio quando entra no viewport (50% visível)
- ✅ Recarregar quando usuário rola mais de 1 viewport
- ✅ Evitar reloads muito frequentes (mínimo 400px de scroll)
- ✅ Aguardar 1.5s após usuário parar de rolar

### Ajustar Sensibilidade do Reload

**Arquivo: `src/components/DynamicAd.tsx`**

```typescript
// Linha 52 - Distância mínima de scroll para reload
if (Math.abs(currentY - lastLoadY) < 400 && loadCount > 0) {
  return; // Ajuste o valor 400 para mais/menos sensível
}

// Linha 99 - Tempo de espera após scroll
}, 1500); // Ajuste 1500ms (1.5s) para mais/menos tempo
```

### Threshold de Visibilidade

```typescript
// Linha 73 - Porcentagem visível para ativar
{
  threshold: 0.5, // 0.5 = 50% visível
  rootMargin: '100px', // Pré-carrega 100px antes
}
```

## 🚀 Deploy e Validação

### Antes do Deploy

1. ✅ Substituir todos os `XXXXXXXXXXXXXXXX` pelo Client ID real
2. ✅ Substituir todos os slots pelos IDs reais dos blocos
3. ✅ Remover indicadores de desenvolvimento (opcional):
   ```typescript
   // Linha 128 - Comentar ou remover em produção
   {process.env.NODE_ENV === 'development' && (
     // ... código de debug
   )}
   ```

### Após Deploy

1. Acesse o site em produção
2. Abra o DevTools Console
3. Verifique logs do AdSense:
   ```
   [AdSense 1234567890] Anúncio carregado - Posição: 1, Carga #1
   ```
4. No AdSense, verifique se os anúncios aparecem como "Ativos"

### Verificação de Impressões

- Primeiras impressões podem levar **até 48h** para aparecer no painel
- Status do bloco muda de "Aguardando" para "Ativo"
- Verifique métricas em **Relatórios** → **Anúncios**

## 🔍 Troubleshooting

### Anúncios não aparecem

**Problema**: Apenas espaço em branco onde deveria ter anúncio

**Soluções**:
1. Verifique se o Client ID está correto em `index.html` e `DynamicAd.tsx`
2. Verifique se os Slot IDs estão corretos
3. Verifique Console por erros do AdSense
4. Aguarde até 20 minutos para primeira carga (cache do AdSense)
5. Desative bloqueadores de anúncios durante testes

### Erro "adsbygoogle.push() error"

**Problema**: Console mostra erro ao tentar carregar anúncio

**Soluções**:
1. Verifique se o script do AdSense está carregando:
   ```javascript
   console.log(window.adsbygoogle); // Deve retornar um array
   ```
2. Verifique se não há conflitos com outros scripts
3. Teste em janela anônima (sem extensões)

### Anúncios carregam muito devagar

**Problema**: Delay excessivo no carregamento

**Soluções**:
1. Verifique conexão de internet
2. Reduza o `rootMargin` para pré-carregar mais cedo:
   ```typescript
   rootMargin: '200px', // Aumentar de 100px para 200px
   ```
3. Considere usar `data-adtest="on"` durante desenvolvimento

## 🔄 Infinite Scroll com Ads

### Uso Básico

O componente `InfiniteScrollWithAds` injeta ads automaticamente entre itens conforme você rola:

```tsx
import { useState } from 'react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import InfiniteScrollWithAds from '@/components/InfiniteScrollWithAds';
import ArticleCard from '@/components/ArticleCard';

export default function FeedPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newArticles = await fetchArticles(page);
    setArticles(prev => [...prev, ...newArticles]);
    setPage(prev => prev + 1);
    
    if (newArticles.length === 0) {
      setHasMore(false);
    }
  };

  const { loaderRef, isLoading } = useInfiniteScroll({
    loadMore,
    hasMore,
    threshold: 0.8,
    rootMargin: '400px',
  });

  return (
    <div className="container">
      {/* Grid com Ads Automáticos */}
      <InfiniteScrollWithAds
        items={articles}
        renderItem={(article) => <ArticleCard {...article} />}
        itemsBetweenAds={6}  // Ad a cada 6 artigos
        adSlot="1234567890"  // Seu slot do AdSense
        adFormat="auto"
        containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        adClassName="md:col-span-2 lg:col-span-3" // Ad ocupa linha completa
      />

      {/* Loader */}
      {hasMore && (
        <div ref={loaderRef}>
          {isLoading && <p>Carregando...</p>}
        </div>
      )}
    </div>
  );
}
```

### Configuração do InfiniteScrollWithAds

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `items` | `T[]` | - | Array de itens a renderizar |
| `renderItem` | `(item: T, index: number) => ReactNode` | - | Função para renderizar cada item |
| `itemsBetweenAds` | `number` | `6` | Número de itens entre cada ad |
| `adSlot` | `string` | - | Slot ID do AdSense |
| `adClient` | `string` | `'ca-pub-XXX'` | Client ID do AdSense |
| `adFormat` | `'auto' \| 'horizontal' \| 'vertical' \| 'rectangle'` | `'auto'` | Formato do ad |
| `containerClassName` | `string` | `''` | Classes CSS do container |
| `itemClassName` | `string` | `''` | Classes CSS de cada item |
| `adClassName` | `string` | `''` | Classes CSS dos ads |

### Configuração do useInfiniteScroll

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `loadMore` | `() => Promise<void> \| void` | - | Função que carrega mais itens |
| `hasMore` | `boolean` | - | Se há mais itens para carregar |
| `threshold` | `number` | `0.5` | % do loader visível para disparar (0-1) |
| `rootMargin` | `string` | `'200px'` | Distância antes do loader para disparar |

### Estratégias de Posicionamento

**1. Ad a cada N itens (Recomendado)**
```tsx
itemsBetweenAds={6}  // Ad a cada 6 artigos
```

**2. Ad ocupando linha completa em grid**
```tsx
containerClassName="grid grid-cols-3 gap-6"
adClassName="col-span-3"  // Ad ocupa as 3 colunas
```

**3. Ad ocupando largura responsiva**
```tsx
containerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
adClassName="sm:col-span-2 lg:col-span-3"  // Ad adapta por breakpoint
```

**4. Ads em sidebar vertical (Desktop)**
```tsx
// Layout de duas colunas
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
  {/* Feed principal */}
  <InfiniteScrollWithAds
    items={articles}
    renderItem={(article) => <ArticleCard {...article} />}
    itemsBetweenAds={8}
    adSlot="1234567890"
  />
  
  {/* Sidebar com ad fixo */}
  <aside className="hidden lg:block sticky top-20">
    <DynamicAd 
      slot="0987654321" 
      format="vertical"
      infiniteScroll={false}
    />
  </aside>
</div>
```

### Exemplo Completo

Veja o arquivo `src/pages/InfiniteScrollExample.tsx` para um exemplo completo funcionando.

### Otimização de Performance

**1. Virtualização (Para muitos itens)**

Para feeds muito grandes (>100 itens), considere usar virtualização:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

// Apenas os itens visíveis são renderizados
// Ads são injetados nas posições calculadas
```

**2. Lazy Loading de Imagens**

```tsx
<img 
  src={article.image} 
  loading="lazy"  // Carregamento lazy nativo
  decoding="async"
/>
```

**3. Debounce do Scroll**

O hook `useInfiniteScroll` já implementa debounce, mas você pode ajustar:

```tsx
const { loaderRef } = useInfiniteScroll({
  loadMore,
  hasMore,
  rootMargin: '600px',  // Aumentar para carregar mais cedo
});
```

## 📊 Políticas do AdSense

⚠️ **IMPORTANTE**: Respeite as políticas do Google AdSense:

- ❌ Não clique nos próprios anúncios
- ❌ Não peça para usuários clicarem
- ❌ Não coloque mais de 3 anúncios por página (desktop)
- ✅ Mantenha distância adequada entre anúncios
- ✅ Indique claramente que é publicidade
- ✅ Conteúdo deve seguir políticas de conteúdo do Google

## 🎯 Otimização de Receita

### Melhores Posições

1. **Após Hero** (Position 1): Alta visibilidade ⭐⭐⭐⭐⭐
2. **Meio do conteúdo** (Position 2-3): Bom engajamento ⭐⭐⭐⭐
3. **Antes do Footer** (Position 4): Boa visibilidade ⭐⭐⭐

### A/B Testing

Teste diferentes configurações:
- Formato: `auto` vs `horizontal` vs `rectangle`
- Quantidade de anúncios: 2 vs 3 vs 4 blocos
- Posições: Entre seções vs dentro de seções

### Análise de Performance

Monitore no AdSense:
- **CTR** (Click-through rate): Ideal > 1%
- **RPM** (Revenue per 1000 impressions): Varia por nicho
- **Viewability**: Ideal > 60%

## 📞 Suporte

- **Documentação Oficial**: https://support.google.com/adsense
- **Central de Ajuda**: https://support.google.com/adsense/community
- **Status AdSense**: https://www.google.com/appsstatus#hl=pt-BR&v=status&ts=1

---

**Última atualização**: 24 de novembro de 2025
