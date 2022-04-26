import { useEffect, useState } from 'react'
import { Button, Dropdown, Image } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUserLogin, saveUserLogin } from '../../redux/userSlice';

import styles from './buttonAccountStyle.module.css';

function ButtonAccount(props) {

    const dispatch = useDispatch()

    const logout = () => {
        const URL = 'http://localhost:3001/auth/logout'
        Axios.post(URL)
            .then(function (response) {
                // props.deleteInfoUser()
                dispatch(deleteUserLogin())
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle bsPrefix={styles.btnAccount}>
                <Image
                    src={require('../../asset/imagePublic/imageFace.jpg')}
                    roundedCircle
                    style={{
                        width: '30px',
                        height: '30px',
                        objectFit: 'cover'
                    }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
                <Dropdown.Item as={NavLink} to='account'>
                    Tài Khoản
                </Dropdown.Item>
                <Dropdown.Item
                    as={Button}
                    onClick={() => logout()}
                >
                    Đăng Xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ButtonAccount