import { Carousel, Row, Col } from 'react-bootstrap'

function Slider() {
    return (
        <>
            <Row className='my-0'>
                <Col md={8} className='ps-0' data-aos="zoom-in">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={require('../../asset/imageCarouel/imageCarouel1.png')}
                                alt="First slide"
                                style={{
                                    objectFit: 'cover',
                                    height: '435px'
                                }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={require('../../asset/imageCarouel/imageCarouel2.png')}
                                alt="First slide"
                                style={{
                                    objectFit: 'cover',
                                    height: '435px'
                                }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 rounded"
                                src={require('../../asset/imageCarouel/imageCarouel3.png')}
                                alt="First slide"
                                style={{
                                    objectFit: 'cover',
                                    height: '435px'
                                }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col md={4} data-aos="zoom-in">
                    <Row>
                        <Col md={6} className='p-1'>
                            <img src={require('../../asset/imagePromotion/imagePromotion1.jpg')} className="img-thumbnail rounded" alt="..." />
                        </Col>
                        <Col md={6} className='p-1'>
                            <img src={require('../../asset/imagePromotion/imagePromotion2.jpg')} className="img-thumbnail rounded" alt="..." />
                        </Col>
                        <Col md={6} className='p-1'>
                            <img src={require('../../asset/imagePromotion/imagePromotion3.jpg')} className="img-thumbnail rounded" alt="..." />
                        </Col>
                        <Col md={6} className='p-1'>
                            <img src={require('../../asset/imagePromotion/imagePromotion4.jpg')} className="img-thumbnail rounded" alt="..." />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Slider