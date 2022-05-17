import { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'

import PromotionalProducts from '../../components/promotionalProducts/PromotionalProducts'
import NoProductsFound from '../../components/noProductsFound/NoProductsFound'
import { nameProductFormat } from '../../functions/stringFormatFunction'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import { URL } from '../../config/config'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

function Phonecase() {

    const [products, setProducts] = useState([])
    const [promotionalProducts, setpromotionalProducts] = useState([])

    // value load more products
    const [loadProducts, setLoadProducts] = useState(18)

    useEffect(() => {
        const getAllPhonecases = async () => {
            const { data } = await Axios.get(URL + '/api/products/getAllPhonecases')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log(data);
                setProducts(data)
            }
        }

        const getPromotionalPhonecases = async () => {
            const { data } = await Axios.get(URL + '/api/products/getPromotionalPhonecases')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log(data);
                setpromotionalProducts(data)
            }
        }

        getPromotionalPhonecases()
        getAllPhonecases()

    }, [])

    const loadMoreProducts = () => {
        setLoadProducts(loadProducts + 18)
    }

    // cut array products to click button load more
    const sliceProducts = products.slice(0, loadProducts)

    return (
        <>
         <Breadcrumbs pageName={'Ốp Lưng'} />
            <Container className='my-2'>

                {
                    promotionalProducts.length > 0
                    &&
                    <PromotionalProducts
                        titlePromotion={'Ốp Lưng Nổi Bậc'}
                        promotionalProducts={promotionalProducts}
                    />
                }

                <Row className='bg-white rounded'>
                    {
                        products.length !== 0 ?
                            <>
                                {
                                    sliceProducts.map((val, index) => {
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
                                }
                                {
                                    products.length - loadProducts > 0 ?
                                        <button
                                            className='btn btn-primary mt-2'
                                            onClick={loadMoreProducts}
                                        >
                                            Xem Thêm {products.length - loadProducts} Sản Phẩm
                                            <FontAwesomeIcon icon={faCircleArrowDown} className='mx-1' />
                                        </button>
                                        : <></>
                                }
                            </>
                            : <NoProductsFound content={'Hiện Tại Chưa Có Sản Phẩm Nào'} />

                    }
                </Row>
            </Container>
        </>
    )
}

export default Phonecase