import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MapPin, User, Phone, Copy, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const WHATSAPP_NUMBER = '254745530374'
const FACEBOOK_DM_URL = 'https://www.facebook.com/youngdigitalfurniture'
const INSTAGRAM_DM_URL = 'https://ig.me/m/YoungDigitalFurniture'

function Checkout() {
  const navigate = useNavigate()
  const routerLocation = useLocation()
  const { user }  = useAuth()
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()

  const directProduct = routerLocation.state?.directProduct || null

  const [name, setName]         = useState(user?.username || '')
  const [phone, setPhone]       = useState(user?.phone || '')
  const [location, setLocation] = useState('')
  const [error, setError]       = useState('')
  const [copied, setCopied]     = useState(false)
  const [orderSuccess, setOrderSuccess]   = useState(false)
  const [orderPlatform, setOrderPlatform] = useState('')

  const checkoutItems = directProduct ? [{ ...directProduct, quantity: 1 }] : cartItems
  const checkoutTotal = directProduct ? Number(directProduct.price) : totalPrice
  const checkoutCount = directProduct ? 1 : totalItems

  if (checkoutItems.length === 0 && !orderSuccess) {
    return (
      <div style={{
        minHeight: '80vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem'
      }}>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>Your checkout is empty</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a premium item from our collections first.</p>
        <button onClick={() => navigate('/')} style={{
          backgroundColor: 'var(--gold-primary)',
          color: 'var(--bg-primary)',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Browse Furniture
        </button>
      </div>
    )
  }

  const generateOrderSummaryText = () => {
    let text = `🛋️ *NEW ORDER - YOUNG DIGITAL FURNITURE*\n\n`
    text += `👤 *Customer Details:*\n`
    text += `• Name: ${name}\n`
    text += `• Phone: ${phone}\n`
    text += `• Delivery Location: ${location}\n\n`
    
    text += `📦 *Ordered Items:*\n`
    checkoutItems.forEach((item: any) => {
      text += `• ${item.name} (x${item.quantity || 1}) — Ksh ${Number(item.price).toLocaleString()}\n`
    })
    
    text += `\n💵 *Total Amount:* Ksh ${checkoutTotal.toLocaleString()}\n`
    text += `📍 _Order generated via Website Checkout_`
    return text
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateOrderSummaryText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setError('Failed to copy order text automatically. Please select and copy text manually.')
    }
  }

  const handleExternalOrderRedirect = (platform: 'whatsapp' | 'facebook' | 'instagram') => {
    if (!name || !phone || !location) {
      setError('Please fill in your name, phone number, and delivery location before submitting.')
      return
    }
    setError('')
    setOrderPlatform(platform)
    setOrderSuccess(true)

    const summaryText = generateOrderSummaryText()
    const encodedText = encodeURIComponent(summaryText)

    if (!directProduct) {
      clearCart()
    }

    setTimeout(() => {
      if (platform === 'whatsapp') {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank')
      } else if (platform === 'facebook') {
        window.open(FACEBOOK_DM_URL, '_blank')
      } else if (platform === 'instagram') {
        window.open(INSTAGRAM_DM_URL, '_blank')
      }
    }, 1800)
  }

  if (orderSuccess) {
    return (
      <div style={{
        minHeight: '90vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '3rem 2rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <CheckCircle size={64} style={{ color: 'var(--success)', marginBottom: '1.5rem' }} />
          <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Order Information Verified!
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Your custom invoice configuration summary has been generated. Redirecting you to 
            <strong style={{ color: 'var(--gold-primary)' }}> {orderPlatform.toUpperCase()}</strong> to review and finalize final shipping timelines with our workshop management.
          </p>

          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'left',
            maxHeight: '180px',
            overflowY: 'auto'
          }}>
            <pre style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: 'var(--text-primary)'
            }}>
              {generateOrderSummaryText()}
            </pre>
          </div>

          <button
            onClick={copyToClipboard}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied summary!' : 'Copy Summary Backup'}
          </button>

          <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '2rem 0 1.5rem 0' }} />
          
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.95rem',
              textDecoration: 'underline'
            }}
          >
            Back to Showroom Homepage
          </button>
        </div>
      </div>
    )
  }

  // Common styles for individual icon alignment
  const wrapperStyle = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center'
  }

  const symbolIconStyle = {
    position: 'absolute' as const,
    left: '1rem',
    color: 'var(--gold-primary)',
    zIndex: 2,
    pointerEvents: 'none' as const
  }

  const inputFieldStyle = {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 2.8rem',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
    zIndex: 1
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem 1rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem',
            marginBottom: '2rem',
            padding: 0
          }}
        >
          <ArrowLeft size={16} /> Return to product showroom
        </button>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          color: 'var(--text-primary)',
          fontSize: '2rem',
          marginBottom: '2rem'
        }}>
          Complete Your Custom Request
        </h1>

        {error && (
          <div style={{
            backgroundColor: 'rgba(139,58,58,0.1)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem'
          }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1.2fr 1fr' : '1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Form Side */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            <h2 style={{
              color: 'var(--gold-primary)',
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.5rem'
            }}>
              Delivery & Contact Specifications
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={wrapperStyle}>
                <User size={16} style={symbolIconStyle} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputFieldStyle}
                />
              </div>

              <div style={wrapperStyle}>
                <Phone size={16} style={symbolIconStyle} />
                <input
                  type="text"
                  placeholder="M-Pesa / Contact Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputFieldStyle}
                />
              </div>

              <div style={wrapperStyle}>
                <MapPin size={16} style={symbolIconStyle} />
                <input
                  type="text"
                  placeholder="Delivery Address / Estate / City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={inputFieldStyle}
                />
              </div>
            </div>

            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '2rem', marginBottom: '1rem' }}>
              Select Showroom Messenger Channel to finish order:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => handleExternalOrderRedirect('whatsapp')}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              >
                Send via WhatsApp Chat
              </button>
              <button
                onClick={() => handleExternalOrderRedirect('facebook')}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#1877F2', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              >
                Send via Facebook Messenger
              </button>
              <button
                onClick={() => handleExternalOrderRedirect('instagram')}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#E1306C', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              >
                Send via Instagram DM
              </button>
            </div>
          </div>

          {/* Overview Sticky Column */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              Invoice Overview ({checkoutCount})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {checkoutItems.map((item: any) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem' }}>{item.name}</h4>
                    <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <div style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    Ksh {Number(item.price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Estimated Bill:</span>
              <span style={{ color: 'var(--gold-primary)', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                Ksh {checkoutTotal.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout