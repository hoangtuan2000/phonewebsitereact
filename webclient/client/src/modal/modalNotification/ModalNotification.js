import { Button, Modal } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './modalNotificationStyle.module.css'

function ModalNotification(props) {
    console.log(props);
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="xs"
            >
                <Modal.Header bsPrefix={props.status ? styles.modalTittleSuccess : styles.modalTittleFail}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalContent + ' mt-0 py-0 '}>{props.message}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className='btn btn-sm btn-secondary text-white'
                        onClick={() => {
                            props.onHide()
                        }}
                    >
                        Thoát
                    </Button>
                    {
                        props.status && props.gotoPage ?
                            <>
                                <NavLink
                                    to={props.gotoPage}
                                    className='btn btn-sm btn-primary text-white'
                                >
                                    {props.namePage}
                                </NavLink>
                            </>
                            :
                            <></>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalNotification