import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Col, Container, Row, Table } from "react-bootstrap"
import { NavLink, Outlet } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch, faBoxOpen, faArrowRight,
    faGift, faTruckFast, faPeopleCarryBox, faHandsHolding
} from '@fortawesome/free-solid-svg-icons'

import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

function OrderDetails() {
    // get heigth screen => style for height col order detail 
    const windowHeight = window.innerHeight

    const params = useParams()

    const [ordersStatus, setOrdersStatus] = useState([])
    const [orderInfo, setOrderInfo] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [processOrdersStatus, setProcessOrdersStatus] = useState()

    useEffect(() => {
        // get order info
        Axios.post(URL + '/order/getOrderInfo', {
            idOrder: params.idOrder
        })
            .then((res) => {
                if (res.data.getOrderInfoStatus) {
                    setOrderInfo(res.data.getOrderInfoData)
                    res.data.getOrderInfoData.products.map((product) => {
                        setTotalMoney((prev) => prev + reducedPrice(product.gia, product.khuyen_mai) * product.so_luong)
                    })
                }
            })
            .catch((err) => {
                console.log('OrderDetails => /order/getOrderInfo', err);
            })

        // get order status database
        Axios.get(URL + '/getDatabase/getAllOrdersStatus')
            .then((res) => {
                if (res.data.getAllOrdersStatusStatus) {
                    setOrdersStatus(res.data.getAllOrdersStatusData)
                }
            })
            .catch((err) => {
                console.log('OrderDetails => /getDatabase/getAllOrdersStatus', err);
            })

    }, [])

    useEffect(() => {
        ordersStatus.map((order, index) => {
            if (order.id_ttdh == orderInfo.id_ttdh) {
                setProcessOrdersStatus(index)
            }
        })
    }, [orderInfo, ordersStatus])

    return (
        <>
            <Breadcrumbs pageName={'Chi Tiết Đơn Hàng'} />
            <Container>
                <Row className="bg-light rounded">
                    <Col md={12} style={{ minHeight: windowHeight }}>
                        <div className="m-3 text-center">

                            <h5>Thông Tin Đơn Hàng</h5>

                            <div className='mt-3 d-flex justify-content-center'>
                                {
                                    ordersStatus.map((order, index) => {
                                        if (index <= processOrdersStatus) {
                                            let showIcon = faBoxOpen
                                            switch (order.id_ttdh) {
                                                case 1:
                                                    showIcon = faBoxOpen
                                                    break;
                                                case 2:
                                                    showIcon = faGift
                                                    break;
                                                case 3:
                                                    showIcon = faTruckFast
                                                    break;
                                                case 4:
                                                    showIcon = faHandsHolding
                                                    break;
                                                case 5:
                                                    showIcon = faPeopleCarryBox
                                                    break;
                                            }
                                            return (
                                                <div key={order.id_ttdh}>
                                                    <div className='float-start'>
                                                        <FontAwesomeIcon icon={showIcon} className='me-2' style={{ fontSize: '30px', color: '#087cff' }} />
                                                        <p style={{ fontSize: '12px', color: '#087cff' }}>{order.ten_ttdh}</p>
                                                    </div>
                                                    {
                                                        ++index != ordersStatus.length ?
                                                            <div className='float-start'>
                                                                <FontAwesomeIcon icon={faArrowRight} className='me-2' style={{ fontSize: '30px', color: '#087cff' }} />
                                                            </div>
                                                            : <></>
                                                    }
                                                </div>
                                            )
                                        } else {
                                            let showIcon = faBoxOpen
                                            switch (order.id_ttdh) {
                                                case 1:
                                                    showIcon = faBoxOpen
                                                    break;
                                                case 2:
                                                    showIcon = faGift
                                                    break;
                                                case 3:
                                                    showIcon = faTruckFast
                                                    break;
                                                case 4:
                                                    showIcon = faHandsHolding
                                                    break;
                                                case 5:
                                                    showIcon = faPeopleCarryBox
                                                    break;
                                            }
                                            return (
                                                <div key={order.id_ttdh}>
                                                    <div className='float-start'>
                                                        <FontAwesomeIcon icon={showIcon} className='me-2' style={{ fontSize: '30px', color: 'gray' }} />
                                                        <p style={{ fontSize: '12px', color: 'gray' }}>{order.ten_ttdh}</p>
                                                    </div>
                                                    {
                                                        ++index != ordersStatus.length ?
                                                            <div className='float-start'>
                                                                <FontAwesomeIcon icon={faArrowRight} className='me-2' style={{ fontSize: '30px', color: 'gray' }} />
                                                            </div>
                                                            : <></>
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                }
                                <div className='clearfix'></div>
                            </div>


                            <div className='text-start'>
                                <ul>
                                    <li>
                                        <span className='me-2 fw-bold'>ID Đơn Hàng:</span>
                                        <span className='ms-1'>{orderInfo.id_dh}</span>
                                    </li>
                                    <li>
                                        <span className='me-2 fw-bold'>Tên Người Nhận:</span>
                                        <span className='ms-1'>{orderInfo.nguoi_nhan}</span>
                                    </li>
                                    <li>
                                        <span className='me-2 fw-bold'>Điện Thoại:</span>
                                        <span className='ms-1'>{orderInfo.so_dien_thoai}</span>
                                    </li>
                                    <li>
                                        <span className='me-2 fw-bold'>Ghi Chú:</span>
                                        <span className='ms-1'>{orderInfo.ghi_chu}</span>
                                    </li>
                                    <li>
                                        <span className='me-2 fw-bold'>Ngày Đặt:</span>
                                        <span className='ms-1'>{orderInfo.ngay_dat}</span>
                                    </li>
                                    <li>
                                        <span className='me-2 fw-bold'>Địa Chỉ:</span>
                                        <span className='ms-1'>{orderInfo.dia_chi_giao}</span>
                                    </li>
                                </ul>
                            </div>

                            <Table striped bordered hover size="sm" className='text-center' style={{ fontSize: '14px' }}>
                                <thead>
                                    <tr>
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
                                        orderInfo.products ?
                                            orderInfo.products.map((product) => {
                                                return (
                                                    <tr key={product.id_sp}>
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
                                            : <></>
                                    }
                                    <tr>
                                        <td colSpan={5} className='text-end text-danger fw-bold'>Tổng Tiền:</td>
                                        <td className='text-end text-danger fw-bold'>
                                            {moneyFormat(totalMoney)} VNĐ
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderDetails