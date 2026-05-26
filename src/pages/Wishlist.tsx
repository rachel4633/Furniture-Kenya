import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlistItems.length === 0) {
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
        <Heart size={64} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{
          color: 'var(--text-primary)',
          fontFamily: 'Georgia, serif',
          fontSize: '1.8rem',
        }}>
          Your wishlist is empty
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Click the heart on any product to save it here
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
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '3rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2.5rem',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            My Wishlist
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {wishlistItems.map(product => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {/* Image */}
              <div style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                {/* Remove from wishlist */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(139,58,58,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: '1.2rem' }}>
                <p style={{
                  color: 'var(--gold-primary)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  {product.category}
                </p>
                <h3 style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                }}>
                  {product.name}
                </h3>
                <p style={{
                  color: 'var(--gold-primary)',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  marginBottom: '1rem',
                }}>
                  KES {Number(product.price).toLocaleString()}
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })}
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--gold-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.7rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                    }}
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      flex: 1,
                      border: '1px solid var(--gold-primary)',
                      color: 'var(--gold-primary)',
                      borderRadius: '4px',
                      padding: '0.7rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist