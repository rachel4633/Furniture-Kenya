import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, ArrowLeft, Truck, Shield } from 'lucide-react'
import{ useCart} from '../context/CartContext'


const products = [
  {
    id: 1,
    name: 'Luxury Sofa Set',
    price: 85000,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    rating: 5,
    description: 'Experience ultimate comfort with our flagship luxury sofa set. Crafted with premium leather and solid hardwood frame, this sofa set is built to last a lifetime while keeping your living room looking stunning.',
    dimensions: '220cm x 90cm x 85cm',
    material: 'Premium Leather & Hardwood',
    colors: ['#2a1a0a', '#1a1a2a', '#e8e0d0'],
    inStock: true,
  },
  {
    id: 2,
    name: 'King Bed Frame',
    price: 65000,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    rating: 4,
    description: 'Transform your bedroom into a royal retreat with our king bed frame. Featuring an elegant headboard and solid wood construction for a sleep experience like no other.',
    dimensions: '200cm x 180cm x 120cm',
    material: 'Solid Mahogany Wood',
    colors: ['#3a2010', '#1a1a1a'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Dining Table Set',
    price: 72000,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    rating: 5,
    description: 'Gather your family around this elegant dining table set. Comes with 6 matching chairs and a solid wood table top that makes every meal feel like a special occasion.',
    dimensions: '180cm x 90cm x 76cm',
    material: 'Teak Wood & Fabric',
    colors: ['#2a1a0a', '#f0e8d8'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Executive Desk',
    price: 45000,
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
    rating: 4,
    description: 'Command your workspace with our executive desk. Features built-in cable management, spacious drawers and a premium finish that makes working from home feel truly professional.',
    dimensions: '160cm x 75cm x 76cm',
    material: 'MDF & Metal Frame',
    colors: ['#1a1a1a', '#2a2a2a'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Outdoor Lounge Set',
    price: 55000,
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    rating: 4,
    description: 'Bring luxury to your outdoor spaces with this weather-resistant lounge set. Perfect for patios, gardens and balconies across Kenya\'s beautiful climate.',
    dimensions: '200cm x 85cm x 70cm',
    material: 'Rattan & Waterproof Fabric',
    colors: ['#3a3020', '#e8d8b0'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Modern Wardrobe',
    price: 58000,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
    rating: 5,
    description: 'Organize your life in style with our modern wardrobe. Features sliding doors, multiple compartments and a mirror panel to make your bedroom feel spacious and elegant.',
    dimensions: '200cm x 60cm x 220cm',
    material: 'Engineered Wood & Glass',
    colors: ['#1a1a1a', '#f0f0f0'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Coffee Table',
    price: 18000,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80',
    rating: 4,
    description: 'The perfect centerpiece for your living room. This minimalist coffee table features a tempered glass top and solid metal legs for a modern luxurious look.',
    dimensions: '120cm x 60cm x 45cm',
    material: 'Tempered Glass & Metal',
    colors: ['#1a1a1a', '#c0a060'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Bookshelf Unit',
    price: 22000,
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=80',
    rating: 4,
    description: 'Display your books and decor in style. This 5-tier bookshelf unit is sturdy, elegant and fits perfectly in any home office or living room setting.',
    dimensions: '90cm x 30cm x 180cm',
    material: 'Solid Pine Wood',
    colors: ['#3a2010', '#1a1a1a'],
    inStock: true,
  },
]

function ProductDetail() {
const { addToCart } = useCart()

  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product not found</h2>
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
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                ({product.rating}.0)
              </span>
            </div>

            {/* Price */}
            <p style={{
              color: 'var(--gold-primary)',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
            }}>
              KES {product.price.toLocaleString()}
            </p>

            {/* Description */}
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              fontSize: '0.95rem',
            }}>
              {product.description}
            </p>

            {/* Specs */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.2rem',
              marginBottom: '2rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dimensions</span>
                <span style={{ color: 'var(--text-primary)' }}>{product.dimensions}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Material</span>
                <span style={{ color: 'var(--text-primary)' }}>{product.material}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Availability</span>
                <span style={{ color: product.inStock ? 'var(--success)' : 'var(--error)' }}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
            </div>

            {/* Color Options */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                Available Colors
              </p>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {product.colors.map((color, i) => (
                  <div key={i} style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '2px solid var(--gold-primary)',
                    cursor: 'pointer',
                  }} />
                ))}
              </div>
            </div>

            {/* Buttons */}
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
              <button style={{
                padding: '1rem',
                border: '1px solid var(--gold-primary)',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: 'var(--gold-primary)',
                cursor: 'pointer',
              }}>
                <Heart size={18} />
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
  
  )
}

export default ProductDetail