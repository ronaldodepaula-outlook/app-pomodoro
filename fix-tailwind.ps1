Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "     Corrigindo projeto Tailwind + Vite..." -ForegroundColor Green
Write-Host "==============================================`n"

# 1) Verificar se package.json existe
if (!(Test-Path "package.json")) {
    Write-Host "ERRO: Este script precisa ser executado na raiz do projeto React!" -ForegroundColor Red
    exit
}

# 2) Instalar os pacotes corretos
Write-Host "📦 Instalando @tailwindcss/postcss ..." -ForegroundColor Yellow
npm install @tailwindcss/postcss --save-dev

Write-Host "📦 Instalando tailwindcss, postcss e autoprefixer ..." -ForegroundColor Yellow
npm install tailwindcss postcss autoprefixer --save-dev

# 3) Criar postcss.config.cjs
Write-Host "📝 Criando postcss.config.cjs ..." -ForegroundColor Yellow
@"
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}
"@ | Set-Content -Encoding UTF8 "postcss.config.cjs"

# 4) Criar tailwind.config.cjs
Write-Host "📝 Criando tailwind.config.cjs (Tailwind v4) ..." -ForegroundColor Yellow
@"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
}
"@ | Set-Content -Encoding UTF8 "tailwind.config.cjs"

# 5) Criar/ajustar index.css
Write-Host "📝 Ajustando src/index.css ..." -ForegroundColor Yellow

if (!(Test-Path "src/index.css")) {
    New-Item -Path "src/index.css" -ItemType File | Out-Null
}

@"
@import "tailwindcss";

html,body,#root { height: 100%; }
body { background-color: #f8fafc; }
"@ | Set-Content -Encoding UTF8 "src/index.css"

# 6) Limpeza de cache
Write-Host "🧹 Limpando cache do npm ..." -ForegroundColor Yellow
npm cache clean --force

# 7) Instruções finais
Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host " Tailwind corrigido com sucesso! 🎉" -ForegroundColor Green
Write-Host " Agora execute:" -ForegroundColor Yellow
Write-Host "     npm install" -ForegroundColor White
Write-Host "     npm run dev" -ForegroundColor White
Write-Host "==============================================`n"
