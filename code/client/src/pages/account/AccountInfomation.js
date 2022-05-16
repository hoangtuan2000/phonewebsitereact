import { Col, Container, Row } from "react-bootstrap"
import { NavLink } from 'react-router-dom'

import AddressAccount from "../../components/addressAccount/AddressAccount";
import UpdateAccountInfo from "../../components/updateAccountInfo/UpdateAccountInfo";
import UpdateAccountPassword from "../../components/updateAccountPassword/UpdateAccountPassword";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

function AccountInfomation() {
    // get heigth screen => style for height col AccountInfomation 
    const windowHeight = window.innerHeight

    return (
        <>
            <Breadcrumbs pageName={'Thông Tin Tài Khoản'} />
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
                    <Col md={10} className='mt-4'>
                        <Row>
                            {/* update basic account info */}
                            <Col md={6} className='pt-2 mb-3'>
                                <UpdateAccountInfo />
                            </Col>

                            {/* update password */}
                            <Col md={6} className='pt-2 mb-3'>
                                <UpdateAccountPassword />
                            </Col>

                            {/* update address of account */}
                            <Col md={12} className='pt-2 mb-3'>
                                <AddressAccount />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>




        </>
    )
}

export default AccountInfomation