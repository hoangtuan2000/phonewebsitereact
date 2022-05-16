import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { deleteUserLogin } from '../../redux/userSlice';

import { URL } from '../../config/config'
import { validateUserPassword } from "../../functions/validateFormFunction"
import ModalNotification from '../../modal/modalNotification/ModalNotification'

function UpdateAccountPassword() {

    const dispatch = useDispatch()

    const [modalUpdatePasswordStatus, setModalUpdatePasswordStatus] = useState(false);

    const [updatePasswordStatus, setUpdatePasswordStatus] = useState({})

    const [accountPasswordOld, setAccountPasswordOld] = useState('')
    const [accountPasswordNew, setAccountPasswordNew] = useState('')

    const logout = () => {
        Axios.post(URL + '/auth/logout')
            .then(function (response) {
                dispatch(deleteUserLogin())
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const checkPassword = (password) => {
        setAccountPasswordNew(password);
        return validateUserPassword(password, 'noptificationUpdateAccountPasswordNewFail')
    }

    // update account password
    const updateAccountPassword = () => {
        if (
            checkPassword(accountPasswordNew)
        ) {
            Axios.post(URL + '/account/updateAccountPassword', {
                accountPasswordOld: accountPasswordOld,
                accountPasswordNew: accountPasswordNew
            })
                .then((res) => {
                    setUpdatePasswordStatus(res.data);
                    setModalUpdatePasswordStatus(true)
                })
                .catch((err) => {
                    console.log('updateAccountPassword', err)
                })
        }
    }

    return (
        <div
            className="p-3"
            style={{
                backgroundColor: 'rgb(235 235 235)',
                boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.27)',
                borderRadius: '2%',
                height: '300px'
            }}
        >
            <div className="text-center">
                <h6>Cập Nhật Mật Khẩu</h6>
            </div>
            <Form>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="updateAccountPasswordOld" style={{ fontSize: '14px' }}>Nhập Mật Khẩu Cũ:</Form.Label>
                    <Form.Control
                        id="updateAccountPasswordOld"
                        type="text"
                        size='sm'
                        style={{ fontSize: '13px' }}
                        onChange={(e) => setAccountPasswordOld(e.target.value)}
                    />
                    <Form.Text id="noptificationUpdateAccountPasswordOldFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label htmlFor="updateAccountPasswordNew" style={{ fontSize: '14px' }}>Nhập Mật Khẩu Mới:</Form.Label>
                    <Form.Control
                        id="updateAccountPasswordNew"
                        type="text"
                        size='sm'
                        style={{ fontSize: '13px' }}
                        value={accountPasswordNew}
                        onChange={(e) => checkPassword(e.target.value)}
                    />
                    <Form.Text id="noptificationUpdateAccountPasswordNewFail" className="text-danger" style={{ fontSize: '12px' }}></Form.Text>
                </Form.Group>

                <div className="text-center mt-3">
                    <Button
                        variant="warning"
                        type="button"
                        className="btn btn-sm w-50"
                        onClick={updateAccountPassword}
                    >
                        Thay Đổi Mật Khẩu
                    </Button>
                </div>

            </Form>

            {/* modalUpdatePasswordStatus */}
            <ModalNotification
                show={modalUpdatePasswordStatus}
                onHide={() => setModalUpdatePasswordStatus(false)}
                status={updatePasswordStatus.updateAccountPasswordStatus}
                title={
                    updatePasswordStatus.updateAccountPasswordStatus ?
                        'Thành Công' : 'Thất Bại'
                }
                message={updatePasswordStatus.updateAccountPasswordMessage}
            />

        </div>
    )
}

export default UpdateAccountPassword