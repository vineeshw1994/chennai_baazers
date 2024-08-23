import nodemailer from "nodemailer";

const auth = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "vineeshflorida@gmail.com",
    pass: "vvpayqoowwchmbui",
  },
});

const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // receiver
    subject: subject, // Subject line
    text: message, // plain text body
    html: `
        <html>
        <body>
          <h1 style="color: #4A90E2;">Hello!</h1>
          <p style="font-size: 16px;">${message}</p>
          <p style="font-size: 14px; color: #999;">Thank you for using our service.</p>
          <footer style="font-size: 12px; color: #666;">
            <p>This is an automated message, please do not reply.</p>
          </footer>
        </body>
        </html>
      `,
  };
  try {
    const emailResponse = await auth.sendMail(mailOptions);
    console.log("Email sent successfully:", emailResponse);
    return emailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
