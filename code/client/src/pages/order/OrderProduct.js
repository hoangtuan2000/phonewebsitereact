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
import TableOrderProduct from "../../components/tableOrder/TableOrderProduct"
import { validateUserFullname, validateUserPhoneNumber, validateUserNote } from '../../functions/validateFormFunction'
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"

function OrderProduct() {
    // get heigth screen => style for height col cart 
    const windowHeight = window.innerHeight

    const params = useParams()
    const userLogin = useSelector((state) => state.userLogin.infoUser)
    const navigate = useNavigate()

    // variable of bootstrap modal
    const [modalStatusChangeNumberProductOrder, setModalStatusChangeNumberProductOrder] = useState(false);
    const [modalStatusOrder, setModalStatusOrder] = useState(false);

    // status handle
    const [statusChangeNumberProductOrder, setStatusChangeNumberProductOrder] = useState({})
    const [statusOrder, setStatusOrder] = useState({})

    const [product, setProduct] = useState([])
    const [addresses, setAddresses] = useState([])
    const [numberProduct, setNumberProduct] = useState(1)

    const [fullnameOrder, setFullnameOrder] = useState('')
    const [phoneNumberOrder, setPhoneNumberOrder] = useState('')
    const [addressOrder, setAddressOrder] = useState('')
    const [noteOrder, setNoteOrder] = useState('')

    // get product info => show in table
    useEffect(() => {
        Axios.post(URL + '/order/getProductInfoOrder', { idProduct: params.orderIdProduct })
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log('/order/getProductInfoOrder', err);
            })
    }, [])

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

    const handleDeleteProductCart = () => {
        navigate('/')
    }

    const changeNumberProduct = (operator) => {
        let number = numberProduct
        if (operator === 'plus') {
            number++
        } else {
            if (number - 1 > 0) {
                number--
            }
        }

        Axios.post(URL + '/order/changeNumberProductOrder', { idProductOrder: params.orderIdProduct, numberProductOrder: number })
            .then((res) => {
                if (res.data.changeNumberProductOrderStatus) {
                    setNumberProduct(number)
                } else {
                    setStatusChangeNumberProductOrder(res.data);
                    setModalStatusChangeNumberProductOrder(true)
                }
            })
            .catch((err) => {
                console.log('changeNumberProduct => /order/changeNumberProductOrder', err);
            })
    }

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

    const handleOrderProduct = () => {
        Axios.post(URL + '/order/orderProduct', {
            receiver: fullnameOrder,
            phoneNumber: phoneNumberOrder,
            address: addressOrder,
            note: noteOrder,
            idProductOrder: params.orderIdProduct,
            numberProductOrder: numberProduct,
        })
            .then((res) => {
                setStatusOrder(res.data)
                setModalStatusOrder(true)
            })
            .catch((err) => {
                console.log('handleOrderProduct', err);
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
                                product.length > 0 ?
                                    <>
                                        <TableOrderProduct
                                            product={product}
                                            changeNumberProduct={changeNumberProduct}
                                            handleDeleteProductCart={handleDeleteProductCart}
                                            numberProduct={numberProduct}
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
                                        onClick={handleOrderProduct}
                                    >
                                        <FontAwesomeIcon icon={faHandPointUp} className='me-1' />
                                        Đặt Hàng
                                    </button>
                                </div>
                            </Col>

                        </Row>

                        {/* call tag modal Notification modalStatusChangeNumberProductCart*/}
                        <ModalNotification
                            show={modalStatusChangeNumberProductOrder}
                            onHide={() => setModalStatusChangeNumberProductOrder(false)}
                            status={statusChangeNumberProductOrder.changeNumberProductOrderStatus}
                            title={
                                statusChangeNumberProductOrder.changeNumberProductOrderStatus ?
                                    'Thành Công' : 'Thất Bại'
                            }
                            message={statusChangeNumberProductOrder.changeNumberProductOrderMessage}
                        />

                        {/* call tag modal Notification ModalStatusOrder*/}
                        <ModalNotification
                            show={modalStatusOrder}
                            {
                            ...(statusOrder.orderProductStatus ?
                                { onHide: () => { setModalStatusOrder(false); navigate('/') } } //nếu đặt hàng thành công thì chuyền về trang home
                                : { onHide: () => { setModalStatusOrder(false) } }
                            )
                            }
                            status={statusOrder.orderProductStatus}
                            title={
                                statusOrder.orderProductStatus ?
                                    'Đặt Hàng Thành Công' : 'Đặt Hàng Thất Bại'
                            }
                            message={statusOrder.orderProductMessage}
                            gotoPage={`/order-details/${statusOrder.orderProductIdOrder}`}
                            namePage={'Xem Đơn Hàng'}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderProduct