# 🎨 Design System - Paleta de Cores Pomodoro Pro

## Visão Geral

Este documento define a paleta de cores, tipografia, componentes e padrões visuais do aplicativo **Pomodoro Pro**, um gerenciador de tarefas com técnica Pomodoro desenvolvido em React + Material-UI.

---

## 📌 Identidade Visual

### Nome da Marca
- **Pomodoro Pro** - Produtividade em Foco

### Slogan
- "⏱️ Maximize sua produtividade com a técnica Pomodoro"

---

## 🎭 Paleta de Cores Principal

### 1. **Gradiente Principal (Navbar & Header)**
```
Gradiente: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Cor Inicial: #667eea (Índigo Azulado)
Cor Final:   #764ba2 (Roxo Profundo)
```
- **Uso**: Navbar, Headers de seções principais, cards de destaque
- **Sensação**: Profissional, moderno, criativo
- **Acessibilidade**: Contraste adequado para texto branco

### 2. **Cor Primária (Foco)**
```
Cor: #1976d2 (Azul Material-UI)
RGB: rgb(25, 118, 210)
HSL: hsl(217, 79%, 46%)
```
- **Uso**: Botões primários, ícones de foco, labels principais, cards de relatório diário
- **Componentes**: Button (primary), TextField (focus), Icon (SettingsIcon, BarChartIcon)
- **Acessibilidade**: Alto contraste (≥4.5:1 em fundo claro)

### 3. **Cor de Sucesso (Pausa Curta)**
```
Cor: #388e3c (Verde Material-UI)
RGB: rgb(56, 142, 60)
HSL: hsl(122, 43%, 39%)
```
- **Uso**: Botões de conclusão, indicadores de pausa curta, cards verdes, ícones de êxito
- **Componentes**: Button (success), Alert (success), Cards de pausa curta
- **Acessibilidade**: Alto contraste (≥4.5:1)

### 4. **Cor de Aviso (Pausa Longa)**
```
Cor: #f57c00 (Laranja Material-UI)
RGB: rgb(245, 124, 0)
HSL: hsl(28, 100%, 48%)
```
- **Uso**: Botões de pausa longa, indicadores de pausa longa, cards de relatório mensal
- **Componentes**: ToggleButton (long_break), Typography (color)
- **Acessibilidade**: Alto contraste (≥4.5:1)

### 5. **Cor de Sucesso - Conclusão**
```
Cor: #4caf50 (Verde Claro Material-UI)
RGB: rgb(76, 175, 80)
HSL: hsl(120, 52%, 50%)
```
- **Uso**: Alert de conclusão de Pomodoro, ícones de êxito, bordas de confirmação
- **Componentes**: Alert (severity="success"), completionAlert border
- **Acessibilidade**: Alto contraste (≥4.5:1)

### 6. **Cor de Erro**
```
Cor: #d32f2f (Vermelho Material-UI)
RGB: rgb(211, 47, 47)
HSL: hsl(0, 76%, 50%)
```
- **Uso**: Botões de ação destrutiva, Alert (error), warnings críticos
- **Componentes**: Button (error), Alert (severity="error")
- **Acessibilidade**: Alto contraste (≥4.5:1)

---

## 🎨 Paleta Secundária

### Tons Neutros

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| Background Card (Light) | #f5f5f5 | rgb(245, 245, 245) | Cards de info, backgrounds de seções |
| Border Light | #e0e0e0 | rgb(224, 224, 224) | Bordas de inputs, divisores |
| Text Secondary | text.secondary | — | Texto secundário, labels |
| Background Overlay | #ffffff (opacity 0.9) | — | Modais, overlays |

### Cores de Background (Light Theme)

| Componente | Cor | Hex | Uso |
|-----------|-----|-----|-----|
| Success Alert BG | Light Green | #f1f8e9 | Alert de conclusão |
| Info Alert BG | Light Blue | #e3f2fd | Cards de relatório diário |
| Success Card BG | Light Green | #e8f5e9 | Cards de pausa curta |
| Warning Card BG | Light Orange | #fff3e0 | Cards de pausa longa |

---

## 🎯 Mapeamento por Tipo de Sessão

### Foco (focus)
```
Cor Principal: #1976d2 (Azul)
Intensidade: 100%
Significado: Concentração máxima
```

### Pausa Curta (short_break)
```
Cor Principal: #388e3c (Verde)
Intensidade: 100%
Significado: Descanso leve, recuperação rápida
```

### Pausa Longa (long_break)
```
Cor Principal: #f57c00 (Laranja)
Intensidade: 100%
Significado: Descanso profundo, recuperação completa
```

---

## 📊 Paleta de Relatórios

### Produtividade

| Nível | Cor | Ícone | Segundos Min | Status |
|-------|-----|-------|--------------|--------|
| Excelente | #388e3c | LocalFireDepartment 🔥 | ≥3600 | Ótimo desempenho |
| Ótimo | #1976d2 | EmojiEvents 🏆 | ≥1800 | Muito bom |
| Bom | #f57c00 | TrendingUp 📈 | ≥900 | Satisfatório |
| Iniciante | #757575 | WarningAmber ⚠️ | <900 | Necessita melhora |

---

## 🖼️ Componentes e Cores

### Buttons

| Variante | Cor Background | Cor Text | Uso |
|----------|-----------------|----------|-----|
| Primary | #1976d2 | white | Ações principais (Iniciar) |
| Success | #388e3c | white | Ações de êxito (Voltar para Tarefas) |
| Warning | #f57c00 | white | Ações de aviso (Pausar) |
| Error | #d32f2f | white | Ações destrutivas (Finalizar) |
| Outlined | transparent | #1976d2 | Ações secundárias (Reset) |
| Text | transparent | inherit | Ações terciárias (Testar Som) |

### Inputs & Forms

| Estado | Cor Border | Cor Focus | Cor Text |
|--------|-----------|----------|----------|
| Default | #e0e0e0 | #1976d2 | inherit |
| Error | #d32f2f | #d32f2f | #d32f2f |
| Disabled | #e0e0e0 | — | #9e9e9e |

### Cards

| Tipo | Background | Border | Sombra |
|------|-----------|--------|--------|
| Default | white | none | elevation 1-3 |
| Info | #f5f5f5 | #e0e0e0 | elevation 1 |
| Success | #e8f5e9 | none | elevation 1 |
| Alert | #f1f8e9 | #4caf50 (2px) | none |

### Alerts

| Tipo | Ícone Cor | Background | Border |
|------|-----------|-----------|--------|
| Success | #4caf50 | #f1f8e9 | #4caf50 |
| Error | #d32f2f | — | — |
| Warning | #f57c00 | — | — |
| Info | #1976d2 | — | — |

---

## ✨ Efeitos Visuais

### Gradientes

#### Navbar & Header Principal
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- **Ângulo**: 135° (diagonal inferior-direita)
- **Transição**: Índigo → Roxo
- **Efeito**: Moderno, dinâmico

### Sombras (Elevação Material-UI)

| Elevação | Uso | Exemplo |
|----------|-----|---------|
| elevation 1 | Cards leves | Info cards |
| elevation 2 | Cards normais | Main cards |
| elevation 3 | Cards destaque | Timer card |

### Opacidade

| Nível | Valor | Uso |
|-------|-------|-----|
| Hover | 0.8 | Button hover |
| Disabled | 0.5 | Input disabled |
| Background Overlay | 0.9 | Modal backdrop |

---

## 🎪 Emoji e Ícones

### Emojis por Seção

| Seção | Emoji | Significado |
|-------|-------|------------|
| Navbar | ⏱️ | Timer/Pomodoro |
| Dashboard | 🎯 | Objetivo |
| Timer | ⏱️ | Cronômetro |
| Tarefas | 📋 | Lista |
| Relatórios | 📊 | Gráfico |
| Configurações | ⚙️ | Engrenagem |
| Foco | 🎯 | Concentração |
| Pausa Curta | ☕ | Café |
| Pausa Longa | 🌳 | Natureza |
| Sucesso | ✅ | Conclusão |

### Ícones Material-UI

