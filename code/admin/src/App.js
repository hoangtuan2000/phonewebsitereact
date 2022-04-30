import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import Axios from 'axios'
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector, useDispatch } from 'react-redux'
import { saveUserLoginAdmin } from './redux/userSlice'

import { URL } from './config/config'

import ProtectRoutesAdmin from './components/ProtectRoutesAdmin';
import Home from "./pages/home/Home";
import AllProducts from "./pages/allProducts/AllProducts";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

import 'bootstrap/dist/css/bootstrap.min.css'

function App() { 

  // send automatic cookie to auth Login Backend
  Axios.defaults.withCredentials = true

  const { darkMode } = useContext(DarkModeContext);

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
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            {/* protected router */}
            <Route element={<ProtectRoutesAdmin />}>
              <Route path="home" element={<Home />} />
              <Route path="allProducts" element={<AllProducts />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
