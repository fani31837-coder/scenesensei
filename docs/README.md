# SceneSensei Developer Documentation

## Project Overview

SceneSensei is a web-first 3D animation platform built with React, Three.js, and modern web technologies. This document covers development workflows, architecture, and best practices.

---

## Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Initial Setup
```bash
git clone https://github.com/fani31837-coder/scenesensei.git
cd scenesensei
bash setup.sh
```

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=SceneSensei
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PROFILING=true
```

---

## Architecture Overview

### Frontend Architecture

```
Component Layer
  ├── Pages (Router outlets)
  ├── Components (Reusable UI)
  └── Hooks (Custom logic)
        ↓
State Management (Zustand)
  ├── editorStore
  ├── authStore
  └── uiStore
        ↓
Services Layer
  ├── API client (axios)
  ├── Database (Dexie)
  └── i18n (i18next)
        ↓
Utilities & Types
  ├── Animation utils
  ├── Character utils
  └── Type definitions
```

### Data Flow

1. **User Interaction** → Component event handler
2. **State Update** → Zustand store dispatch
3. **API Call** → API service with auth
4. **Response Handler** → Update store + local cache
5. **Re-render** → Component subscribes to store

---

## Key Technologies

### React & TypeScript
- Strict mode enabled
- Functional components only
- Custom hooks for logic extraction
- Full type coverage

### Three.js & React Three Fiber
- Declarative 3D scene definition
- Component-based object hierarchy
- useFrame for animation loop
- useLoader for asset management

### State Management (Zustand)
- Minimal boilerplate
- Middleware support
- Redux DevTools integration (optional)
- Selector-based subscriptions

### Build Tool (Vite)
- ESM-first development
- HMR for instant feedback
- Tree-shaking by default
- Optimized production builds

---

## File Organization Best Practices

### Component Files
```typescript
// src/components/MyComponent.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import useMyStore from '@/stores/myStore'
import '@/styles/my-component.css' // Optional scoped styles

const MyComponent: React.FC<Props> = ({ prop1 }) => {
  const { t } = useTranslation()
  const { state } = useMyStore()

  return <div>{/* content */}</div>
}

export default MyComponent
```

### Store Files
```typescript
// src/stores/myStore.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface MyState {
  // State
  value: string
  
  // Actions
  setValue: (value: string) => void
}

const useMyStore = create<MyState>()(
  subscribeWithSelector((set) => ({
    value: '',
    setValue: (value) => set({ value }),
  }))
)

export default useMyStore
```

### Utility Files
```typescript
// src/utils/my-util.ts
// Pure functions only
// No side effects
// Fully typed

export const myUtil = (input: string): string => {
  return input.toUpperCase()
}
```

---

## Git Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `refactor/description` - Refactoring
- `docs/description` - Documentation

### Commit Convention
```
type(scope): description

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, perf, test, chore

---

## Testing Strategy

### Unit Tests
```typescript
// Test pure functions and utilities
import { describe, it, expect } from 'vitest'
import { myUtil } from '@/utils/my-util'

describe('myUtil', () => {
  it('should convert to uppercase', () => {
    expect(myUtil('hello')).toBe('HELLO')
  })
})
```

### Component Tests
```typescript
// Test component rendering and interactions
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />)
    expect(screen.getByText(/text/i)).toBeInTheDocument()
  })
})
```

### Integration Tests
```typescript
// Test store + component interactions
// Use mocked API responses
```

### Test Files Location
```
src/tests/
├── unit/          # utils, helpers
├── integration/   # store + component
└── e2e/          # full user flows (optional)
```

---

## Performance Optimization

### Code Splitting
```typescript
// Automatic with React Router lazy()
const Editor = React.lazy(() => import('@/pages/Editor'))

<Suspense fallback={<Loading />}>
  <Editor />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive components
const MyComponent = React.memo(({ prop1 }: Props) => {
  return <div>{prop1}</div>
})

// Memoize callbacks
const handleClick = useCallback(() => {
  // action
}, [dependency])

// Memoize computed values
const computed = useMemo(() => {
  return expensiveComputation()
}, [dependency])
```

### Bundle Analysis
```bash
npm install -D vite-plugin-visualizer
# Add to vite.config.ts
# Run: npm run build && npm run preview
```

---

## Debugging

### Browser DevTools
1. Open DevTools (F12)
2. React tab: Inspect component tree and state
3. Console: Check for errors and logs
4. Network: Monitor API calls
5. Performance: Profile rendering

### VSCode Debugging
Add to `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Zustand DevTools
```typescript
import { devtools } from 'zustand/middleware'

create<State>()(
  devtools((set) => ({
    // store
  }), { name: 'StoreName' })
)
```

---

## Common Tasks

### Add a New Page
1. Create `src/pages/NewPage.tsx`
2. Add route to `src/components/App.tsx`
3. Create necessary stores
4. Add to navigation

### Add a New API Endpoint
1. Add mock endpoint to `server/index.ts`
2. Create API client in `src/services/api.ts`
3. Use in component/store
4. Add tests

### Add i18n Support
1. Add key to `src/i18n/locales/en.json`
2. Add translations to es.json, fr.json
3. Use: `const { t } = useTranslation()`
4. Reference: `t('namespace.key')`

### Deploy Changes
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
# Create PR on GitHub

# After approval and merge:
npm run build        # Local verification
# Auto-deploys to production
```

---

## Troubleshooting

### HMR Not Working
```bash
# Restart dev server
# Kill process: killall node
# Restart: npm run dev
```

### Type Errors
```bash
npm run type-check
# Fix issues reported
```

### Test Failures
```bash
npm run test        # Run tests
npm run test:ui     # Visual debugging
```

### Build Errors
```bash
npm run lint
npm run format
npm run type-check
npm run build
```

---

## Performance Metrics

### Target Numbers
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s
- Lighthouse: 90+

### Tools
- Lighthouse (DevTools)
- Web Vitals library
- Performance tab (DevTools)

---

## Security Checklist

- [ ] JWT tokens stored securely (httpOnly cookies)
- [ ] HTTPS enforced in production
- [ ] CORS properly configured
- [ ] Input validation on all forms
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF tokens for state-changing requests
- [ ] SQL injection prevented (ORM/prepared statements)
- [ ] Rate limiting on API endpoints
- [ ] Secrets in .env.local (not committed)
- [ ] Dependencies regularly updated

---

## Deployment Checklist

- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] No console errors or warnings
- [ ] Build output optimized
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Monitoring configured
- [ ] Analytics enabled
- [ ] Error tracking active
- [ ] Rollback plan documented

---

## Resources

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated**: November 2024
**Maintained By**: SceneSensei Team
