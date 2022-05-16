import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Axios from 'axios'

import { URL } from '../../config/config'
import { validateUserAddress, validateUserDistrict, validateUserProvince, validateUserWard } from "../../functions/validateFormFunction"
import ModalNotification from '../../modal/modalNotification/ModalNotification'
import UpdateAddressAccount from "./UpdateAddressAccount"

function AddressAccount() {

    const [modalAddAddressAccountStatus, setModalAddAddressAccountStatus] = useState(false);

    const [addAddressStatus, setAddAddressStatus] = useState({})

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [accountProvinceAdd, setAccountProvinceAdd] = useState('')
    const [accountDistrictAdd, setAccountDistrictAdd] = useState('')
    const [accountWardAdd, setAccountWardAdd] = useState('')
    const [accountAddressAdd, setAccountAddressAdd] = useState('')

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
                document.getElementById('accountDistrictAdd').removeAttribute('disabled')
                setWards([])
                document.getElementById('accountWardAdd').setAttribute('disabled', true)
                //reset state accountDistrictAdd, accountWardAdd empty
                setAccountDistrictAdd('')
                setAccountWardAdd('')
            })
            .catch((err) => {
                console.log('setDistricts', err);
            })
    }

    const getWardsDistrict = (e) => {
        const idDistrict = e.target.value
        Axios.post(URL + '/address/getWardsDistrict', { idDistrict: idDistrict })
            .then((res) => {
                setWards(res.data)
                document.getElementById('accountWardAdd').removeAttribute('disabled')
            })
            .catch((err) => {
                console.log('setDistricts', err);
            })
    }

    // ================= check address add
    const checkProvinceAdd = (province) => {
        setAccountProvinceAdd(province);
        return validateUserProvince(province, 'accountProvinceAdd')
    }

    const checkDistrictAdd = (district) => {
        setAccountDistrictAdd(district);
        return validateUserDistrict(district, 'accountDistrictAdd')
    }

    const checkWardAdd = (ward) => {
        setAccountWardAdd(ward);
        return validateUserWard(ward, 'accountWardAdd')
    }

    const checkAddressAdd = (address) => {
        setAccountAddressAdd(address);
        return validateUserAddress(address, 'noptificationAccountAddressAddFail')
    }

    //add address account
    const addAddressAccount = () => {
        if (checkAddressAdd(accountAddressAdd) && checkProvinceAdd(accountProvinceAdd) && checkDistrictAdd(accountDistrictAdd) && checkWardAdd(accountWardAdd)) {
            Axios.post(URL + '/account/addAddressAccount', {
                accountAddressAdd: accountAddressAdd,
                accountWardAdd: accountWardAdd
            })
                .then((res) => {
                    setAddAddressStatus(res.data)
                    setModalAddAddressAccountStatus(true)
                })
                .catch((err) => {
                    console.log('addAddressAccount', err);
                })
        }
    }

    return (
        <div>
            {/* add address acount */}
            <div
                className="py-3 px-1 mb-4 bg-white"
                style={{
                    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.27)',
                    borderRadius: '10px'
                }}
            >
                <div>
                    <div className="text-center">
                        <h6>Thêm Địa Chỉ</h6>
                    </div>
                    <Form className='d-flex justify-content-center'>

                        <div className="mb-1 me-3 float-start w-25">
                            <Form.Group>
                                <Form.Label htmlFor="accountAddressAdd" style={{ fontSize: '14px' }}>Nhập Địa Chỉ:</Form.Label>
                                <Form.Control
                                    id="accountAddressAdd"
                                    type="text"
                                    size='sm'
                                    style={{ fontSize: '14px' }}
                                    onChange={(e) => checkAddressAdd(e.target.value)}
                                />
                                <Form.Text id="noptificationAccountAddressAddFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                            </Form.Group>
                        </div>

                        <div className="mb-1 me-3 float-start">
                            <Form.Label htmlFor="accountProvinceAdd">
                                Tỉnh Thành Phố
                            </Form.Label>
                            <Form.Select
                                id="accountProvinceAdd"
                                value={accountProvinceAdd}
                                className="mb-2"
                                size="sm"
                                style={{ width: '180px' }}
                                onChange={(e) => {
                                    getDistrictsProvince(e);
                                    checkProvinceAdd(e.target.value)
                                }}
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
                        </div>

                        <div className="mb-1 me-3 float-start">
                            <Form.Label htmlFor="accountDistrictAdd">
                                Quận Huyện
                            </Form.Label>
                            <Form.Select
                                id="accountDistrictAdd"
                                value={accountDistrictAdd}
                                className="mb-2"
                                size="sm"
                                style={{ width: '180px' }}
                                disabled
                                onChange={(e) => {
                                    getWardsDistrict(e);
                                    checkDistrictAdd(e.target.value)
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
                        </div>

                        <div className="mb-1 me-3 float-start">
                            <Form.Label htmlFor="accountWardAdd">
                                Xã Phường
                            </Form.Label>
                            <Form.Select
                                id="accountWardAdd"
                                value={accountWardAdd}
                                className="mb-2"
                                style={{ width: '180px' }}
                                size="sm"
                                disabled
                                onChange={(e) => checkWardAdd(e.target.value)}
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
                        </div>

                        <div className="text-center mt-3 mb-1 me-3 pt-3 float-start">
                            <Button
                                variant="success"
                                type="button"
                                className="btn btn-sm"
                                onClick={addAddressAccount}
                            >
                                Thêm Địa Chỉ
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>

            <UpdateAddressAccount reRenderAllAddressAccount={addAddressStatus} />            

            {/* modalUpdateAccountStatus */}
            <ModalNotification
                show={modalAddAddressAccountStatus}
                onHide={() => setModalAddAddressAccountStatus(false)}
                status={addAddressStatus.addAddressAccountStatus}
                title={
                    addAddressStatus.addAddressAccountStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={addAddressStatus.addAddressAccountMessage}
            />
        </div>
    )
}

export default AddressAccount