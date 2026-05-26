import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { getProducts } from '../services/api'
import type { Product } from '../types'

const categories = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor']

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

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
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '3rem 2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.5rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          Our Collection
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Handpicked premium furniture for every room
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
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
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '3rem',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              border: '1px solid var(--gold-primary)',
              backgroundColor: activeCategory === cat ? 'var(--gold-primary)' : 'transparent',
              color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--gold-primary)',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
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
          <p style={{ color: 'var(--gold-primary)', fontSize: '1.1rem' }}>
            Loading products...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--error)', fontSize: '1.1rem', marginBottom: '1rem' }}>
            {error}
          </p>
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

      {/* Product Grid */}
      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
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
                <button style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--gold-primary)',
                }}>
                  <Heart size={16} />
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

                {/* Stars */}
                <div style={{ marginBottom: '1rem', color: 'var(--gold-primary)' }}>
                  {'★'.repeat(product.rating ?? 4)}{'☆'.repeat(5 - (product.rating ?? 4))}
                </div>

                {/* Price + Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{
                    color: 'var(--gold-primary)',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                  }}>
                    KES {Number(product.price).toLocaleString()}
                  </p>
                  <Link to={`/product/${product.id}`} style={{
                    backgroundColor: 'var(--gold-primary)',
                    color: 'var(--bg-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <ShoppingCart size={14} /> View
                  </Link>
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