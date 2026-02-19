import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({ name, email, message }) => {
  try {
    // Always log to console
    console.log('\n' + '='.repeat(70));
    console.log('📧 NEW CONTACT FORM SUBMISSION');
    console.log('='.repeat(70));
    console.log('📅 Date & Time:', new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long'
    }));
    console.log('👤 Name:', name);
    console.log('📧 Email:', email);
    console.log('💬 Message:');
    console.log('-'.repeat(70));
    console.log(message);
    console.log('='.repeat(70) + '\n');

    // Try to send email if Resend API key is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-resend-api-key') {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [process.env.EMAIL_TO || 'patilsonali5161@gmail.com'],
          subject: `Portfolio Contact: Message from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00d4ff 0%, #9333ea 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #00d4ff; border-radius: 5px; }
                .label { font-weight: bold; color: #555; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎉 New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="info-box">
                    <p><span class="label">Name:</span> ${name}</p>
                  </div>
                  <div class="info-box">
                    <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                  </div>
                  <div class="info-box">
                    <p><span class="label">Message:</span></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  <p style="margin-top: 20px;">
                    <a href="mailto:${email}?subject=Re: Your message" style="color: #00d4ff;">Reply to ${name}</a>
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        if (error) {
          console.error('❌ Email error:', error);
        } else {
          console.log('✅ Email sent successfully!');
        }
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError.message);
      }
    } else {
      console.log('💡 Email service not configured - message logged to console');
    }

    console.log('✅ Contact form processed successfully!\n');
    return { success: true };
  } catch (error) {
    console.error('❌ Error:', error);
    throw new Error('Failed to send message. Please try again later.');
  }
};

// Simple function - no database
export const saveContactMessage = async () => {
  return { success: true };
};
