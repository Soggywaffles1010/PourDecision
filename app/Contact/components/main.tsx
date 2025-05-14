'use client';
import React, { useState } from 'react';
 
import { useRouter } from 'next/navigation'; // ← App Router




const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
      router.push('/');
    }, 1500); // Wait 1.5 seconds before redirecting
    } else {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2e2e2e] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 rounded-2xl border border-white/20 backdrop-blur-md text-white space-y-5"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl backdrop-blur-md border text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: '1px',
          }}
        >
          Send Message
        </button>
        {status && <p className="text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default ContactPage;
