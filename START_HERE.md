# 🚀 Quick Start - Contact Form Backend

## ⚡ 3-Minute Setup

### 1️⃣ Get Gmail App Password (2 minutes)

1. Open: https://myaccount.google.com/apppasswords
2. Sign in to your Google account
3. If you see "2-Step Verification is not turned on":
   - Click "Get Started" on 2-Step Verification
   - Follow the setup process
   - Return to App Passwords page
4. Click "Select app" → Choose "Mail"
5. Click "Select device" → Choose "Other (Custom name)"
6. Type "Portfolio Backend"
7. Click "Generate"
8. **Copy the 16-character password** (looks like: `xxxx xxxx xxxx xxxx`)

### 2️⃣ Configure Backend (30 seconds)

Open `server/.env` and update these lines:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Paste the password from step 1
EMAIL_TO=patilsonali5161@gmail.com  # Where you want to receive messages
```

Save the file.

### 3️⃣ Start Backend (30 seconds)

Open a new terminal and run:

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📧 Contact API available at http://localhost:5000/api/contact
```

**Keep this terminal open!**

### 4️⃣ Test It! (30 seconds)

1. Your frontend is already running at http://localhost:8080
2. Go to: http://localhost:8080/contact
3. Fill out the form with your email
4. Click "Send Message"
5. Check your email inbox!

You should receive:
- ✅ Email notification with the message
- ✅ Auto-reply confirmation (check the email you used in the form)

## ✅ Success Checklist

- [ ] Got Gmail App Password
- [ ] Updated `server/.env` with credentials
- [ ] Backend running on port 5000
- [ ] Frontend running on port 8080
- [ ] Form submits successfully
- [ ] Received email notification
- [ ] Sender received auto-reply

## 🎉 That's It!

Your contact form is now fully functional with:
- ✅ Email notifications
- ✅ Auto-replies
- ✅ Spam protection
- ✅ Beautiful email templates
- ✅ Error handling

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure you're using the **App Password**, not your regular Gmail password
- The App Password should be 16 characters (4 groups of 4)
- No spaces needed in the .env file

### "Network error"
- Make sure backend is running: Check the terminal
- Verify it says "Server running on port 5000"
- Try: http://localhost:5000/api/health in your browser

### "Too many requests"
- You can only send 5 messages per 15 minutes (spam protection)
- Wait 15 minutes or restart the backend server

### Still having issues?
1. Check `CONTACT_BACKEND_SUMMARY.md` for detailed help
2. Look at server terminal for error messages
3. Make sure both frontend and backend are running

## 📚 More Information

- **Full Documentation**: `BACKEND_INTEGRATION.md`
- **Detailed Setup**: `setup-backend.md`
- **Backend Details**: `server/README.md`
- **Summary**: `CONTACT_BACKEND_SUMMARY.md`

## 🌐 Deploy to Production

When ready to deploy:

1. **Backend**: Deploy to Heroku, Railway, or Render
2. **Frontend**: Update `.env` with production API URL
3. **Done!** Your contact form works in production

See `BACKEND_INTEGRATION.md` for deployment instructions.

---

**Need help?** Email: patilsonali5161@gmail.com
