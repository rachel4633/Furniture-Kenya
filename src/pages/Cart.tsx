import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()

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
      }}>
        <ShoppingBag size={64} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif', fontSize: '1.8rem' }}>
          Your cart is empty
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <Link to="/shop" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
        }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.5rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          Your Cart
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    flexShrink: 0,
                    backgroundColor: 'var(--bg-tertiary)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: 'var(--gold-primary)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}>
                    {item.category}
                  </p>
                  <h3 style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                    KES {item.price.toLocaleString()}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '0.3rem 0.8rem',
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ color: 'var(--text-primary)', minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Subtotal</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.5rem' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '2rem',
            position: 'sticky',
            top: '100px',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items ({totalItems})</span>
                <span style={{ color: 'var(--text-primary)' }}>KES {totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
                <span style={{ color: 'var(--success)' }}>Free</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>Total</span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'var(--gold-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
                marginBottom: '1rem',
              }}
            >
              💳 Proceed to Checkout
            </Link>

            
             <a href={`https://wa.me/254745530374?text=Hi! I'd like to order ${totalItems} item(s) worth KES ${totalPrice.toLocaleString()} from YOUNG DIGITAL FURNITURE`}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              📱 Order via WhatsApp
            </a>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem' }}>
              Delivery done on customer's request.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart