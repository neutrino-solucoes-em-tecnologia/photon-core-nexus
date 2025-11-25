# API Integration Documentation - Photon Media

## 📋 Visão Geral

Este documento detalha todos os endpoints da API Laravel necessários para integração completa com o frontend React do Photon Media.

**Base URL:** `https://api.photonmedia.com.br/api/v1`

**Content-Type:** `application/json`

**Rate Limit:** 60 requisições/minuto

---

## 📰 Artigos

### GET /articles
Lista artigos com paginação e filtros.

**Query Parameters:**
- `page` (int) - Página atual (default: 1)
- `per_page` (int) - Itens por página (default: 12, max: 50)
- `category` (string) - Slug da categoria
- `author` (int) - ID do autor
- `tag` (string) - Slug da tag
- `search` (string) - Busca por título/conteúdo
- `sort` (string) - `latest`, `oldest`, `popular`, `trending`
- `featured` (boolean) - Apenas artigos em destaque

**Request:**
```
GET /articles?page=1&per_page=12&category=tecnologia&sort=latest
```

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "futuro-ia-empresas",
      "title": "O Futuro da IA nas Empresas: Transformação Digital em 2025",
      "subtitle": "Como a inteligência artificial está revolucionando processos empresariais",
      "excerpt": "Descubra como a IA está transformando...",
      "featured_image": "https://cdn.photonmedia.com.br/images/articles/1.jpg",
      "category": {
        "id": 1,
        "slug": "tecnologia",
        "name": "Tecnologia",
        "color": "#0C4767"
      },
      "author": {
        "id": 1,
        "name": "Ana Silva",
        "avatar": "https://cdn.photonmedia.com.br/avatars/1.jpg",
        "bio": "Jornalista especializada em tecnologia"
      },
      "tags": [
        { "id": 1, "slug": "ia", "name": "Inteligência Artificial" },
        { "id": 2, "slug": "transformacao-digital", "name": "Transformação Digital" }
      ],
      "read_time": "8 min",
      "views": 1542,
      "comments_count": 23,
      "is_featured": true,
      "published_at": "2025-01-15T10:30:00.000000Z",
      "created_at": "2025-01-14T15:00:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 156,
    "last_page": 13,
    "from": 1,
    "to": 12
  },
  "links": {
    "first": "https://api.photonmedia.com.br/api/v1/articles?page=1",
    "last": "https://api.photonmedia.com.br/api/v1/articles?page=13",
    "prev": null,
    "next": "https://api.photonmedia.com.br/api/v1/articles?page=2"
  }
}
```

---

### GET /articles/{slug}
Obtém detalhes completos de um artigo.

**Response 200:**
```json
{
  "id": 1,
  "slug": "futuro-ia-empresas",
  "title": "O Futuro da IA nas Empresas: Transformação Digital em 2025",
  "subtitle": "Como a inteligência artificial está revolucionando processos empresariais e criando novas oportunidades de negócio",
  "excerpt": "Descubra como a IA está transformando o mundo corporativo...",
  "content": "<h2>Introdução</h2><p>A inteligência artificial...</p>",
  "featured_image": "https://cdn.photonmedia.com.br/images/articles/1.jpg",
  "category": {
    "id": 1,
    "slug": "tecnologia",
    "name": "Tecnologia",
    "description": "Últimas novidades em tecnologia e inovação",
    "icon": "cpu",
    "color": "#0C4767"
  },
  "author": {
    "id": 1,
    "name": "Ana Silva",
    "email": "ana@photonmedia.com.br",
    "avatar": "https://cdn.photonmedia.com.br/avatars/1.jpg",
    "bio": "Jornalista especializada em tecnologia com 10 anos de experiência",
    "website": "https://anasilva.com.br",
    "social": {
      "twitter": "@anasilva",
      "linkedin": "anasilva"
    }
  },
  "tags": [
    { "id": 1, "slug": "ia", "name": "Inteligência Artificial" },
    { "id": 2, "slug": "transformacao-digital", "name": "Transformação Digital" }
  ],
  "read_time": "8 min",
  "views": 1542,
  "comments_count": 23,
  "is_featured": true,
  "published_at": "2025-01-15T10:30:00.000000Z",
  "created_at": "2025-01-14T15:00:00.000000Z",
  "updated_at": "2025-01-15T10:30:00.000000Z",
  "meta": {
    "seo_title": "O Futuro da IA nas Empresas | Photon Media",
    "seo_description": "Como a inteligência artificial está revolucionando...",
    "seo_keywords": ["inteligência artificial", "IA", "transformação digital"]
  }
}
```

**Errors:**
- `404` - Artigo não encontrado

---

### GET /articles/featured
Obtém artigos em destaque para a Home (Hero Section).

**Query Parameters:**
- `limit` (int) - Número de artigos (default: 4, max: 10)

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "revolucao-ia-assistentes-inteligentes",
      "title": "Revolução da IA: Como Assistentes Inteligentes Estão Transformando o Trabalho",
      "excerpt": "Descubra como os assistentes de IA...",
      "featured_image": "https://cdn.photonmedia.com.br/images/hero/1.jpg",
      "category": {
        "id": 1,
        "slug": "tecnologia",
        "name": "Tecnologia",
        "color": "#0C4767"
      },
      "author": {
        "id": 1,
        "name": "Ana Silva",
        "avatar": "https://cdn.photonmedia.com.br/avatars/1.jpg"
      },
      "read_time": "5 min",
      "views": 2341,
      "published_at": "2025-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

### GET /articles/highlights
Obtém destaques secundários (Featured Highlights).

**Query Parameters:**
- `limit` (int) - Número de artigos (default: 4)

**Response:** Mesmo formato do `/articles/featured`

---

### GET /articles/latest
Obtém últimas notícias (News Feed).

**Query Parameters:**
- `limit` (int) - Número de artigos (default: 6)
- `exclude` (array) - IDs de artigos a excluir

**Response 200:**
```json
{
  "data": [
    {
      "id": 5,
      "slug": "openai-gpt5-lancamento",
      "title": "OpenAI Lança GPT-5: Nova Era da Inteligência Artificial",
      "excerpt": "A mais recente versão do modelo de linguagem...",
      "featured_image": "https://cdn.photonmedia.com.br/images/news/1.jpg",
      "category": {
        "slug": "tecnologia",
        "name": "Tecnologia",
        "color": "#0C4767"
      },
      "author": {
        "name": "Carlos Santos",
        "avatar": "https://cdn.photonmedia.com.br/avatars/2.jpg"
      },
      "read_time": "6 min",
      "views": 3421,
      "published_at": "2025-01-15T14:20:00.000000Z"
    }
  ]
}
```

---

### GET /articles/{slug}/related
Obtém artigos relacionados a um artigo específico.

**Query Parameters:**
- `limit` (int) - Número de artigos (default: 3)

**Response 200:**
```json
{
  "data": [
    {
      "id": 2,
      "slug": "machine-learning-aplicacoes-praticas",
      "title": "Machine Learning: Aplicações Práticas no Dia a Dia",
      "excerpt": "Como o aprendizado de máquina está presente...",
      "featured_image": "https://cdn.photonmedia.com.br/images/related/1.jpg",
      "category": {
        "slug": "tecnologia",
        "name": "Tecnologia"
      },
      "author": {
        "name": "Ana Silva",
        "avatar": "https://cdn.photonmedia.com.br/avatars/1.jpg"
      },
      "read_time": "7 min",
      "views": 1823,
      "published_at": "2025-01-14T09:15:00.000000Z"
    }
  ]
}
```

---

## 🗂️ Categorias

### GET /categories
Lista todas as categorias.

**Query Parameters:**
- `include_children` (boolean) - Incluir subcategorias
- `with_counts` (boolean) - Incluir contagem de artigos

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "tecnologia",
      "name": "Tecnologia",
      "description": "Últimas novidades em tecnologia e inovação",
      "icon": "cpu",
      "color": "#0C4767",
      "parent_id": null,
      "articles_count": 156,
      "created_at": "2025-01-01T00:00:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z"
    },
    {
      "id": 2,
      "slug": "negocios",
      "name": "Negócios",
      "description": "Tendências e análises do mundo dos negócios",
      "icon": "briefcase",
      "color": "#059669",
      "parent_id": null,
      "articles_count": 98,
      "created_at": "2025-01-01T00:00:00.000000Z",
      "updated_at": "2025-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

### GET /categories/{slug}
Obtém detalhes de uma categoria específica.

**Response 200:**
```json
{
  "id": 1,
  "slug": "tecnologia",
  "name": "Tecnologia",
  "description": "Últimas novidades em tecnologia e inovação",
  "icon": "cpu",
  "color": "#0C4767",
  "parent_id": null,
  "articles_count": 156,
  "views_total": 45678,
  "views_30d": 12345,
  "created_at": "2025-01-01T00:00:00.000000Z",
  "updated_at": "2025-01-15T10:30:00.000000Z"
}
```

**Errors:**
- `404` - Categoria não encontrada

---

### GET /categories/{slug}/articles
Lista artigos de uma categoria específica.

**Query Parameters:**
- `page` (int) - Página atual
- `per_page` (int) - Itens por página
- `sort` (string) - Ordenação

**Response:** Mesmo formato do `/articles` (paginado)

---

## 💬 Comentários

### GET /articles/{slug}/comments
Lista comentários de um artigo.

**Query Parameters:**
- `page` (int) - Página atual
- `per_page` (int) - Itens por página (default: 20)
- `sort` (string) - `latest`, `oldest`, `popular`
- `parent_id` (int|null) - ID do comentário pai (para respostas)

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "article_id": 1,
      "user": {
        "id": 5,
        "name": "Maria Santos",
        "avatar": "https://cdn.photonmedia.com.br/avatars/5.jpg"
      },
      "parent_id": null,
      "content": "Excelente artigo! Muito esclarecedor sobre o futuro da IA.",
      "likes_count": 12,
      "replies_count": 3,
      "is_edited": false,
      "is_pinned": false,
      "created_at": "2025-01-15T11:45:00.000000Z",
      "updated_at": "2025-01-15T11:45:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 23,
    "last_page": 2
  }
}
```

