# Backend Setup Guide

## Quick Start (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Email

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `server/.env` and add your Gmail credentials:

```env
PORT=5000
FRONTEND_URL=http://localhost:8080

# Gmail Setup
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_TO=patilsonali5161@gmail.com
```

### Step 3: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Portfolio Backend" as the name
6. Click **Generate**
7. Copy the 16-character password (no spaces)
8. Paste it as `EMAIL_PASSWORD` in your `.env` file

### Step 4: Configure Frontend

1. Create `.env` in the root directory:
```bash
# In the root directory (not server/)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### Step 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# In root directory
npm run dev
```

### Step 6: Test

1. Open http://localhost:8080/contact
2. Fill out the contact form
3. Submit
4. Check your email (both your inbox and the sender's email)

## Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:8080
- [ ] Health check works: http://localhost:5000/api/health
- [ ] Contact form submits successfully
- [ ] You receive email notification
- [ ] Sender receives auto-reply

## Common Issues

### "Invalid login" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable 2-Factor Authentication first
- Generate a new App Password if needed

### "Network error"
- Check if backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in `server/server.js`

### Rate limit error
- Wait 15 minutes between test submissions
- Or temporarily increase limit in `server/server.js`

## Production Deployment

### Backend (Choose one):

**Option 1: Heroku**
```bash
cd server
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set EMAIL_TO=patilsonali5161@gmail.com
heroku config:set FRONTEND_URL=https://your-domain.com
git push heroku main
```

**Option 2: Railway**
1. Connect GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically

**Option 3: Vercel**
```bash
cd server
vercel
# Add environment variables in Vercel dashboard
```

### Frontend:
Update `.env` with production API URL:
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Optional: MongoDB Setup

If you want to store messages in a database:

1. Create free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

5. Uncomment database code in `server/controllers/contactController.js`

## Need Help?

- Check `server/README.md` for detailed documentation
- Test API with: `curl http://localhost:5000/api/health`
- Check server logs for error messages
- Email: patilsonali5161@gmail.com
