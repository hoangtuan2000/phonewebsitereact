import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Table, Image, InputGroup, Button, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

import { URL } from '../../config/config'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import ModalNotification from '../../modal/modalNotification/ModalNotification'
import TableOrderCart from "../../components/tableOrder/TableOrderCart"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"

function Cart() {

    // get heigth screen => style for height col cart 
    const windowHeight = window.innerHeight

    // variable of bootstrap modal
    const [modalStatusDeleteProductCart, setModalStatusDeleteProductCart] = useState(false);
    const [modalStatusChangeNumberProductCart, setModalStatusChangeNumberProductCart] = useState(false);

    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [statusDeleteProductCart, setStatusDeleteProductCart] = useState({})
    const [statusChangeNumberProductCart, setStatusChangeNumberProductCart] = useState({})

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

    // sum price all product
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
                setModalStatusDeleteProductCart(true)
                // re render
                getAllProductsCart()
            })
            .catch((err) => {
                console.log('handleDeleteProductCart', err);
            })
    }

    const changeNumberProduct = (idProduct, operator) => {
        // get number product of cart
        let number = document.getElementById(`numberProductCart${idProduct}`).value
        //convert typeof string => typeof number
        number = parseInt(number)

        // kiểm tra bấm nút tăng hay giảm sản phẩm
        if (operator === 'plus') {
            number++
            Axios.post(URL + '/cart/changeNumberProductCart', {
                idProduct: idProduct,
                numberProduct: number
            })
                .then((res) => {
                    // lỗi mới show modal thông báo
                    if (res.data.changeNumberProductCartStatus === false) {
                        setStatusChangeNumberProductCart(res.data);
                        setModalStatusChangeNumberProductCart(true)
                    } else {
                        getAllProductsCart()
                    }
                })
                .catch((err) => {
                    console.log('changeNumberProduct', err);
                })
        } else {
            number--
            if (number > 0) {
                Axios.post(URL + '/cart/changeNumberProductCart', {
                    idProduct: idProduct,
                    numberProduct: number
                })
                    .then((res) => {
                        // lỗi mới show modal thông báo
                        if (res.data.changeNumberProductCartStatus === false) {
                            setStatusChangeNumberProductCart(res.data);
                            setModalStatusChangeNumberProductCart(true)
                        } else {
                            getAllProductsCart()
                        }
                    })
                    .catch((err) => {
                        console.log('changeNumberProduct', err);
                    })
            }
        }
    }

    return (
        <>
            <Breadcrumbs pageName={'Giỏ Hàng'} />
            <Container>
                <Row>
                    <Col className="bg-light rounded" style={{ minHeight: windowHeight }}>
                        <div className="pt-3 text-center">
                            {
                                products.length > 0 ?
                                    <>
                                        <TableOrderCart
                                            products={products}
                                            changeNumberProduct={changeNumberProduct}
                                            handleDeleteProductCart={handleDeleteProductCart}
                                            totalPrice={totalPrice}
                                        />

                                        <NavLink to='/order-cart' className='btn btn-sm btn-danger float-end'>
                                            Thanh Toán
                                        </NavLink>
                                    </>
                                    :
                                    <h4>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</h4>
                            }
                        </div>

                        {/* call tag modal Notification modalStatusDeleteProductCart */}
                        <ModalNotification
                            show={modalStatusDeleteProductCart}
                            onHide={() => setModalStatusDeleteProductCart(false)}
                            status={statusDeleteProductCart.deleteProductCartStatus}
                            title={
                                statusDeleteProductCart.deleteProductCartStatus ?
                                    'Thành Công' : 'Thất Bại'
                            }
                            message={statusDeleteProductCart.deleteProductCartMessage}
                        />

                        {/* call tag modal Notification */}
                        <ModalNotification
                            show={modalStatusChangeNumberProductCart}
                            onHide={() => setModalStatusChangeNumberProductCart(false)}
                            status={statusChangeNumberProductCart.changeNumberProductCartStatus}
                            title={
                                statusChangeNumberProductCart.changeNumberProductCartStatus ?
                                    'Thành Công' : 'Thất Bại'
                            }
                            message={statusChangeNumberProductCart.changeNumberProductCartMessage}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart