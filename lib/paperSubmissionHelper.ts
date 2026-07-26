import { adminDb } from './firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

export interface PaperSubmissionData {
  authorName: string;
  authorEmail: string;
  authorPhone: string;
  affiliation: string;
  country: string;
  paperTitle: string;
  abstract: string;
  trackId: string;
  trackTitle: string;
  keywords?: string;
  coAuthors?: string;
  documentUrl?: string;
}

export async function submitPaperRecord(data: PaperSubmissionData) {
  // Generate random 4-digit ID suffix
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const paperId = `SANKALP-2027-PAP-${randomSuffix}`;

  const submissionRecord = {
    paperId,
    ...data,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    createdAt: FieldValue.serverTimestamp(),
  };

  // Save to Firestore `submissions` collection
  await adminDb.collection('submissions').doc(paperId).set(submissionRecord);

  // Send acknowledgement email if SMTP is configured
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"SANKALP 2027 Secretariat" <${process.env.SMTP_USER}>`,
        to: data.authorEmail,
        subject: `Paper Submission Acknowledgement - ${paperId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #184176;">
            <h2 style="color: #f5821e;">SANKALP 2027 - Paper Submission Received</h2>
            <p>Dear ${data.authorName},</p>
            <p>Thank you for submitting your research paper to the <strong>SANKALP 2027 International Conference</strong>.</p>
            
            <div style="background-color: #f7f4ef; border-left: 4px solid #f5821e; padding: 15px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Paper ID:</strong> <span style="font-family: monospace;">${paperId}</span></p>
              <p style="margin: 5px 0;"><strong>Paper Title:</strong> ${data.paperTitle}</p>
              <p style="margin: 5px 0;"><strong>Track:</strong> ${data.trackTitle}</p>
            </div>

            <p>Your submission has been forwarded to the Technical Program Committee for double-blind peer review. You will receive notification regarding acceptance by 30 November 2026.</p>
            
            <p>Warm regards,<br/><strong>SANKALP 2027 Organizing Committee</strong><br/>JK Lakshmipat University, Jaipur</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (emailErr) {
    console.warn('Paper submission notification email could not be sent:', emailErr);
  }

  return submissionRecord;
}
