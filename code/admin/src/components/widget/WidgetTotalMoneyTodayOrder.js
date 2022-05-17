import { useEffect, useState } from 'react'
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Axios from 'axios';
import { URL } from '../../config/config';
import { moneyFormat } from '../../functions/moneyFunction';

const WidgetTotalMoneyTodayOrder = () => {

  const [totalMoney, setTotalMoney] = useState('')

  useEffect(() => {
    Axios.get(URL + '/analysisRouterAdmin/totalMoneyTodayOrder')
      .then((res) => {
        if (res.data.totalMoneyTodayOrderStatus) {
          setTotalMoney(res.data.totalMoneyTodayOrderData.doanh_thu_hom_nay)
        }
      })
      .catch((err) => {
        console.log('WidgetUser', err);
      })
  }, [])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Doanh Thu Hôm Nay</span>
        <span className="counter">
          { totalMoney != 0 ? moneyFormat(totalMoney) : 0} VNĐ
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

export default WidgetTotalMoneyTodayOrder;