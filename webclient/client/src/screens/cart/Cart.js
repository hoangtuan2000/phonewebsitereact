import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Table, Image, InputGroup, Button, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

import { URL } from '../../config/config'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import ModalNotification from '../../modal/modalNotification/ModalNotification'

function Cart() {

    // get heigth screen => style for height col cart 
    const windowHeight = window.innerHeight

    // variable of bootstrap modal
    const [modalNotificationShow, setModalNotificationShow] = useState(false);

    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [statusDeleteProductCart, setStatusDeleteProductCart] = useState({})

    useEffect(() => {
        Axios.get(URL + '/cart/getAllProductsCart')
            .then((res) => {
                // still have login session
                if (res.data.getAllProductsCartIsLogin) {
                    setProducts(res.data.getAllProductsCartData)
                } else {
                    // end of login session => reload page
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log('Cart > getAllProductsCart', err);
            })
    }, [])

    const getAllProductsCart = () => {
        Axios.get(URL + '/cart/getAllProductsCart')
            .then((res) => {
                // still have login session
                if (res.data.getAllProductsCartIsLogin) {
                    setProducts(res.data.getAllProductsCartData)
                } else {
                    // end of login session => reload page
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log('Cart > getAllProductsCart', err);
            })
    }

    useEffect(() => {
        if (products.length > 0) {
            let price = 0
            for (let i = 0; i < products.length; i++) {
                const promotionPrice = reducedPrice(products[i].gia_sp, products[i].giam_km)
                price = price + promotionPrice * products[i].so_luong
            }
            setTotalPrice(price)
        }
    }, [products])

    const handleDeleteProductCart = (idProduct) => {
        Axios.post(URL + '/cart/deleteProductCart', { idProduct: idProduct })
            .then((res) => {
                setStatusDeleteProductCart(res.data)
                setModalNotificationShow(true)
                getAllProductsCart()
            })
            .catch((err) => {
                console.log('handleDeleteProductCart', err);
            })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="bg-light rounded" style={{ minHeight: windowHeight }}>
                        <div className="pt-3 text-center">
                            {
                                products.length > 0 ?
                                    <>
                                        <Table striped bordered={false} hover className="p-1">
                                            <thead className="text-center">
                                                <tr>
                                                    <th></th>
                                                    <th>Tên Sản Phẩm</th>
                                                    <th>Số Lượng</th>
                                                    <th>Giá</th>
                                                    <th>Thành Tiền</th>
                                                    <th>Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((product) => {
                                                        const PromotionPrice = reducedPrice(product.gia_sp, product.giam_km)
                                                        return (
                                                            <tr key={product.id_sp} className="text-center align-middle">
                                                                <td className="p-1" style={{ width: '70px' }}>
                                                                    <Image
                                                                        src={URL + product.anh_sp}
                                                                        rounded
                                                                        fluid
                                                                        thumbnail
                                                                        style={{
                                                                            width: '50px',
                                                                            height: '50px'
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    {product.ten_sp}
                                                                </td>
                                                                <td style={{ width: '100px' }}>
                                                                    <InputGroup size='sm' >
                                                                        <Button className="p-0">
                                                                            <FontAwesomeIcon icon={faMinus} />
                                                                        </Button>
                                                                        <FormControl className="p-0 text-center" value={product.so_luong} readOnly />
                                                                        <Button className="p-0">
                                                                            <FontAwesomeIcon icon={faPlus} />
                                                                        </Button>
                                                                    </InputGroup>
                                                                </td>
                                                                <td className="text-end">
                                                                    {
                                                                        moneyFormat(PromotionPrice) + ' đ'
                                                                    }
                                                                </td>
                                                                <td className="text-end">
                                                                    {
                                                                        moneyFormat(PromotionPrice * product.so_luong) + ' đ'
                                                                    }
                                                                </td>
                                                                {/* button delete product cart */}
                                                                <td>
                                                                    <Button
                                                                        className="p-0 bg-transparent border-0"
                                                                        onClick={() => handleDeleteProductCart(product.id_sp)}
                                                                    >
                                                                        <OverlayTrigger
                                                                            placement='bottom'
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    Xóa Sản Phẩm
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <span>
                                                                                <FontAwesomeIcon
                                                                                    icon={faTrashCan}
                                                                                    className='text-danger'
                                                                                />
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr className="text-end text-danger fw-bold">
                                                    <td colSpan={3}></td>
                                                    <td>
                                                        Tổng Tiền:
                                                    </td>
                                                    <td>
                                                        {moneyFormat(totalPrice) + ' đ'}
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <NavLink to='/order' className='btn btn-sm btn-danger float-end'>
                                            Thanh Toán
                                        </NavLink>
                                    </>
                                    :
                                    <h4>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</h4>
                            }
                        </div>

                        {/* call tag modal Notification */}
                        <ModalNotification
                            show={modalNotificationShow}
                            onHide={() => setModalNotificationShow(false)}
                            status={statusDeleteProductCart.deleteProductCartStatus}
                            title={
                                statusDeleteProductCart.deleteProductCartStatus ?
                                    'Thành Công' : 'Thất Bại'
                            }
                            message={statusDeleteProductCart.deleteProductCartMessage}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart