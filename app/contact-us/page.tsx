'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

const CONTACT_INFO = [
  {
    title: 'Registered Office',
    content: [
      'One Way Cab',
      'Baroda Taxi Cabs Pvt Ltd',
      'T-18/C, Indiabulls Megamall,',
      'Jetalpur Road, Nr. Alkapuri.',
      'Vadodara - 390 002',
      'Gujarat, India',
    ],
    icon: Building,
  },
];

const EMAIL_CONTACTS = [
  { label: 'General Enquiry', email: 'feedback@oneway.cab' },
  { label: 'Media Enquiries', email: 'media@oneway.cab' },
  { label: 'Corporate Tie-up', email: 'corporate@oneway.cab' },
  { label: 'Career', email: 'growth@oneway.cab' },
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    feedback: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.feedback) {
      setStatus('error');
      setMessage('Please fill all fields');
      return;
    }

    setStatus('loading');
    
    // Simulate form submission
    // In production, this would call an API endpoint
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for contacting us. We will get back to you soon.');
      setFormData({ firstName: '', email: '', feedback: '' });
    }, 1000);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                  {message}
                </div>
              ) : status === 'error' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                  {message}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input-field"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    className="input-field min-h-[150px]"
                    placeholder="Enter your message"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 font-medium">
                  Note: We do not accept booking through this Contact Us Page
                </p>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:border-l lg:pl-8">
              {/* Office Address */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Registered Office
                </h3>
                <address className="text-gray-600 not-italic leading-relaxed">
                  One Way Cab<br />
                  Baroda Taxi Cabs Pvt Ltd<br />
                  T-18/C, Indiabulls Megamall,<br />
                  Jetalpur Road, Nr. Alkapuri.<br />
                  Vadodara - 390 002<br />
                  Gujarat, India
                </address>
              </div>

              {/* Email Contacts */}
              <div className="space-y-4">
                {EMAIL_CONTACTS.map((contact, index) => (
                  <div key={index}>
                    <p className="text-gray-600 text-sm">{contact.label}:</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>

              {/* Phone */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Phone Number
                </h3>
                <a 
                  href="tel:+918000247247"
                  className="text-primary hover:underline text-lg font-medium"
                >
                  +91-8000 247 247
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
