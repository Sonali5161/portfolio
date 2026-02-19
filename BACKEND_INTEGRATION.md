# 📧 Contact Form Backend Integration

Complete backend solution for your portfolio contact form with email notifications.

## 🎯 Features

✅ **Email Notifications**
- Instant email to you when someone submits the form
- Auto-reply confirmation to the sender
- Beautiful HTML email templates
- Support for Gmail, SendGrid, Mailgun, and custom SMTP

✅ **Security & Validation**
- Input sanitization and validation
- Rate limiting (5 requests per 15 minutes)
- CORS protection
- Security headers with Helmet
- XSS protection

✅ **Optional Database Storage**
- MongoDB integration for storing messages
- Track message status (new, read, replied)
- Query and manage submissions

✅ **Error Handling**
- Comprehensive error messages
- Field-specific validation errors
- Graceful fallbacks

## 🚀 Quick Start

### 1. Run Installation Script

**Windows:**
```bash
install-backend.bat
```

**Manual Installation:**
```bash
# Install backend dependencies
cd server
npm install

# Create environment files
cp .env.example .env
cd ..
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 2. Configure Gmail

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Backend"
   - Copy the 16-character password

3. **Update server/.env**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Your app password
   EMAIL_TO=patilsonali5161@gmail.com
   ```

### 3. Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Test

1. Visit: http://localhost:8080/contact
2. Fill and submit the form
3. Check your email inbox
4. Verify sender receives auto-reply

## 📁 Project Structure

```
portfolio/
├── server/                      # Backend API
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js # Email & database logic
│   ├── middleware/
│   │   ├── errorHandler.js     # Error handling
│   │   └── validateRequest.js  # Validation middleware
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contact.js          # API routes
│   ├── .env.example            # Environment template
│   ├── package.json
│   ├── server.js               # Main server file
│   └── README.md
├── src/
│   ├── services/
│   │   └── api.ts              # Frontend API client
│   └── pages/
│       └── ContactPage.tsx     # Updated contact form
├── .env.example                # Frontend env template
└── setup-backend.md            # Setup guide
```

## 🔧 Configuration Options

### Email Services

#### Gmail (Recommended for testing)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

#### SendGrid
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-api-key
```

#### Mailgun
```env
EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your-api-key
MAILGUN_DOMAIN=your-domain
```

#### Custom SMTP
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=username
SMTP_PASSWORD=password
```

### Rate Limiting

Adjust in `server/.env`:
```env
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=5       # 5 requests per window
```

### Database (Optional)

Add MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
```

## 📧 Email Templates

### Email to You (Portfolio Owner)

```
Subject: Portfolio Contact: Message from [Name]

🎉 New Contact Form Submission

Name: John Doe
Email: john@example.com

Message:
[User's message here]

Quick Actions:
Reply to John Doe

Timestamp: [Date and time]
```

### Auto-Reply to Sender

```
Subject: Thank you for contacting me!

✨ Thank You for Reaching Out!

Hi [Name],

Thank you for contacting me through my portfolio website. 
I've received your message and will get back to you as soon as possible.

Your message:
[Their message]

I typically respond within 24-48 hours.

Best regards,
Sonali Patil
AI/ML Engineer
```

## 🧪 Testing

### Test Health Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Contact Endpoint

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the API"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

## 🌐 Production Deployment

### Backend Deployment

#### Option 1: Heroku

```bash
cd server
heroku create your-portfolio-api
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set EMAIL_TO=patilsonali5161@gmail.com
heroku config:set FRONTEND_URL=https://your-domain.com
git push heroku main
```

#### Option 2: Railway

1. Connect GitHub repository
2. Select `server` folder as root
3. Add environment variables in dashboard
4. Deploy automatically

#### Option 3: Render

1. Create new Web Service
2. Connect repository
3. Set root directory to `server`
4. Add environment variables
5. Deploy

### Frontend Configuration

Update `.env` with production API URL:
```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** "Invalid login" error

**Solution:**
- Use App Password, not regular Gmail password
- Enable 2-Factor Authentication first
- Generate new App Password if needed
- Check for typos in email/password

**Problem:** Emails going to spam

**Solution:**
- Check spam folder
- Add sender to contacts
- Use verified email service (SendGrid/Mailgun) for production

### Connection Errors

**Problem:** "Network error" in frontend

**Solution:**
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is configured correctly
- Check firewall settings

### Rate Limit Errors

**Problem:** "Too many requests" error

**Solution:**
- Wait 15 minutes between test submissions
- Temporarily increase limit in `server/server.js`
- Use different IP address for testing

### Database Errors

**Problem:** MongoDB connection failed

**Solution:**
- Check `MONGODB_URI` format
- Verify network access in MongoDB Atlas
- Ensure IP is whitelisted
- Database is optional - app works without it

## 📊 API Documentation

### POST /api/contact

Send a contact form message.

**Request:**
```json
{
  "name": "string (2-100 chars, required)",
  "email": "string (valid email, required)",
  "message": "string (10-1000 chars, required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

**Rate Limit Error (429):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again later."
}
```

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use App Passwords** - Never use your main Gmail password
3. **Enable rate limiting** - Prevents spam and abuse
4. **Validate all inputs** - Sanitize user data
5. **Use HTTPS in production** - Encrypt data in transit
6. **Keep dependencies updated** - Run `npm audit` regularly
7. **Monitor logs** - Check for suspicious activity

## 📝 Environment Variables Reference

### Backend (server/.env)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `5000` |
| `NODE_ENV` | No | Environment | `development` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `http://localhost:8080` |
| `EMAIL_SERVICE` | Yes | Email service provider | `gmail` |
| `EMAIL_USER` | Yes | Sender email address | `your@gmail.com` |
| `EMAIL_PASSWORD` | Yes | Email password/app password | `xxxx xxxx xxxx xxxx` |
| `EMAIL_TO` | Yes | Recipient email | `patilsonali5161@gmail.com` |
| `MONGODB_URI` | No | MongoDB connection string | `mongodb://localhost:27017/portfolio` |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | No | Max requests per window | `5` |

### Frontend (.env)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API URL | `http://localhost:5000/api` |

## 🆘 Support

Need help? Check these resources:

1. **Setup Guide**: `setup-backend.md`
2. **Backend README**: `server/README.md`
3. **Server Logs**: Check terminal for error messages
4. **Test API**: Use curl or Postman
5. **Email**: patilsonali5161@gmail.com

## 📄 License

MIT License - Feel free to use this in your own projects!

---

Made with ❤️ for your portfolio
