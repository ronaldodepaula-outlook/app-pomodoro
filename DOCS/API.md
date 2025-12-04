# API — Endpoints usados pelo Frontend

Esta documentação descreve os endpoints que o frontend consome, os formatos esperados e exemplos de requisição/resposta.

Base URL
- Exemplo: `http://192.168.1.9:8000/api` (configurável via `VITE_API_BASE_URL`).

Autenticação
- Todos os endpoints protegidos requerem header `Authorization: Bearer <token>`.

Endpoints principais

1) Autenticação (exemplos)
- POST `/login` — retorna token e usuário
- POST `/register` — cria usuário

2) Tasks
- GET `/tasks` — lista (paginação) — resposta típica: `{ data: [...], current_page, per_page, total }`
- GET `/tasks/:id` — obter tarefa
- POST `/tasks` — criar tarefa
- PUT `/tasks/:id` — atualizar tarefa (payload exemplo abaixo)
- DELETE `/tasks/:id` — remover tarefa

Exemplo payload para atualizar status e tags (usado pelo modal de atualização):
```
{
  "titulo": "Atualizado",
  "status": "completed",
  "tags": [1,2]
}
```

3) Tags
- GET `/tags` — lista tags (paginação)
- POST `/tags` — criar tag `{ nome: string }`
- GET `/tags/:id` — retorna tag (pode incluir `tasks` relacionadas)
- PUT `/tags/:id` — atualizar tag `{ nome: string }`
- DELETE `/tags/:id` — remover tag (retorna 409 se houver tasks relacionadas)

Exemplo resposta de listagem (paginada):
```
{
  "current_page": 1,
  "data": [{ "id":1, "nome":"React", "created_at": "..." }],
  "per_page": 50,
  "total": 3
}
```

4) Relatórios / Pomodoros
- GET `/relatorios/diario`
- GET `/relatorios/semanal`
- GET `/relatorios/mensal`
- GET `/relatorios/tarefas/:id/pomodoros` — retorna stats e lista paginada de pomodoros. O frontend aceita uma das formas: `res.data`, `res.data.data`, `res.data.pomodoros.data`, `res.data.pomodoros`, `res.data.results`, etc.

Formato de um pomodoro (exemplo):
```
{
  "id": 30,
  "user_id": 1,
  "task_id": 4,
  "tipo": "focus",
  "duracao_segundos": 1500,
  "iniciado_em": "2025-12-04T09:04:17.000000Z",
  "concluido_em": "2025-12-04T09:05:05.000000Z",
  "concluido": true
}
```

Erros e validação
- O backend retorna códigos HTTP apropriados e JSON com `message` e possivelmente `errors` (para validação). O frontend mostra mensagens ao usuário quando disponíveis.
