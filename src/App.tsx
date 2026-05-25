import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<div>Shop Page</div>} />
      <Route path="/product/:id" element={<div>Product Detail</div>} />
      <Route path="/cart" element={<div>Cart Page</div>} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />
      <Route path="/admin" element={<div>Admin Panel</div>} />
    </Routes>
    </>
  )
}

export default App