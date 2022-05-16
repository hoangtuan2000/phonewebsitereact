import { useEffect, useState } from 'react'
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Axios from 'axios';
import { URL } from '../../config/config';

const WidgetTodayOrder = () => {

  const [countTodayOrder, setCountTodayOrder] = useState()

  useEffect(() => {
    Axios.get(URL + '/analysisRouterAdmin/countTodayOrder')
      .then((res) => {
        if (res.data.countTodayOrderStatus) {
          setCountTodayOrder(res.data.countTodayOrderData)
        }
      })
      .catch((err) => {
        console.log('WidgetUser', err);
      })
  }, [])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Số Đơn Hàng Hôm Nay</span>
        <span className="counter">
          {countTodayOrder}
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

export default WidgetTodayOrder;