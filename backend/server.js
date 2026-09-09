const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Booking = require('./models/Booking');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Routes

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, sessionType, date, notes } = req.body;

    // 1. Save to MongoDB
    const newBooking = new Booking({
      firstName, lastName, email, phone, sessionType, date, notes
    });
    await newBooking.save();

    // 2. Send Email via Resend
    // Note: Free tier Resend requires a verified domain to send to arbitrary emails, 
    // OR you must send TO the email you registered with.
    const toEmail = process.env.RESEND_TO_EMAIL || email;

    const emailHtml = `
      <h2>New Booking Request: ${sessionType}</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
      <p><strong>Notes:</strong> ${notes || 'None'}</p>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Default sender for Resend free tier
      to: toEmail,
      subject: `New Session Booking: ${firstName} ${lastName}`,
      html: emailHtml
    });

    res.status(201).json({ message: 'Booking created and email sent successfully.' });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ error: 'Failed to process booking.' });
  }
});

app.get('/api/bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

app.delete('/api/bookings/:id', verifyToken, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
});

app.patch('/api/bookings/:id/confirm', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'confirmed';
    await booking.save();

    // Send confirmation email to client
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; background: #f9f6ee; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .header { background: #12100E; padding: 36px 40px; text-align: center; }
          .header h1 { color: #C5A059; font-size: 22px; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
          .header p { color: #FFFDF8; font-size: 11px; margin: 8px 0 0; letter-spacing: 2px; opacity: 0.7; }
          .body { padding: 36px 40px; }
          .body h2 { color: #12100E; font-size: 20px; margin-top: 0; }
          .body p { color: #555; font-size: 14px; line-height: 1.7; }
          .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f0ece2; }
          .detail-label { color: #C5A059; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; min-width: 110px; padding-top: 2px; }
          .detail-value { color: #12100E; font-size: 14px; font-weight: 500; }
          .footer { background: #12100E; padding: 24px 40px; text-align: center; }
          .footer p { color: #FFFDF8; font-size: 11px; margin: 0; opacity: 0.5; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Lumina Studio</h1>
            <p>YOUR SESSION IS CONFIRMED</p>
          </div>
          <div class="body">
            <h2>Dear ${booking.firstName},</h2>
            <p>We are delighted to confirm your photography session with <strong>Lumina Studio</strong>. We look forward to creating something beautiful together!</p>
            <div class="detail-row">
              <div class="detail-label">Session</div>
              <div class="detail-value">${booking.sessionType}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Date</div>
              <div class="detail-value">${new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Client</div>
              <div class="detail-value">${booking.firstName} ${booking.lastName}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Contact</div>
              <div class="detail-value">${booking.phone}</div>
            </div>
            ${booking.notes ? `<div class="detail-row"><div class="detail-label">Notes</div><div class="detail-value">${booking.notes}</div></div>` : ''}
            <p style="margin-top: 24px;">Our team will reach out to you shortly to discuss finer details such as the shoot location, styling, and timeline. If you have any questions in the meantime, simply reply to this email.</p>
            <p>We can't wait to work with you!</p>
            <p style="margin-top: 24px;"><em>Warm regards,<br/><strong>The Lumina Studio Team</strong></em></p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Lumina Studio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send confirmation email TO THE CUSTOMER
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: booking.email,
      subject: `✨ Your Booking is Confirmed – Lumina Studio`,
      html: confirmationHtml
    });

    // 2. Notify admin that a booking was confirmed
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL,
      subject: `[Admin] Booking Confirmed: ${booking.firstName} ${booking.lastName}`,
      html: `<p>You confirmed the booking for <strong>${booking.firstName} ${booking.lastName}</strong> (${booking.email}) for a <strong>${booking.sessionType}</strong> session on <strong>${new Date(booking.date).toLocaleDateString()}</strong>. A confirmation email has been sent to the customer.</p>`
    });

    res.json({ message: 'Booking confirmed and email sent', booking });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: 'Failed to confirm booking.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
