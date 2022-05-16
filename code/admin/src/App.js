import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import { useContext } from "react";
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { saveUserLoginAdmin } from './redux/userSlice'
import 'bootstrap/dist/css/bootstrap.min.css'

import { URL } from './config/config'

import ProtectRoutesAdmin from './components/ProtectRoutesAdmin';
import BasicAnalysis from "./pages/analysis/BasicAnalysis";
import AllAccounts from "./pages/allAccounts/AllAccounts";
import AllStaffAccounts from "./pages/allStaffAccounts/AllStaffAccounts";
import AllManagementAccounts from "./pages/allManagementAccounts/AllManagementAccounts";
import AddAccount from "./pages/addAccount/AddAccount";
import UpdateAccount from "./pages/updateAccount/UpdateAccount";
import AllOrders from "./pages/allOrders/AllOrders";
import OrdersUnprocessed from "./pages/ordersUnprocessed/OrdersUnprocessed";
import OrdersTransported from "./pages/ordersTransported/OrdersTransported";
import OrdersSuccessDelivery from "./pages/ordersSuccessDelivery/OrdersSuccessDelivery";
import OrdersProcessed from "./pages/ordersProcessed/OrdersProcessed";
import OrdersDelivery from "./pages/ordersDelivery/OrdersDelivery";
import Smartphones from "./pages/smartphones/Smartphones";
import AllProducts from "./pages/allProducts/AllProducts";
import Headphones from "./pages/headphones/Headphones";
import Phonecases from "./pages/phonecases/Phonecases";
import Login from "./pages/login/Login";
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";

import UpdateProduct from './pages/updateProduct/UpdateProduct';
import AddProduct from './pages/addProduct/AddProduct';

function App() {

  // send automatic cookie to auth Login Backend
  Axios.defaults.withCredentials = true

  const dispatch = useDispatch()
  const userLoginAdmin = useSelector((state) => state.userLoginAdmin.infoUserAdmin)

  // check login when open web
  useEffect(() => {
    Axios.get(URL + '/authAdmin/getLoginAdmin')
      .then((response) => {
        // console.log(response.data);
        if (Object.entries(response.data.user).length !== 0 && response.data.isLogin) {
          // console.log('getLogin save');
          dispatch(saveUserLoginAdmin(response.data.user))
        } else {
          // console.log('getLogin delete');
          dispatch(saveUserLoginAdmin({}))
        }
      })
      .catch((err) => {
        console.log('/authAdmin/getLoginAdmin', err);
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          {/* protected router */}
          <Route element={<ProtectRoutesAdmin />}>
            <Route path="basicAnalysis" element={<BasicAnalysis />} />
            <Route path="allProducts" element={<AllProducts />} />
            <Route path="smartphones" element={<Smartphones />} />
            <Route path="headphones" element={<Headphones />} />
            <Route path="phonecases" element={<Phonecases />} />
            <Route path="updateProduct/:idProduct" element={<UpdateProduct />} />
            <Route path="addProduct/:productType" element={<AddProduct />} />
            <Route path="allAccounts" element={<AllAccounts />} />
            <Route path="allStaffAccounts" element={<AllStaffAccounts />} />
            <Route path="allManagementAccounts" element={<AllManagementAccounts />} />
            <Route path="addAccount" element={<AddAccount />} />
            <Route path="updateAccount/:idAccount" element={<UpdateAccount />} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="ordersUnprocessed" element={<OrdersUnprocessed />} />
            <Route path="ordersProcessed" element={<OrdersProcessed />} />
            <Route path="ordersTransported" element={<OrdersTransported />} />
            <Route path="ordersDelivery" element={<OrdersDelivery />} />
            <Route path="ordersSuccessDelivery" element={<OrdersSuccessDelivery />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