---

### POST /articles/{slug}/comments
Cria um novo comentário (público, sem autenticação).

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "content": "Ótimo artigo! Muito informativo.",
  "parent_id": null
}
```

**Response 201:**
```json
{
  "id": 24,
  "article_id": 1,
  "user": {
    "name": "João Silva",
    "avatar": null
  },
  "parent_id": null,
  "content": "Ótimo artigo! Muito informativo.",
  "likes_count": 0,
  "replies_count": 0,
  "is_edited": false,
  "created_at": "2025-01-15T15:30:00.000000Z"
}
```

**Errors:**
- `422` - Validation errors (nome/email/conteúdo obrigatórios)
- `429` - Rate limit exceeded

---

## 🔍 Busca

### GET /search
Busca global por artigos, categorias e tags.

**Query Parameters:**
- `q` (string) - Termo de busca (obrigatório)
- `type` (string) - Tipo: `all`, `articles`, `categories`, `tags` (default: `all`)
- `limit` (int) - Limite de resultados por tipo (default: 10)

**Response 200:**
```json
{
  "articles": [
    {
      "id": 1,
      "slug": "futuro-ia-empresas",
      "title": "O Futuro da IA nas Empresas",
      "excerpt": "Descubra como a IA...",
      "featured_image": "https://...",
      "category": { "slug": "tecnologia", "name": "Tecnologia" },
      "author": { "name": "Ana Silva" },
      "published_at": "2025-01-15T10:30:00.000000Z"
    }
  ],
  "categories": [
    {
      "id": 1,
      "slug": "tecnologia",
      "name": "Tecnologia",
      "description": "Últimas novidades...",
      "articles_count": 156
    }
  ],
  "tags": [
    {
      "id": 1,
      "slug": "ia",
      "name": "Inteligência Artificial",
      "articles_count": 45
    }
  ],
  "total": 202
}
```

---

## 📊 Estatísticas e Trending

### GET /stats/trending
Obtém artigos em alta (trending).

**Query Parameters:**
- `limit` (int) - Número de artigos (default: 10)
- `period` (string) - `24h`, `7d`, `30d` (default: `24h`)

**Response 200:**
```json
{
  "data": [
    {
      "article": {
        "id": 1,
        "slug": "futuro-ia-empresas",
        "title": "O Futuro da IA nas Empresas",
        "excerpt": "Descubra como...",
        "featured_image": "https://...",
        "category": { "slug": "tecnologia", "name": "Tecnologia" },
        "published_at": "2025-01-15T10:30:00.000000Z"
      },
      "score": 95.5,
      "views_24h": 3421,
      "trend": "up"
    }
  ]
}
```

---

### GET /stats/popular-categories
Obtém categorias mais populares.

**Query Parameters:**
- `limit` (int) - Número de categorias (default: 5)
- `period` (string) - `7d`, `30d`, `all` (default: `30d`)

**Response 200:**
```json
{
  "data": [
    {
      "category": {
        "id": 1,
        "slug": "tecnologia",
        "name": "Tecnologia",
        "color": "#0C4767"
      },
      "articles_count": 156,
      "views_total": 45678,
      "views_30d": 12345
    }
  ]
}
```

---

## 📬 Contato

### POST /contact
Envia mensagem de contato.

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "subject": "Dúvida sobre publicidade",
  "message": "Gostaria de saber mais sobre...",
  "phone": "+5511999999999"
}
```

