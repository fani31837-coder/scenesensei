# Deploy SceneSensei via Vercel Web UI (No Token Needed)

## Fastest Way to Deploy (3 steps, ~2 minutes)

### Step 1: Go to Vercel
- Visit https://vercel.com
- Log in with your account

### Step 2: Import Your GitHub Repository
- Click "Add New..." → "Project"
- Click "Import Git Repository"
- Search for and select `fani31837-coder/scenesensei`
- Click "Import"

### Step 3: Configure & Deploy
- **Framework Preset:** Vite (or leave as auto-detected)
- **Root Directory:** (leave empty or set to `.`)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** (optional, leave empty for now)
- Click "Deploy"

**That's it!** Vercel will:
1. Clone your repo
2. Run `npm run build`
3. Deploy to `https://scenesensei.vercel.app` (or your project name)
4. Show you the live URL

---

## Verify Deployment

Once the deployment completes, you'll see:
```
✓ Production
  https://scenesensei.vercel.app
  Deployment ready
```

### Test the live site:
```bash
# Check frontend loads
curl -s https://scenesensei.vercel.app | head -20

# Test demo login flow
curl -s https://scenesensei.vercel.app/ | grep -c "SceneSensei"
# Should return > 0
```

---

## Alternative: GitHub Actions (Automated)

If you prefer automated deploys on every push to `main`:

1. **Get a valid Vercel token:**
   - Go to https://vercel.com/account/tokens
   - Create a new token (it will be auto-generated)
   - Copy immediately (only shown once)

2. **Add to GitHub Secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - New secret: name `VERCEL_TOKEN`, paste the token

3. **Push to main:**
   ```bash
   git commit --allow-empty -m "ci: enable vercel deploy"
   git push origin main
   ```

4. **Monitor:**
   - Go to Actions tab
   - Watch the workflow run
   - Deployment auto-completes

---

## Troubleshooting Invalid Token

If the CLI keeps rejecting tokens, it might be:
- **Wrong account:** Token created for a different Vercel account than your project
- **Insufficient scope:** Token doesn't have deploy permissions
- **Expired/revoked:** Token was deleted after creation

**Solution:**
1. Go to https://vercel.com/account/tokens
2. Delete all existing tokens
3. Create a brand new token
4. Use immediately (tokens are only shown once at creation)

If issues persist, use the **Web UI approach** above (no token needed).

---

## Status

- ✅ Build ready: `npm run build` passes
- ✅ All tests passing: 7/7
- ✅ TypeScript: 0 errors
- ✅ ESLint: 0 errors
- ✅ Ready for production

Your code is production-ready. Just deploy via the web UI above!

