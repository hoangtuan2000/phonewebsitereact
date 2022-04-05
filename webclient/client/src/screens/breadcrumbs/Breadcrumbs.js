import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../../App.css'

function Breadcrumbs() {
    return (
        <Container>
            <Row className='backgroundGray my-1 rounded-3'>
                <Col>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb my-0">
                            <Link to='/' className="breadcrumb-item">
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                            Trang Chủ
                                        </Tooltip>
                                    }
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faHome} />
                                    </span>
                                </OverlayTrigger>
                            </Link>
                            <li className="breadcrumb-item" style={{ textDecoration: 'none', color: 'black' }}>
                                Điện Thoại
                            </li>
                        </ol>
                    </nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Breadcrumbs