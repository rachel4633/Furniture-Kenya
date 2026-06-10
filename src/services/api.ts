import axios from 'axios'

// Swap the hardcoded string out for Vite's environment variable with a fallback
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'https://furnish-ke-api.onrender.com/api'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')
  if (user) {
    const parsed = JSON.parse(user)
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  }
  return config
})

// PRODUCTS
export const getProducts = () => api.get('/products')
export const getProductById = (id: number) => api.get(`/products/${id}`)
export const addProduct = (data: FormData) => api.post('/products', data)
export const updateProduct = (id: number, data: FormData) => api.put(`/products/${id}`, data)
export const deleteProduct = (id: number, userId: number) => {
  const formData = new FormData()
  formData.append('user_id', String(userId))
  return api.delete(`/products/${id}`, { data: formData })
}

// PAYMENTS — NEW
export const initiateMpesaPayment = (data: {
  phone: string
  amount: number
  accountReference: string
  description: string
  items: any[]
  userId: string | number
}) => api.post('/payment/mpesa', data)

// Confirm order with transaction code
export const confirmOrder = (data: {
  transactionCode: string
  checkoutRequestId: string
  phone: string
  amount: number
  userId: string | number
  items: any[]
}) => api.post('/payment/confirm', data)

export default api