# 🚀 Quick Vercel Deployment Guide

Your portfolio is ready to deploy! Follow these simple steps.

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ Code committed
- ✅ Vercel config files created
- ✅ Resend API key configured
- ✅ Contact form working locally

## 📝 Step-by-Step Deployment

### Step 1: Push to GitHub (5 minutes)

1. **Create a new repository on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `portfolio` (or any name)
   - Make it **Public** or **Private**
   - **Don't** check any boxes (no README, no .gitignore)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Deploy Backend to Vercel (5 minutes)

1. **Go to Vercel:**
   - Visit: https://vercel.com/login
   - Sign in with GitHub

2. **Create new project:**
   - Click "Add New" → "Project"
   - Select your `portfolio` repository
   - Click "Import"

3. **Configure Backend:**
   - **Project Name:** `portfolio-api` (or any name)
   - **Root Directory:** Click "Edit" → Enter `server`
   - **Framework Preset:** Other
   
4. **Add Environment Variables:**
   Click "Environment Variables" and add these:
   
   | Variable | Value |
   |----------|-------|
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | `https://your-portfolio.vercel.app` (temporary, we'll update) |
   | `RESEND_API_KEY` | `re_PPb3gRaE_q8bTTp6iC2cYWGDoC6eJqjfJ` |
   | `EMAIL_TO` | `patilsonali5161@gmail.com` |
   | `RATE_LIMIT_WINDOW_MS` | `900000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `5` |

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - **Copy the deployment URL** (e.g., `https://portfolio-api.vercel.app`)

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Create another project:**
   - Go back to Vercel dashboard
   - Click "Add New" → "Project"
   - Select the same `portfolio` repository again

2. **Configure Frontend:**
   - **Project Name:** `portfolio` or `sonali-portfolio`
   - **Root Directory:** Leave as `.` (root)
   - **Framework Preset:** Vite (should auto-detect)
   
3. **Add Environment Variable:**
   
   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://YOUR-BACKEND-URL.vercel.app/api` |
   
   Replace with your actual backend URL from Step 2.

4. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your portfolio is now LIVE! 🎉

### Step 4: Update Backend CORS (2 minutes)

1. **Go to backend project in Vercel:**
   - Dashboard → Select `portfolio-api` project
   - Settings → Environment Variables

2. **Update FRONTEND_URL:**
   - Find `FRONTEND_URL` variable
   - Click "Edit"
   - Change to your actual frontend URL (e.g., `https://sonali-portfolio.vercel.app`)
   - Click "Save"

3. **Redeploy backend:**
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"

## 🎉 You're Done!

Your portfolio is now live at:
- **Frontend:** `https://your-portfolio.vercel.app`
- **Backend:** `https://portfolio-api.vercel.app`

## 🧪 Test Your Deployment

1. Visit your portfolio URL
2. Go to the Contact page
3. Submit a test message
4. Check your email at `patilsonali5161@gmail.com`

## 🔄 Future Updates

To update your portfolio:

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically deploy your changes in 1-2 minutes!

## 📊 Your Deployment URLs

After deployment, update these:

- **Frontend URL:** `_______________________`
- **Backend URL:** `_______________________`

## ⚠️ Important Notes

1. **Email Sending:** Your Resend API key is already configured, so emails will work immediately!

2. **Free Tier Limits:**
   - Vercel: Unlimited deployments, 100 GB bandwidth/month
   - Resend: 3,000 emails/month, 100 emails/day

3. **Custom Domain (Optional):**
   - Go to Vercel project → Settings → Domains
   - Add your custom domain (e.g., `sonalipatil.com`)

## 🐛 Troubleshooting

**Backend not working?**
- Check environment variables in Vercel dashboard
- View logs: Deployments → Click deployment → View Function Logs

**Frontend not connecting?**
- Verify `VITE_API_URL` points to correct backend URL
- Check browser console for errors

**Contact form not working?**
- Test backend directly: `https://your-backend.vercel.app/api/health`
- Check CORS settings (FRONTEND_URL must match)

## 📞 Need Help?

Check the detailed guide: `VERCEL_DEPLOYMENT.md`

---

**Ready to deploy? Start with Step 1! 🚀**
