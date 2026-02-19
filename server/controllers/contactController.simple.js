import dotenv from 'dotenv';

dotenv.config();

// Simple email logging (for development/testing)
// This will save messages to console and can be extended to save to database
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    console.log('\n📧 ===== NEW CONTACT FORM SUBMISSION =====');
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('👤 Name:', name);
    console.log('📧 Email:', email);
    console.log('💬 Message:', message);
    console.log('==========================================\n');

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, you would integrate with:
    // - SendGrid API
    // - Mailgun API
    // - AWS SES
    // - Or any other email service

    return { success: true };
  } catch (error) {
    console.error('❌ Failed to process contact message:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

// Save contact message to database (optional)
export const saveContactMessage = async ({ name, email, message }) => {
  try {
    // If MongoDB is connected, save the message
    if (process.env.MONGODB_URI) {
      const Contact = (await import('../models/Contact.js')).default;
      
      const contact = new Contact({
        name,
        email,
        message,
        status: 'new',
      });
      
      await contact.save();
      console.log('✅ Contact message saved to database');
    } else {
      console.log('📝 Contact message logged (database not configured)');
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to save contact message:', error);
    return { success: false };
  }
};
