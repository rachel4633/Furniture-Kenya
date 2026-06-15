import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  // Dynamic screen width monitoring for true mobile responsiveness
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Set initial state
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '5rem 2rem',
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

      {/* Main Form and Info Layout */}
      <section style={{ padding: isMobile ? '2.5rem 1rem' : '5rem 2rem' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          // Dynamic grid adjustment based on window size
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '3rem' : '4rem',
        }}>

          {/* Contact Info Column */}
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
                { icon: <Phone size={20} />, label: 'Phone', value: '+254 729627644' },
                { icon: <Mail size={20} />, label: 'Email', value: 'partomwirigi244@gmail.com' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Ngong road, Nairobi, Kenya' },
                { icon: <Clock size={20} />, label: 'Hours', value: 'Every day' },
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
                    <p style={{ color: 'var(--text-primary)', wordBreak: 'break-word' }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a href="https://wa.me/254729627644?text=Hi! I have a question about YOUNG DIGITAL FURNITURE"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '1rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box'
              }}
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form Column */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: isMobile ? '1.5rem 1.2rem' : '2rem',
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
                  width: '100%'
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
          YOUNG DIGITAL FURNITURE
        </p>
        <p>© 2026 Young Digital Furniture. All rights reserved. | Nairobi, Kenya</p>
      </footer>

    </div>
  )
}

export default Contact