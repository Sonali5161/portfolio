# 🚀 Deploy Backend to Render.com (Easier Alternative)

Render.com is simpler for backend deployment and has a generous free tier.

## 📋 Prerequisites

- ✅ Code already on GitHub: https://github.com/Sonali5161/Portfolio
- ✅ Render account (sign up with GitHub)

## 🎯 Deploy Backend to Render (10 minutes)

### Step 1: Sign Up for Render

1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 2: Create Web Service

1. **Click "New +"** → Select "Web Service"

2. **Connect Repository:**
   - Find and select `Sonali5161/Portfolio`
   - Click "Connect"

3. **Configure Service:**
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `portfolio-backend` (or any name) |
   | **Region** | Choose closest to you |
   | **Branch** | `main` |
   | **Root Directory** | `server` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

4. **Add Environment Variables:**
   
   Click "Advanced" → "Add Environment Variable"
   
   Add these one by one:
   
   ```
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-portfolio.vercel.app
   RESEND_API_KEY=re_PPb3gRaE_q8bTTp6iC2cYWGDoC6eJqjfJ
   EMAIL_TO=patilsonali5161@gmail.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```
   
   Note: We'll update `FRONTEND_URL` after deploying frontend

5. **Click "Create Web Service"**
   
   - Render will start building and deploying
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `https://portfolio-backend.onrender.com`

### Step 3: Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "Portfolio API is running"
}
```

### Step 4: Deploy Frontend to Vercel

1. **Go to Vercel:** https://vercel.com

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select `Portfolio` repository
   - Click "Import"

3. **Configure:**
   - **Project Name:** `portfolio` or `sonaliportfolio` (simple name)
   - **Framework:** Vite (auto-detected)
   - **Root Directory:** `.` (leave as root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variable:**
   
   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://your-render-backend-url.onrender.com/api` |
   
   Replace with your actual Render backend URL

5. **Click "Deploy"**
   
   Wait 1-2 minutes for deployment

### Step 5: Update Backend CORS

1. **Go back to Render dashboard**
2. **Select your backend service**
3. **Go to "Environment"**
4. **Update `FRONTEND_URL`:**
   - Change from temporary URL to your actual Vercel URL
   - Example: `https://sonaliportfolio.vercel.app`
5. **Click "Save Changes"**
   - Render will automatically redeploy

## ✅ You're Done!

Your portfolio is now live:
- **Frontend (Vercel):** `https://your-portfolio.vercel.app`
- **Backend (Render):** `https://portfolio-backend.onrender.com`

## 🧪 Test Everything

1. Visit your portfolio
2. Go to Contact page
3. Submit a test message
4. Check your email!

## 📊 Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month (enough for 1 service 24/7)
- ✅ Automatic HTTPS
- ✅ Auto-deploy on Git push
- ⚠️ Spins down after 15 min of inactivity (first request takes ~30 seconds)

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS

**Resend Free Tier:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day

## 🔄 Future Updates

Push to GitHub and both will auto-deploy:

```bash
git add .
git commit -m "Update portfolio"
git push
```

- Render: Auto-deploys backend in ~2 minutes
- Vercel: Auto-deploys frontend in ~1 minute

## ⚠️ Important Notes

### Cold Starts on Render Free Tier

The free tier spins down after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up.

**Solutions:**
1. Keep it awake with a ping service (optional)
2. Upgrade to paid tier ($7/month for always-on)
3. Accept the 30-second delay on first load

### CORS Configuration

Make sure `FRONTEND_URL` in Render matches your actual Vercel URL exactly (no trailing slash).

## 🐛 Troubleshooting

### Backend Not Responding

1. Check Render logs: Dashboard → Your Service → Logs
2. Verify environment variables are set correctly
3. Check if service is sleeping (free tier)

### Frontend Can't Connect

1. Verify `VITE_API_URL` in Vercel points to Render URL
2. Check browser console for CORS errors
3. Verify `FRONTEND_URL` in Render matches Vercel URL

### Contact Form Not Working

1. Test backend health: `https://your-backend.onrender.com/api/health`
2. Check Render logs for errors
3. Verify Resend API key is correct
4. Check email spam folder

## 🎨 Custom Domain (Optional)

### For Frontend (Vercel):
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### For Backend (Render):
1. Render Dashboard → Your Service → Settings → Custom Domain
2. Add subdomain (e.g., `api.yourdomain.com`)
3. Update DNS records
4. Update `VITE_API_URL` in Vercel to use new domain

## 📞 Why Render for Backend?

**Advantages:**
- ✅ Simpler setup than Vercel for Node.js backends
- ✅ Better free tier for always-running services
- ✅ Easier environment variable management
- ✅ Better logging and monitoring
- ✅ No serverless cold starts (except free tier sleep)

**Vercel is still great for:**
- ✅ Frontend hosting (React, Vue, etc.)
- ✅ Static sites
- ✅ Serverless functions (short-running)

## 🚀 Alternative: Keep Both on Vercel

If you want to keep everything on Vercel, just use simple project names:
- Backend: `portfolioapi` (no special characters)
- Frontend: `portfolio`

Both platforms work great - choose what's easier for you!

---

**Ready to deploy? Follow the steps above! 🎉**
