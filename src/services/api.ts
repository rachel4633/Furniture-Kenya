import axios from 'axios'

const BASE_URL = 'https://godchild.alwaysdata.net/api'

const api = axios.create({
  baseURL: BASE_URL,
})

// Attach token to every request if user is logged in
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
export const updateProduct = (id: number, data: FormData) => api.post(`/products/${id}`, data)
export const deleteProduct = (id: number) => api.delete(`/products/${id}`)

// AUTH
export const signin = (data: FormData) => api.post('/signin', data)
export const signup = (data: FormData) => api.post('/signup', data)

export default api