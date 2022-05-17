import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointUp, faMinus, faPhone, faPlus, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Table, Image, InputGroup, Button, FormControl, OverlayTrigger, Tooltip, Form, FloatingLabel } from "react-bootstrap"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { URL } from '../../config/config'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import ModalNotification from '../../modal/modalNotification/ModalNotification'
import TableOrderCart from "../../components/tableOrder/TableOrderCart"
import { validateUserFullname, validateUserPhoneNumber, validateUserNote } from '../../functions/validateFormFunction'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"

function OrderCart() {
    // get heigth screen => style for height col cart 
    const windowHeight = window.innerHeight

    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin.infoUser)

    // variable of bootstrap modal
    const [modalStatusDeleteProductCart, setModalStatusDeleteProductCart] = useState(false);
    const [modalStatusChangeNumberProductCart, setModalStatusChangeNumberProductCart] = useState(false);
    const [modalStatusOrder, setModalStatusOrder] = useState(false);

    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [statusDeleteProductCart, setStatusDeleteProductCart] = useState({})
    const [statusChangeNumberProductCart, setStatusChangeNumberProductCart] = useState({})
    const [statusOrder, setStatusOrder] = useState({})

    const [addresses, setAddresses] = useState([])

    const [fullnameOrder, setFullnameOrder] = useState('')
    const [phoneNumberOrder, setPhoneNumberOrder] = useState('')
    const [addressOrder, setAddressOrder] = useState('')
    const [noteOrder, setNoteOrder] = useState('')

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
                    if (res.data.getAllProductsCartData.length > 0) {
                        setProducts(res.data.getAllProductsCartData)
                    } else {
                        // nếu xóa hết sản phẩm trong giỏ hàng thì chuyển về trang chủ
                        navigate('/')
                    }
                } else {
                    // end of login session => reload page
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log('Cart > getAllProductsCart', err);
            })
    }

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

    // Lấy thông tin khách hàng => hiển thị vào form
    useEffect(() => {
        // get info user from redux
        setFullnameOrder(userLogin.ten_kh)
        setPhoneNumberOrder(userLogin.sdt_kh)

        //get address from server
        Axios.get(URL + '/address/getAddressUser')
            .then((res) => {
                if (res.data.getAddressUserStatus) {
                    setAddresses(res.data.getAddressUserData)
                    res.data.getAddressUserData.map((address) => {
                        if (address.mac_dinh === 1) {
                            setAddressOrder(address.dia_chi + ' - ' + address.ten_xp + ' - ' + address.ten_qh + ' - ' + address.ten_ttp)
                        }
                    })
                } else {
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log('/address/getAddressUser', err)
            })
    }, [])

    const checkFullname = (fullname) => {
        setFullnameOrder(fullname)
        return validateUserFullname(fullname, 'showFullnameOrderFail')
    }

    const checkPhoneNumber = (phoneNumber) => {
        setPhoneNumberOrder(phoneNumber);
        return validateUserPhoneNumber(phoneNumber, 'showPhoneNumberOrderFail')
    }

    const checkNote = (note) => {
        setNoteOrder(note);
        return validateUserNote(note, 'showNoteOrderFail')
    }

    const handleOrderProductsCart = () => {
        Axios.post(URL + '/order/orderProductInCart', {
            receiver: fullnameOrder,
            phoneNumber: phoneNumberOrder,
            address: addressOrder,
            note: noteOrder
        })
            .then((res) => {
                setStatusOrder(res.data)
                setModalStatusOrder(true)
            })
            .catch((err) => {
                console.log('handleOrderProducts', err);
            })
    }


    return (
        <>
            <Breadcrumbs pageName={'Đặt Hàng'} />
            <Container>
                <Row>
                    <Col className="bg-light rounded" style={{ minHeight: windowHeight }}>
                        <div className="pt-3 text-center">
                            <h3>Tiến Hành Đặt Hàng</h3>
                            {
                                products.length > 0 ?
                                    <>
                                        <TableOrderCart
                                            products={products}
                                            changeNumberProduct={changeNumberProduct}
                                            handleDeleteProductCart={handleDeleteProductCart}
                                            totalPrice={totalPrice}
                                        />
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                        <Row>
                            <Col sm={7}>
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="fullnameOrder">
                                            Họ Tên
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faUser} />
                                            </span>
                                            <Form.Control
                                                id="fullnameOrder"
                                                type="text"
                                                value={fullnameOrder}
                                                onChange={(e) => checkFullname(e.target.value)}
                                            />
                                        </div>
                                        <Form.Text className="text-danger" id="showFullnameOrderFail"></Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label htmlFor="fullnameOrder">
                                            Số Điện Thoại
                                        </Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FontAwesomeIcon icon={faPhone} />
                                            </span>
                                            <Form.Control
                                                id="fullnameOrder"
                                                type="text"
                                                value={phoneNumberOrder}
                                                onChange={(e) => checkPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                        <Form.Text className="text-danger" id="showPhoneNumberOrderFail"></Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>
                                            Địa Chỉ Giao Hàng
                                        </Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Select
                                                value={addressOrder}
                                                onChange={(e) => setAddressOrder(e.target.value)}
                                            >
                                                {
                                                    addresses.length > 0 ?
                                                        addresses.map((address, index) => {
                                                            let add = address.dia_chi + ' - ' + address.ten_xp + ' - ' + address.ten_qh + ' - ' + address.ten_ttp
                                                            return (
                                                                <option value={add} key={index}>{add}</option>
                                                            )
                                                        })
                                                        : <></>
                                                }
                                            </Form.Select>
                                            <NavLink to='/account-infomation' className='btn btn-primary'>
                                                Thêm Địa Chỉ
                                            </NavLink>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={5}>
                                <Form.Label htmlFor="fullnameOrder">
                                    Ghi Chú
                                </Form.Label>
                                <FloatingLabel className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        onChange={(e) => checkNote(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Form.Text className="text-danger" id="showNoteOrderFail"></Form.Text>
                            </Col>
                            <Col>
                                <div className="text-center">
                                    <button
                                        className='btn btn-sm btn-primary w-25'
                                        style={{ fontSize: '18px' }}
                                        onClick={handleOrderProductsCart}
                                    >
                                        <FontAwesomeIcon icon={faHandPointUp} className='me-1' />
                                        Đặt Hàng
                                    </button>
                                </div>
                            </Col>

                        </Row>

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

                        {/* call tag modal Notification modalStatusChangeNumberProductCart*/}
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

                        {/* call tag modal Notification ModalStatusOrder*/}
                        <ModalNotification
                            show={modalStatusOrder}
                            {
                            ...(statusOrder.orderProductInCartStatus ?
                                { onHide: () => { setModalStatusOrder(false); navigate('/') } } //nếu đặt hàng thành công thì chuyền về trang home
                                : { onHide: () => { setModalStatusOrder(false) } }
                            )
                            }
                            status={statusOrder.orderProductInCartStatus}
                            title={
                                statusOrder.orderProductInCartStatus ?
                                    'Đặt Hàng Thành Công' : 'Đặt Hàng Thất Bại'
                            }
                            message={statusOrder.orderProductInCartMessage}
                            gotoPage={`/order-details/${statusOrder.orderProductInCartIdOrder}`}
                            namePage={'Xem Đơn Hàng'}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderCart