import { Link } from 'react-router-dom'
import { ShoppingBag, Info, Phone, ShoppingCart, LogIn } from 'lucide-react'
import { useCart} from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { totalItems } = useCart()
  const { user, isAdmin, logout } = useAuth()

  return (
    <nav style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{
          color: 'var(--gold-primary)',
          fontSize: '1.5rem',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.1em',
        }}>
          FURNISH <span style={{ color: 'var(--text-primary)' }}>KE</span>
        </h1>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/shop" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <ShoppingBag size={16} /> Shop
        </Link>

        <Link to="/about" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <Info size={16} /> About
        </Link>

        <Link to="/contact" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <Phone size={16} /> Contact
        </Link>
      </div>

      {/* Cart + Login */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/cart" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          position: 'relative'
        }}>
          <ShoppingCart size={18} /> Cart
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--bg-primary)',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              {totalItems}
            </span>
          )}
        </Link>

          {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {isAdmin && (
                  <Link to="/admin" style={{
                    color: 'var(--gold-primary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}>
                    ⚙️ Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  style={{
                    color: 'var(--bg-primary)',
                    backgroundColor: 'var(--gold-primary)',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" style={{
                color: 'var(--bg-primary)',
                backgroundColor: 'var(--gold-primary)',
                padding: '0.5rem 1.2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <LogIn size={16} /> Login
              </Link>
            )}
      </div>
    </nav>
  )
}

export default Navbar