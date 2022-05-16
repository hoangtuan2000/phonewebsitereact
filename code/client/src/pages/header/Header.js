import { useEffect, useState } from 'react'
import { Navbar, Container, Nav, InputGroup, FormControl, Button, Dropdown, OverlayTrigger, Tooltip, Modal, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeadphonesSimple, faMobile, faMobileScreenButton, faLock, faEnvelope, faRightToBracket, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { saveUserLogin } from '../../redux/userSlice'

import { URL } from '../../config/config'
import ModalLogin from '../../modal/modalLogin/ModalLogin'
import ButtonAccount from '../../components/buttonAccount/ButtonAccount'
import SearchProduct from '../../components/searchProduct/SearchProduct'

function Header() {

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin.infoUser)

    // variable of bootstrap modal
    const [modalLoginShow, setModalLoginShow] = useState(false);

    // check login when open web
    useEffect(() => {
        const url = URL + '/auth/getlogin'
        Axios.get(url)
            .then((response) => {
                console.log(response.data);
                if (Object.entries(response.data.user).length !== 0 && response.data.isLogin) {
                    // console.log('getLogin save');
                    dispatch(saveUserLogin(response.data.user))
                } else {
                    // console.log('getLogin delete');
                    dispatch(saveUserLogin({}))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <Navbar className='p-0 backgroundBlue' collapseOnSelect expand='lg' variant='dark'>
            <Container>

                <NavLink className="navbar-brand my-1" to='/'>
                    HT Shop
                </NavLink>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id='responsive-navbar-nav'>
                    {/* input search */}
                    <Nav className='me-auto'>
                        <SearchProduct />
                        {/* <InputGroup size='sm'>
                            <FormControl htmlSize='40' placeholder='Tìm Kiếm Sản Phẩm' />
                            <Button variant='primary' size='sm'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup> */}
                    </Nav>

                    {/* button menu */}
                    <Nav className='me-auto'>
                        <NavLink
                            to='smartphone'
                            className={({ isActive }) => 'me-2 nav-link' + (isActive ? " rounded" : "")}
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "White" : "",
                                    color: isActive ? 'black' : 'white'
                                };
                            }}
                        >
                            <FontAwesomeIcon icon={faMobileScreenButton} className='me-1' />
                            Điện Thoại
                        </NavLink>
                        <NavLink
                            to='headphone'
                            className={({ isActive }) => 'me-2 nav-link' + (isActive ? " rounded" : "")}
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "White" : "",
                                    color: isActive ? 'black' : 'white'
                                };
                            }}
                        >
                            <FontAwesomeIcon icon={faHeadphonesSimple} className='me-1' />
                            Tai Nghe
                        </NavLink>
                        <NavLink
                            to='phonecase'
                            className={({ isActive }) => 'me-2 nav-link' + (isActive ? " rounded" : "")}
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "White" : "",
                                    color: isActive ? 'black' : 'white'
                                };
                            }}
                        >
                            <FontAwesomeIcon icon={faMobile} className='me-1' />
                            Ốp Lưng
                        </NavLink>
                    </Nav>

                    {/* cart, account and login */}
                    <Nav>

                        {/* Object.entries => Returns an array containing all 
                of the [key, value] pairs of a given object's own enumerable string properties. */}
                        {
                            Object.entries(userLogin).length !== 0 && (
                                <>
                                    {/* cart */}
                                    < NavLink
                                        to='cart'
                                        className={({ isActive }) => 'me-1 nav-link rounded-circle' + (isActive ? " rounded" : "")}
                                        style={({ isActive }) => {
                                            return {
                                                backgroundColor: isActive ? "White" : "",
                                                color: isActive ? 'black' : 'white'
                                            };
                                        }}
                                    >
                                        <OverlayTrigger
                                            placement='bottom'
                                            overlay={
                                                <Tooltip>
                                                    Giỏ Hàng
                                                </Tooltip>
                                            }
                                        >
                                            <span>
                                                <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                            </span>
                                        </OverlayTrigger>
                                    </NavLink>

                                    {/* button account => logout and account */}
                                    <ButtonAccount />
                                </>
                            )
                        }

                        {
                            Object.entries(userLogin).length === 0 && (
                                <>
                                    {/* register */}
                                    <NavLink
                                        to='register'
                                        className='nav-link'
                                    >
                                        <FontAwesomeIcon icon={faUserPlus} className='me-1' />
                                        Đăng Ký
                                    </NavLink>

                                    {/* button login */}
                                    <span
                                        className='nav-link'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setModalLoginShow(true)}
                                    >
                                        <FontAwesomeIcon icon={faRightToBracket} className='me-1' />
                                        Đăng Nhập
                                    </span>

                                    {/* call tag modal login */}
                                    <ModalLogin
                                        show={modalLoginShow}
                                        onHide={() => setModalLoginShow(false)}
                                    />
                                </>
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header
