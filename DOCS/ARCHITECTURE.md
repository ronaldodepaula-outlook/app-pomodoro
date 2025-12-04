# Arquitetura — Pomodoro Pro (Frontend)

Esta documentação descreve a arquitetura e decisões de implementação do frontend da aplicação Pomodoro Pro.

Visão geral
- Aplicação SPA construída com React e empacotada por Vite.
- UI: Material-UI (MUI v5) para componentes prontos e responsivos.
- Estado global mínimo: Zustand para autenticação e persistência de sessão.
- Comunicação HTTP: axios com cliente em `src/services/api.js` que injeta o token do localStorage no header `Authorization`.

Pastas principais
- `src/pages/` — views/rotas da aplicação (Dashboard, Timer, Reports, Settings, Auth, Tasks, Tags).
- `src/components/` — componentes compartilhados (Navbar, ProtectedRoute, UpdateTaskModal, etc.).
- `src/services/` — wrappers axios para recursos (`api.js`, `task.service.js`, `tag.service.js`, `pomodoro.service.js`).
- `src/stores/` — stores Zustand (ex.: `authStore.js`).
- `src/utils/` — utilitários como `useInterval.js` e `useSound.js`.

Fluxo de autenticação
1. Ao carregar a SPA, `main.jsx` inicializa a store `authStore` que carrega token e usuário do `localStorage`.
2. `api.js` configura um interceptor que adiciona `Authorization: Bearer <token>` a cada requisição.
3. Rotas protegidas usam `ProtectedRoute` que redireciona para `/login` se o usuário não estiver autenticado.

Comunicação com backend
- Endpoints REST convencionais (JSON). Principais serviços frontend:
  - `task.service.js`: `/tasks` CRUD
  - `tag.service.js`: `/tags` CRUD
  - `pomodoro.service.js`: `/pomodoros` e relatórios `/relatorios/*`
- O frontend assume formatos comuns: respostas paginadas com `data`, `current_page`, `per_page`, `total`.

Decisões importantes
- Web Audio API: `src/utils/useSound.js` cria um AudioContext compartilhado e chama `resume()` antes de tocar para lidar com políticas de autoplay.
- Robustez de parsing: endpoints de relatórios podem ter formatos variados; o código tenta detectar arrays em várias propriedades (`data`, `pomodoros.data`, `results`, `items`).

Escalabilidade & Manutenção
- Separação por serviços facilita trocar a URL-base ou adicionar headers/telemetria globalmente.
- Componentes pequenos e testáveis (ex.: `UpdateTaskModal`) — fácil de reutilizar.

Observações
- A arquitetura atual centraliza a autenticação via localStorage; se for necessário maior segurança, mover para HttpOnly cookies e servir o frontend via backend é recomendado.
