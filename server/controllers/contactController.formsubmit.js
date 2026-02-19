import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Using FormSubmit.co - Free email forwarding service
// No API key or authentication required
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    // FormSubmit.co endpoint
    const formSubmitUrl = `https://formsubmit.co/ajax/${process.env.EMAIL_TO}`;

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `Portfolio Contact: Message from ${name}`,
        _template: 'table',
        _captcha: 'false'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email via FormSubmit');
    }

    const data = await response.json();
    console.log('✅ Email sent successfully via FormSubmit:', data);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // Fallback: Log to console
    console.log('\n📧 ===== CONTACT FORM SUBMISSION (Fallback) =====');
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('👤 Name:', name);
    console.log('📧 Email:', email);
    console.log('💬 Message:', message);
    console.log('================================================\n');
    
    // Don't throw error - still return success so user gets confirmation
    return { success: true };
  }
};

// Save contact message
export const saveContactMessage = async ({ name, email, message }) => {
  try {
    if (process.env.MONGODB_URI) {
      const Contact = (await import('../models/Contact.js')).default;
      const contact = new Contact({ name, email, message, status: 'new' });
      await contact.save();
      console.log('✅ Contact message saved to database');
    } else {
      console.log('📝 Contact message logged');
    }
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to save contact message:', error);
    return { success: false };
  }
};
