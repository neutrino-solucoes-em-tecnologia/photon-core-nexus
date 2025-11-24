# Environment Variables

Este projeto usa variáveis de ambiente para configuração sensível.

## Configuração Local

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edite o arquivo `.env` com suas credenciais:**
   ```env
   VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

3. **Obtenha seu Google AdSense Client ID:**
   - Acesse [Google AdSense](https://www.google.com/adsense/)
   - Faça login na sua conta
   - Vá em **Conta → Informações da conta**
   - Copie seu **ID do editor** (formato: `ca-pub-XXXXXXXXXXXXXXXX`)

## Variáveis Disponíveis

### `VITE_ADSENSE_CLIENT_ID`
- **Tipo:** String
- **Formato:** `ca-pub-XXXXXXXXXXXXXXXX`
- **Obrigatório:** Sim
- **Descrição:** ID do publisher do Google AdSense
- **Onde usar:** Componente `DynamicAd` e script do AdSense no `index.html`

## Desenvolvimento

Durante o desenvolvimento, o Vite carrega automaticamente as variáveis do arquivo `.env`.

**Importante:**
- Variáveis devem começar com `VITE_` para serem expostas ao código client-side
- Reinicie o servidor de desenvolvimento após alterar o `.env`
- Nunca commite o arquivo `.env` (está no `.gitignore`)

## Produção

Para deploy em produção, configure as variáveis de ambiente na sua plataforma:

### Vercel
```bash
vercel env add VITE_ADSENSE_CLIENT_ID
```

### Netlify
```bash
netlify env:set VITE_ADSENSE_CLIENT_ID ca-pub-XXXXXXXXXXXXXXXX
```

### Outras plataformas
Consulte a documentação da sua plataforma de hosting sobre como configurar variáveis de ambiente.

## Segurança

⚠️ **IMPORTANTE:**
- O arquivo `.env` **NÃO** deve ser commitado ao Git
- O arquivo `.env.example` pode (e deve) ser commitado como template
- Variáveis com `VITE_` são **públicas** (expostas no bundle)
- Não coloque chaves secretas/privadas em variáveis `VITE_`

## Troubleshooting

### AdSense não carrega
- Verifique se `VITE_ADSENSE_CLIENT_ID` está definido no `.env`
- Confirme que o formato é `ca-pub-XXXXXXXXXXXXXXXX`
- Reinicie o servidor de desenvolvimento (`npm run dev`)

### Variável retorna undefined
- Certifique-se que a variável começa com `VITE_`
- Verifique se não há espaços no arquivo `.env`
- Use `import.meta.env.VITE_VARIAVEL` para acessar

## Exemplo de Uso

```typescript
// Em qualquer componente React
const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

// Com fallback
const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-default';
```
