export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description?: string
  dimensions?: string
  material?: string
  inStock?: boolean
  rating?: number
}

export interface User {
  id: number
  username: string
  email: string
  phone?: string
  role: 'customer' | 'admin'
  token?: string
}

export interface CartItem extends Product {
  quantity: number
}