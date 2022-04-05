import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

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
import Cart from './screens/cart/Cart'
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

          {/* protected router */}
          <Route element={<ProtectRoutes />}>
            <Route path='cart' element={<Cart />} />
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

