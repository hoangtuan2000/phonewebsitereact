import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <Container fluid className='backgroundBlue mt-2'>
            <Container>
                <Row>
                    <Col>
                        <p className='my-1 footer text-center'>
                            &copy; 2018. Công ty cổ phần HT Shop. GPDKKD: 0123456789 do sở KH
                            &amp; ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 238/GP-BTTTT do
                            Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2020.
                            <br />
                            Địa chỉ: 01 Nguyễn Văn Linh, Q. Ninh Kiều, TP.Cần Thơ.
                            Điện thoại: 012 345 6789. Email: cskh@thegioididong.com.
                            Chịu trách nhiệm nội dung: Nguyễn Văn A. &nbsp;	
                            <Link to='policy'>
                                Xem chính sách sử dụng
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Header
