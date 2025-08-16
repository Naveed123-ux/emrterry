# 🏥 MedFlow EMR - Local Setup Guide

Follow these steps to get MedFlow EMR running on your local machine.

## Step 1: Prerequisites Check

Open your terminal and verify you have Node.js installed:

```bash
node --version
```

You should see version 18.17.0 or higher. If not, download from [nodejs.org](https://nodejs.org/).

## Step 2: Project Setup

1. **Open terminal in your project directory**
2. **Clean install dependencies:**
   ```bash
   # Remove any existing node_modules (if any)
   rm -rf node_modules package-lock.json
   
   # Fresh install
   npm install
   ```

## Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v4.x.x  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 4: Open in Browser

Go to: `http://localhost:3000`

You should see the MedFlow EMR login page.

## Step 5: Test Login

Use any of these demo accounts:
- **Provider:** `provider@medflow.com` / `Provider123!`
- **Staff:** `staff@medflow.com` / `Staff123!`  
- **Patient:** `patient@medflow.com` / `Patient123!`
- **Admin:** `admin@medflow.com` / `Admin123!`

## 🚨 Common Issues & Fixes

### Issue: "Module not found" errors
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Tailwind styles not loading
**Check:**
1. Make sure you're using `npm run dev` (not Next.js commands)
2. Verify the CSS import in `src/main.tsx`
3. Check browser dev tools for CSS loading errors

### Issue: Port 3000 already in use
**Fix:**
```bash
# Option 1: Kill existing process
npx kill-port 3000

# Option 2: Use different port
npm run dev -- --port 3001
```

### Issue: TypeScript errors
**Fix:**
```bash
npm run type-check
```

### Issue: ESLint errors
**Fix:**
```bash
npm run lint
```

## 📂 Key Files to Check

If you're having issues, check these files exist and are correctly configured:

1. **`package.json`** - Should have Vite scripts (not Next.js)
2. **`vite.config.ts`** - Vite configuration
3. **`tailwind.config.js`** - Tailwind configuration
4. **`src/main.tsx`** - Entry point with CSS import
5. **`styles/globals.css`** - Global styles

## 🔄 Complete Reset (Nuclear Option)

If nothing works, try a complete reset:

```bash
# 1. Clean everything
rm -rf node_modules package-lock.json .vite dist

# 2. Clear npm cache
npm cache clean --force

# 3. Fresh install
npm install

# 4. Start dev server
npm run dev
```

## ✅ Success Indicators

When everything is working correctly, you should see:

1. ✅ No console errors in browser dev tools
2. ✅ Tailwind styles loading (blue theme, proper fonts)
3. ✅ Login page with MedFlow branding
4. ✅ Smooth navigation between modules
5. ✅ All 11 EMR modules accessible from sidebar

## 🆘 Still Having Issues?

1. Check the browser console (F12) for error messages
2. Verify your Node.js version is 18.17.0+
3. Make sure you're in the correct project directory
4. Try running on a different port: `npm run dev -- --port 3001`

---

**Quick Test:** After setup, try logging in with `provider@medflow.com` / `Provider123!` and navigate to the Dashboard. You should see healthcare analytics and module cards.