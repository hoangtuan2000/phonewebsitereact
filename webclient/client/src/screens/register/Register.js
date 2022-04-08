import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import Axios from 'axios'
import { URL } from '../../config/config'

function Register() {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])


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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
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
                                        />
                                    </div>
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
                                </Form.Group>

                                <Form.Label htmlFor="provinceRegister">
                                    Tỉnh Thành Phố
                                </Form.Label>
                                <Form.Select
                                    id="provinceRegister"
                                    defaultValue=''
                                    className="mb-2"
                                    onChange={(e) => getDistrictsProvince(e)}
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
                                    defaultValue=''
                                    className="mb-2"
                                    disabled
                                    onChange={(e) => getWardsDistrict(e)}
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
                                    defaultValue=''
                                    className="mb-2"
                                    disabled
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
                                        id='checkAgree'
                                        type="checkbox"
                                        label={
                                            <span>
                                                Đồng ý với &nbsp;
                                                <Link to='/policy'>Điều Khoản Và Chính Sách</Link>
                                            </span>}
                                    />
                                    <Form.Text className="text-danger">
                                        abc
                                    </Form.Text>
                                </Form.Group>

                                <div className="text-center">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="w-50"
                                        style={{
                                            fontSize: '20px'
                                        }}
                                    >
                                        Đăng Ký
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register