import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

import '../../App.css'

function Breadcrumbs(props) {

    return (
        <Container>
            <Row className='backgroundGray my-1 rounded-3'>
                <Col>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb my-0">
                            <Link to='/' className="breadcrumb-item" style={{ textDecoration: 'none' }}>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                            Trang Chủ
                                        </Tooltip>
                                    }
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faHome} /> Home
                                    </span>
                                </OverlayTrigger>
                            </Link>
                            {
                                props.pageName ?
                                    <li className="breadcrumb-item" style={{ textDecoration: 'none', color: 'black' }}>
                                        {props.pageName}
                                    </li>
                                    : <></>
                            }
                        </ol>
                    </nav>
                </Col>
            </Row>
        </Container>
    )
}

export default Breadcrumbs