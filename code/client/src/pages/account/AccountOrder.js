import { Col, Container, Form, Row } from "react-bootstrap"
import { NavLink, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, Zoom, IconButton } from '@mui/material';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useEffect, useState } from "react";
import Axios from "axios";
import { URL } from "../../config/config";
import { moneyFormat } from "../../functions/moneyFunction";


function AccountOrder() {
    // get heigth screen => style for height col AccountOrder 
    const windowHeight = window.innerHeight

    const navigate = useNavigate()

    const [ordersInfo, setOrdersInfo] = useState([])

    useEffect(() => {
        Axios.post(URL + '/order/getAllOrderAccount')
            .then((res) => {
                if(res.data.getAllOrderAccountStatus){
                    setOrdersInfo(res.data.getAllOrderAccountData);
                }
            })
            .catch((err) => {
                console.log('AccountOrder => /order/getAllOrderAccount', err);
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        {
            field: 'orderName', headerName: 'Người Nhận', width: 220, align: 'center',
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
            field: 'orderDate', headerName: 'Ngày Đặt', width: 250, align: 'center',
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
            field: 'orderTotalMoney', headerName: 'Tổng Tiền', width: 150, align: 'right',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip TransitionComponent={Zoom} title={params.row.orderTotalMoney} followCursor>
                            <span>{params.row.orderTotalMoney}</span>
                        </Tooltip>
                    </>
                )
            }
        },
        {
            field: 'orderStatus', headerName: 'Trạng Thái', width: 120, align: 'center',
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
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip TransitionComponent={Zoom} title="Xem Đơn Hàng" followCursor >
                            <IconButton
                                color="primary"
                                onClick={() => navigate(`/order-details/${params.row.id}`)}
                            >
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

    // Insert accounts into Rows Table DataGrid MUI
    ordersInfo.map((order) => {
        let object = {}
        object.id = order.id_dh
        object.orderName = order.nguoi_nhan
        object.orderDate = order.ngay_dat
        object.orderTotalMoney = moneyFormat(order.tong_tien) + ' VNĐ'
        object.orderStatus = order.ten_ttdh
        rows.push(object)
    })

    return (
        <>
            <Container>
                <Row className="bg-light rounded" style={{ minHeight: windowHeight }}>
                    <Col md={2} className='p-0'>
                        <div className="p-3">
                            <h5 className="text-center mb-4">Quản Lý Tài Khoản</h5>
                            <NavLink
                                to='/account-infomation'
                                className={({ isActive }) => 'btn rounded-pill p-1 mb-2 w-100' + ' ' + (isActive ? "btn-primary" : "btn-secondary")}
                                style={{
                                    fontSize: '14px'
                                }}
                            >
                                Thông Tin Tài Khoản
                            </NavLink>
                            <br />
                            <NavLink
                                className={({ isActive }) => 'btn rounded-pill p-1 mb-2 w-100' + ' ' + (isActive ? "btn-primary" : "btn-secondary")}
                                to='/account-order'
                                style={{
                                    fontSize: '14px'
                                }}
                            >
                                Đơn Hàng
                            </NavLink>
                        </div>
                    </Col>
                    <Col md={10} className='pt-2'>
                        <div
                            className="p-3 bg-white"
                            style={{
                                boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.27)',
                                borderRadius: '2%'
                            }}
                        >
                            <div className="text-center">
                                <h6>Tất Cả Đơn Hàng</h6>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AccountOrder