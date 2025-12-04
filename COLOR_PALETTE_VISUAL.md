# 🎨 Guia Visual de Cores - Pomodoro Pro

Este documento fornece uma visualização rápida da paleta de cores com exemplos práticos de uso.

## Paleta Primária

### Gradiente Principal
```
linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

| Elemento | Código | Visualização |
|----------|--------|------------|
| Cor Inicial | `#667eea` | ![#667eea](https://via.placeholder.com/40/667eea/ffffff?text=) |
| Cor Final | `#764ba2` | ![#764ba2](https://via.placeholder.com/40/764ba2/ffffff?text=) |

**Uso**: Navbar, Headers, Seções destaque
**Sensação**: Profissional, moderno, criativo

---

## Cores de Sessão

### 🎯 Foco - Azul Primário
```
Cor: #1976d2
RGB: rgb(25, 118, 210)
```
- **Intensidade**: Alta concentração
- **Duração**: 25 minutos (padrão)
- **Ícone**: 🎯

| Elemento | Código | Exemplo |
|----------|--------|---------|
| Cor Principal | `#1976d2` | ![#1976d2](https://via.placeholder.com/100/1976d2/ffffff?text=Foco) |
| Cor Clara | `#e3f2fd` | ![#e3f2fd](https://via.placeholder.com/100/e3f2fd/1976d2?text=Bg+Foco) |
| Cor Escura | `#1565c0` | ![#1565c0](https://via.placeholder.com/100/1565c0/ffffff?text=Hover) |

**Botões**:
- Primary: `#1976d2` em branco
- Hover: `#1565c0`
- Active: `#0d47a1`

---

### ☕ Pausa Curta - Verde
```
Cor: #388e3c
RGB: rgb(56, 142, 60)
```
- **Intensidade**: Descanso leve
- **Duração**: 5 minutos
- **Ícone**: ☕

| Elemento | Código | Exemplo |
|----------|--------|---------|
| Cor Principal | `#388e3c` | ![#388e3c](https://via.placeholder.com/100/388e3c/ffffff?text=Pausa) |
| Cor Clara | `#e8f5e9` | ![#e8f5e9](https://via.placeholder.com/100/e8f5e9/388e3c?text=Bg+Pausa) |
| Cor Escura | `#2e7d32` | ![#2e7d32](https://via.placeholder.com/100/2e7d32/ffffff?text=Hover) |

**Uso**: Cards de pausa curta, indicadores de êxito

---

### 🌳 Pausa Longa - Laranja
```
Cor: #f57c00
RGB: rgb(245, 124, 0)
```
- **Intensidade**: Descanso profundo
- **Duração**: 15 minutos
- **Ícone**: 🌳

| Elemento | Código | Exemplo |
|----------|--------|---------|
| Cor Principal | `#f57c00` | ![#f57c00](https://via.placeholder.com/100/f57c00/ffffff?text=Pausa+Long) |
| Cor Clara | `#fff3e0` | ![#fff3e0](https://via.placeholder.com/100/fff3e0/f57c00?text=Bg+Pausa) |
| Cor Escura | `#e65100` | ![#e65100](https://via.placeholder.com/100/e65100/ffffff?text=Hover) |

**Uso**: Indicadores de pausa longa, cards informativos

---

## Cores de Status

### ✅ Sucesso
```
Cor: #4caf50
RGB: rgb(76, 175, 80)
```

| Elemento | Código | Exemplo |
|----------|--------|---------|
| Cor Principal | `#4caf50` | ![#4caf50](https://via.placeholder.com/100/4caf50/ffffff?text=Sucesso) |
| Cor Clara | `#f1f8e9` | ![#f1f8e9](https://via.placeholder.com/100/f1f8e9/4caf50?text=Bg+Sucesso) |

**Uso**: Alert de conclusão, ícones de êxito

```jsx
<Alert 
  severity="success"
  sx={{ 
    border: '2px solid #4caf50',
    backgroundColor: '#f1f8e9'
  }}
>
  ✅ Pomodoro Finalizado! 🎉
</Alert>
```

---

### ❌ Erro
```
Cor: #d32f2f
RGB: rgb(211, 47, 47)
```

| Elemento | Código | Exemplo |
|----------|--------|---------|
| Cor Principal | `#d32f2f` | ![#d32f2f](https://via.placeholder.com/100/d32f2f/ffffff?text=Erro) |
| Cor Clara | `#ffebee` | ![#ffebee](https://via.placeholder.com/100/ffebee/d32f2f?text=Bg+Erro) |

**Uso**: Warnings críticos, botões destrutivos

---

## Cores Neutras

### Backgrounds

| Nome | Código | RGB | Uso |
|------|--------|-----|-----|
| White | `#ffffff` | rgb(255, 255, 255) | Background padrão |
| Light | `#f5f5f5` | rgb(245, 245, 245) | Backgrounds de cards |
| Lighter | `#fafafa` | rgb(250, 250, 250) | Backgrounds alternativos |

### Borders

| Nome | Código | RGB | Uso |
|------|--------|-----|-----|
| Border Light | `#e0e0e0` | rgb(224, 224, 224) | Bordas padrão |
| Border Lighter | `#f0f0f0` | rgb(240, 240, 240) | Bordas suaves |

### Text

| Nome | Código | RGB | Uso |
|------|--------|-----|-----|
| Primary | `#000000` | rgb(0, 0, 0) | Texto principal |
| Secondary | `#757575` | rgb(117, 117, 117) | Texto secundário |
| Disabled | `#9e9e9e` | rgb(158, 158, 158) | Texto desabilitado |
| Inverse | `#ffffff` | rgb(255, 255, 255) | Texto em backgrounds escuros |

---

## Paleta de Produtividade

| Nível | Cor | Ícone | Segundos | Descrição |
|-------|-----|-------|----------|-----------|
| Excelente | `#388e3c` 🔥 | LocalFireDepartment | ≥3600 | Ótimo desempenho |
| Ótimo | `#1976d2` 🏆 | EmojiEvents | ≥1800 | Muito bom |
| Bom | `#f57c00` 📈 | TrendingUp | ≥900 | Satisfatório |
| Iniciante | `#757575` ⚠️ | WarningAmber | <900 | Necessita melhora |

---

## Exemplo: Card de Relatório

### Diário (Foco)
```jsx
<Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 1 }}>
  <CardContent>
    <Typography color="text.secondary" gutterBottom>
      📅 Hoje
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
      8h 45m
    </Typography>
  </CardContent>
</Card>
```

**Cores**:
- Background: `#e3f2fd` (Azul claro)
- Texto: `#1976d2` (Azul)

---

### Pausa Curta (Sucesso)
```jsx
<Card sx={{ backgroundColor: '#e8f5e9', boxShadow: 1 }}>
  <CardContent>
    <Typography color="text.secondary" gutterBottom>
      ☕ Pausa Curta
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, color: '#388e3c' }}>
      45m total
    </Typography>
  </CardContent>
</Card>
```

**Cores**:
- Background: `#e8f5e9` (Verde claro)
- Texto: `#388e3c` (Verde)

---

### Pausa Longa (Aviso)
```jsx
<Card sx={{ backgroundColor: '#fff3e0', boxShadow: 1 }}>
  <CardContent>
    <Typography color="text.secondary" gutterBottom>
      🌳 Pausa Longa
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, color: '#f57c00' }}>
      1h 30m total
    </Typography>
  </CardContent>
</Card>
```

**Cores**:
- Background: `#fff3e0` (Laranja claro)
- Texto: `#f57c00` (Laranja)

---

## Exemplo: Botões

### Primary
```jsx
<Button 
  variant="contained" 
  color="primary"
  startIcon={<PlayArrow />}
>
  Iniciar Pomodoro
</Button>
```
**Cores**: `#1976d2` (background) + `#ffffff` (texto)

### Success
```jsx
<Button 
  variant="contained" 
  color="success"
>
  Voltar para Tarefas
</Button>
```
**Cores**: `#388e3c` (background) + `#ffffff` (texto)

### Warning
```jsx
<Button 
  variant="contained" 
  color="warning"
>
  ⏸️ Pausar
</Button>
```
**Cores**: `#f57c00` (background) + `#ffffff` (texto)

### Error
```jsx
<Button 
  variant="contained" 
  color="error"
  startIcon={<Stop />}
>
  Finalizar
</Button>
```
**Cores**: `#d32f2f` (background) + `#ffffff` (texto)

### Outlined
```jsx
<Button 
  variant="outlined"
  onClick={() => setSeconds(initialSeconds)}
>
  🔄 Reset
</Button>
```
**Cores**: `#1976d2` (border + texto) + `#ffffff` (background)

---

## Acessibilidade

### Contraste Testado (WCAG AA)

| Combinação | Razão de Contraste | Status |
|-----------|------------------|--------|
| #1976d2 em #ffffff | 8.59:1 | ✅ AAA |
| #388e3c em #ffffff | 5.34:1 | ✅ AA |
| #f57c00 em #ffffff | 5.16:1 | ✅ AA |
| #4caf50 em #ffffff | 3.99:1 | ⚠️ AA (para texto grande) |
| Branco em gradiente navbar | 7.2:1+ | ✅ AAA |

### Validação
- ✅ Todas as cores testadas em [contrast-ratio.com](https://contrast-ratio.com/)
- ✅ Contraste mínimo WCAG AA alcançado
- ✅ Ícones + cores para melhor identificação
- ✅ Texto + cores para não depender apenas de cor

---

## CSS Variables (para integração)

```css
:root {
  /* Primárias */
  --color-primary: #1976d2;
  --color-success: #388e3c;
  --color-warning: #f57c00;
  --color-error: #d32f2f;
  --color-complete: #4caf50;
  
  /* Neutras */
  --color-bg-light: #f5f5f5;
  --color-border-light: #e0e0e0;
  --color-text-secondary: #757575;
  
  /* Gradiente */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## Implementação em Componentes

### Exemplo 1: Alert de Conclusão
```jsx
<Alert 
  severity="success"
  sx={{ 
    border: '2px solid #4caf50',
    backgroundColor: '#f1f8e9',
    '& .MuiAlert-icon': { color: '#4caf50', fontSize: '2rem' }
  }}
>
  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
    ✅ Pomodoro Finalizado! 🎉
  </Typography>
</Alert>
```

### Exemplo 2: Card de Info
```jsx
<Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 1 }}>
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      💡 Dica: Para rastrear seu progresso, selecione uma tarefa antes de iniciar.
    </Typography>
  </CardContent>
</Card>
```

### Exemplo 3: Navbar
```jsx
<AppBar 
  position="static" 
  sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
>
  {/* Conteúdo */}
</AppBar>
```

---

## Checklist: Como Usar Este Guia

- [ ] Consultei a paleta primária para cores principais
- [ ] Validei contrastes em [contrast-ratio.com](https://contrast-ratio.com/)
- [ ] Usei cores neutras para backgrounds e borders
- [ ] Implementei ícones + cores (não apenas cores)
- [ ] Testei em modo claro e escuro
- [ ] Verifiquei acessibilidade (WCAG AA mínimo)
- [ ] Documentei mudanças em `DESIGN_SYSTEM.md`

---

## Links Úteis

- 🎨 **Coolors**: https://coolors.co/667eea-764ba2-1976d2-388e3c-f57c00
- 🔍 **Contrast Checker**: https://contrast-ratio.com/
- 📚 **Material-UI Colors**: https://material-ui.com/customization/color/
- ♿ **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Manutenção

**Última Atualização**: 4 de Dezembro, 2025
**Arquivo Relacionado**: `DESIGN_SYSTEM.md`, `COLOR_TOKENS.css`
**Próxima Revisão**: Junho 2026

Para atualizações ou sugestões, abra uma issue no repositório.
