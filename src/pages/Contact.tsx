import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// 🔑 PASTE YOUR KEYS HERE
const SERVICE_ID = 'service_hq0f1an'
const TEMPLATE_ID = 'template_3rml2gs'
const PUBLIC_KEY = 'HTjlUXU3b_XrrXJA4'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
          email: email,
        },
        PUBLIC_KEY
      )

      setLoading(false)
      setSuccess('Message sent! We will get back to you within 24 hours. 🎉')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setSuccess(''), 5000)
    } catch {
      setLoading(false)
      setError('Failed to send message. Please try WhatsApp instead.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{
          color: 'var(--gold-primary)',
          letterSpacing: '0.3em',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Get In Touch
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
        }}>
          We'd Love to <span style={{ color: 'var(--gold-primary)' }}>Hear From You</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
          Have a question about a product or need help with your order? We're here for you.
        </p>
      </section>

      <section style={{ padding: '5rem 2rem' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
        }}>

          {/* Contact Info */}
          <div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.8rem',
              marginBottom: '2rem',
            }}>
              Contact Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { icon: <Phone size={20} />, label: 'Phone', value: '+254 700 000 000' },
                { icon: <Mail size={20} />, label: 'Email', value: 'hello@furnishke.co.ke' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Westlands, Nairobi, Kenya' },
                { icon: <Clock size={20} />, label: 'Hours', value: 'Mon - Sat: 8am - 6pm' },
              ].map(info => (
                <div key={info.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    color: 'var(--gold-primary)',
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                      {info.label}
                    </p>
                    <p style={{ color: 'var(--text-primary)' }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            
              <a href="https://wa.me/254700000000?text=Hi! I have a question about Furnish KE"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              Send a Message
            </h2>

            {success && (
              <p style={{
                color: 'var(--success)',
                backgroundColor: 'rgba(74,124,89,0.1)',
                border: '1px solid var(--success)',
                borderRadius: '4px',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                {success}
              </p>
            )}
            {error && (
              <p style={{
                color: 'var(--error)',
                backgroundColor: 'rgba(139,58,58,0.1)',
                border: '1px solid var(--error)',
                borderRadius: '4px',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                {error}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Kamau"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: loading ? 'var(--text-muted)' : 'var(--gold-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}>
        <p style={{ color: 'var(--gold-primary)', fontFamily: 'Georgia, serif', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          FURNISH KE
        </p>
        <p>© 2026 Furnish KE. All rights reserved. | Nairobi, Kenya</p>
      </footer>

    </div>
  )
}

export default Contact