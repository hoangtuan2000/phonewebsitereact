import { useEffect, useState } from "react"
import { Button, Form, DropdownButton, SplitButton, ButtonGroup, Dropdown } from "react-bootstrap"
import Axios from 'axios'

import { URL } from '../../config/config'
import { validateUserAddress, validateUserDistrict, validateUserProvince, validateUserWard } from "../../functions/validateFormFunction"
import ModalNotification from '../../modal/modalNotification/ModalNotification'

function UpdateAddressAccount(props) {

    // const [modalUpdateAddressAccountStatus, setModalUpdateAddressAccountStatus] = useState(false);
    const [modalDeleteAddressAccountStatus, setModalDeleteAddressAccountStatus] = useState(false);

    // const [updateAddressStatus, setUpdateAddressStatus] = useState({})
    const [deleteAddressStatus, setDeleteAddressStatus] = useState({})

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [accountProvinceUpdate, setAccountProvinceUpdate] = useState('')
    const [accountDistrictUpdate, setAccountDistrictUpdate] = useState('')
    const [accountWardUpdate, setAccountWardUpdate] = useState('')
    const [accountAddressUpdate, setAccountAddressUpdate] = useState('')

    const [accountAddressInfo, setAccountAddressInfo] = useState([])

    const getAllAddressAccount = () => {
        //get all address account
        Axios.get(URL + '/account/getAllAddressAccount')
            .then((res) => {
                if (res.data.getAllAddressAccountStatus) {
                    setAccountAddressInfo(res.data.getAllAddressAccountData)
                }
            })
            .catch((err) => {
                console.log('setProvinces', err);
            })
    }

    // nếu bên trang thêm địa chỉ => thành công thì render lại tất cả địa chị
    useEffect(() => {
        // get All Address Account
        getAllAddressAccount()

    }, [props.reRenderAllAddressAccount])

    useEffect(() => {
        // get All Address Account
        getAllAddressAccount()

        //get all provinces
        Axios.get(URL + '/address/getAllProvinces')
            .then((res) => {
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
                setDistricts(res.data)
                document.getElementById('accountDistrictUpdate').removeAttribute('disabled')
                setWards([])
                document.getElementById('accountWardUpdate').setAttribute('disabled', true)
                //reset state accountDistrictUpdate, accountWardUpdate empty
                setAccountDistrictUpdate('')
                setAccountWardUpdate('')
            })
            .catch((err) => {
                console.log('getDistrictsProvince', err);
            })
    }

    const getWardsDistrict = (e) => {
        const idDistrict = e.target.value
        Axios.post(URL + '/address/getWardsDistrict', { idDistrict: idDistrict })
            .then((res) => {
                setWards(res.data)
                document.getElementById('accountWardUpdate').removeAttribute('disabled')
            })
            .catch((err) => {
                console.log('getWardsDistrict', err);
            })
    }

    // ================= check address Update
    const checkProvinceUpdate = (province) => {
        setAccountProvinceUpdate(province);
        return validateUserProvince(province, 'accountProvinceUpdate')
    }

    const checkDistrictUpdate = (district) => {
        setAccountDistrictUpdate(district);
        return validateUserDistrict(district, 'accountDistrictUpdate')
    }

    const checkWardUpdate = (ward) => {
        setAccountWardUpdate(ward);
        return validateUserWard(ward, 'accountWardUpdate')
    }

    const checkAddressUpdate = (address) => {
        setAccountAddressUpdate(address);
        return validateUserAddress(address, 'noptificationAccountAddressUpdateFail')
    }

    //delete address account
    const deleteAddressAccount = (idAddress) => {
        Axios.post(URL + '/account/deleteAddressAccount', {
            idAddress: idAddress
        })
            .then((res) => {
                setDeleteAddressStatus(res.data)
                setModalDeleteAddressAccountStatus(true)

                if(res.data.deleteAddressAccountStatus) {
                    getAllAddressAccount()
                }

            })
            .catch((err) => {
                console.log('addAddressAccount', err);
            })
    }

    return (
        <div>
            {/* update address acount */}
            <div
                className="py-3 px-1 bg-white"
                style={{
                    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.27)',
                    borderRadius: '10px'
                }}
            >
                <div>
                    <div className="text-center">
                        <h6>Tất Cả Địa Chỉ</h6>
                    </div>
                    {
                        accountAddressInfo.map((address) => {
                            return (
                                <Form className='d-flex justify-content-center' key={address.id_dc}>

                                    <div className="mb-1 me-3 float-start w-25">
                                        <Form.Group>
                                            <Form.Label htmlFor="accountAddressUpdate" style={{ fontSize: '14px' }}>Nhập Địa Chỉ:</Form.Label>
                                            <Form.Control
                                                id="accountAddressUpdate"
                                                type="text"
                                                size='sm'
                                                style={{ fontSize: '14px' }}
                                                value={address.dia_chi}
                                                onChange={(e) => checkAddressUpdate(e.target.value)}
                                            />
                                            <Form.Text id="noptificationAccountAddressUpdateFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                                        </Form.Group>
                                    </div>

                                    <div className="mb-1 me-3 float-start">
                                        <Form.Label htmlFor="accountProvinceUpdate">
                                            Tỉnh Thành Phố
                                        </Form.Label>
                                        <Form.Select
                                            id="accountProvinceUpdate"
                                            className="mb-2"
                                            size="sm"
                                            style={{ width: '180px' }}
                                            onChange={(e) => {
                                                getDistrictsProvince(e);
                                                checkProvinceUpdate(e.target.value)
                                            }}
                                        >
                                            <option value='' disabled>Chọn tỉnh thành phố</option>
                                            {
                                                provinces.map((province) => {
                                                    if (province.id_ttp == address.id_ttp) {
                                                        return (
                                                            <option selected value={province.id_ttp} key={province.id_ttp}>{province.ten_ttp}</option>
                                                        )
                                                    } else {
                                                        return (
                                                            <option value={province.id_ttp} key={province.id_ttp}>{province.ten_ttp}</option>
                                                        )
                                                    }
                                                })
                                            }
                                        </Form.Select>
                                    </div>

                                    <div className="mb-1 me-3 float-start">
                                        <Form.Label htmlFor="accountDistrictUpdate">
                                            Quận Huyện
                                        </Form.Label>
                                        <Form.Select
                                            id="accountDistrictUpdate"
                                            // value={accountDistrictUpdate}
                                            className="mb-2"
                                            size="sm"
                                            style={{ width: '180px' }}
                                            disabled
                                            onChange={(e) => {
                                                getWardsDistrict(e);
                                                checkDistrictUpdate(e.target.value)
                                            }}
                                        >
                                            {
                                                districts.length > 0 ?
                                                    <option value=''>Chọn quận huyện</option>
                                                    :
                                                    <option value={address.id_qh}>{address.ten_qh}</option>
                                            }
                                            {
                                                districts.map((district) => {
                                                    return (
                                                        <option value={district.id_qh} key={district.id_qh}>{district.ten_qh}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>

                                    <div className="mb-1 me-3 float-start">
                                        <Form.Label htmlFor="accountWardUpdate">
                                            Xã Phường
                                        </Form.Label>
                                        <Form.Select
                                            id="accountWardUpdate"
                                            // value={accountWardUpdate}
                                            className="mb-2"
                                            style={{ width: '180px' }}
                                            size="sm"
                                            disabled
                                            onChange={(e) => checkWardUpdate(e.target.value)}
                                        >
                                            {
                                                districts.length > 0 ?
                                                    <option value=''>Chọn xã phường</option>
                                                    :
                                                    <option value={address.id_qh}>{address.ten_qh}</option>
                                            }
                                            {
                                                wards.map((ward) => {
                                                    return (
                                                        <option value={ward.id_xp} key={ward.id_xp}>{ward.ten_xp}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </div>

                                    <div className="text-center mt-3 mb-1 me-3 pt-3 float-start">
                                        <DropdownButton title="Quản Lý" size='sm'>
                                            <Dropdown.Item
                                                className="bg-warning my-1 rounded btn btn-sm p-0 text-center"
                                                as="button"
                                                value={address.id_dc}
                                                onClick={
                                                    (e) => { e.preventDefault(); console.log(e.target.value); }
                                                }
                                            >
                                                Cập Nhật
                                            </Dropdown.Item>
                                            {
                                                address.mac_dinh != 1 ?
                                                    <Dropdown.Item
                                                        className="bg-success my-1 rounded text-white btn btn-sm p-0 text-center"
                                                        as="button"
                                                        value={address.id_dc}
                                                        onClick={
                                                            (e) => { e.preventDefault(); console.log(e.target.value); }
                                                        }
                                                    >
                                                        Đặt Mặc Định
                                                    </Dropdown.Item>
                                                    : <></>
                                            }
                                            <Dropdown.Item
                                                className="bg-danger my-1 rounded text-white btn btn-sm p-0 text-center"
                                                as="button"
                                                value={address.id_dc}
                                                onClick={
                                                    (e) => { e.preventDefault(); deleteAddressAccount(e.target.value); }
                                                }
                                            >
                                                Xóa
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </div>

                                </Form>
                            )
                        })
                    }

                </div>
            </div>

            {/* modalUpdateAccountStatus */}
            {/* <ModalNotification
                show={modalUpdateAddressAccountStatus}
                onHide={() => setModalUpdateAddressAccountStatus(false)}
                status={updateAddressStatus.addAddressAccountStatus}
                title={
                    updateAddressStatus.addAddressAccountStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={updateAddressStatus.addAddressAccountMessage}
            /> */}

            {/* modalDeleteAddressAccountStatus */}
            <ModalNotification
                show={modalDeleteAddressAccountStatus}
                onHide={() => setModalDeleteAddressAccountStatus(false)}
                status={deleteAddressStatus.deleteAddressAccountStatus}
                title={
                    deleteAddressStatus.deleteAddressAccountStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={deleteAddressStatus.deleteAddressAccountMessage}
            />
        </div>
    )
}

export default UpdateAddressAccount