**Response 200:**
```json
{
  "message": "Mensagem enviada com sucesso! Entraremos em contato em breve."
}
```

**Errors:**
- `422` - Validation errors
- `429` - Rate limit exceeded

---

## 📧 Newsletter

### POST /newsletter/subscribe
Inscreve email na newsletter.

**Request:**
```json
{
  "email": "joao@email.com",
  "name": "João Silva"
}
```

**Response 200:**
```json
{
  "message": "Inscrição realizada com sucesso! Verifique seu email."
}
```

**Errors:**
- `422` - Email inválido ou já inscrito
- `429` - Rate limit exceeded

---

### POST /newsletter/unsubscribe
Cancela inscrição na newsletter.

**Request:**
```json
{
  "email": "joao@email.com",
  "token": "abc123def456"
}
```

**Response 200:**
```json
{
  "message": "Inscrição cancelada com sucesso."
}
```

---

## 🏷️ Tags

### GET /tags
Lista todas as tags.

**Query Parameters:**
- `popular` (boolean) - Apenas tags populares
- `limit` (int) - Número de tags

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "inteligencia-artificial",
      "name": "Inteligência Artificial",
      "description": "Artigos sobre IA e machine learning",
      "articles_count": 45,
      "created_at": "2025-01-01T00:00:00.000000Z"
    }
  ]
}
```

---

### GET /tags/{slug}
Obtém detalhes de uma tag.

**Response 200:**
```json
{
  "id": 1,
  "slug": "inteligencia-artificial",
  "name": "Inteligência Artificial",
  "description": "Artigos sobre IA e machine learning",
  "articles_count": 45,
  "created_at": "2025-01-01T00:00:00.000000Z",
  "updated_at": "2025-01-15T10:30:00.000000Z"
}
```

---

### GET /tags/{slug}/articles
Lista artigos de uma tag.

**Query Parameters:**
- `page` (int) - Página atual
- `per_page` (int) - Itens por página

**Response:** Mesmo formato do `/articles` (paginado)

---

## ⚠️ Tratamento de Erros

### Estrutura de Erro Padrão

```json
{
  "message": "Mensagem de erro legível",
  "errors": {
    "field": ["Erro de validação específico"]
  },
  "status": 422
}
```

### Códigos de Status HTTP

- `200` - OK (sucesso)
- `201` - Created (recurso criado)
- `400` - Bad Request (requisição inválida)
- `404` - Not Found (recurso não encontrado)
- `422` - Unprocessable Entity (erro de validação)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error (erro do servidor)

---

## 🔒 Segurança

### CORS
- **Allowed Origins:** `https://photonmedia.com.br`, `https://www.photonmedia.com.br`
- **Allowed Methods:** `GET, POST, PUT, DELETE, OPTIONS`
- **Allowed Headers:** `Content-Type, Accept, X-Requested-With`

