# Portfolio Backend API

Backend API for handling contact form submissions with email notifications.

## Features

- ✅ Contact form submission handling
- ✅ Email notifications (to you and auto-reply to sender)
- ✅ Form validation and sanitization
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ Optional MongoDB integration for storing messages
- ✅ Beautiful HTML email templates
- ✅ Error handling and logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# Gmail Configuration (Recommended for testing)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_TO=patilsonali5161@gmail.com
```

### 3. Gmail Setup (Recommended)

To use Gmail for sending emails:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
   - Use this as `EMAIL_PASSWORD` in `.env`

### 4. Alternative Email Services

#### SendGrid
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
```

#### Mailgun
```env
EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
```

#### Custom SMTP
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASSWORD=your-password
```

### 5. MongoDB Setup (Optional)

If you want to store contact messages in a database:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Or use MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Send Contact Message
```
POST /api/contact
```

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

Success Response (200):
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

Error Response (400):
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

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 5 per IP address
- Prevents spam and abuse

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin protection
- **Input Validation**: Express-validator
- **Sanitization**: XSS protection
- **Rate Limiting**: Prevents abuse

## Email Templates

The API sends two emails:

1. **To You (Portfolio Owner)**:
   - Professional notification with sender details
   - Quick reply link
   - Formatted message content

2. **Auto-Reply to Sender**:
   - Thank you message
   - Confirmation of receipt
   - Expected response time
   - Link back to portfolio

## Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Send test message
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

Or use Postman/Insomnia with the same endpoints.

## Deployment

### Deploy to Heroku

1. Create Heroku app:
```bash
heroku create your-portfolio-api
```

2. Set environment variables:
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set EMAIL_TO=patilsonali5161@gmail.com
heroku config:set FRONTEND_URL=https://your-portfolio.com
```

3. Deploy:
```bash
git push heroku main
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Deploy to Railway

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## Troubleshooting

### Email not sending

1. **Check Gmail settings**: Ensure 2FA is enabled and App Password is correct
2. **Check spam folder**: Auto-replies might go to spam
3. **Check logs**: Look for error messages in console
4. **Test credentials**: Try sending a test email manually

### Rate limit errors

- Wait 15 minutes between requests
- Or adjust `RATE_LIMIT_MAX_REQUESTS` in `.env`

### CORS errors

- Ensure `FRONTEND_URL` matches your frontend URL exactly
- Include protocol (http:// or https://)

## Support

For issues or questions, contact: patilsonali5161@gmail.com

## License

MIT
