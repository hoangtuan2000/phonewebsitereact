import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import Axios from 'axios'

import { URL } from '../../config/config'
import {
    validateUserFullname, validateUserEmail, validateUserPassword,
    validateUserPasswordAgain, validateUserPhoneNumber, validateUserAddress,
    validateUserProvince, validateUserDistrict, validateUserWard, validateUserAgree
} from '../../functions/validateFormFunction'
import ModalRegistrationStatus from "../../modal/modalRegistrationStatus/ModalRegistrationStatus"

function Register() {

    // variable of bootstrap modal
    const [modalRegistrationStatusShow, setModalRegistrationStatusShow] = useState(false);

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [fullnameRegister, setFullnameRegister] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [passwordAgainRegister, setPasswordAgainRegister] = useState('')
    const [phoneNumberRegister, setPhoneNumberRegister] = useState('')
    const [addressRegister, setAddressRegister] = useState('')
    const [provinceRegister, setProvinceRegister] = useState('')
    const [districtRegister, setDistrictRegister] = useState('')
    const [wardRegister, setWardRegister] = useState('')
    const [agreeRegister, setAgreeRegister] = useState(false)

    const [registrationStatus, setRegistrationStatus] = useState({})


    useEffect(() => {
        Axios.get(URL + '/address/getAllProvinces')
            .then((res) => {
                // console.log(res.data);
                setProvinces(res.data)
            })
            .catch((err) => {
                console.log('setProvinces', err);
            })
    }, [])

    const getDistrictsProvince = (e) => {
        const idProvince = e.target.value
        Axios.post(URL + '/address/getDistrictsProvince', { idProvince: idProvince })
            .then((res) => {
                // console.log(res.data);
                setDistricts(res.data)
                document.getElementById('districtRegister').removeAttribute('disabled')
                setWards([])
                document.getElementById('wardRegister').setAttribute('disabled', true)
            })
            .catch((err) => {
                console.log('setDistricts', err);
            })
    }

    const getWardsDistrict = (e) => {
        const idDistrict = e.target.value
        Axios.post(URL + '/address/getWardsDistrict', { idDistrict: idDistrict })
            .then((res) => {
                // console.log(res.data);
                setWards(res.data)
                document.getElementById('wardRegister').removeAttribute('disabled')
            })
            .catch((err) => {
                console.log('setDistricts', err);
            })
    }

    const checkFullname = (fullname) => {
        setFullnameRegister(fullname)
        return validateUserFullname(fullname, 'notificationFullnameFail')
    }

    const checkEmail = (email) => {
        setEmailRegister(email);
        return validateUserEmail(email, 'notificationEmailFail')
    }

    const checkPassword = (password) => {
        setPasswordRegister(password);
        return validateUserPassword(password, 'notificationPasswordFail')
        // set password again => empty when enter again password
        setPasswordAgainRegister('')
        document.getElementById('passwordAgainRegister').value = ''
        document.getElementById('notificationPasswordAgainFail').innerHTML = ''
    }

    const checkPasswordAgain = (passwordAgain) => {
        setPasswordAgainRegister(passwordAgain);
        return validateUserPasswordAgain(passwordRegister, passwordAgain, 'notificationPasswordAgainFail')
    }

    const checkPhoneNumber = (phoneNumber) => {
        setPhoneNumberRegister(phoneNumber);
        return validateUserPhoneNumber(phoneNumber, 'notificationPhoneNumberFail')
    }

    const checkAddress = (address) => {
        setAddressRegister(address);
        return validateUserAddress(address, 'notificationAddressFail')
    }

    const checkProvince = (province) => {
        setProvinceRegister(province);
        return validateUserProvince(province, 'provinceRegister')
    }

    const checkDistrict = (district) => {
        setDistrictRegister(district);
        return validateUserDistrict(district, 'districtRegister')
    }

    const checkWard = (ward) => {
        setWardRegister(ward);
        return validateUserWard(ward, 'wardRegister')
    }

    const checkAgree = (agree) => {
        setAgreeRegister(agree)
        return validateUserAgree(agree, 'argeeRegister')
    }

    const registerUser = () => {
        if (
            checkFullname(fullnameRegister) && checkEmail(emailRegister) &&
            checkPassword(passwordRegister) && checkPasswordAgain(passwordAgainRegister) &&
            checkPhoneNumber(phoneNumberRegister) && checkAddress(addressRegister) &&
            checkProvince(provinceRegister) && checkDistrict(districtRegister) &&
            checkWard(wardRegister) && checkAgree(agreeRegister)
        ) {
            // check email exist
            Axios.post(URL + '/auth/existEmail', { email: emailRegister })
                .then((res) => {
                    if (res.data.exitEmailStatus) {
                        // exist email
                        document.getElementById('notificationEmailFail').innerHTML = res.data.exitEmailMessage
                        document.getElementById('emailRegister').focus()

                    } else {
                        // not exist email
                        Axios.post(URL + '/auth/register',
                            {
                                fullnameRegister: fullnameRegister,
                                emailRegister: emailRegister,
                                passwordRegister: passwordRegister,
                                phoneNumberRegister: phoneNumberRegister,
                                addressRegister: addressRegister,
                                wardRegister: wardRegister
                            }
                        )
                            .then((result) => {
                                setRegistrationStatus(result.data)
                                setModalRegistrationStatusShow(true)
                                // reset info register in input
                                setFullnameRegister('')
                                setEmailRegister('')
                                setPasswordRegister('')
                                setPasswordAgainRegister('')
                                setPhoneNumberRegister('')
                                setAddressRegister('')
                                setProvinceRegister('')
                                setDistrictRegister('')
                                setWardRegister('')
                                setAgreeRegister('')
                                document.getElementById('wardRegister').setAttribute('disabled', true)
                                document.getElementById('districtRegister').setAttribute('disabled', true)
                            })
                            .catch((error) => {
                                console.log('registerUser', error);
                            })
                    }
                })
                .catch((err) => {
                    console.log('registerUser existEmail' + err);
                })
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col
                        className="d-flex justify-content-center rounded mt-1 p-5 "
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <div
                            className="bg-light w-50 p-4 shadow rounded-3"
                        >
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="fullnameRegister">
                                        Họ Tên
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <Form.Control
                                            id="fullnameRegister"
                                            type="text"
                                            placeholder="Nhập Họ Tên"
                                            value={fullnameRegister}
                                            onChange={(e) => checkFullname(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationFullnameFail">gkj</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="emailRegister">
                                        Email
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <Form.Control
                                            id="emailRegister"
                                            type="text"
                                            placeholder="Nhập Email"
                                            value={emailRegister}
                                            onChange={(e) => checkEmail(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationEmailFail"></Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="passwordRegister">
                                        Mật Khẩu
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faKey} />
                                        </span>
                                        <Form.Control
                                            id="passwordRegister"
                                            type="password"
                                            placeholder="Nhập Mật Khẩu"
                                            value={passwordRegister}
                                            onChange={(e) => checkPassword(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationPasswordFail"></Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="passwordAgainRegister">
                                        Nhập Lại Mật Khẩu
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faKey} />
                                        </span>
                                        <Form.Control
                                            id="passwordAgainRegister"
                                            type="password"
                                            placeholder="Nhập Lại Mật Khẩu"
                                            value={passwordAgainRegister}
                                            onChange={(e) => checkPasswordAgain(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationPasswordAgainFail"></Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="phoneNumberRegister">
                                        Số điện thoại
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        <Form.Control
                                            id="phoneNumberRegister"
                                            type="text"
                                            placeholder="Nhập Số Điện Thoại"
                                            value={phoneNumberRegister}
                                            onChange={(e) => checkPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationPhoneNumberFail"></Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="addressRegister">
                                        Địa Chỉ
                                    </Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </span>
                                        <Form.Control
                                            id="addressRegister"
                                            type="text"
                                            placeholder="Nhập Số Nhà Tên Đường"
                                            value={addressRegister}
                                            onChange={(e) => checkAddress(e.target.value)}
                                        />
                                    </div>
                                    <Form.Text className="text-danger" id="notificationAddressFail"></Form.Text>
                                </Form.Group>

                                <Form.Label htmlFor="provinceRegister">
                                    Tỉnh Thành Phố
                                </Form.Label>
                                <Form.Select
                                    id="provinceRegister"
                                    value={provinceRegister}
                                    className="mb-2"
                                    onChange={(e) => {
                                        getDistrictsProvince(e);
                                        checkProvince(e.target.value)
                                    }
                                    }
                                >
                                    <option value='' disabled>Chọn tỉnh thành phố</option>
                                    {
                                        provinces.map((province) => {
                                            return (
                                                <option value={province.id_ttp} key={province.id_ttp}>{province.ten_ttp}</option>
                                            )
                                        })
                                    }
                                </Form.Select>

                                <Form.Label htmlFor="districtRegister">
                                    Quận Huyện
                                </Form.Label>
                                <Form.Select
                                    id="districtRegister"
                                    value={districtRegister}
                                    className="mb-2"
                                    disabled
                                    onChange={(e) => {
                                        getWardsDistrict(e);
                                        checkDistrict(e.target.value)
                                    }}
                                >
                                    <option value=''>Chọn quận huyện</option>
                                    {
                                        districts.map((district) => {
                                            return (
                                                <option value={district.id_qh} key={district.id_qh}>{district.ten_qh}</option>
                                            )
                                        })
                                    }
                                </Form.Select>

                                <Form.Label htmlFor="wardRegister">
                                    Xã Phường
                                </Form.Label>
                                <Form.Select
                                    id="wardRegister"
                                    value={wardRegister}
                                    className="mb-2"
                                    disabled
                                    onChange={(e) => checkWard(e.target.value)}
                                >
                                    <option value=''>Chọn xã phường</option>
                                    {
                                        wards.map((ward) => {
                                            return (
                                                <option value={ward.id_xp} key={ward.id_xp}>{ward.ten_xp}</option>
                                            )
                                        })
                                    }
                                </Form.Select>

                                <Form.Group className="my-3" htmlFor='checkAgree'>
                                    <Form.Check
                                        id='argeeRegister'
                                        type="checkbox"
                                        checked={agreeRegister}
                                        onChange={(e) => checkAgree(e.target.checked)}
                                        label={
                                            <span>
                                                Đồng ý với &nbsp;
                                                <Link to='/policy'>Điều Khoản Và Chính Sách</Link>
                                            </span>}
                                    />
                                </Form.Group>

                                <div className="text-center">
                                    <Button
                                        id='buttonRegister'
                                        // disabled
                                        variant="primary"
                                        type="button"
                                        className="w-50"
                                        style={{
                                            fontSize: '20px'
                                        }}
                                        onClick={registerUser}
                                    >
                                        Đăng Ký
                                    </Button>
                                </div>
                            </Form>
                        </div>

                        {/* call tag modal Registration Status*/}
                        <ModalRegistrationStatus
                            show={modalRegistrationStatusShow}
                            onHide={() => setModalRegistrationStatusShow(false)}
                            registrationStatus={registrationStatus}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register