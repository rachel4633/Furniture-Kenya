import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Pencil, X, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getProducts, addProduct, deleteProduct, updateProduct } from '../services/api'
import type { Product } from '../types'

function Admin() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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

    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  const resetForm = () => {
    setName('')
    setPrice('')
    setCategory('')
    setDescription('')
    setImage('')
    setMaterial('')
    setDimensions('')
    setEditingProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setPrice(String(product.price))
    setCategory(product.category)
    setDescription(product.description || '')
    setImage(product.image)
    setMaterial(product.material || '')
    setDimensions(product.dimensions || '')
    setShowForm(true)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !price || !category || !image) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('user_id', String(user?.id))
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
      resetForm()
      fetchProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Failed to add product. Try again.')
    }
  }

  const handleUpdateProduct = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    setError('')
    setSuccess('')

    if (!name || !price || !category || !image) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const formData = new FormData()
      formData.append('user_id', String(user?.id))
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('description', description)
      formData.append('image', image)
      formData.append('material', material)
      formData.append('dimensions', dimensions)

      await updateProduct(editingProduct.id, formData)

      const updatedProduct = {
        ...editingProduct,
        name,
        price: Number(price),
        category,
        description,
        image,
        material,
        dimensions,
      }

      setProducts(prev =>
        prev.map(p => p.id === editingProduct.id ? updatedProduct : p)
      )

      setSuccess(`"${name}" updated successfully! ✅`)
      setShowForm(false)
      resetForm()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Failed to update product. Try again.')
    }
  }

  const handleDelete = async (id: number, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return

    try {
      await deleteProduct(id, Number(user!.id))
      setSuccess(`"${productName}" deleted successfully.`)
      fetchProducts()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Failed to delete product.')
    }
  }

  const isMobile = screenWidth < 768

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
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: isMobile ? '1.5rem 1rem' : '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '1rem' : '0',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? '2rem' : '2.5rem',
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
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
            style={{
              width: isMobile ? '100%' : 'auto',
              justifyContent: 'center',
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
          <p style={{ color: 'var(--success)', backgroundColor: 'rgba(74,124,89,0.1)', border: '1px solid var(--success)', borderRadius: '4px', padding: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {success}
          </p>
        )}
        {error && (
          <p style={{ color: 'var(--error)', backgroundColor: 'rgba(139,58,58,0.1)', border: '1px solid var(--error)', borderRadius: '4px', padding: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {/* Add/Edit Product Form */}
        {showForm && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--gold-primary)',
            borderRadius: '8px',
            padding: isMobile ? '1.2rem' : '2rem',
            marginBottom: '3rem',
          }}>
            <h2 style={{ fontFamily: 'Georgia, serif', color: 'var(--gold-primary)', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
              {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Product'}
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Product Name *</label>
                  <input type="text" placeholder="e.g. Luxury Sofa Set" value={name} onChange={e => setName(e.target.value)} style={inputStyle} required />
                </div>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Price (KES) *</label>
                  <input type="number" placeholder="e.g. 85000" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Category *</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} required>
                    <option value="">Select category</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining">Dining</option>
                    <option value="Office">Office</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Image URL *</label>
                  <input type="text" placeholder="https://images.unsplash.com/..." value={image} onChange={e => setImage(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Material</label>
                  <input type="text" placeholder="e.g. Solid Mahogany Wood" value={material} onChange={e => setMaterial(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Dimensions</label>
                  <input type="text" placeholder="e.g. 220cm x 90cm x 85cm" value={dimensions} onChange={e => setDimensions(e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Description</label>
                <textarea placeholder="Describe the product..." value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                style={{
                  justifyContent: 'center',
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
                {editingProduct ? <><Pencil size={18} /> Update Product</> : <><Plus size={18} /> Add Product</>}
              </button>
              {editingProduct && (
                <button
                  onClick={() => { resetForm(); setShowForm(false); }}
                  style={{ width: isMobile ? '100%' : 'auto', backgroundColor: 'transparent', color: 'var(--gold-primary)', border: '1px solid var(--gold-primary)', borderRadius: '4px', padding: '0.9rem 2rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}>
            <Package size={28} style={{ color: 'var(--gold-primary)' }} />
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>Total Products</p>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.6rem', fontWeight: 'bold', margin: 0 }}>{products.length}</p>
            </div>
          </div>
        </div>

        {/* Adaptive Product View Container */}
        {loading ? (
          <p style={{ color: 'var(--gold-primary)', textAlign: 'center', padding: '3rem' }}>Loading products...</p>
        ) : isMobile ? (
          
          /* RESPONSIVE MOBILE VIEW CARDS LIST */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {products.map(product => (
              <div 
                key={product.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={product.image} alt={product.name} style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.2rem 0', fontSize: '0.95rem' }}>{product.name}</h4>
                    <span style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: 'var(--gold-primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', display: 'inline-block', marginBottom: '0.4rem' }}>
                      {product.category}
                    </span>
                    <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', margin: 0, fontSize: '0.9rem' }}>
                      KES {Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Fixed, fully accessible actions drawer at the bottom of the card block */}
                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.8rem', marginTop: '0.2rem' }}>
                  <button
                    onClick={() => handleEditProduct(product)}
                    style={{ flex: 1, backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    style={{ flex: 1, backgroundColor: 'rgba(139,58,58,0.15)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* DESKTOP VIEW TABLE */
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Name', 'Category', 'Price', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '1rem 1.5rem', textAlign: 'left', color: 'var(--gold-primary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{product.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: 'var(--gold-primary)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>{product.category}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--gold-primary)', fontWeight: 'bold' }}>KES {Number(product.price).toLocaleString()}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button onClick={() => handleEditProduct(product)} style={{ backgroundColor: 'rgba(201,168,76,0.2)', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                          <Pencil size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(product.id, product.name)} style={{ backgroundColor: 'rgba(139,58,58,0.2)', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: '4px', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
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