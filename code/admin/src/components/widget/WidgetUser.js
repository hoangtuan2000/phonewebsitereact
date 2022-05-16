import { useEffect, useState } from 'react'
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Axios from 'axios';
import { URL } from '../../config/config';
const WidgetUser = () => {

  const [countUser, setCountUser] = useState()

  useEffect(() => {
    Axios.get(URL + '/analysisRouterAdmin/countUser')
      .then((res) => {
        if (res.data.countUserStatus) {
          setCountUser(res.data.countUserData)
        }
      })
      .catch((err) => {
        console.log('WidgetUser', err);
      })
  }, [])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Số Khách Hàng</span>
        <span className="counter">
          {countUser}
        </span>
      </div>
      {/* <div className="right">
        <PersonOutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      </div> */}
    </div>
  );
};

export default WidgetUser;