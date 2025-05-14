import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "arusman1987@gmail.com" ,// your email
      pass: "fllr emyg lsph xxoc" // your app password
    },
  });

  const mailOptions = {
    from: body.email,
    to: 'arusman1987@gmail.com',
    subject: body.subject,
    text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
