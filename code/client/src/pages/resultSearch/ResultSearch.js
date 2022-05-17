import { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'

import NoProductsFound from '../../components/noProductsFound/NoProductsFound'
import { nameProductFormat } from '../../functions/stringFormatFunction'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import { URL } from '../../config/config'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

function ResultSearch() {

    // get heigth screen => style for height col cart 
    const windowHeight = window.innerHeight

    let [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([])

    // value load more products
    const [loadProducts, setLoadProducts] = useState(18)

    useEffect(() => {
        Axios.get(URL + `/api/products/searchProduct/${searchParams.get('searchContent')}`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log('SearchProduct', err);
            })
    }, [searchParams.get('searchContent')])

    const loadMoreProducts = () => {
        setLoadProducts(loadProducts + 18)
    }

    // cut array products to click button load more
    const sliceProducts = products.slice(0, loadProducts)

    return (
        <>
            <Breadcrumbs pageName={'Tìm Kiếm'} />
            <Container className='my-2'>

                <Row>
                    <Col className='bg-primary rounded my-1 p-1 text-white fw-bold'>
                        <div>Kết Quả Tìm Kiếm: {searchParams.get('searchContent')}</div>
                    </Col>
                </Row>

                <Row className='bg-white rounded' style={{ minHeight: windowHeight }}>
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

export default ResultSearch