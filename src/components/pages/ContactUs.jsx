import React, { useState } from 'react';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="seo-rich-content-section" style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
      <h2>Contact Us</h2>
      <p>
        Have questions, suggestions, or feedback about our financial calculators? We would love to hear from you! Please fill out the form below, and our team will get back to you as soon as possible.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', marginTop: '20px' }} className="calculator-wrapper-grid">
        {/* Contact Form */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          boxShadow: 'var(--shadow-premium)'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <span style={{ fontSize: '48px' }}>✉️</span>
              <h3 style={{ color: 'var(--finance-green-dark)', margin: '16px 0 8px 0' }}>Thank You!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Your message has been sent successfully. We appreciate your feedback and will get back to you shortly.
              </p>
              <button 
                className="ad-btn" 
                style={{ backgroundColor: 'var(--brand-navy)', marginTop: '24px' }}
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Message / Feedback</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="print-btn" 
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: 'none',
                  marginTop: '8px'
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            backgroundColor: 'var(--brand-navy-light)',
            border: '1px solid rgba(30, 58, 138, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px'
          }}>
            <h4 style={{ color: 'var(--brand-navy)', marginBottom: '12px' }}>📍 Reach Out Directly</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6' }}>
              We are constantly refining our calculators to keep up with the latest Union Budget reforms and compound interest banking conventions.
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '12px' }}>
              If you have noticed a formula discrepancy or would like us to build a custom tool (e.g. Gratuity or Lumpsum Capital Gains tax), drop us an email:
            </p>
            <div style={{
              marginTop: '16px',
              fontWeight: '700',
              color: 'var(--brand-navy)',
              fontSize: '14px'
            }}>
              📧 support@RupeeBuddyulator.pages.dev
            </div>
          </div>

          <div style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            backgroundColor: 'white'
          }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>🕒 Support Hours</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Monday to Friday: 9:00 AM – 6:00 PM (IST)
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              We aim to respond to all inquiries within 24–48 business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
