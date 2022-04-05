import { Col, Container, Row, Button, Badge } from "react-bootstrap"
import { NavLink, Outlet } from 'react-router-dom'
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faHandPointer, faCartPlus, faShieldBlank, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import ProductConfiguration from '../../components/ProductConfiguration'
import ProductIntroduction from '../../components/ProductIntroduction'

import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'

// custom button next slider of react slick
const ButtonNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleRight}
            style={{
                ...style,
                background: 'black',
                opacity: '0.1',
                height: '30px',
                width: '30px',
                color: 'white',
                borderRadius: '6px'
            }}
            className={className}
            onClick={onClick}
        />
    );
}
// custom button prev slider of react slick
const ButtonPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleLeft}
            style={{
                ...style,
                background: 'black',
                opacity: '0.1',
                height: '30px',
                width: '30px',
                color: 'white',
                borderRadius: '6px'
            }}
            className={className}
            onClick={onClick}
        />
    );
}

// function of react rating stars component 
const ratingChanged = (newRating) => {
    // console.log(newRating);
};

const infoButtonsName = ['Giới Thiệu', 'Thông Tin Cấu Hình']

function ProductDetail() {

    let params = useParams();

    // show content introduction or configuration of product
    const [showInformation, setShowInformation] = useState(infoButtonsName[0])
    const [objProduct, setObjProduct] = useState({})
    const [objImages, setObjImages] = useState([])
    const [oldPrice, setOldPrice] = useState('')
    const [newPrice, setNewPrice] = useState('')

    useEffect(() => {
        const getProductImages = async () => {
            const { data } = await Axios.get(`http://localhost:3001/api/products/getImagesProduct/${params.idProduct}`)
            // console.log(data)
            if (data.errno) {
                console.log("loi server product detail")
            } else {
                setObjImages(data)
            }
        }
        //call function
        getProductImages()
    }, [])

    useEffect(() => {
        const getProductData = async () => {
            const { data } = await Axios.get(`http://localhost:3001/api/products/getOneProduct/${params.idProduct}`)
            // console.log(data)
            if (data.errno) {
                console.log("loi server product detail")
            } else {
                setObjProduct(data)
                // setProductType(data.id_lsp)
                // money format and pricing
                let oldPrice = moneyFormat(data.gia_sp)
                let newPrice = reducedPrice(data.gia_sp, data.giam_km)
                newPrice = moneyFormat(newPrice)
                setNewPrice(newPrice)
                setOldPrice(oldPrice)
            }


        }
        //call function
        getProductData()
    }, [params.idProduct])

    // variable of React Slick library
    const settings = {
        customPaging: (i) => {
            return (
                <div>
                    <img
                        src={'http://localhost:3001/' + objImages[i].anh_asp}
                        className='mt-4 rounded border border-primary p-1 bg-white'
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ButtonNextArrow />,
        prevArrow: <ButtonPrevArrow />
    };

    return (
        <Container>
            <Row className='bg-light rounded'>

                {/* show images Product */}
                <Col md={7}>
                    <div className="p-3 mb-5">
                        <Slider {...settings}>
                            {
                                objImages.map((val) => {
                                    return (
                                    <div className="align-middle" key={val.id_asp}>
                                        <img
                                            src={'http://localhost:3001/' + val.anh_asp}
                                            className='mx-auto w-100'
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </Col>

                {/* show name, price Product */}
                <Col md={5}>
                    <div className="py-2">
                        {/* <h5>{nameProduct}</h5> */}
                        <ReactStars
                            count={5}
                            edit={false}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            value={4}
                        />
                        <h6 style={{ textDecoration: 'line-through', fontStyle: 'italic', opacity: 0.8 }}>
                            {oldPrice + ' VNĐ'}
                        </h6>
                        <div>
                            <h4 className="float-start me-2" style={{ color: 'red' }}>
                                {newPrice + ' VNĐ'}
                            </h4>
                            <Badge className="float-start rounded-pill bg-danger">
                                {'Giảm ' + objProduct.giam_km + '%'}
                            </Badge>
                            <div className="clearfix"></div>

                        </div>
                        {/* <p>Tình trạng: {statusProduct} </p> */}
                        <div className="my-3">
                            <Button className="me-2 fw-bold" style={{ backgroundColor: '#fb6e2e', border: 'none' }}>
                                <FontAwesomeIcon icon={faHandPointer} className='me-1' />
                                Mua
                            </Button>
                            <Button variant="primary" className="fw-bold">
                                <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                Thêm Vào Giỏ Hàng
                            </Button>
                        </div>
                        <div className="mt-2 border border-primary rounded-3">
                            <div className="bg-primary text-center text-white p-1">
                                <span>Chính Sách Bảo Hành</span>
                            </div>
                            <div className="p-1 px-4">
                                <p className="mb-1">
                                    <FontAwesomeIcon icon={faShieldBlank} className='me-1 text-primary' />
                                    Bảo hành chính hãng 2 năm
                                </p>
                                <p className="mb-1">
                                    <FontAwesomeIcon icon={faScrewdriverWrench} className='me-1 text-primary' />
                                    Hư gì đổi nấy
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>

                {/* show informations product */}
                <Col md={12}>
                    <div>
                        {/* button show information of product */}
                        <div>
                            {
                                infoButtonsName.map((button, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            size="sm"
                                            className={'btn rounded-pill me-2 border-0' + ' ' + (showInformation === button ? 'bg-primary' : 'bg-secondary')}
                                            onClick={() => setShowInformation(button)}
                                        >
                                            {button}
                                        </Button>
                                    )
                                })
                            }
                        </div>

                        {/* Information content of the product  */}
                        <div>
                            <div
                                style={showInformation === infoButtonsName[0] ? { display: 'block' } : { display: 'none' }}
                                className='px-5 py-3'
                            >
                                <ProductIntroduction data={objProduct.gioi_thieu_sp} />
                            </div>
                            <div
                                style={showInformation === infoButtonsName[1] ? { display: 'block' } : { display: 'none' }}
                                className='px-5 py-3'
                            >
                                <ProductConfiguration data={objProduct} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default ProductDetail