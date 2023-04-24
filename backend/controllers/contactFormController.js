import asyncHandler from 'express-async-handler';
import { sendEmail } from '../utils/sendEmail.js';

// @description: Send Email of details from contact form
// @route: POST /api/send
// @access: Public

const sendContactForm = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    if (!name && !email & !message)
      return next(new ErrorResponse('Form can NOT be black', 500));

    const html = `<h1>Hi ${name}</h1><p>Thank you for your enquiry</p><p>This is what your query said:</p><h2>${message}</h2><h4>Somebody will make contact with in due course.</h4><p>Thank you.</p><h3>Your Manager management</h3>`;

    // Send Email
    sendEmail({
      from: process.env.MAILER_FROM,
      to: email,
      subject: 'YCM Contact Request',
      html: html,
    });

    res.status(200).json({ success: true, data: `Email sent successfully` });
  } catch (error) {
    next(error);
  }
});

export { sendContactForm };
