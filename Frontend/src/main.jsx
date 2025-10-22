import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import  { CartProvider} from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
             <App/>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
     </AuthProvider>
    </BrowserRouter>


  </StrictMode>,
)
