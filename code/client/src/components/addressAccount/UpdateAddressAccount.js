import { useEffect, useState } from "react"
import { Button, Form, DropdownButton, SplitButton, ButtonGroup, Dropdown } from "react-bootstrap"
import Axios from 'axios'

import { URL } from '../../config/config'
import { validateUserAddress, validateUserDistrict, validateUserProvince, validateUserWard } from "../../functions/validateFormFunction"
import ModalNotification from '../../modal/modalNotification/ModalNotification'

function UpdateAddressAccount(props) {

    // const [modalUpdateAddressAccountStatus, setModalUpdateAddressAccountStatus] = useState(false);
    const [modalDeleteAddressAccountStatus, setModalDeleteAddressAccountStatus] = useState(false);
    const [modalUpdateAddressDefaultAccountStatus, setModalUpdateAddressDefaultAccountStatus] = useState(false);

    // const [updateAddressStatus, setUpdateAddressStatus] = useState({})
    const [deleteAddressStatus, setDeleteAddressStatus] = useState({})
    const [updateAddressDefaultStatus, setUpdateAddressDefaultStatus] = useState({})

    // const [provinces, setProvinces] = useState([])
    // const [districts, setDistricts] = useState([])
    // const [wards, setWards] = useState([])

    // const [accountProvinceUpdate, setAccountProvinceUpdate] = useState('')
    // const [accountDistrictUpdate, setAccountDistrictUpdate] = useState('')
    // const [accountWardUpdate, setAccountWardUpdate] = useState('')
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
        // Axios.get(URL + '/address/getAllProvinces')
        //     .then((res) => {
        //         setProvinces(res.data)
        //     })
        //     .catch((err) => {
        //         console.log('setProvinces', err);
        //     })

    }, [])

    // const getDistrictsProvince = (e, index) => {
    //     const idProvince = e.target.value
    //     Axios.post(URL + '/address/getDistrictsProvince', { idProvince: idProvince })
    //         .then((res) => {
    //             setDistricts(res.data)
    //             document.getElementById(`accountDistrictUpdate${index}`).removeAttribute('disabled')
    //             setWards([])
    //             document.getElementById(`accountWardUpdate${index}`).setAttribute('disabled', true)
    //             //reset state accountDistrictUpdate, accountWardUpdate empty
    //             setAccountDistrictUpdate('')
    //             setAccountWardUpdate('')
    //         })
    //         .catch((err) => {
    //             console.log('getDistrictsProvince', err);
    //         })
    // }

    // const getWardsDistrict = (e, index) => {
    //     const idDistrict = e.target.value
    //     Axios.post(URL + '/address/getWardsDistrict', { idDistrict: idDistrict })
    //         .then((res) => {
    //             setWards(res.data)
    //             document.getElementById(`accountWardUpdate${index}`).removeAttribute('disabled')
    //         })
    //         .catch((err) => {
    //             console.log('getWardsDistrict', err);
    //         })
    // }

    // ================= check address Update
    // const checkProvinceUpdate = (province, index) => {
    //     setAccountProvinceUpdate(province);
    //     return validateUserProvince(province, `accountProvinceUpdate${index}`)
    // }

    // const checkDistrictUpdate = (district, index) => {
    //     setAccountDistrictUpdate(district);
    //     return validateUserDistrict(district, `accountDistrictUpdate${index}`)
    // }

    // const checkWardUpdate = (ward, index) => {
    //     setAccountWardUpdate(ward);
    //     return validateUserWard(ward, `accountWardUpdate${index}`)
    // }

    const checkAddressUpdate = (address, index) => {
        setAccountAddressUpdate(address);
        return validateUserAddress(address, `noptificationAccountAddressUpdateFail${index}`)
    }

    //delete address account
    const deleteAddressAccount = (idAddress) => {
        Axios.post(URL + '/account/deleteAddressAccount', {
            idAddress: idAddress
        })
            .then((res) => {
                setDeleteAddressStatus(res.data)
                setModalDeleteAddressAccountStatus(true)

                if (res.data.deleteAddressAccountStatus) {
                    getAllAddressAccount()
                }

            })
            .catch((err) => {
                console.log('deleteAddressAccount', err);
            })
    }

    //update address default Account
    const updateAddressDefaultAccount = (idAddress) => {
        Axios.post(URL + '/account/updateAddressDefaultAccount', {
            idAddress: idAddress
        })
            .then((res) => {
                setUpdateAddressDefaultStatus(res.data)
                setModalUpdateAddressDefaultAccountStatus(true)

                if (res.data.updateAddressDefaultAccountStatus) {
                    getAllAddressAccount()
                }

            })
            .catch((err) => {
                console.log('updateAddressDefaultAccount', err);
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

                                    <div className="mb-1 me-3 float-start w-75">
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                size='sm'
                                                disabled
                                                style={{ fontSize: '14px' }}
                                                value={
                                                    address.mac_dinh == 1 ?
                                                        address.dia_chi + ' - ' + address.ten_xp + ' - ' + address.ten_qh + ' - ' + address.ten_ttp + ' (Mặc Định)'
                                                        :
                                                        address.dia_chi + ' - ' + address.ten_xp + ' - ' + address.ten_qh + ' - ' + address.ten_ttp
                                                }
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="text-center me-3 float-start">
                                        {
                                            address.mac_dinh != 1 ?
                                                <>
                                                    <DropdownButton title="Quản Lý" size='sm'>
                                                        <Dropdown.Item
                                                            className="bg-success my-1 rounded text-white btn btn-sm p-0 text-center"
                                                            as="button"
                                                            value={address.id_dc}
                                                            onClick={
                                                                (e) => { e.preventDefault(); updateAddressDefaultAccount(e.target.value); }
                                                            }
                                                        >
                                                            Đặt Mặc Định
                                                        </Dropdown.Item>
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
                                                </>
                                                :
                                                <DropdownButton title="Quản Lý" size='sm' disabled />
                                        }
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

            {/* modalDeleteAddressAccountStatus */}
            <ModalNotification
                show={modalUpdateAddressDefaultAccountStatus}
                onHide={() => setModalUpdateAddressDefaultAccountStatus(false)}
                status={updateAddressDefaultStatus.updateAddressDefaultAccountStatus}
                title={
                    updateAddressDefaultStatus.updateAddressDefaultAccountStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={updateAddressDefaultStatus.updateAddressDefaultAccountMessage}
            />
        </div>
    )
}

export default UpdateAddressAccount
