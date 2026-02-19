# 🚀 Vercel Deployment Guide

Complete guide to deploy your portfolio to Vercel (frontend + backend).

## 📋 Prerequisites

1. **GitHub Account** - https://github.com
2. **Vercel Account** - https://vercel.com (sign up with GitHub)
3. **Git installed** on your computer

## 🎯 Deployment Steps

### Part 1: Prepare Your Code

#### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Portfolio with backend"
```

#### 2. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `portfolio` (or any name you like)
3. Make it **Public** or **Private**
4. **Don't** initialize with README (we already have code)
5. Click "Create repository"

#### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Part 2: Deploy Backend to Vercel

#### 1. Go to Vercel Dashboard

- Visit: https://vercel.com/dashboard
- Click "Add New" → "Project"

#### 2. Import Repository

- Select your `portfolio` repository
- Click "Import"

#### 3. Configure Backend Project

**Root Directory:**
- Click "Edit" next to Root Directory
- Enter: `server`
- This tells Vercel to deploy only the backend folder

**Environment Variables:**
Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-portfolio.vercel.app` (we'll update this later) |
| `RESEND_API_KEY` | `your-resend-api-key` (if you have one) |
| `EMAIL_TO` | `patilsonali5161@gmail.com` |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | `5` |

**Project Name:**
- Change to: `portfolio-api` (or any name)

#### 4. Deploy Backend

- Click "Deploy"
- Wait for deployment (1-2 minutes)
- Copy the deployment URL (e.g., `https://portfolio-api.vercel.app`)

---

### Part 3: Deploy Frontend to Vercel

#### 1. Add New Project

- Go back to Vercel dashboard
- Click "Add New" → "Project"
- Select the same `portfolio` repository

#### 2. Configure Frontend Project

**Root Directory:**
- Leave as `.` (root)
- This deploys the frontend

**Framework Preset:**
- Should auto-detect as "Vite"

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
Add this variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://portfolio-api.vercel.app/api` |

Replace with your actual backend URL from Part 2.

**Project Name:**
- Change to: `portfolio` or `your-name-portfolio`

#### 3. Deploy Frontend

- Click "Deploy"
- Wait for deployment (1-2 minutes)
- Your portfolio is now live! 🎉

---

### Part 4: Update Backend CORS

After frontend is deployed, update backend environment variables:

1. Go to your backend project in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to your actual frontend URL
4. Example: `https://your-portfolio.vercel.app`
5. Redeploy backend (Deployments → Click "..." → Redeploy)

---

## 🔧 Configuration Files Created

✅ `vercel.json` - Frontend configuration
✅ `server/vercel.json` - Backend configuration  
✅ `.gitignore` - Files to exclude from Git

---

## 🧪 Testing Your Deployment

### Test Backend

Visit: `https://your-backend-url.vercel.app/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "Portfolio API is running"
}
```

### Test Frontend

1. Visit: `https://your-frontend-url.vercel.app`
2. Navigate to Contact page
3. Submit a message
4. Check if it works!

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Go to your frontend project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `sonalipatil.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

### Add Custom Domain to Backend

1. Go to your backend project in Vercel
2. Settings → Domains
3. Add subdomain (e.g., `api.sonalipatil.com`)
4. Update frontend `VITE_API_URL` to use new domain
5. Redeploy frontend

---

## 🔄 Updating Your Site

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Your site updates in 1-2 minutes!

### Manual Deployment

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click "..." → "Redeploy"

---

## 📊 Deployment URLs

After deployment, you'll have:

- **Frontend**: `https://your-portfolio.vercel.app`
- **Backend**: `https://portfolio-api.vercel.app`
- **Contact API**: `https://portfolio-api.vercel.app/api/contact`
- **Health Check**: `https://portfolio-api.vercel.app/api/health`

---

## ⚠️ Important Notes

### Environment Variables

**Never commit `.env` files to Git!**

Always add sensitive data through Vercel dashboard:
- Vercel Dashboard → Project → Settings → Environment Variables

### CORS Configuration

Make sure `FRONTEND_URL` in backend matches your actual frontend URL.

### Rate Limiting

Default: 5 requests per 15 minutes per IP.
Adjust in environment variables if needed.

### Free Tier Limits

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Serverless functions

**Resend Free Tier:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day

---

## 🐛 Troubleshooting

### Backend Not Working

1. Check environment variables are set
2. Check logs: Vercel Dashboard → Project → Deployments → Click deployment → View Function Logs
3. Verify `server/vercel.json` exists
4. Check `server/package.json` has correct dependencies

### Frontend Not Connecting to Backend

1. Check `VITE_API_URL` environment variable
2. Verify backend URL is correct
3. Check CORS settings in backend
4. Test backend health endpoint directly

### Contact Form Not Working

1. Test backend API directly: `https://your-api.vercel.app/api/health`
2. Check browser console for errors
3. Verify CORS is configured correctly
4. Check backend logs in Vercel

### Build Failures

1. Check build logs in Vercel
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check Node.js version compatibility

---

## 📞 Support

**Vercel Documentation**: https://vercel.com/docs
**Vercel Support**: https://vercel.com/support

---

## ✅ Deployment Checklist

Before deploying:

- [ ] Code pushed to GitHub
- [ ] `.gitignore` configured
- [ ] Environment variables ready
- [ ] Resend API key (optional)
- [ ] Tested locally

After deploying:

- [ ] Backend health check works
- [ ] Frontend loads correctly
- [ ] Contact form submits successfully
- [ ] CORS configured properly
- [ ] Custom domain added (optional)

---

**Your portfolio is ready to go live! 🚀**

Follow the steps above and you'll have a professional portfolio deployed in ~15 minutes!
