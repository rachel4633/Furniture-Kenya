import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Pencil, X, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getProducts, addProduct, deleteProduct } from '../services/api'
import type { Product } from '../types'

function Admin() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [material, setMaterial] = useState('')
  const [dimensions, setDimensions] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (!isAdmin) {
      navigate('/')
      return
    }
    fetchProducts()
  }, [user, isAdmin])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getProducts()
      setProducts(response.data)
      setLoading(false)
    } catch {
      setError('Failed to load products.')
      setLoading(false)
    }
  }

  const handleAddProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('description', description)
      formData.append('image', image)
      formData.append('material', material)
      formData.append('dimensions', dimensions)

      await addProduct(formData)
      setSuccess('Product added successfully! ✅')
      setShowForm(false)

      // Reset form
      setName('')
      setPrice('')
      setCategory('')
      setDescription('')
      setImage('')
      setMaterial('')
      setDimensions('')

      fetchProducts()

      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Failed to add product. Try again.')
    }
  }

  const handleDelete = async (id: number, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return

    try {
      await deleteProduct(id)
      setSuccess(`"${productName}" deleted successfully.`)
      fetchProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Failed to delete product.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '0.3rem',
            }}>
              Admin Panel
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Welcome back, {user?.username} 👋
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: '4px',
              padding: '0.8rem 1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
            }}
          >
            {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Product</>}
          </button>
        </div>

        {/* Messages */}
        {success && (
          <p style={{
            color: 'var(--success)',
            backgroundColor: 'rgba(74,124,89,0.1)',
            border: '1px solid var(--success)',
            borderRadius: '4px',
            padding: '0.8rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            {success}
          </p>
        )}
        {error && (
          <p style={{
            color: 'var(--error)',
            backgroundColor: 'rgba(139,58,58,0.1)',
            border: '1px solid var(--error)',
            borderRadius: '4px',
            padding: '0.8rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        {/* Add Product Form */}
        {showForm && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--gold-primary)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '3rem',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--gold-primary)',
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
            }}>
              Add New Product
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Sofa Set"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Price (KES) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 85000"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Dining">Dining</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Image URL *
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Material
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solid Mahogany Wood"
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g. 220cm x 90cm x 85cm"
                  value={dimensions}
                  onChange={e => setDimensions(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe the product..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              style={{
                marginTop: '1.5rem',
                backgroundColor: 'var(--gold-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.9rem 2rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <Package size={32} style={{ color: 'var(--gold-primary)' }} />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Products</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 'bold' }}>
                {products.length}
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <p style={{ color: 'var(--gold-primary)', textAlign: 'center', padding: '3rem' }}>
            Loading products...
          </p>
        ) : (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Name', 'Category', 'Price', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      color: 'var(--gold-primary)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr
                    key={product.id}
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                      {product.name}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        backgroundColor: 'rgba(201,168,76,0.1)',
                        color: 'var(--gold-primary)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                      }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                      KES {Number(product.price).toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          style={{
                            backgroundColor: 'rgba(139,58,58,0.2)',
                            border: '1px solid var(--error)',
                            color: 'var(--error)',
                            borderRadius: '4px',
                            padding: '0.4rem 0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem',
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin