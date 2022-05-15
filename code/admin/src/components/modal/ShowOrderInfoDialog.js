import { useEffect, forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import { Form, Table } from 'react-bootstrap';
import Axios from 'axios'

import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'
import ModalNotification from '../modal/modalNotification/ModalNotification';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowOrderInfoDialog(props) {

  const screenHeight = window.innerHeight
  const status = props.orderInfo.getOrderInfoStatus
  const data = props.orderInfo.getOrderInfoData
  const message = props.orderInfo.getOrderInfoMessage
  const ordersStatus = props.ordersStatus
  let idOrderStatus = props.idOrderStatus
  let id = props.idOrder

  const [modalOrderStatus, setModalOrderStatus] = useState(false)
  const [updateOrderStatus, setUpdateOrderStatus] = useState({})

  const [selectOrderStatus, setSelectOrderStatus] = useState(idOrderStatus)
  const [idOrder, setIdOrder] = useState(id)

  useEffect(() => {
    setSelectOrderStatus(idOrderStatus)
    setIdOrder(id)
  }, [props.idOrderStatus, props.idOrder])

  let totalMoney = 0

  if (props.orderInfo.getOrderInfoData) {
    // tính tổng tiền
    let products = props.orderInfo.getOrderInfoData.products
    products.map((product) => {
      totalMoney += reducedPrice(product.gia, product.khuyen_mai) * product.so_luong
    })
  }


  const updateOrder = () => {
    Axios.post(URL + '/ordersAdmin/updateOrder', {
      idOrder: idOrder,
      idOrderStatus: selectOrderStatus
    })
      .then((res) => {
        setUpdateOrderStatus(res.data)
        setModalOrderStatus(true)
        // reset get all orders
        props.getAllOrders()
      })
      .catch((err) => {
        console.log('ShowOrderInfoDialog => /ordersAdmin/updateOrder', err);
      })
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >

        <AppBar sx={{ position: 'relative', marginBottom: '10px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thông Tin Đơn Hàng
            </Typography>
          </Toolbar>
        </AppBar>

        {
          status ?
            <List >
              <Grid container spacing={2}>
                <Grid item xs={6} className='border-end'>
                  <div className='p-3'>
                    <ul>
                      <li>
                        <span className='me-2 fw-bold'>ID Đơn Hàng:</span>
                        <span>{data.id_dh}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Tên Người Nhận:</span>
                        <span>{data.nguoi_nhan}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Điện Thoại:</span>
                        <span>{data.so_dien_thoai}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Ghi Chú:</span>
                        <span>{data.ghi_chu}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Ngày Đặt:</span>
                        <span>{data.ngay_dat}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Địa Chỉ:</span>
                        <span>{data.dia_chi_giao}</span>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={6} className='border-end'>
                  <div className='p-3'>
                    <ul>
                      <li>
                        <span className='me-2 fw-bold'>Tài Khoản Đặt Hàng:</span>
                        <span>{`${data.ten_kh} (${data.id_kh})`}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Nhân Viên Cập Nhật:</span>
                        <span>{`${data.ten_nv} (${data.id_nv})`}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Trạng Thái Đơn Hàng:</span>
                        <div className='clear-fix'></div>
                        <Form.Select
                          size="sm"
                          value={selectOrderStatus}
                          className='w-50 float-start me-2'
                          onChange={(e) => setSelectOrderStatus(e.target.value)}
                        >
                          {
                            ordersStatus.map((orderStatus) => {
                              return <option value={orderStatus.id_ttdh} key={orderStatus.id_ttdh}>{orderStatus.ten_ttdh}</option>
                            })
                          }
                        </Form.Select>
                        <button className='float-start btn btn-sm btn-warning' onClick={updateOrder}>Cập Nhật</button>
                      </li>
                    </ul>


                  </div>
                </Grid>
                <Grid item xs={12} className='border-end'>
                  <div className='p-3'>
                    <Table striped bordered hover size="sm" className='text-center' style={{ fontSize: '14px' }}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th style={{ width: '60px' }}></th>
                          <th>Tên Sản Phẩm</th>
                          <th >Giá</th>
                          <th>Số Lượng</th>
                          <th>Khuyến Mãi</th>
                          <th>Thành Tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.products.map((product) => {
                            return (
                              <tr key={product.id_sp}>
                                <td>{product.id_sp}</td>
                                <td className='d-flex justify-content-center'>
                                  <img
                                    src={URL + product.anh_sp}
                                    className="m-0 rounded"
                                    style={{ height: '50px', width: '50px' }}
                                  />
                                </td>
                                <td>{product.ten_sp}</td>
                                <td className='text-end'>{moneyFormat(product.gia)} VNĐ</td>
                                <td>x{product.so_luong}</td>
                                <td>{product.khuyen_mai}%</td>
                                <td className='text-end fw-bold'>
                                  {moneyFormat(reducedPrice(product.gia, product.khuyen_mai) * product.so_luong)} VNĐ
                                </td>
                              </tr>
                            )
                          })
                        }
                        <tr>
                          <td colSpan={6} className='text-end text-danger fw-bold'>Tổng Tiền:</td>
                          <td className='text-end text-danger fw-bold'>
                            {moneyFormat(totalMoney)} VNĐ
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Grid>
              </Grid>

            </List>
            : <h5 className='mx-auto my-auto'>{message}</h5>
        }

      </Dialog>

      {/* call modal Add Product Status */}
      <ModalNotification
        show={modalOrderStatus}
        onHide={() => setModalOrderStatus(false)}
        status={updateOrderStatus.updateOrderStatus}
        title={updateOrderStatus.updateOrderStatus ? 'Thành Công' : 'Thất Bại'}
        message={updateOrderStatus.updateOrderMessage}
      />
    </div>
  );
}
