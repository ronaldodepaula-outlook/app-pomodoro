# Pomodoro Pro — Web

Frontend React + Vite da aplicação Pomodoro Pro — gerenciador de tarefas com temporizador Pomodoro, relatórios e tags.

Status: Em desenvolvimento

Principais características
- Temporizador Pomodoro integrado por tarefa
- Persistência de sessão (login com token)
- Gestão de tarefas (CRUD)
- Gestão de tags (CRUD) com associação a tasks
- Relatórios: diário, semanal, mensal e por tarefa (com paginação/ordenacão)
- Notificações sonoras ao concluir um pomodoro (Web Audio API)

Stack
- React 18 + Vite
- Material-UI (MUI v5)
- Axios para comunicação HTTP
- Zustand para estado de autenticação (localStorage)

Links rápidos
- Código: este repositório
- Documentação técnica: `DOCS/ARCHITECTURE.md` `DOCS/API.md` `DOCS/USAGE.md` `DOCS/DEPLOY.md`

Quickstart (Windows PowerShell)

```powershell
# Instale dependências
npm install

# Rodar em modo dev
npm run dev --force

# Build de produção
npm run build

# Rodar servidor de preview (após build)
npm run preview
```

Ambiente
- Crie um `.env` na raiz (veja `vite.config.js` se usará `VITE_` vars). Principais variáveis:
	- `VITE_API_BASE_URL` — URL base da API (ex: `http://192.168.1.9:8000/api`)

Publicação no GitHub
- Adicione screenshots em `public/screenshots/` e atualize o README com exemplos visuais.
- Use `README.md` como página inicial do repo; configure `topics` e `description` no GitHub para ganhar visibilidade.

Próximos passos
- Atualizar a documentação de API se houver mudanças no backend.
- Adicionar exemplos de integração (curl / Postman).

Veja `DOCS/` para documentação completa.

Acesse o Link: https://ronaldodepaula-outlook.github.io/login
