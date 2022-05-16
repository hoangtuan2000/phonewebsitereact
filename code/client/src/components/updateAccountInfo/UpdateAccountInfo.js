import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Axios from 'axios'

import { URL } from '../../config/config'
import { validateUserEmail, validateUserFullname, validateUserPhoneNumber  } from "../../functions/validateFormFunction"
import ModalNotification from '../../modal/modalNotification/ModalNotification'

function UpdateAccountInfo() {
    const [modalUpdateAccountStatus, setModalUpdateAccountStatus] = useState(false);

    const [updateAccountStatus, setUpdateAccountStatus] = useState({})

    const [accountName, setAccountName] = useState('')
    const [accountPhone, setAccountPhone] = useState('')
    const [accountEmail, setAccountEmail] = useState('')

    useEffect(() => {
        // get account basic info
        Axios.post(URL + '/account/getAccountInfo')
            .then((res) => {
                if (res.data.getAccountInfoStatus) {
                    setAccountName(res.data.getAccountInfoData.ten_kh)
                    setAccountPhone(res.data.getAccountInfoData.sdt_kh)
                    setAccountEmail(res.data.getAccountInfoData.email_kh)
                }
            })
            .catch((err) => {
                console.log('AccountInfomation => /account/getAccountInfo', err);
            })
    }, [])

    const checkFullname = (fullname) => {
        setAccountName(fullname)
        return validateUserFullname(fullname, 'noptificationUpdateAccountFullnameFail')
    }

    const checkEmail = (email) => {
        setAccountEmail(email);
        return validateUserEmail(email, 'noptificationUpdateAccountEmailFail')
    }

    const checkPhoneNumber = (phoneNumber) => {
        setAccountPhone(phoneNumber);
        return validateUserPhoneNumber(phoneNumber, 'noptificationUpdateAccountPhoneFail')
    }

    // update account info
    const updateAccountInfo = () => {
        if (
            checkFullname(accountName) && checkEmail(accountEmail)
            && checkPhoneNumber(accountPhone)
        ) {
            Axios.post(URL + '/account/updateAccountInfo', {
                accountName: accountName,
                accountPhone: accountPhone,
                accountEmail: accountEmail
            })
                .then((res) => {
                    setUpdateAccountStatus(res.data);
                    setModalUpdateAccountStatus(true)
                })
                .catch((err) => {
                    console.log('updateAccountInfo', err)
                })
        }
    }

    return (
        <div
            className="p-3 bg-white"
            style={{
                boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.27)',
                borderRadius: '2%',
                height: '300px'
            }}
        >
            <div className="text-center">
                <h6>Cập Nhật Thông Tin Cơ Bản</h6>
            </div>
            <Form>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="updateAccountFullname" style={{ fontSize: '14px' }}>Họ Tên:</Form.Label>
                    <Form.Control
                        id="updateAccountFullname"
                        type="text"
                        size='sm'
                        style={{ fontSize: '13px' }}
                        value={accountName}
                        onChange={(e) => checkFullname(e.target.value)}
                    />
                    <Form.Text id="noptificationUpdateAccountFullnameFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="updateAccountPhone" style={{ fontSize: '14px' }}>Điện Thoại:</Form.Label>
                    <Form.Control
                        id="updateAccountPhone"
                        type="text"
                        size='sm'
                        style={{ fontSize: '13px' }}
                        value={accountPhone}
                        onChange={(e) => checkPhoneNumber(e.target.value)}
                    />
                    <Form.Text id="noptificationUpdateAccountPhoneFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="updateAccountEmail" style={{ fontSize: '14px' }}>Email:</Form.Label>
                    <Form.Control
                        id="updateAccountEmail"
                        type="text"
                        size='sm'
                        style={{ fontSize: '13px' }}
                        value={accountEmail}
                        onChange={(e) => checkEmail(e.target.value)}
                    />
                    <Form.Text id="noptificationUpdateAccountEmailFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                </Form.Group>

                <div className="text-center mt-3">
                    <Button
                        variant="warning"
                        type="button"
                        className="btn btn-sm w-50"
                        onClick={updateAccountInfo}
                    >
                        Cập Nhật Thông Tin
                    </Button>
                </div>

            </Form>

            {/* modalUpdateAccountStatus */}
            <ModalNotification
                show={modalUpdateAccountStatus}
                onHide={() => setModalUpdateAccountStatus(false)}
                status={updateAccountStatus.updateAccountInfoStatus}
                title={
                    updateAccountStatus.updateAccountInfoStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={updateAccountStatus.updateAccountInfoMessage}
            />
        </div>
    )
}

export default UpdateAccountInfo