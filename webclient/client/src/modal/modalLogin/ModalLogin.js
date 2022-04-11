import { Button, Modal, InputGroup, FormControl, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { saveUserLogin } from '../../redux/userSlice'

import { URL } from '../../config/config'

import styles from './modalLoginStyle.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

// const ModalLogin = (show, onHide, handleGetUserLogin) => {
function ModalLogin(props) {

    const currentPage = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // input value email, password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // save message when login fail
    const [emailFail, setEmailFail] = useState('')
    const [passwordFail, setPasswordFail] = useState('')
    const [otherFail, setOtherFail] = useState('')

    const login = () => {
        const url = URL + '/auth/login'
        Axios.post(url, { email, password })
            .then(function (response) {
                //Object.entries => Returns an array containing all 
                //of the [key, value] pairs of a given object's own enumerable string properties.
                if (Object.entries(response.data.user).length !== 0 && response.data.isLogin === true) {
                    dispatch(saveUserLogin(response.data.user))
                    if(currentPage.pathname === '/register'){
                        navigate('/')
                    }
                } else {
                    if (response.data.message.emailFail) {
                        setEmailFail(response.data.message.emailFail)
                        document.getElementById('inputEmail').focus()

                    } else if (response.data.message.passwordFail) {
                        setPasswordFail(response.data.message.passwordFail)
                        document.getElementById('inputPassword').focus()

                    } else if (response.data.message.otherFail) {
                        setOtherFail(response.data.message.otherFail)
                        document.getElementById('inputPassword').focus()
                    } else {
                        //Dự phòng axios trả về user object rỗng do 
                        //lỗi bên server nên không vào được điều kiện if đầu tiên 
                        setOtherFail('Có Lỗi Bên Phía Server')
                    }
                }
            })
            .catch(function (error) {
                setOtherFail('Có Lỗi Khi Gửi Yêu Cầu')
                console.log(error);
            })
    }


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="xs"
            centered
        >
            <Modal.Header bsPrefix={styles.modalTittle}>
                <Modal.Title>
                    Đăng Nhập
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup size="sm">
                    <InputGroup.Text className={styles.inputIcon}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <FormControl
                        id='inputEmail'
                        placeholder='Email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailFail('')
                            setPasswordFail('')
                            setOtherFail('')
                        }}
                    />
                </InputGroup>
                <Form.Text className="text-danger">
                    {emailFail}
                </Form.Text>

                <InputGroup size="sm" className="mt-3">
                    <InputGroup.Text className={styles.inputIcon}>
                        <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                    <FormControl
                        id='inputPassword'
                        placeholder='Password'
                        type='password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setEmailFail('')
                            setPasswordFail('')
                            setOtherFail('')
                        }}
                    />
                </InputGroup>
                <Form.Text className="text-danger">
                    {passwordFail}
                </Form.Text>
                <Form.Text className="text-danger">
                    {otherFail}
                </Form.Text>

                <div className='text-center mt-3'>
                    <Button
                        className='w-25'
                        size="sm"
                        onClick={() => login()}
                    >
                        Đăng Nhập
                    </Button>
                </div>
            </Modal.Body>

            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default ModalLogin