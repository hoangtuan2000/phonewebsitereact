import { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { saveUserLoginAdmin } from '../../redux/userSlice'
import { useLocation, useNavigate } from 'react-router-dom';

import { URL } from '../../config/config'
import background from './background.jpg'

import "./login.scss"

const Login = () => {
  //change background page login
  document.body.style.backgroundImage = `url(${background})`;
  document.body.style.backgroundSize  = `cover`;
  document.body.style.backgroundRepeat   = `no-repeat`;
  
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
    const url = URL + '/authAdmin/loginAdmin'
    Axios.post(url, { email, password })
      .then(function (response) {
        //Object.entries => Returns an array containing all 
        //of the [key, value] pairs of a given object's own enumerable string properties.
        if (Object.entries(response.data.user).length !== 0 && response.data.isLogin === true) {
          dispatch(saveUserLoginAdmin(response.data.user))
          navigate('/home')

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
    <Container fluid>
      <Row>
        <Col>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Form className='formLogin p-5'>

                <p className='title'>ĐĂNG NHẬP</p>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor='inputEmail'>Email</Form.Label>
                  <Form.Control
                    id='inputEmail'
                    size="sm"
                    type="text"
                    placeholder="Nhập email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailFail('')
                      setPasswordFail('')
                      setOtherFail('')
                    }}
                  />
                  <Form.Text className="text-danger">{emailFail}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor='inputPassword'>Mật Khẩu</Form.Label>
                  <Form.Control
                    id='inputPassword'
                    size="sm"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setEmailFail('')
                      setPasswordFail('')
                      setOtherFail('')
                    }}
                  />
                  <Form.Text className="text-danger">
                    {passwordFail}
                  </Form.Text>
                  <Form.Text className="text-danger">
                    {otherFail}
                  </Form.Text>
                </Form.Group>

                <div className='text-center'>
                  <Button
                    className='btn btn-sm btn-primary w-50 buttonLogin'
                    onClick={() => login()}
                  >
                    Đăng Nhập
                  </Button>
                </div>

              </Form>
            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
