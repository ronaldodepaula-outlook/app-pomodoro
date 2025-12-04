# Deploy & Infra (Frontend)

Este documento descreve maneiras práticas de publicar o frontend e integrar com a API.

Requisitos
- Node.js LTS
- Ambiente de hosting estático (Netlify, Vercel, GitHub Pages, S3 + CloudFront) ou servidor que sirva os arquivos estáticos.

Build
- Executar `npm run build` gera a pasta `dist/` pronta para deploy.

Sugestões de hospedagem
- Vercel / Netlify: configurar build command `npm run build` e `dist` como diretório de saída. Configure variáveis de ambiente (ex: `VITE_API_BASE_URL`).
- GitHub Pages: usar action ou workflow para build e deploy para `gh-pages` branch (ex.: `cra-to-gh-pages` ou GH Action que roda `npm run build` e publica `dist`).
- S3 + CloudFront: subir `dist` para um bucket S3 público e configurar CloudFront para CDN.

Configurações de produção
- Defina `VITE_API_BASE_URL` apontando para o backend de produção.
- Habilite HTTPS e CORS no backend para o domínio do frontend.

Integração com backend
- Mantenha versionamento da API (ex: `/api/v1/`) para evitar breaking changes.

Observações de segurança
- Nunca insira tokens de produção diretamente no código — use variáveis de ambiente no host.
- Para maior segurança de autenticação, use cookies HttpOnly em vez de localStorage.
