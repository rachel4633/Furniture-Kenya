import { Link } from 'react-router-dom'
import { ShoppingBag, Info, Phone, ShoppingCart, LogIn } from 'lucide-react'

function Navbar() {
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
        }}>
          <ShoppingCart size={18} /> Cart
        </Link>

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
      </div>
    </nav>
  )
}

export default Navbar