### Rate Limiting
- **Geral:** 60 requisições/minuto
- **Comentários:** 5 comentários/hora por IP
- **Newsletter:** 3 tentativas/hora por IP
- **Contato:** 3 mensagens/hora por IP

### Validação de Dados
- Todos os inputs são sanitizados
- HTML em comentários é escapado automaticamente
- Proteção contra XSS e SQL Injection

---

## 🧪 Ambiente de Testes

**Base URL de Teste:** `https://staging-api.photonmedia.com.br/api/v1`

**Características:**
- Dados de teste pré-populados
- Rate limit mais permissivo (120 req/min)
- Logs detalhados de requisições
- Resetável diariamente

---

## 📝 Versionamento da API

- **Versão Atual:** `v1`
- **URL:** `/api/v1/...`
- **Formato:** Versionamento via URL
- **Deprecação:** Versões antigas suportadas por 6 meses após nova versão

---

## 🔄 Cache

### Headers de Cache

```
Cache-Control: public, max-age=300
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 15 Jan 2025 10:30:00 GMT
```

### Estratégia de Cache
- **Artigos:** 5 minutos
- **Categorias:** 30 minutos
- **Tags:** 30 minutos
- **Trending:** 10 minutos
- **Featured:** 5 minutos

---

## 📚 Recursos Adicionais

- **Documentação Interativa:** https://api.photonmedia.com.br/docs
- **Postman Collection:** Disponível em `/docs/postman`
- **OpenAPI/Swagger:** Disponível em `/docs/openapi.json`
- **Status da API:** https://status.photonmedia.com.br

---

**Última atualização:** 24/11/2025
