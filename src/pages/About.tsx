import { Shield, Star, Truck, Users } from 'lucide-react'

function About() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        padding: '6rem 2rem',
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
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          lineHeight: 1.2,
        }}>
          Crafting Spaces, <br />
          <span style={{ color: 'var(--gold-primary)' }}>Building Homes</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          Furnish KE was born from a simple belief — every Kenyan home deserves
          beautiful, quality furniture without compromise.
        </p>
      </section>

      {/* Mission */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}>
              Who We Are
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: '1rem',
            }}>
              We are a Nairobi-based premium furniture company dedicated to
              transforming Kenyan living spaces. From modern apartments in
              Westlands to family homes in Karen, we have furnished thousands
              of homes across the country.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
            }}>
              Every piece in our collection is carefully selected or crafted
              to meet the highest standards of quality, comfort, and style —
              built to last in the Kenyan climate and lifestyle.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                padding: '1.2rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                <span style={{
                  color: 'var(--gold-primary)',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                }}>
                  {stat.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          Our Values
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { icon: <Star size={32} />, title: 'Quality First', desc: 'We never compromise on the quality of materials or craftsmanship.' },
            { icon: <Users size={32} />, title: 'Customer Focused', desc: 'Your satisfaction is our top priority, from browsing to delivery.' },
            { icon: <Truck size={32} />, title: 'Kenya Wide', desc: 'We deliver to all 47 counties with care and reliability.' },
            { icon: <Shield size={32} />, title: 'Trusted Brand', desc: 'Over 8 years of building trust with Kenyan families.' },
          ].map(value => (
            <div key={value.title} style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
            }}>
              <div style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>{value.icon}</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{value.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{value.desc}</p>
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
          FURNISH KE
        </p>
        <p>© 2026 Furnish KE. All rights reserved. | Nairobi, Kenya</p>
      </footer>

    </div>
  )
}

export default About