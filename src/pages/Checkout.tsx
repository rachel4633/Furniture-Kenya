import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Copy, Phone, Smartphone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { initiateMpesaPayment } from '../services/api'

const PAYBILL = '247247'
const ACCOUNT = '0729627644'
const WHATSAPP_NUMBER = '254745530374'

function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, totalPrice, totalItems, clearCart } = useCart()

  // Payment method: 'stk' or 'paybill'
  const [paymentMethod, setPaymentMethod] = useState<'stk' | 'paybill'>('stk')

  // STK Push state
  const [phone, setPhone] = useState('')
  const [stkLoading, setStkLoading] = useState(false)
  const [stkError, setStkError] = useState('')
  const [stkSuccess, setStkSuccess] = useState('')

  // Paybill state
  const [transactionCode, setTransactionCode] = useState('')
  const [paybillLoading, setPaybillLoading] = useState(false)
  const [paybillError, setPaybillError] = useState('')
  const [copied, setCopied] = useState('')

  // Overall success
  const [orderSuccess, setOrderSuccess] = useState(false)

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

  // Format phone to 254XXXXXXXXX
  const formatPhone = (phoneNumber: string) => {
    let cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1)
    } else if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }
    return cleaned
  }

  // Validate phone number
  const validatePhone = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '')
    return (
      (cleaned.length === 12 && cleaned.startsWith('254')) ||
      (cleaned.length === 10 && cleaned.startsWith('0')) ||
      (cleaned.length === 9 && cleaned.startsWith('7'))
    )
  }

  // Copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  // Build WhatsApp message
  const buildWhatsAppMessage = (txCode: string) => {
    const itemsList = cartItems
      .map(item => `• ${item.name} x${item.quantity} = KES ${(item.price * item.quantity).toLocaleString()}`)
      .join('\n')

    const message = `
🛋️ *NEW ORDER - YOUNG DIGITAL FURNITURE*

👤 Customer: ${user?.username || 'Guest'}
📧 Email: ${user?.email || 'N/A'}

🛒 *Order Items:*
${itemsList}

💰 *Total: KES ${totalPrice.toLocaleString()}*

✅ *M-Pesa Transaction Code:* ${txCode}
📱 Paid to Paybill: ${PAYBILL} | Account: ${ACCOUNT}

Please confirm and process this order. Thank you!
    `.trim()

    return encodeURIComponent(message)
  }

  // ═══════════════════════════
  // HANDLE STK PUSH
  // ═══════════════════════════
  const handleStkPush = async () => {
    setStkError('')
    setStkSuccess('')

    if (!phone.trim()) {
      setStkError('Please enter your M-Pesa phone number')
      return
    }

    if (!validatePhone(phone)) {
      setStkError('Invalid phone number. Use format: 0712345678')
      return
    }

    try {
      setStkLoading(true)
      const formattedPhone = formatPhone(phone)

      const response = await initiateMpesaPayment({
        phone: formattedPhone,
        amount: Math.round(totalPrice),
        accountReference: `YOUNG DIGITAL FURNITURE-${Date.now()}`,
        description: `YOUNG DIGITAL FURNITURE - ${totalItems} item(s)`,
        items: cartItems,
        userId: user?.id || 'guest',
      })

      if (response.data?.ResponseCode === '0' || response.data?.status === 'success') {
        setStkSuccess('✅ M-Pesa prompt sent! Check your phone and enter your PIN to complete payment.')
      } else {
        setStkError(response.data?.message || 'Failed to send prompt. Try again or use Paybill instead.')
      }
    } catch (err: any) {
      setStkError(err.response?.data?.message || 'Failed to send M-Pesa prompt. Try Paybill option instead.')
    } finally {
      setStkLoading(false)
    }
  }

  // ═══════════════════════════
  // HANDLE PAYBILL CONFIRM
  // ═══════════════════════════
  const handlePaybillConfirm = () => {
    setPaybillError('')

    if (!transactionCode.trim()) {
      setPaybillError('Please enter your M-Pesa transaction code')
      return
    }

    if (transactionCode.trim().length < 8) {
      setPaybillError('Transaction code is too short. Check your M-Pesa SMS.')
      return
    }

    setPaybillLoading(true)

    const message = buildWhatsAppMessage(transactionCode)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')

    setTimeout(() => {
      setOrderSuccess(true)
      clearCart()
      setPaybillLoading(false)
    }, 1000)
  }

  // ═══════════════════════════
  // SUCCESS SCREEN
  // ═══════════════════════════
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
          Order Confirmed! 🎉
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.8 }}>
          Your order has been sent to us via WhatsApp. We will verify your payment and contact you shortly!
        </p>
        <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
          Transaction Code: {transactionCode}
        </p>
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

  const detailBoxStyle = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '0.8rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.8rem',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Back Button */}
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
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.5rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          Checkout
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Complete your order with M-Pesa
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
                    width: '50px',
                    height: '50px',
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
        </div>

        {/* Payment Method Tabs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
            Choose payment method:
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>

            {/* STK Push Tab */}
            <button
              onClick={() => setPaymentMethod('stk')}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: `2px solid ${paymentMethod === 'stk' ? 'var(--gold-primary)' : 'var(--border)'}`,
                backgroundColor: paymentMethod === 'stk' ? 'rgba(201,168,76,0.1)' : 'var(--bg-secondary)',
                color: paymentMethod === 'stk' ? 'var(--gold-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              <Smartphone size={24} />
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>STK Push</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Get prompt on phone</span>
            </button>

            {/* Paybill Tab */}
            <button
              onClick={() => setPaymentMethod('paybill')}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: `2px solid ${paymentMethod === 'paybill' ? 'var(--gold-primary)' : 'var(--border)'}`,
                backgroundColor: paymentMethod === 'paybill' ? 'rgba(201,168,76,0.1)' : 'var(--bg-secondary)',
                color: paymentMethod === 'paybill' ? 'var(--gold-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              <Phone size={24} />
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Paybill</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Pay manually</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════ */}
        {/* STK PUSH PANEL */}
        {/* ═══════════════════════════════ */}
        {paymentMethod === 'stk' && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--gold-primary)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--gold-primary)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
              📲 M-Pesa STK Push
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              We'll send a payment request directly to your phone. Just enter your M-Pesa PIN when prompted.
            </p>

            {/* How it works box */}
            <div style={{
              backgroundColor: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
            }}>
              <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>How it works:</p>
              <p>1️⃣ Enter your M-Pesa number below</p>
              <p>2️⃣ Click "Send Payment Request"</p>
              <p>3️⃣ A prompt appears on your phone automatically</p>
              <p>4️⃣ Enter your M-Pesa PIN to pay</p>
              <p>5️⃣ Done! Order confirmed ✅</p>
            </div>

            {/* Error / Success messages */}
            {stkError && (
              <p style={{
                color: 'var(--error)',
                backgroundColor: 'rgba(139,58,58,0.1)',
                border: '1px solid var(--error)',
                borderRadius: '4px',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
              }}>
                {stkError}
              </p>
            )}
            {stkSuccess && (
              <p style={{
                color: 'var(--success)',
                backgroundColor: 'rgba(74,124,89,0.1)',
                border: '1px solid var(--success)',
                borderRadius: '4px',
                padding: '0.8rem',
                marginBottom: '1rem',
                fontSize: '0.9rem',
              }}>
                {stkSuccess}
              </p>
            )}

            {/* Phone input */}
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
              M-Pesa Phone Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box' as const,
                marginBottom: '1.5rem',
              }}
            />

            {/* STK Button */}
            <button
              onClick={handleStkPush}
              disabled={stkLoading}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: stkLoading ? 'var(--text-muted)' : 'var(--gold-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: stkLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {stkLoading ? '⏳ Sending Request...' : `💳 Send Payment Request - KES ${totalPrice.toLocaleString()}`}
            </button>
          </div>
        )}

        {/* ═══════════════════════════════ */}
        {/* PAYBILL PANEL */}
        {/* ═══════════════════════════════ */}
        {paymentMethod === 'paybill' && (
          <div>
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--gold-primary)',
              borderRadius: '8px',
              padding: '2rem',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--gold-primary)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
                📱 Pay via M-Pesa Paybill
              </h2>

              {/* Steps */}
              <div style={{
                backgroundColor: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '6px',
                padding: '1rem',
                marginBottom: '1.5rem',
                lineHeight: 2,
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
              }}>
                <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>Follow these steps:</p>
                <p>1️⃣ Go to <strong style={{ color: 'var(--text-primary)' }}>M-Pesa</strong> on your phone</p>
                <p>2️⃣ Select <strong style={{ color: 'var(--text-primary)' }}>Lipa Na M-Pesa → Pay Bill</strong></p>
                <p>3️⃣ Enter Business No: <strong style={{ color: 'var(--gold-primary)' }}>{PAYBILL}</strong></p>
                <p>4️⃣ Enter Account No: <strong style={{ color: 'var(--gold-primary)' }}>{ACCOUNT}</strong></p>
                <p>5️⃣ Enter Amount: <strong style={{ color: 'var(--gold-primary)' }}>KES {totalPrice.toLocaleString()}</strong></p>
                <p>6️⃣ Enter your M-Pesa PIN and confirm</p>
                <p>7️⃣ Copy the transaction code from the SMS</p>
              </div>

              {/* Paybill details with copy */}
              <div style={detailBoxStyle}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Business Number (Paybill)</p>
                  <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '0.05em' }}>{PAYBILL}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(PAYBILL, 'paybill')}
                  style={{
                    backgroundColor: copied === 'paybill' ? 'var(--success)' : 'rgba(201,168,76,0.2)',
                    color: copied === 'paybill' ? '#fff' : 'var(--gold-primary)',
                    border: '1px solid var(--gold-primary)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                  }}
                >
                  <Copy size={14} />
                  {copied === 'paybill' ? 'Copied! ✅' : 'Copy'}
                </button>
              </div>

              <div style={detailBoxStyle}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Account Number</p>
                  <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '0.05em' }}>{ACCOUNT}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(ACCOUNT, 'account')}
                  style={{
                    backgroundColor: copied === 'account' ? 'var(--success)' : 'rgba(201,168,76,0.2)',
                    color: copied === 'account' ? '#fff' : 'var(--gold-primary)',
                    border: '1px solid var(--gold-primary)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                  }}
                >
                  <Copy size={14} />
                  {copied === 'account' ? 'Copied! ✅' : 'Copy'}
                </button>
              </div>

              <div style={detailBoxStyle}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Amount to Pay</p>
                  <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.3rem' }}>KES {totalPrice.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(String(totalPrice), 'amount')}
                  style={{
                    backgroundColor: copied === 'amount' ? 'var(--success)' : 'rgba(201,168,76,0.2)',
                    color: copied === 'amount' ? '#fff' : 'var(--gold-primary)',
                    border: '1px solid var(--gold-primary)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                  }}
                >
                  <Copy size={14} />
                  {copied === 'amount' ? 'Copied! ✅' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Transaction Code Confirm */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                ✅ Confirm Your Payment
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                After paying, enter the M-Pesa confirmation code from your SMS
              </p>

              {paybillError && (
                <p style={{
                  color: 'var(--error)',
                  backgroundColor: 'rgba(139,58,58,0.1)',
                  border: '1px solid var(--error)',
                  borderRadius: '4px',
                  padding: '0.8rem',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                }}>
                  {paybillError}
                </p>
              )}

              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                M-Pesa Transaction Code *
              </label>
              <input
                type="text"
                placeholder="e.g. QJK4XXXXXZ"
                value={transactionCode}
                onChange={e => setTransactionCode(e.target.value.toUpperCase())}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  outline: 'none',
                  letterSpacing: '0.1em',
                  fontWeight: 'bold',
                  boxSizing: 'border-box' as const,
                  marginBottom: '1.5rem',
                }}
              />

              <button
                onClick={handlePaybillConfirm}
                disabled={paybillLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: paybillLoading ? 'var(--text-muted)' : '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: paybillLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {paybillLoading ? '⏳ Processing...' : '📱 Confirm Order via WhatsApp'}
              </button>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                This will open WhatsApp with your order details for us to verify and process
              </p>
            </div>
          </div>
        )}

        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>
          🔒 Your order details are sent securely. We will confirm within 24 hours.
        </p>
      </div>
    </div>
  )
}

export default Checkout