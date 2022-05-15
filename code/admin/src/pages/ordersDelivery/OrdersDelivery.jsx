import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Tooltip, Zoom, IconButton } from '@mui/material';
import Axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";


import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { height } from '@mui/system';
import ShowOrderInfoDialog from '../../components/modal/ShowOrderInfoDialog';
import { Link, useNavigate } from 'react-router-dom';

const OrdersDelivery = () => {
  document.body.style.backgroundImage = `none`;
  document.body.style.backgroundColor = "white";

  const navigate = useNavigate()

  // show dialog show product detail
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [orders, setOrders] = useState([])
  const [orderInfo, setOrderInfo] = useState({});
  const [ordersStatus, setOrdersStatus] = useState([]);


  const getAllOrdersDelivery = () => {
    Axios.get(URL + '/ordersAdmin/getAllOrdersDelivery')
    .then((res) => {
      if (res.data.getAllOrdersDeliveryStatus && res.data.getAllOrdersDeliveryData.length > 0) {
        setOrders(res.data.getAllOrdersDeliveryData)

      } else if (res.data.getAllOrdersDeliveryStatus && res.data.getAllOrdersDeliveryData.length <= 0) {
        document.getElementById('showAllOrders').innerHTML = '<h3>hiện tại chưa có đơn hàng</h3>'

      } else if (!res.data.getAllOrdersDeliveryStatus) {
        document.getElementById('showAllOrders').innerHTML = `<h3>${res.data.getAllOrdersDeliveryMessage}</h3>`

      }

    })
    .catch((err) => {
      console.log('/ordersAdmin/getAllOrdersDelivery', err);

    })
  }

  // get info database
  useEffect(() => {
    // get all orders Unprocessed
    getAllOrdersDelivery()

    //get all order status
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllOrdersStatus')
      .then((res) => {
        if (res.data.getAllOrdersStatusStatus) {
          setOrdersStatus(res.data.getAllOrdersStatusData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllOrdersStatus', err);
      })
  }, [])

  

  // Axios get Order Info => show dialog view order
  const getOrderInfo = (idOrder) => {
    Axios.post(URL + '/ordersAdmin/getOrderInfo', { idOrder: idOrder })
      .then((res) => {
        setOrderInfo(res.data)
        setOpen(true)
      })
      .catch((err) => {
        console.log('/ordersAdmin/getOrderInfo', err);
      })
  }

  // Table DataGrid MUI Colums
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
      field: 'orderName', headerName: 'Tên Người Nhận', width: 220,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.orderName} followCursor>
              <span>{params.row.orderName}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'orderPhone', headerName: 'Điện Thoại', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.orderPhone} followCursor>
              <span>{params.row.orderPhone}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'orderDate', headerName: 'Ngày Đặt', width: 250,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.orderDate} followCursor>
              <span>{params.row.orderDate}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'orderStatus', headerName: 'Trạng Thái', width: 200,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.orderStatus} followCursor>
              <span>{params.row.orderStatus}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'tools',
      headerName: 'Công Cụ',
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title="Xem Đơn Hàng" followCursor >
              <IconButton color="primary" onClick={() => getOrderInfo(params.row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
  ];

  // Table DataGrid MUI Rows
  const rows = [];

  // Insert orders into Rows Table DataGrid MUI
  orders.map((order) => {
    let object = {}
    object.id = order.id_dh
    object.orderName = order.nguoi_nhan
    object.orderPhone = order.so_dien_thoai
    object.orderDate = order.ngay_dat
    object.orderStatus = order.ten_ttdh
    rows.push(object)
  })

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div id='showAllOrders' style={{ height: 500, width: '100%', padding: '10px' }}>
            <div className='mb-2'>
              <h6 className='float-start'>Tất Cả Đơn Hàng Đang Giao Hàng</h6>
              <div className="clearfix"></div>
            </div>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={5}
              rowHeight={100}
              showColumnRightBorder={true}
            />
          </div>
        </div>
      </div>

      {/* call modal dialog show order information */}
      <ShowOrderInfoDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        orderInfo={orderInfo}
        getAllOrders={getAllOrdersDelivery}
        ordersStatus={ordersStatus}
        idOrderStatus={orderInfo.getOrderInfoData ? orderInfo.getOrderInfoData.id_ttdh : ''}
        idOrder={orderInfo.getOrderInfoData ? orderInfo.getOrderInfoData.id_dh : ''}
      />
    </>
  );
};

export default OrdersDelivery;
