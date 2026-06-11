import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Info, Phone, ShoppingCart, LogIn, Heart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {
  const { totalItems } = useCart()
  const { user, isAdmin, logout } = useAuth()
  const { totalWishlist } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 992 // Clean breakpoint for mobile and tablets

  return (
    <nav style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: isMobile ? '0.8rem 1rem' : '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
        <h1 style={{
          color: 'var(--gold-primary)',
          fontSize: isMobile ? '1.1rem' : '1.5rem',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          YOUNG DIGITAL <span style={{ color: 'var(--text-primary)' }}>FURNITURE</span>
        </h1>
      </Link>

      {/* Desktop Navigation Links */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/shop" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShoppingBag size={16} /> Shop
          </Link>
          <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={16} /> About
          </Link>
          <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={16} /> Contact
          </Link>
        </div>
      )}

      {/* Desktop Actions */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/cart" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
            <ShoppingCart size={18} /> Cart
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-12px', backgroundColor: 'var(--gold-primary)', color: 'var(--bg-primary)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/wishlist" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
            <Heart size={18} /> Saved
            {totalWishlist > 0 && (
              <span style={{ backgroundColor: '#e74c3c', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-8px', right: '-14px' }}>
                {totalWishlist}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {isAdmin && (
                <Link to="/admin" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  ⚙️ Admin
                </Link>
              )}
              <button onClick={logout} style={{ color: 'var(--bg-primary)', backgroundColor: 'var(--gold-primary)', padding: '0.5rem 1.2rem', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ color: 'var(--bg-primary)', backgroundColor: 'var(--gold-primary)', padding: '0.5rem 1.2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>
      )}

      {/* Mobile Hamburger Icon Button */}
      {isMobile && (
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.2rem' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Sidebar Slider Panel */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '53px',
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 999,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }} onClick={() => setIsMenuOpen(false)}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80%',
            maxWidth: '300px',
            height: '100%',
            backgroundColor: 'var(--bg-secondary)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.25s ease'
          }} onClick={e => e.stopPropagation()}>
            
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>Menu</h4>
            
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={18} /> Shop Collection
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Info size={18} /> About Us
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Phone size={18} /> Contact Support
            </Link>

            <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />

            <Link to="/cart" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', position: 'relative' }}>
              <ShoppingCart size={18} /> My Cart ({totalItems})
            </Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Heart size={18} /> My Wishlist ({totalWishlist})
            </Link>

            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {isAdmin && (
                    <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', padding: '0.7rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                      ⚙️ Go to Admin Panel
                    </button>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} style={{ width: '100%', backgroundColor: '#e74c3c', border: 'none', color: '#fff', padding: '0.7rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Logout Account
                  </button>
                </div>
              ) : (
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--gold-primary)', color: 'var(--bg-primary)', padding: '0.8rem', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
                  <LogIn size={18} /> Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar