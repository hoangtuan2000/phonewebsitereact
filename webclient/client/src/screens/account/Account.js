import { Col, Container, Row } from "react-bootstrap"
import { NavLink, Outlet } from 'react-router-dom'

function Account() {
    return (
        <>
            <Container>
                <Row className="bg-light rounded">
                    <Col md={3} className='p-0'>
                        <div className="p-3">
                            <h6 className="text-center mb-4">Quản Lý Tài Khoản</h6>
                            <NavLink
                                className={({ isActive }) => 'btn rounded-pill p-1 mb-2 w-100' + ' ' + (isActive ? "btn-primary" : "btn-secondary")}
                                to='/account/account-information'
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                Thông Tin Tài Khoản
                            </NavLink>
                            <br />
                            <NavLink
                                className={({ isActive }) => 'btn rounded-pill p-1 mb-2 w-100' + ' ' + (isActive ? "btn-primary" : "btn-secondary")}
                                to='/account/account-order'
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                Đơn Hàng
                            </NavLink>
                        </div>
                    </Col>
                    <Col md={9} className='p-0'>
                        <div >
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Account