import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Heart, ArrowLeft, Truck, Shield } from 'lucide-react'
import { getProductById } from '../services/api'
import { useWishlist } from '../context/WishlistContext'
import type { Product } from '../types'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await getProductById(Number(id))
      setProduct(response.data)
      setLoading(false)
    } catch {
      setError('Failed to load product. Please try again.')
      setLoading(false)
    }
  }

  // Direct checkout handler passing the single item via React Router State
  const handleDirectCheckout = () => {
    if (!product) return
    navigate('/checkout', { state: { directProduct: product } })
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'var(--gold-primary)', fontSize: '1.2rem' }}>Loading product details...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{ color: 'var(--error)', fontSize: '1.2rem' }}>{error || 'Product not found'}</div>
        <Link to="/" style={{ color: 'var(--gold-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem 1rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        
        {/* Back Link */}
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          transition: 'color 0.2s'
        }}>
          <ArrowLeft size={16} /> Back to collections
        </Link>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'window.innerWidth > 768 ? "1fr 1fr" : "1fr"',
          gap: '3.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Image Container */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Right: Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{
                color: 'var(--gold-primary)',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '1.5px',
                fontWeight: 'bold'
              }}>
                {product.category}
              </span>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '2.5rem',
                color: 'var(--text-primary)',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                lineHeight: '1.2'
              }}>
                {product.name}
              </h1>
              <div style={{
                fontSize: '1.8rem',
                color: 'var(--gold-primary)',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}>
                Ksh {Number(product.price).toLocaleString()}
              </div>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '0' }} / >

            <div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {product.description || 'No description available for this premium custom furniture piece.'}
              </p>
            </div>

            {/* Technical Specs */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Material:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{product.material || 'Premium Hardwood'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dimensions:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{product.dimensions || 'Standard Custom Size'}</span>
              </div>
            </div>

            {/* Interactive Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button
                onClick={handleDirectCheckout}
                style={{
                  flex: 1,
                  backgroundColor: 'var(--gold-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '1.1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 4px 12px rgba(201, 168, 76, 0.2)',
                  transition: 'transform 0.2s, opacity 0.2s'
                }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <button
                onClick={() => isWishlisted(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '1.1rem',
                  color: isWishlisted(product.id) ? '#e74c3c' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart
                  size={18}
                  fill={isWishlisted(product.id) ? '#e74c3c' : 'none'}
                />
              </button>
            </div>

            {/* Logistics & Trust Factors */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.8rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Truck size={16} style={{ color: 'var(--gold-primary)' }} / >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Delivery on customer's wish
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Shield size={16} style={{ color: 'var(--gold-primary)' }} / >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  1 year quality guarantee
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail