import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, ArrowLeft, Truck, Shield } from 'lucide-react'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import type { Product } from '../types'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { addToCart } = useCart()
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

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: 'var(--gold-primary)', fontSize: '1.1rem' }}>Loading product...</p>
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
        gap: '1rem',
      }}>
        <p style={{ color: 'var(--error)', fontSize: '1.1rem' }}>{error || 'Product not found'}</p>
        <Link to="/shop" style={{ color: 'var(--gold-primary)' }}>Back to Shop</Link>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Back Button */}
        <Link to="/shop" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
        }}>
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                height: '500px',
                border: '1px solid var(--border)',
              }}
            />
          </div>

          {/* Details */}
          <div>
            <p style={{
              color: 'var(--gold-primary)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              {product.category}
            </p>

            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2.2rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              lineHeight: 1.2,
            }}>
              {product.name}
            </h1>

            {/* Stars */}
            <div style={{ marginBottom: '1rem', color: 'var(--gold-primary)', fontSize: '1.2rem' }}>
              {'★'.repeat(product.rating ?? 4)}{'☆'.repeat(5 - (product.rating ?? 4))}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                ({product.rating ?? 4}.0)
              </span>
            </div>

            {/* Price */}
            <p style={{
              color: 'var(--gold-primary)',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
            }}>
              KES {Number(product.price).toLocaleString()}
            </p>

            {/* Description */}
            {product.description && (
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
                fontSize: '0.95rem',
              }}>
                {product.description}
              </p>
            )}

            {/* Specs */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.2rem',
              marginBottom: '2rem',
            }}>
              {product.dimensions && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dimensions</span>
                  <span style={{ color: 'var(--text-primary)' }}>{product.dimensions}</span>
                </div>
              )}
              {product.material && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Material</span>
                  <span style={{ color: 'var(--text-primary)' }}>{product.material}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Availability</span>
                <span style={{ color: 'var(--success)' }}>✓ In Stock</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
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
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={() => isWishlisted(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
                }
                style={{
                  padding: '1rem',
                  border: '1px solid var(--gold-primary)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: isWishlisted(product.id) ? '#e74c3c' : 'var(--gold-primary)',
                  cursor: 'pointer',
                }}
              >
                <Heart
                  size={18}
                  fill={isWishlisted(product.id) ? '#e74c3c' : 'none'}
                />
              </button>
            </div>

            {/* Delivery Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Truck size={16} style={{ color: 'var(--gold-primary)' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Free delivery within Nairobi
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Shield size={16} style={{ color: 'var(--gold-primary)' }} />
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