import express from 'express';
import { body } from 'express-validator';
import { sendContactEmail, saveContactMessage } from '../controllers/contactController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape(),
];

// POST /api/contact - Send contact form
router.post('/', contactValidation, validateRequest, async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Send email
    await sendContactEmail({ name, email, message });

    // Optionally save to database
    await saveContactMessage({ name, email, message });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
