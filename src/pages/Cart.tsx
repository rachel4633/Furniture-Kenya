import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768

  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem'
      }}>
        <ShoppingBag size={64} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif', fontSize: '1.8rem', textAlign: 'center' }}>
          Your cart is empty
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Looks like you haven't added anything yet
        </p>
        <Link to="/shop" style={{
          backgroundColor: 'var(--gold-primary)',
          color: 'var(--bg-primary)',
          padding: '0.8rem 2rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold',
          marginTop: '1rem',
        }}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', padding: isMobile ? '1.5rem 1rem' : '3rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <Link to="/shop" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
        }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? '2rem' : '2.5rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          Your Cart
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: isMobile ? '1.5rem' : '3rem' }}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>

        {/* Structural Parent: Flexible Stack on mobile, side-by-side on desktop */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '3rem',
          alignItems: 'start',
        }}>

          {/* Cart Items List Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', flex: 1 }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: isMobile ? '1rem' : '1.5rem',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1rem' : '1.5rem',
                alignItems: isMobile ? 'flex-start' : 'center',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: isMobile ? '70px' : '100px',
                      height: isMobile ? '70px' : '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      flexShrink: 0,
                      backgroundColor: 'var(--bg-tertiary)',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'var(--gold-primary)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {item.category}
                    </p>
                    <h3 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif', fontSize: isMobile ? '0.95rem' : '1.1rem', margin: '0 0 0.3rem 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', margin: 0, fontSize: '0.9rem' }}>
                      KES {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Absolute Top-Right Delete Button for Mobile Ease */}
                  {isMobile && (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '0.5rem' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                {/* Subtotal & Quantity Controls Wrapper */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  width: '100%',
                  borderTop: isMobile ? '1px solid var(--border)' : 'none',
                  paddingTop: isMobile ? '0.8rem' : '0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '0.3rem 0.6rem',
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ color: 'var(--text-primary)', minWidth: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{ textAlign: isMobile ? 'left' : 'right', minWidth: isMobile ? 'auto' : '120px' }}>
                    {!isMobile && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Subtotal</p>}
                    <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', margin: 0 }}>
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {!isMobile && (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.5rem' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Order Summary Block */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: isMobile ? '1.2rem' : '2rem',
            position: isMobile ? 'static' : 'sticky',
            top: '100px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '350px',
            boxSizing: 'border-box'
          }}>
            <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items ({totalItems})</span>
                <span style={{ color: 'var(--text-primary)' }}>KES {totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
                <span style={{ color: 'var(--success)' }}>Free</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.05rem' }}>Total</span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.15rem' }}>
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: 'var(--gold-primary)',
                color: 'var(--bg-primary)',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
                marginBottom: '0.8rem',
              }}
            >
              💳 Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--gold-primary)',
                border: '1px solid var(--gold-primary)',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              <Eye size={18} /> View Product
            </Link>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem', marginBottom: 0 }}>
              Delivery done on customer's request.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart