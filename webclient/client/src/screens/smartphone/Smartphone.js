import { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'


import PromotionalProducts from '../promotionalProducts/PromotionalProducts'
import NoProductsFound from '../../components/noProductsFound/NoProductsFound'
import { nameProductFormat } from '../../functions/stringFormat'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import { URL } from '../../config/config'

function Smartphone() {

    const [products, setProducts] = useState([])
    const [topProducts, setTopProducts] = useState([])

    useEffect(() => {
        const getAllProducts = async () => {
            const { data } = await Axios.get(URL + '/api/products/getAllSmartphones')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log(data);
                setProducts(data)
            }
        }

        const getTopProducts = async () => {
            const { data } = await Axios.get(URL + '/api/products/getTopSmartphones')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log(data);
                setTopProducts(data)
            }
        }

        getAllProducts()

        getTopProducts()
    }, [])

    return (
        <>
            <Container className='my-2'>

                {
                    topProducts.length > 0
                    &&
                    <PromotionalProducts
                        titlePromotion={'Điện Thoại Nổi Bậc'}
                        topProducts={topProducts}
                    />
                }

                <Row>
                    {
                        products.length !== 0 ?
                            products.map((val, index) => {
                                return (
                                    <Col md={2} className='p-0' data-aos="fade-up" key={index}>
                                        <div className='cardProduct'>
                                            <Link to={`/product-detail/${val.id_sp}`}>
                                                <Card >
                                                    <Card.Img variant="top"
                                                        src={URL + val.anh_sp}
                                                        className='mt-2'
                                                    />
                                                    <Card.Body className='p-2' >
                                                        {
                                                            val.giam_km > 0 ?
                                                                <Badge bg="danger"> Giảm {val.giam_km} % </Badge>
                                                                :
                                                                <br />
                                                        }
                                                        <Card.Title>
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip>
                                                                        {val.ten_sp}
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <span>
                                                                    {nameProductFormat(val.ten_sp, 20)}
                                                                </span>
                                                            </OverlayTrigger>
                                                        </Card.Title>
                                                        {
                                                            val.giam_km > 0 ?
                                                                <>
                                                                    <h6>{moneyFormat(val.gia_sp)} VNĐ</h6>
                                                                    <h5>{moneyFormat(reducedPrice(val.gia_sp, val.giam_km))} VNĐ</h5>
                                                                </>
                                                                :
                                                                <>
                                                                    <h6><br /></h6>
                                                                    <h5>{moneyFormat(reducedPrice(val.gia_sp, val.giam_km))} VNĐ</h5>
                                                                </>
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </div>
                                    </Col>
                                )
                            })
                            : <NoProductsFound content={'Hiện Tại Chưa Có Sản Phẩm Nào'} />

                    }
                </Row>
            </Container>
        </>
    )
}

export default Smartphone