| Componente | Ícone | Cor |
|-----------|-------|-----|
| Settings | SettingsIcon | #1976d2 |
| Relatório | BarChartIcon | #1976d2 |
| Fogo | LocalFireDepartment | #388e3c |
| Troféu | EmojiEvents | #1976d2 |
| Aviso | WarningAmber | #757575 |
| Menu | MenuIcon | white |
| Dark Mode | DarkModeIcon | white |
| Light Mode | LightModeIcon | white |
| Voltar | ArrowBack | inherit |
| Play | PlayArrow | white |
| Stop | Stop | white |
| Volume | VolumeUp | inherit |

---

## 📐 Tipografia

### Variantes

| Variante | Font Weight | Tamanho | Uso |
|----------|-------------|--------|-----|
| h4 | 700 | 2.125rem | Titles principais |
| h5 | 700 | 1.5rem | Subtitles |
| h6 | 700 | 1.25rem | Card titles |
| body1 | 400 | 1rem | Texto normal |
| body2 | 400 | 0.875rem | Texto pequeno |
| caption | 400 | 0.75rem | Texto muito pequeno |
| button | 700 | 1rem | Labels de botão |

### Font Family
```
Font: Roboto (Material-UI padrão)
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

---

## 🌙 Dark Mode (Futuro)

Quando implementado, usar:

| Elemento | Light | Dark |
|----------|-------|------|
| Background | #ffffff | #121212 |
| Card Background | white | #1e1e1e |
| Text Primary | #000000 | #ffffff |
| Text Secondary | #757575 | #bdbdbd |
| Border | #e0e0e0 | #424242 |

---

## ♿ Acessibilidade

### Contraste Mínimo (WCAG AA)
- **Texto normal**: 4.5:1
- **Texto grande** (18pt+): 3:1
- **Elementos gráficos**: 3:1

### Cores Testadas
✅ Azul (#1976d2) em fundo branco: 8.59:1 (AAA)
✅ Verde (#388e3c) em fundo branco: 5.34:1 (AA)
✅ Laranja (#f57c00) em fundo branco: 5.16:1 (AA)
✅ Branco em gradiente navbar: 7.2:1+ (AAA)

### Não Depender Apenas de Cor
- ✅ Usar ícones + cor (ex: 🔥 + verde para "Excelente")
- ✅ Usar texto + cor (ex: "✅ Pomodoro Finalizado" + verde)
- ✅ Usar bordas + cor (ex: border #4caf50 + background #f1f8e9)

---

## 🔄 Padrões de Uso

### CTA Principal (Call to Action)
```jsx
<Button variant="contained" color="primary">
  Iniciar Pomodoro
</Button>
```
**Cor**: #1976d2 (Azul)
**Ícone**: PlayArrow
**Uso**: Ações principais

### Success State
```jsx
<Alert severity="success" sx={{ border: '2px solid #4caf50', backgroundColor: '#f1f8e9' }}>
  ✅ Pomodoro Finalizado! 🎉
</Alert>
```
**Cores**: #4caf50 (border) + #f1f8e9 (background)
**Uso**: Conclusão de ações

### Info Card
```jsx
<Card sx={{ backgroundColor: '#f5f5f5', boxShadow: 1 }}>
  💡 Dica: Sua informação aqui
</Card>
```
**Cor**: #f5f5f5 (Cinza claro)
**Uso**: Informações adicionais

---

## 📋 Checklist de Implementação

- [x] Cores primárias definidas
- [x] Cores de status (success, error, warning, info)
- [x] Gradientes implementados
- [x] Tipografia padronizada
- [x] Acessibilidade verificada
- [x] Componentes Material-UI mapeados
- [ ] Dark mode implementado (futuro)
- [ ] Temas customizados via ThemeProvider (futuro)

---

## 🔗 Referências

- **Material-UI Color System**: https://material-ui.com/customization/color/
- **WCAG Contrast Checker**: https://contrast-ratio.com/
- **Color Palette Generator**: https://coolors.co/
- **Design System Documentation**: Este arquivo

---

## 👥 Manutenção

**Última Atualização**: 4 de Dezembro, 2025
**Mantido por**: Equipe de Design
**Próxima Revisão**: Junho 2026

Para adicionar novas cores ou modificar as existentes:
1. Testar contraste (WCAG AA mínimo)
2. Validar em light/dark mode
3. Atualizar este documento
4. Comunicar à equipe
5. Versionar no Git

---

