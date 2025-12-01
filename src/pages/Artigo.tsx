import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Share2, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '@/components/ArticleCard';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingShare from '@/components/FloatingShare';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useAdSenseInit, useAdSense } from '@/hooks/use-adsense';
import { useArticle, useRelatedArticles } from '@/hooks/use-articles';

export default function Artigo() {
  const { slug } = useParams();
  const { isEnabled } = useAdSenseInit(3);
  const { clientId } = useAdSense();
  
  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);
  
  // Fetch article data from API
  const { data: article, isLoading: articleLoading, error: articleError } = useArticle(slug || '');
  const { data: relatedArticles = [], isLoading: relatedLoading } = useRelatedArticles(slug || '');
  
  const isLoading = articleLoading;
  
  // Calculate read time from paragraphs
  const readTime = article?.paragraphs ? (() => {
    const wordCount = article.paragraphs.reduce((total, p) => {
      const text = p.content.replace(/<[^>]*>/g, '');
      return total + text.split(/\s+/).length;
    }, 0);
    return Math.max(1, Math.ceil(wordCount / 200));
  })() : 8;
  
  // Format dates
  const formattedDate = article?.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';
  
  const formattedShortDate = article?.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '';
  
  const formattedUpdatedDate = article?.updated_at
    ? `Atualizado: ${new Date(article.updated_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })} às ${new Date(article.updated_at).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    : '';

  const handleShare = async () => {
    if (!article) return;
    
    const shareData = {
      title: article.title,
      text: article.description || article.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="page-transition min-h-screen">
      <ScrollProgress />
      <FloatingShare />
      
      {/* Error State */}
      {articleError && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Artigo não encontrado</h2>
            <p className="text-muted-foreground">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/">Voltar para o início</Link>
            </Button>
          </div>
        </div>
      )}
      
      {/* Breadcrumbs */}
      {!articleError && (
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary hover:underline font-semibold transition-colors">
              Início
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/categoria/${article?.category?.slug || 'tecnologia'}`} className="text-primary hover:underline font-semibold transition-colors">
              {article?.category?.name || 'Categoria'}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Artigo</span>
          </nav>
        </div>
      </RevealOnScroll>
      )}

      {/* Main Container */}
      {!articleError && (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Main Content */}
          <article className="w-full">
            
            {isLoading ? (
              // Skeleton Loading State
              <>
                {/* Header Skeleton */}
                <RevealOnScroll>
                  <header className="mb-8 space-y-6">
                    {/* Title skeleton */}
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-4/5" />
                    </div>

                    {/* Subtitle skeleton */}
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>

                    {/* Meta info skeleton */}
                    <div className="py-4 border-y border-border/50">
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </header>
                </RevealOnScroll>

                {/* Hero Image Skeleton */}
                <RevealOnScroll>
                  <Skeleton className="w-full aspect-video rounded-xl mb-8" />
                </RevealOnScroll>

                {/* Article Actions Skeleton */}
                <RevealOnScroll>
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-32" />
                  </div>
                </RevealOnScroll>

                {/* Article Body Skeleton */}
                <RevealOnScroll>
                  <div className="space-y-4 mb-8">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <div className="pt-4 space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="pt-4 space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Tags Skeleton */}
                <RevealOnScroll>
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-8 w-24 rounded-full" />
                      <Skeleton className="h-8 w-32 rounded-full" />
                      <Skeleton className="h-8 w-20 rounded-full" />
                      <Skeleton className="h-8 w-28 rounded-full" />
                    </div>
                  </div>
                </RevealOnScroll>
              </>
            ) : article ? (
              // Actual Article Content
              <>
            {/* Article Header */}
            <RevealOnScroll>
              <header className="mb-10">
                {/* Category Badge */}
                {article.category && (
                  <div className="mb-6">
                    <Link to={`/categoria/${article.category.slug}`}>
                      <Badge 
                        variant="outline" 
                        className="px-4 py-1.5 text-sm font-semibold uppercase tracking-wide bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {article.category.name}
                      </Badge>
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                  {article.title}
                </h1>

                {/* Subtitle/Description */}
                {article.description && (
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed font-light">
                  {article.description}
                </p>
                )}

                {/* Meta Info - Enhanced */}
                <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border/50">
                  <div className="flex items-center gap-2 article-meta-badge">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{formattedShortDate}</span>
                  </div>
                  <div className="flex items-center gap-2 article-meta-badge">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{readTime} min de leitura</span>
                  </div>
                  {formattedUpdatedDate && (
                    <div className="text-xs text-muted-foreground hidden md:block">
                      {formattedUpdatedDate}
                    </div>
                  )}
                </div>
              </header>
            </RevealOnScroll>

            {/* ARTIGO-TITULO-01 */}
            {isEnabled && (
              <div className="mb-8 not-prose">
                <ins 
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client={clientId}
                  data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_TITULO_01}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            )}

            {/* Hero Image */}
            {article.image_url && (
            <RevealOnScroll>
              <figure className="mb-12">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={article.image_url}
                    alt={article.image_alt || article.title}
                    className="w-full aspect-video object-cover transform hover:scale-105 transition-transform duration-700"
                    {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  />
                </div>
                {article.image_alt && (
                  <figcaption className="article-image-caption mt-4">
                    {article.image_alt}
                  </figcaption>
                )}
              </figure>
            </RevealOnScroll>
            )}

            {/* Introductory Section */}
            <RevealOnScroll>
              <div className="mb-12">
                <div className="section-divider">
                  <span>Artigo</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Article Body - Paragraphs from API */}
            {article.paragraphs && article.paragraphs.length > 0 ? (
              article.paragraphs
                .sort((a, b) => a.order - b.order)
                .map((paragraph, index) => (
                  <React.Fragment key={paragraph.id}>
                    <RevealOnScroll>
                      <div 
                        className={`prose prose-lg max-w-none article-content ${index === 0 ? 'drop-cap' : ''}`}
                        dangerouslySetInnerHTML={{ __html: paragraph.content }}
                      />
                    </RevealOnScroll>
                    
                    {/* ARTIGO-TITULO-02 - Após primeiro parágrafo */}
                    {index === 0 && isEnabled && (
                      <div className="my-8 not-prose">
                        <ins 
                          className="adsbygoogle"
                          style={{ display: 'block' }}
                          data-ad-client={clientId}
                          data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_TITULO_02}
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        />
                      </div>
                    )}
                    
                    {/* ARTIGO-CORPO-01 - No meio do artigo */}
                    {index === Math.floor(article.paragraphs.length / 2) && isEnabled && (
                      <div className="my-8 not-prose">
                        <ins 
                          className="adsbygoogle"
                          style={{ display: 'block' }}
                          data-ad-client={clientId}
                          data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_CORPO_01}
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))
            ) : (
              <RevealOnScroll>
                <div className="prose prose-lg max-w-none article-content">
                  <p>Conteúdo não disponível.</p>
                </div>
              </RevealOnScroll>
            )}

            {/* Tags Section */}
            {article.metadata?.tags && Array.isArray(article.metadata.tags) && article.metadata.tags.length > 0 && (
            <RevealOnScroll>
              <div className="mt-16 pt-10 border-t border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Tópicos deste artigo</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {article.metadata.tags.map((tag: string) => (
                    <Link key={tag} to={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}>
                      <Badge 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer hover-lift px-4 py-2 text-sm font-medium border-2"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
                
                {/* Share Section */}
                <div className="mt-10 pt-8 border-t border-border/50 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Gostou deste artigo?</p>
                  <Button variant="default" size="lg" className="hover-lift" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
            )}
            </>
            ) : null}

          </article>
      </div>
      )}

      {/* Related Articles */}
      {!articleError && relatedArticles.length > 0 && (
      <section className="wide-container py-12 mt-16 lg:mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Continue Lendo</h2>
          <p className="text-muted-foreground text-lg">Artigos relacionados que podem te interessar</p>
        </div>
        
        {relatedLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(4).fill(null).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="w-full aspect-video rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-full">
            {relatedArticles.slice(0, 4).map((relatedArticle) => {
              const relatedReadTime = relatedArticle.paragraphs ? (() => {
                const wordCount = relatedArticle.paragraphs.reduce((total, p) => {
                  const text = p.content.replace(/<[^>]*>/g, '');
                  return total + text.split(/\\s+/).length;
                }, 0);
                return Math.max(1, Math.ceil(wordCount / 200));
              })() : 5;
              
              return (
              <article key={relatedArticle.slug} className="group w-full max-w-full">
                <Link to={`/artigo/${relatedArticle.slug}`}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-md mb-3 aspect-video bg-muted">
                    {relatedArticle.image_url ? (
                    <img
                      src={relatedArticle.image_url}
                      alt={relatedArticle.image_alt || relatedArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        <span className="text-4xl font-bold opacity-20">
                          {relatedArticle.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {relatedArticle.category && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                      {relatedArticle.category.name}
                    </span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-2">
                    {relatedArticle.title}
                  </h3>
                  
                  {/* Meta */}
                  <div className="text-xs text-muted-foreground">
                    {relatedReadTime} min de leitura
                  </div>
                </Link>
              </article>
              );
            })}
        </div>
        )}
      </section>
      )}
    </div>
  );
}
