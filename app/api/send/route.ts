import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const receipt = formData.get('receipt') as File | null;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arusman1987@gmail.com',
      pass: 'fllr emyg lsph xxoc', // App password
    },
  });

  // Base mail options
  const mailOptions: any = {
    from: email,
    to: 'arusman1987@gmail.com',
    subject,
    text: message,
  };

  // Attach receipt if it exists
  if (receipt) {
    const buffer = Buffer.from(await receipt.arrayBuffer());
    mailOptions.attachments = [{
      filename: receipt.name,
      content: buffer,
    }];
  }

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
