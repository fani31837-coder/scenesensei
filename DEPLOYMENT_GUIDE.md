# SceneSensei Production Deployment Guide

## Overview

**Status:** ✅ Ready for production deployment  
**Build:** ✅ Passing (725 modules, 1.1 MB)  
**Tests:** ✅ All passing (7/7)  
**Type-check:** ✅ No errors (strict mode)  
**Linting:** ✅ No errors  

---

## Deployment Options

### Option 1: GitHub Actions (Recommended) — Automated CI/CD

**Pros:**
- Fully automated: push to `main` → GitHub Actions runs tests → deploy to production
- Secrets stored securely in GitHub (no token in code/terminal)
- Free tier available
- Audit trail for all deployments

**Steps:**

1. **Add GitHub Secrets**
   - Go to your GitHub repo → Settings → Secrets and Variables → Actions
   - Click "New repository secret" and add:
     - Name: `VERCEL_TOKEN` → Value: your Vercel token
     - (Optional) Name: `GCP_SA_JSON` → Value: GCP service account JSON for Cloud Run backend
     - (Optional) Name: `SENTRY_DSN` → Value: Sentry error tracking URL

2. **Update `.github/workflows/ci.yml`**
   - Replace the `deploy:` section's `Deploy to production` step with:
   ```yaml
   - name: Deploy to Vercel
     run: |
       npm ci
       npx vercel --prod --yes --token=${{ secrets.VERCEL_TOKEN }}
   ```

3. **Push to main**
   ```bash
   git add .
   git commit -m "chore: enable automated deployment"
   git push origin main
   ```
   - GitHub Actions will automatically:
     - Run type-check, lint, tests, build
     - If all pass, deploy to Vercel production
     - Update the deployment status in your GitHub repo

**Verify:**
- Go to your repo → Actions tab → watch the workflow run
- Once complete, your site will be live at `https://scenesensei.vercel.app` (or your configured domain)

---

### Option 2: Local Vercel CLI Deploy (One-Time)

**Pros:**
- Quick if you only deploy once
- Direct feedback in terminal

**Steps:**

1. **Run the deploy command in this environment**
   ```bash
   # In your terminal (outside this chat), run:
   cd /workspaces/scenesensei
   export VERCEL_TOKEN="himmat@2010#"
   npx --yes vercel --prod --yes
   ```

2. **Wait for deployment**
   - Vercel CLI will:
     - Link to your Vercel project
     - Build and upload the `dist/` folder
     - Assign a production URL
     - Show deployment status

3. **Verify**
   - Open the URL printed in the output (e.g., `https://scenesensei.vercel.app`)

---

### Option 3: Manual Vercel Web Upload

1. Go to [vercel.com](https://vercel.com) → log in
2. Create a new project or use existing "scenesensei"
3. Connect GitHub repo and set build command to `npm run build`
4. Deploy

---

## Backend Deployment (Optional)

### Cloud Run (GCP)

If you want to deploy the Express backend to Cloud Run:

1. **Build and push Docker image**
   ```bash
   # Requires GCP credentials and Docker
   docker build -f Dockerfile.backend -t gcr.io/YOUR_PROJECT/scenesensei-api:latest .
   docker push gcr.io/YOUR_PROJECT/scenesensei-api:latest
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy scenesensei-api --image gcr.io/YOUR_PROJECT/scenesensei-api:latest --platform managed --region us-central1
   ```

3. **Update frontend `.env.production`**
   ```
   VITE_API_URL=https://scenesensei-api-XXXXX.run.app
   ```

---

## Frontend Environment Variables

### Development (`.env.local`)
```
VITE_API_URL=http://localhost:3000
```

### Production (Vercel)
Set in Vercel dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://scenesensei-api.run.app
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

---

## Pre-Deployment Checklist

- ✅ All tests passing (`npm run test -- --run`)
- ✅ Build succeeds (`npm run build`)
- ✅ No TypeScript errors (`npm run type-check`)
- ✅ No ESLint errors (`npm run lint`)
- ✅ Demo login works (`http://localhost:5175`)
- ✅ Projects create successfully
- ✅ Editor loads and renders 3D viewport

---

## Post-Deployment Verification

After deployment, verify:

1. **Frontend loads**
   ```bash
   curl -s https://scenesensei.vercel.app | grep -c "SceneSensei"
   # Should return count > 0
   ```

2. **Demo login flow works**
   - Visit https://scenesensei.vercel.app
   - Click "Try Demo"
   - Should redirect to projects page

3. **API connectivity**
   - If backend deployed:
   ```bash
   curl -s https://scenesensei-api.run.app/health
   # Should return { "status": "ok" }
   ```

---

## Rollback

If deployment fails:

1. **Vercel:** Go to Vercel dashboard → Deployments → select previous working version → click "Promote to Production"
2. **GitHub Actions:** Revert the last commit and push to `main`

---

## Troubleshooting

### "Build failed on Vercel"
- Check build logs in Vercel dashboard
- Verify `vercel.json` output directory is correct (`dist/`)
- Run `npm run build` locally to reproduce

### "Frontend can't reach backend"
- Check `VITE_API_URL` env var in Vercel dashboard
- Verify backend is deployed and responding to `/health`
- Check CORS configuration in `server/middleware/cors.ts`

### "Demo login stuck loading"
- Check browser console (F12) for errors
- Verify mock API server is running: `npx tsx server/index.ts`
- Check network tab for failed API calls

---

## Next Steps

1. **Choose a deployment method** (GitHub Actions recommended)
2. **Set GitHub secrets** (if using Actions)
3. **Push to main** and watch the workflow run
4. **Verify deployment** at the production URL

---

**Questions?** Check:
- `.github/workflows/ci.yml` — CI/CD pipeline configuration
- `vercel.json` — Vercel build configuration
- `server/index.ts` — Backend API mock data and endpoints
- `src/services/api.ts` — Frontend API client configuration

---

**Deployment Status:** Ready to deploy  
**Last Updated:** November 17, 2025
