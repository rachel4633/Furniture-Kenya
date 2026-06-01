import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem 0.9rem 2.8rem',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const iconStyle = {
    position: 'absolute' as const,
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading('Please wait while we log you in...')

    try {
      const data = new FormData()
      data.append('email', email)
      data.append('password', password)

      const response = await axios.post('https://furnish-ke-api.onrender.com/api/signin', data)

      setLoading('')

      if (response.data.user) {
        login(response.data.user)
        setSuccess('Login successful. Welcome back! 🎉')
        setTimeout(() => navigate('/'), 2000)
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch {
      setLoading('')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '3rem',
        width: '100%',
        maxWidth: '420px',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            color: 'var(--gold-primary)',
            fontSize: '1.8rem',
            marginBottom: '0.5rem',
          }}>
            FURNISH KE
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Welcome back. Sign in to continue.
          </p>
        </div>

        {/* Messages */}
        {loading && (
          <p style={{
            color: 'var(--gold-primary)',
            backgroundColor: 'rgba(201,168,76,0.1)',
            border: '1px solid var(--gold-primary)',
            borderRadius: '4px',
            padding: '0.8rem',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}>
            {loading}
          </p>
        )}
        {success && (
          <p style={{
            color: 'var(--success)',
            backgroundColor: 'rgba(74,124,89,0.1)',
            border: '1px solid var(--success)',
            borderRadius: '4px',
            padding: '0.8rem',
            marginBottom: '1rem',
            fontSize: '0.9rem',
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
            marginBottom: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={iconStyle} />
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: '3rem' }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
            <LogIn size={18} /> Sign In
          </button>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          marginTop: '1.5rem',
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--gold-primary)', textDecoration: 'none' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login