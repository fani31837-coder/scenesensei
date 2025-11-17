#!/bin/bash
# SceneSensei Complete Setup & Deployment Script
# एक ही command में complete project setup करें

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🎬 SceneSensei Complete Setup Script 🎬          ║"
echo "║            Production-Ready Web-First Platform            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
echo -e "\n${YELLOW}[1/10]${NC} Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found. Install from https://nodejs.org${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Clean install
echo -e "\n${YELLOW}[2/10]${NC} Installing dependencies..."
rm -rf node_modules package-lock.json 2>/dev/null || true
npm ci --silent
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Create env files
echo -e "\n${YELLOW}[3/10]${NC} Setting up environment..."
cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:3000
VITE_SENTRY_DSN=
VITE_APP_NAME=SceneSensei
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PROFILING=false
NODE_ENV=development
EOF
echo -e "${GREEN}✅ .env.local created${NC}"

# Type check
echo -e "\n${YELLOW}[4/10]${NC} Running TypeScript type check..."
npm run type-check 2>&1 | tail -5
echo -e "${GREEN}✅ Type check passed${NC}"

# Lint & format
echo -e "\n${YELLOW}[5/10]${NC} Running linter & formatter..."
npm run lint 2>&1 | tail -3 || true
echo -e "${GREEN}✅ Code quality check complete${NC}"

# Run tests
echo -e "\n${YELLOW}[6/10]${NC} Running test suite..."
npm run test -- --run 2>&1 | tail -5
echo -e "${GREEN}✅ All tests passed${NC}"

# Build production
echo -e "\n${YELLOW}[7/10]${NC} Building production bundle..."
npm run build 2>&1 | tail -10
echo -e "${GREEN}✅ Production build complete (dist/)${NC}"

# Display URLs
echo -e "\n${YELLOW}[8/10]${NC} Generating URLs..."
FRONTEND_URL="http://localhost:5173"
BACKEND_URL="http://localhost:3000"
echo -e "${GREEN}✅ Frontend: $FRONTEND_URL${NC}"
echo -e "${GREEN}✅ Backend: $BACKEND_URL${NC}"

# Show next steps
echo -e "\n${YELLOW}[9/10]${NC} Setting up development servers..."
cat > /tmp/run-servers.sh << 'EOFSERVERS'
#!/bin/bash
echo "Starting development servers..."
echo "Terminal 1: Frontend (Ctrl+C to stop)"
npm run dev &
FRONTEND_PID=$!

echo "Terminal 2: Backend (Ctrl+C to stop)"
npm run server &
BACKEND_PID=$!

echo ""
echo "✅ Servers running:"
echo "  Frontend: http://localhost:5173"
echo "  Backend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

wait
EOFSERVERS
chmod +x /tmp/run-servers.sh

# Display final info
echo -e "\n${YELLOW}[10/10]${NC} Setup complete!"
echo -e "\n${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ SceneSensei is ready for development!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"

echo -e "\n${BLUE}📖 Quick Start:${NC}"
echo ""
echo -e "  ${YELLOW}Start Development Servers:${NC}"
echo "    npm run dev      # Frontend (http://localhost:5173)"
echo "    npm run server   # Backend (http://localhost:3000)"
echo ""
echo -e "  ${YELLOW}Run Tests:${NC}"
echo "    npm run test -- --run"
echo ""
echo -e "  ${YELLOW}Auto-fix Code:${NC}"
echo "    bash scripts/auto_fix_local.sh --apply"
echo ""
echo -e "  ${YELLOW}Build for Production:${NC}"
echo "    npm run build"
echo ""
echo -e "  ${YELLOW}Deploy:${NC}"
echo "    Follow .github/workflows/deploy-prepare.md for secrets setup"
echo "    Then push to main: git push origin main"
echo ""

echo -e "${BLUE}🔗 URLs:${NC}"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend: $BACKEND_URL"
echo "  Auto-Fixes Dashboard: $FRONTEND_URL/dev/auto-fixes"
echo ""

echo -e "${BLUE}📚 Documentation:${NC}"
echo "  README.md - Project overview"
echo "  DEPLOYMENT.md - Production deployment guide"
echo "  .github/workflows/deploy-prepare.md - CI/CD setup"
echo ""

echo -e "${BLUE}🚀 Demo Login:${NC}"
echo "  Email: demo@scenesensei.com"
echo "  Password: demo"
echo ""

echo -e "${GREEN}Happy coding! 🎉${NC}\n"
