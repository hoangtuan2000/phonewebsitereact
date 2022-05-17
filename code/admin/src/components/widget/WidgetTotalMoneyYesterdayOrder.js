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

const WidgetTotalMoneyYesterdayOrder = () => {

  const [totalMoney, setTotalMoney] = useState('')

  useEffect(() => {
    Axios.get(URL + '/analysisRouterAdmin/totalMoneyYesterdayOrder')
      .then((res) => {
        if (res.data.totalMoneyYesterdayOrderStatus) {
          setTotalMoney(res.data.totalMoneyYesterdayOrderData.doanh_thu_hom_qua)
        }
      })
      .catch((err) => {
        console.log('WidgetUser', err);
      })
  }, [])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Doanh Thu Hôm Qua</span>
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

export default WidgetTotalMoneyYesterdayOrder;