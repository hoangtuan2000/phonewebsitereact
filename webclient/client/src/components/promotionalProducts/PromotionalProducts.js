import { Row, Col, Card, Badge, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import { URL } from '../../config/config'
import { nameProductFormat } from '../../functions/stringFormat'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'


function PromotionalProducts(props) {

    const products = props.promotionalProducts

    // variable of React Slick library
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        variableWidth: true,
        slidesToShow: products.length >= 6 ? 6 : products.length,
        slidesToScroll: products.length >= 6 ? 6 : products.length
    };

    return (
        <>
            <Row>
                <Col className='p-0 pb-3' data-aos="zoom-in">
                    <div className='backgroundRed rounded' >
                        <h4 className='my-2 mx-3'
                            style={
                                { color: 'white' }}
                        >
                            {props.titlePromotion}
                        </h4>
                        <Slider {...settings} >
                            {
                                props.promotionalProducts.map((product) => {
                                    return (
                                        <div className='p-2 pb-3 cardProduct' key={product.id_sp} style={{width: '220px'}}>
                                            <Link to={`/product-detail/${product.id_sp}`}>
                                                <Card >
                                                    <Card.Img variant="top"
                                                        src={URL + product.anh_sp}
                                                        className='mt-2'
                                                    />
                                                    <Card.Body className='p-2' >
                                                        {
                                                            product.giam_km > 0 ?
                                                                <Badge bg="danger"> Giảm {product.giam_km} % </Badge>
                                                                :
                                                                <br />
                                                        }
                                                        <Card.Title>
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip>
                                                                        {product.ten_sp}
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <span>
                                                                    {nameProductFormat(product.ten_sp, 18)}
                                                                </span>
                                                            </OverlayTrigger>
                                                        </Card.Title>
                                                        {
                                                            product.giam_km > 0 ?
                                                                <>
                                                                    <h6>{moneyFormat(product.gia_sp)} VNĐ</h6>
                                                                    <h5>{moneyFormat(reducedPrice(product.gia_sp, product.giam_km))} VNĐ</h5>
                                                                </>
                                                                :
                                                                <>
                                                                    <h6><br /></h6>
                                                                    <h5>{moneyFormat(reducedPrice(product.gia_sp, product.giam_km))} VNĐ</h5>
                                                                </>
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </Col>
            </Row >
        </>
    )
}

export default PromotionalProducts