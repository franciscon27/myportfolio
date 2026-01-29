// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aqui integrarias com um serviço como Formspree ou EmailJS
    console.log('Form submitted:', formData);
    
    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-28 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Let&apos;s Create<br />Something Great
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Have a project in mind? I&apos;d love to hear about it. 
            Tell me about your vision, and let&apos;s explore how we can bring it to life together.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    placeholder="hello@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white py-4 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Informações de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-100 rounded-lg">
                    <Mail className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-neutral-600 hover:text-accent transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-100 rounded-lg">
                    <Phone className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a 
                      href="tel:+351912345678" 
                      className="text-neutral-600 hover:text-accent transition-colors"
                    >
                      +351 912 345 678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-neutral-600">
                      Based in Porto, Portugal<br />
                      Available for worldwide projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Response Time</h3>
              <p className="text-neutral-600 mb-4">
                I typically respond to all inquiries within 24 hours during business days.
              </p>
              <p className="text-sm text-neutral-500">
                Business Hours: Monday to Friday, 9:00 - 18:00 WET
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}