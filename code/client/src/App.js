import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';

import ProtectRoutes from './components/ProtectRoutes';
import Header from './pages/header/Header'
import Breadcrumbs from './pages/breadcrumbs/Breadcrumbs'
import Footer from './pages/footer/Footer'
import Home from './pages/home/Home'
import Smartphone from './pages/smartphone/Smartphone'
import Headphone from './pages/headphone/Headphone'
import Phonecase from './pages/phonecase/Phonecase'
import Register from './pages/register/Register';
import Cart from './pages/cart/Cart'
import OrderCart from './pages/order/OrderCart'
import OrderProduct from './pages/order/OrderProduct'
import OrderDetails from './pages/orderDetails/OrderDetails'
import AccountInfomation from './pages/account/AccountInfomation'
import AccountOrder from './pages/account/AccountOrder'
import Policy from './pages/policy/Policy'
import ProductDetail from './pages/productDetail/ProductDetail'
import ScrollButton from './components/ScrollButton'
import ResultSearch from './pages/resultSearch/ResultSearch';

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

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='smartphone' element={<Smartphone />} />
          <Route path='headphone' element={<Headphone />} />
          <Route path='phonecase' element={<Phonecase />} />
          <Route path='register' element={<Register />} />
          <Route path='search' element={<ResultSearch />} />

          {/* protected router */}
          <Route element={<ProtectRoutes />}>
          <Route path='cart' element={<Cart />} />
          <Route path='order-cart' element={<OrderCart />} />
          <Route path='order-product/:orderIdProduct' element={<OrderProduct />} />
          <Route path='order-details/:idOrder' element={<OrderDetails />} />
          <Route path='account-infomation' element={<AccountInfomation />} />
          <Route path='account-order' element={<AccountOrder />} />
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

