import { useState, useEffect } from 'react'
import { Shield, Star, Truck, Users } from 'lucide-react'

function About() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{
          color: 'var(--gold-primary)',
          letterSpacing: '0.3em',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Our Story
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? '2.2rem' : '3.5rem',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          lineHeight: 1.2,
        }}>
          Crafting Spaces, <br />
          <span style={{ color: 'var(--gold-primary)' }}>Building Homes</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          Young Digital Furniture was born from a simple belief — every Kenyan home deserves
          beautiful, quality furniture without compromise.
        </p>
      </section>

      {/* Mission & Statistics Section */}
      <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              color: 'var(--text-primary)',
              marginBottom: '1.2rem',
            }}>
              Who We Are
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '1rem',
              fontSize: '0.95rem'
            }}>
              We are a Nairobi-based premium furniture company dedicated to
              transforming Kenyan living spaces. From modern apartments in the
              City to family homes in rural areas, we have furnished thousands
              of homes across the country.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontSize: '0.95rem'
            }}>
              Every piece in our collection is carefully selected or crafted
              to meet the highest standards of quality, comfort, and style —
              built to last in the Kenyan climate and lifestyle.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', flex: 1 }}>
            {[
              { number: '5,000+', label: 'Homes Furnished' },
              { number: '47', label: 'Counties Reached' },
              { number: '8', label: 'Years of Excellence' },
              { number: '98%', label: 'Customer Satisfaction' },
            ].map(stat => (
              <div key={stat.label} style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1rem 1.2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</span>
                <span style={{
                  color: 'var(--gold-primary)',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}>
                  {stat.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Corporate Values Section */}
      <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '2.5rem',
        }}>
          Our Values
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { icon: <Star size={28} />, title: 'Quality First', desc: 'We never compromise on the quality of materials or craftsmanship.' },
            { icon: <Users size={28} />, title: 'Customer Focused', desc: 'Your satisfaction is our top priority, from browsing to delivery.' },
            { icon: <Truck size={28} />, title: 'Kenya Wide', desc: 'We deliver to all 47 counties with care and reliability.' },
            { icon: <Shield size={28} />, title: 'Trusted Brand', desc: 'Over years of building trust with Kenyan families.' },
          ].map(value => (
            <div key={value.title} style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.8rem',
              textAlign: 'center',
            }}>
              <div style={{ color: 'var(--gold-primary)', marginBottom: '0.8rem' }}>{value.icon}</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '1.1rem' }}>{value.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Styled Footer Block */}
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}>
        <p style={{ color: 'var(--gold-primary)', fontFamily: 'Georgia, serif', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
          YOUNG DIGITAL FURNITURE
        </p>
        <p style={{ margin: 0 }}>© 2026 Young Digital Furniture. All rights reserved. | Nairobi, Kenya</p>
      </footer>

    </div>
  )
}

export default About