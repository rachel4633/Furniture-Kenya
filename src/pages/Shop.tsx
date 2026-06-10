import { useState, useEffect } from 'react'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/api'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const categories = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor']

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const { addToCart } = useCart()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getGridColumns = () => {
    if (screenWidth >= 1024) return 'repeat(4, 1fr)'
    if (screenWidth >= 600) return 'repeat(2, 1fr)'
    return '1fr'
  }
 

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getProducts()
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load products. Please try again.')
      setLoading(false)
    }
  }

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.3rem',
          color: 'var(--text-primary)',
          marginBottom: '0.4rem',
        }}>
          Our Collection
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Handpicked premium furniture for Every Place.
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
        <input
          type="text"
          placeholder="Search furniture..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem 1.2rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '0.8rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.4rem 1.2rem',
              borderRadius: '4px',
              border: '1px solid var(--gold-primary)',
              backgroundColor: activeCategory === cat ? 'var(--gold-primary)' : 'transparent',
              color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--gold-primary)',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--gold-primary)', fontSize: '1.1rem' }}>Loading products...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--error)', fontSize: '1.1rem', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={fetchProducts}
            style={{
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--bg-primary)',
              padding: '0.8rem 2rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Grid - UPDATED: Hooked to dynamic resize logic */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {filtered.map(product => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-primary)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Image Container */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-tertiary)',
                height: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1)'
                  }}
                />

                {/* Heart Button */}
                <button
                  onClick={() => isWishlisted(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                  }
                  style={{
                    position: 'absolute',
                    top: '0.8rem',
                    right: '0.8rem',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isWishlisted(product.id) ? '#e74c3c' : 'var(--gold-primary)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <Heart size={15} fill={isWishlisted(product.id) ? '#e74c3c' : 'none'} />
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{
                  color: 'var(--gold-primary)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  {product.category}
                </p>
                <h3 style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  marginBottom: '0.4rem',
                  lineHeight: 1.3,
                }}>
                  {product.name}
                </h3>

                {/* Stars */}
                <div style={{ marginBottom: '0.8rem', color: 'var(--gold-primary)', fontSize: '0.85rem' }}>
                  {'★'.repeat(product.rating ?? 4)}{'☆'.repeat(5 - (product.rating ?? 4))}
                </div>

                {/* Price */}
                <p style={{
                  color: 'var(--gold-primary)',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  marginBottom: '0.8rem',
                  marginTop: 'auto',
                }}>
                  KES {Number(product.price).toLocaleString()}
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      color: 'var(--gold-primary)',
                      border: '1px solid var(--gold-primary)',
                      padding: '0.5rem 0.4rem',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'var(--gold-primary)'
                      e.currentTarget.style.color = 'var(--bg-primary)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--gold-primary)'
                    }}
                  >
                    <Eye size={13} /> View
                  </button>

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
                      padding: '0.5rem 0.4rem',
                      borderRadius: '4px',
                      border: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <ShoppingCart size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
          <p style={{ fontSize: '1.2rem' }}>No products found 😔</p>
          <p>Try a different search or category</p>
        </div>
      )}
    </div>
  )
}

export default Shop