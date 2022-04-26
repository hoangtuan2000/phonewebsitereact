import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';

import styles from './modalRegistrationStatusStyle.module.css'
import ModalLogin from '../modalLogin/ModalLogin'

function ModalRegistrationStatusNotification(props) {

    // variable of bootstrap modal login
    const [modalLoginShow, setModalLoginShow] = useState(false);

    // console.log(props.registrationStatus);
    const registrationStatus = props.registrationStatus

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="xs"
            >
                {
                    registrationStatus.registerStatus ?
                        <>
                            <Modal.Header bsPrefix={styles.modalTittleSuccess}>
                                <Modal.Title>Đăng Ký Thành Công</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modalContent} >
                                Bạn Đã Đăng Ký Tài Khoản Thành Công! Đăng Nhập Ngay
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    className='btn btn-primary text-white'
                                    onClick={() => {
                                        setModalLoginShow(true);
                                        props.onHide()
                                    }}
                                >
                                    Đăng Nhập
                                </Button>
                            </Modal.Footer>
                        </>
                        :
                        <>
                            <Modal.Header bsPrefix={styles.modalTittleFail}>
                                <Modal.Title>Đăng Ký Thất Bại</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modalContent} >{registrationStatus.registerMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button
                                    className='btn btn-sm btn-secondary w-25 text-white'
                                    onClick={() => {
                                        props.onHide()
                                    }}
                                >
                                    Thoát
                                </Button>
                            </Modal.Footer>
                        </>
                }

            </Modal>

            <ModalLogin
                show={modalLoginShow}
                onHide={() => setModalLoginShow(false)}
            />
        </>
    )
}

export default ModalRegistrationStatusNotification