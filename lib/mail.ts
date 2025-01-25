import nodemailer from "nodemailer";
import { Resend } from "resend";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resend = new Resend(resendApiKey);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    // await resend.emails.send({
    from: "mail@medigadget.vercel.app",
    to: email,
    subject: "Your MediGadget 2FA Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">MediGadget Two-Factor Authentication</h2>
        <p>Dear User,</p>
        <p>To enhance the security of your account, please use the following code to complete your login:</p>
        <h3 style="color: #0056b3;">${token}</h3>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you for choosing MediGadget!</p>
        <p>Best regards,<br/>The MediGadget Team</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    // await resend.emails.send({
    from: "mail@medigadget.vercel.app",
    to: email,
    subject: "Reset Your MediGadget Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
        <p><a href="${resetLink}" style="color: #0056b3;">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email or contact support.</p>
        <p>Thank you for choosing MediGadget!</p>
        <p>Best regards,<br/>The MediGadget Team</p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    // await resend.emails.send({
    from: "mail@medigadget.vercel.app",
    to: email,
    subject: "Confirm Your MediGadget Email",
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Dear User,</p>
        <p>Thank you for registering with MediGadget. Please verify your email address by clicking the link below:</p>
        <p><a href="${confirmLink}" style="color: #0056b3;">Verify Email</a></p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Thank you for choosing MediGadget!</p>
        <p>Best regards,<br/>The MediGadget Team</p>
      </div>
      `,
  });
};
