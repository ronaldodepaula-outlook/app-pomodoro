# Uso Operacional — Pomodoro Pro (Guia do Usuário)

Este documento orienta o fluxo operacional para usuários finais e operadores.

1) Login / Sessão
- Faça login com suas credenciais; o token é armazenado no `localStorage` para persistência entre recarregamentos.

2) Tarefas
- Criar tarefa: clique em `Nova Tarefa` e preencha título, descrição, prioridade e estimativa de pomodoros.
- Editar: use o botão `Editar` para alterar campos.
- Iniciar: clique em `Iniciar Tarefa` para abrir o temporizador com a tarefa selecionada; o timer registra pomodoros no backend.
- Atualizar status: botão `Status` abre modal para alterar o status (Pendente / Em Progresso / Concluído) e selecionar tags associadas.

3) Tags
- Gerencie tags em `Tags` no Navbar. Crie, edite e remova tags.
- Visualizar tag mostra tarefas associadas à tag e metadados.

4) Temporizador
- O timer utiliza contagem regressiva configurada (ex.: 25 minutos foco). Ao terminar, toca som de notificação (pode ser bloqueado por políticas de autoplay — interaja na página para permitir som).

5) Relatórios
- Na aba `Relatórios`, escolha formato: Diário / Semanal / Mensal / Por Tarefa.
- `Por Tarefa` permite selecionar uma tarefa e carregar pomodoros relacionados com ordenação/paginação.

6) Mensagens e erros
- Se ocorrer erro de rede ou validação, um alerta aparece com a mensagem do servidor (quando disponível).

7) Boas práticas operacionais
- Use um token com prazo de validade apropriado no backend. Para produção, prefira cookies HttpOnly.
- Mantenha as tags concisas e reutilize tags comuns para facilitar filtros e relatórios.
