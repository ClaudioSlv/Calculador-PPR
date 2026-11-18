# Meu PPR e Dobras

Aplicação publicada em https://calculador-ppr.claudio1748.workers.dev/.

Código sincronizado da versão em produção em 18/11/2026, incluindo cálculo de PPR, dobras, escala e instalação PWA com ícones Android e iPhone. O ícone Android usa `any maskable` para preencher a área do ícone.

## Arquivos

- `worker.mjs`: código completo do Worker em produção, incluindo HTML, manifest, service worker e imagens incorporadas.
- `index.html`: HTML extraído da mesma versão para consulta e edição. A publicação usa o HTML incorporado em `worker.mjs`; mantenha ambos sincronizados ao editar.
- `wrangler.jsonc`: configuração mínima de implantação no Cloudflare Workers.

## Publicação

Com Node.js e acesso à conta Cloudflare:

```sh
npx wrangler deploy
```

O código contém uma rota opcional `/api/config` que consulta `env.DB`. O Worker consultado não possui bindings configurados; sem um binding D1 chamado `DB`, essa rota retorna indisponibilidade. Dados de banco e credenciais não fazem parte deste repositório.
