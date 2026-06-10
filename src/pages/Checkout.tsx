import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MapPin, User, Phone, Copy, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

// ═══════════════════════════════════════════
// BUSINESS CONTACT DETAILS
// ═══════════════════════════════════════════
const WHATSAPP_NUMBER = '254745530374'
const FACEBOOK_DM_URL = 'https://www.facebook.com/youngdigitalfurniture'
const INSTAGRAM_DM_URL = 'https://ig.me/m/YoungDigitalFurniture'

function Checkout() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()

  const [name, setName]         = useState(user?.username || '')
  const [phone, setPhone]       = useState(user?.phone || '')
  const [location, setLocation] = useState('')
  const [error, setError]       = useState('')
  const [copied, setCopied]     = useState(false)
  const [orderSuccess, setOrderSuccess]   = useState(false)
  const [orderPlatform, setOrderPlatform] = useState('')

  // ═══════════════════════════════════════
  // EMPTY CART
  // ═══════════════════════════════════════
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate('/shop')}
          style={{
            backgroundColor: 'var(--gold-primary)',
            color: 'var(--bg-primary)',
            padding: '0.8rem 2rem',
            borderRadius: '4px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Back to Shop
        </button>
      </div>
    )
  }

  // ═══════════════════════════════════════
  // BUILD ORDER MESSAGE
  // ═══════════════════════════════════════
  const buildOrderMessage = () => {
    const itemsList = cartItems
      .map(item =>
        `• ${item.name} x${item.quantity} = KES ${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n')

    return `🛋️ NEW ORDER - Young Digital Furniture

👤 Customer Details:
Name: ${name || '(not filled)'}
Phone: ${phone || '(not filled)'}
Delivery Location: ${location || '(not filled)'}

🛒 Order Items:
${itemsList}

💰 Total: KES ${totalPrice.toLocaleString()}
📦 Items: ${totalItems}

💳 Payment: After Delivery

Please confirm this order. Thank you! 🙏`.trim()
  }

  // ═══════════════════════════════════════
  // VALIDATE FORM
  // ═══════════════════════════════════════
  const validateForm = () => {
    if (!name.trim()) { setError('Please enter your name'); return false }
    if (!phone.trim()) { setError('Please enter your phone number'); return false }
    if (!location.trim()) { setError('Please enter your delivery location'); return false }
    setError('')
    return true
  }

  // ═══════════════════════════════════════
  // COPY MESSAGE
  // ═══════════════════════════════════════
  const copyMessage = () => {
    navigator.clipboard.writeText(buildOrderMessage())
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  // ═══════════════════════════════════════
  // HANDLE WHATSAPP - pre-filled message ✅
  // ═══════════════════════════════════════
  const handleWhatsApp = () => {
    if (!validateForm()) return
    const message = encodeURIComponent(buildOrderMessage())
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    setOrderPlatform('WhatsApp')
    setOrderSuccess(true)
    clearCart()
  }

  // ═══════════════════════════════════════
  // HANDLE FACEBOOK - copy + open DMs ✅
  // ═══════════════════════════════════════
  const handleFacebook = () => {
    if (!validateForm()) return
    navigator.clipboard.writeText(buildOrderMessage())
    setCopied(true)
    window.open(FACEBOOK_DM_URL, '_blank')
    setTimeout(() => {
      setOrderPlatform('Facebook')
      setOrderSuccess(true)
      clearCart()
    }, 500)
  }

  // ═══════════════════════════════════════
  // HANDLE INSTAGRAM - copy + open DMs ✅
  // ═══════════════════════════════════════
  const handleInstagram = () => {
    if (!validateForm()) return
    navigator.clipboard.writeText(buildOrderMessage())
    setCopied(true)
    window.open(INSTAGRAM_DM_URL, '_blank')
    setTimeout(() => {
      setOrderPlatform('Instagram')
      setOrderSuccess(true)
      clearCart()
    }, 500)
  }

  // ═══════════════════════════════════════
  // SUCCESS SCREEN
  // ═══════════════════════════════════════
  if (orderSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <CheckCircle size={80} style={{ color: 'var(--success)' }} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: 'var(--text-primary)' }}>
          Order Sent! 🎉
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.8 }}>
          Your order was sent via{' '}
          <strong style={{ color: 'var(--gold-primary)' }}>{orderPlatform}</strong>.
          {orderPlatform !== 'WhatsApp' && (
            <span> Your message was copied — just <strong>paste it</strong> in the chat and hit send!</span>
          )}
        </p>
        <div style={{
          backgroundColor: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '8px',
          padding: '1rem 1.5rem',
          maxWidth: '400px',
          color: 'var(--gold-primary)',
          fontSize: '0.9rem',
          lineHeight: 1.8,
        }}>
          💳 Payment is after delivery<br />
          📞 We'll call <strong>{phone}</strong> to confirm
        </div>
        <button
          onClick={() => navigate('/shop')}
          style={{
            backgroundColor: 'var(--gold-primary)',
            color: 'var(--bg-primary)',
            padding: '0.9rem 2.5rem',
            borderRadius: '4px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem 0.8rem 2.8rem',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const iconStyle = {
    position: 'absolute' as const,
    left: '0.9rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--gold-primary)',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Back */}
        <button
          onClick={() => navigate('/cart')}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        {/* Header */}
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Place Your Order
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Fill in your details then choose how to send your order
        </p>

        {/* Order Summary */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', fontFamily: 'Georgia, serif' }}>
            🛒 Order Summary
          </h2>

          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid var(--border)',
              marginBottom: '0.8rem',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '55px',
                    height: '55px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-tertiary)',
                  }}
                />
                <div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {item.name}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Qty: {item.quantity}</p>
                </div>
              </div>
              <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                KES {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Total ({totalItems} items)
            </span>
            <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.3rem' }}>
              KES {totalPrice.toLocaleString()}
            </span>
          </div>
          <div style={{
            marginTop: '1rem',
            backgroundColor: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '6px',
            padding: '0.7rem',
            textAlign: 'center',
            color: 'var(--gold-primary)',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}>
            💳 Payment After Delivery
          </div>
        </div>

        {/* Customer Details */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            📋 Your Details
          </h2>

          {error && (
            <p style={{
              color: 'var(--error)',
              backgroundColor: 'rgba(139,58,58,0.1)',
              border: '1px solid var(--error)',
              borderRadius: '4px',
              padding: '0.8rem',
              marginBottom: '1rem',
              fontSize: '0.9rem',
            }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={iconStyle} />
                <input type="text" placeholder="e.g. John Kamau" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                Phone Number *
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={iconStyle} />
                <input type="tel" placeholder="e.g. 0712345678" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                Delivery Location *
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={iconStyle} />
                <input type="text" placeholder="e.g. Westlands, Nairobi" value={location} onChange={e => setLocation(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        {/* Message Preview + Copy */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              📩 Your Order Message
            </h2>
            <button
              onClick={copyMessage}
              style={{
                backgroundColor: copied ? 'var(--success)' : 'rgba(201,168,76,0.15)',
                color: copied ? '#fff' : 'var(--gold-primary)',
                border: `1px solid ${copied ? 'var(--success)' : 'var(--gold-primary)'}`,
                borderRadius: '4px',
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>

          {/* Message preview box */}
          <pre style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
            fontFamily: 'inherit',
          }}>
            {buildOrderMessage()}
          </pre>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.7rem' }}>
            ℹ️ For Facebook & Instagram — copy this message then paste it in the DM chat
          </p>
        </div>

        {/* Order Buttons */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '2px solid var(--gold-primary)',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--gold-primary)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            📲 Choose How to Order
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                backgroundColor: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Order via WhatsApp</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Message pre-filled — just hit send! ✅</p>
              </div>
              <span>→</span>
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebook}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                backgroundColor: '#1877F2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Order via Facebook</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Opens our page → click Message → paste the copied message</p>
              </div>
              <span>→</span>
            </button>

            {/* Instagram */}
            <button
              onClick={handleInstagram}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p style={{ fontWeight: 'bold' }}>Order via Instagram</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Opens our DMs → paste the copied message</p>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', lineHeight: 1.6 }}>
          🔒 Your details are only shared with us to process your order. Payment is after delivery.
        </p>
      </div>
    </div>
  )
}

export default Checkout