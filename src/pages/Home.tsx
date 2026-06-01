import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, Headphones, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

const carouselSlides = [
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
    title: 'Luxury Living Room',
    subtitle: 'Redefine your comfort zone',
  },
  {
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80',
    title: 'Modern Bedroom',
    subtitle: 'Sleep in elegance every night',
  },
  {
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80',
    title: 'Elegant Dining',
    subtitle: 'Make every meal an experience',
  },
  {
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=80',
    title: 'Executive Office',
    subtitle: 'Work in style and comfort',
  },
  {
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80',
    title: 'Outdoor Living',
    subtitle: 'Bring luxury to your outdoors',
  },
]

function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Hero Carousel */}
      <section style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
        <div ref={emblaRef} style={{ overflow: 'hidden', height: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            {carouselSlides.map((slide, index) => (
              <div key={index} style={{
                flex: '0 0 100%',
                minWidth: 0,
                position: 'relative',
                height: '100%',
              }}>
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)',
                }} />
                {/* Text on image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '0 4rem',
                }}>
                  <p style={{
                    color: 'var(--gold-primary)',
                    letterSpacing: '0.3em',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                  }}>
                    Premium Furniture • Kenya
                  </p>
                  <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontFamily: 'Georgia, serif',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                    maxWidth: '600px',
                  }}>
                    {slide.title}
                  </h1>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginBottom: '2.5rem',
                  }}>
                    {slide.subtitle}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/shop" style={{
                      backgroundColor: 'var(--gold-primary)',
                      color: 'var(--bg-primary)',
                      padding: '1rem 2rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                    }}>
                      Shop Now <ArrowRight size={18} />
                    </Link>
                    <Link to="/about" style={{
                      border: '1px solid var(--gold-primary)',
                      color: 'var(--gold-primary)',
                      padding: '1rem 2rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '1rem',
                    }}>
                      Our Story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button onClick={scrollPrev} style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(201, 168, 76, 0.2)',
          border: '1px solid var(--gold-primary)',
          color: 'var(--gold-primary)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}>
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button onClick={scrollNext} style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(201, 168, 76, 0.2)',
          border: '1px solid var(--gold-primary)',
          color: 'var(--gold-primary)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}>
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          Shop by Category
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
        }}>
          Find the perfect piece for every room
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {[
            { name: 'Living Room', emoji: '🛋️' },
            { name: 'Bedroom', emoji: '🛏️' },
            { name: 'Dining', emoji: '🪑' },
            { name: 'Office', emoji: '🖥️' },
            { name: 'Outdoor', emoji: '🌿' },
          ].map((cat) => (
            <Link to="/shop" key={cat.name} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-primary)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cat.emoji}</div>
                <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          Why Choose Young Digital Furiniture
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { icon: <Truck size={32} />, title: 'Kenya-Wide Delivery', desc: 'We deliver Kenya Wide' },
            { icon: <Shield size={32} />, title: 'Quality Guaranteed', desc: 'Every piece is inspected before it reaches your door' },
            { icon: <Star size={32} />, title: 'Premium Craftsmanship', desc: 'Handcrafted furniture built to last generations' },
            { icon: <Headphones size={32} />, title: '24/7 Support', desc: 'Our team is always ready to help via WhatsApp or call' },
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <div style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}>
        <p style={{ color: 'var(--gold-primary)', fontFamily: 'Georgia, serif', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          YOUNG DIGITAL FURNITURE AND TIMBER SALES
        </p>
        <p>© 2026 Young Digital Furniture and Timber Sales. All rights reserved. | Nairobi, Kenya</p>
      </footer>

    </div>
  )
}

export default Home