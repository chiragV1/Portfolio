import nodemailer from "nodemailer";

// Strip spaces from App Password — Gmail shows them grouped (xxxx xxxx xxxx xxxx) but SMTP needs the raw 16 chars
function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, ""),
    },
  });
}

interface LeadEmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  message: string;
}

export async function sendLeadNotification(data: LeadEmailData) {
  const ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER;

  const ownerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #0a0a0f; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7C3AED, #8B5CF6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .body { background: #0D0D1A; padding: 30px; border: 1px solid rgba(124,58,237,0.2); border-top: none; border-radius: 0 0 12px 12px; }
        .field { margin-bottom: 16px; }
        .label { color: #8B5CF6; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { color: #ffffff; font-size: 15px; background: rgba(124,58,237,0.08); padding: 10px 14px; border-radius: 6px; border-left: 3px solid #7C3AED; }
        .message-box { background: rgba(124,58,237,0.08); padding: 14px; border-radius: 8px; border-left: 3px solid #7C3AED; color: #e5e7eb; line-height: 1.6; }
        .footer { text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Lead Received!</h1>
          <p style="margin: 8px 0 0; opacity: 0.9;">Someone wants to work with you</p>
        </div>
        <div class="body">
          <div class="field"><div class="label">Name</div><div class="value">${data.name}</div></div>
          <div class="field"><div class="label">Email</div><div class="value">${data.email}</div></div>
          ${data.company ? `<div class="field"><div class="label">Company</div><div class="value">${data.company}</div></div>` : ""}
          ${data.phone ? `<div class="field"><div class="label">Phone</div><div class="value">${data.phone}</div></div>` : ""}
          <div class="field"><div class="label">Project Type</div><div class="value">${data.projectType}</div></div>
          <div class="field"><div class="label">Message</div><div class="message-box">${data.message.replace(/\n/g, "<br>")}</div></div>
        </div>
        <div class="footer">Portfolio Contact Form • ${new Date().toLocaleString()}</div>
      </div>
    </body>
    </html>
  `;

  const visitorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #0a0a0f; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7C3AED, #8B5CF6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .body { background: #0D0D1A; padding: 30px; border: 1px solid rgba(124,58,237,0.2); border-top: none; border-radius: 0 0 12px 12px; }
        .highlight { color: #8B5CF6; font-weight: 600; }
        .footer { text-align: center; margin-top: 20px; color: #6B7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thanks, ${data.name}! 👋</h1>
          <p style="margin: 8px 0 0; opacity: 0.9;">Your message has been received</p>
        </div>
        <div class="body">
          <p>Hi <span class="highlight">${data.name}</span>,</p>
          <p>Thank you for reaching out! I've received your inquiry about <span class="highlight">${data.projectType}</span> and will get back to you within <strong>24–48 hours</strong>.</p>
          <p>Here's a quick summary of what you sent:</p>
          <blockquote style="border-left: 3px solid #7C3AED; padding-left: 14px; color: #9CA3AF; margin: 16px 0;">${data.message.substring(0, 200)}${data.message.length > 200 ? "..." : ""}</blockquote>
          <p>In the meantime, feel free to check out my recent work or connect with me on LinkedIn.</p>
          <p>Talk soon,<br><strong>Chirag Verma</strong><br><span class="highlight">Full Stack Developer & Automation Engineer</span></p>
        </div>
        <div class="footer">This is an automated confirmation. Please do not reply to this email.</div>
      </div>
    </body>
    </html>
  `;

  const transporter = getTransporter();

  await Promise.all([
    transporter.sendMail({
      from: `"Chirag Verma Portfolio" <${process.env.GMAIL_USER}>`,
      to: ownerEmail,
      subject: `🚀 New Lead: ${data.name} — ${data.projectType}`,
      html: ownerHtml,
    }),
    transporter.sendMail({
      from: `"Chirag Verma" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `Thanks for reaching out, ${data.name}! I'll be in touch soon.`,
      html: visitorHtml,
    }),
  ]);
}
