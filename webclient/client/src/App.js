import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';

import ProtectRoutes from './components/ProtectRoutes';
import Header from './screens/header/Header'
import Breadcrumbs from './screens/breadcrumbs/Breadcrumbs'
import Footer from './screens/footer/Footer'
import Home from './screens/home/Home'
import Smartphone from './screens/smartphone/Smartphone'
import Headphone from './screens/headphone/Headphone'
import Phonecase from './screens/phonecase/Phonecase'
import Register from './screens/register/Register';
import Cart from './screens/cart/Cart'
import OrderCart from './screens/order/OrderCart'
import OrderProduct from './screens/order/OrderProduct'
import OrderDetails from './screens/orderDetails/OrderDetails'
import Account from './screens/account/Account'
import Policy from './screens/policy/Policy'
import ProductDetail from './screens/productDetail/ProductDetail'
import ScrollButton from './components/ScrollButton'

// init AOS library
AOS.init({
  offset: 5,
  duration: 1300,
});

function App() {

  // send automatic cookie to auth Login Backend
  Axios.defaults.withCredentials = true

  return (
    <>
      <BrowserRouter>

        <Header></Header>
        <Breadcrumbs></Breadcrumbs>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='smartphone' element={<Smartphone />} />
          <Route path='headphone' element={<Headphone />} />
          <Route path='phonecase' element={<Phonecase />} />
          <Route path='register' element={<Register />} />

          {/* protected router */}
          <Route element={<ProtectRoutes />}>
            <Route path='cart' element={<Cart />} />
            <Route path='order-cart' element={<OrderCart />} />
            <Route path='order-product/:idProduct' element={<OrderProduct />} />
            <Route path='order-details/:idOrder' element={<OrderDetails />} />
            <Route path='account' element={<Account />}>
              <Route path='account-information' element={<>abc</>} />
              <Route path='account-order' element={<>dfsdfs</>} />
            </Route>
          </Route>

          <Route path='policy' element={<Policy />} />
          <Route path='product-detail/:idProduct' element={<ProductDetail />} />
        </Routes>

        <ScrollButton />
        <Footer></Footer>

      </BrowserRouter>
    </>
  )
}

export default App

