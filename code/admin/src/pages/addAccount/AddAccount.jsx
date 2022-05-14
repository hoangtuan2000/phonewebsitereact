import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Axios from 'axios'

import { URL } from '../../config/config'

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Form } from 'react-bootstrap';
import { validateEmail, validateFullname, validatePhoneNumber, validatePassword, validateSelect, validateAddress } from '../../functions/validateFormFunction';
import ModalNotification from '../../components/modal/modalNotification/ModalNotification';

const AddAccount = () => {
  document.body.style.backgroundImage = `none`;
  document.body.style.backgroundColor = "white";

  const [modalRegisterAdminStatus, setModalRegisterAdminStatus] = useState(false)

  // saved data from database 
  const [positions, setPositions] = useState([])
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [registerAdminStatus, setRegisterAdminStatus] = useState({})

  const [addAccountName, setAddAccountName] = useState('')
  const [addAccountPhone, setAddAccountPhone] = useState('')
  const [addAccountEmail, setAddAccountEmail] = useState('')
  const [addAccountPassword, setAddAccountPassword] = useState('')
  const [addAccountPosition, setAddAccountPosition] = useState('')
  const [addAccountAddress, setAddAccountAddress] = useState('')
  const [addAccountProvince, setAddAccountProvince] = useState('')
  const [addAccountDistrict, setAddAccountDistrict] = useState('')
  const [addAccountWard, setAddAccountWard] = useState('')

  // get info database
  useEffect(() => {
    // get all positions
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllPositions')
      .then((res) => {
        if (res.data.getAllPositionsStatus) {
          setPositions(res.data.getAllPositionsData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllPositions', err);
      })

    // get all provinces
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllProvinces')
      .then((res) => {
        if (res.data.getAllProvincesStatus) {
          setProvinces(res.data.getAllProvincesData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllProvinces', err);
      })
  }, [])

  // get district when click choose province
  const getDistrictsProvince = (e) => {
    const idProvince = e.target.value
    Axios.post(URL + '/getDatabaseRouterAdmin/getDistrictsProvince', { idProvince: idProvince })
      .then((res) => {
        // console.log(res.data);
        setDistricts(res.data)
        document.getElementById('AddAccountDistrict').removeAttribute('disabled')
        setWards([])
        document.getElementById('AddAccountWard').setAttribute('disabled', true)
        //reset state DistrictRegister empty
        // setDistrictRegister('')
        // setWardRegister('')
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getDistrictsProvince', err);
      })
  }

  // get ward when click choose district
  const getWardsDistrict = (e) => {
    const idDistrict = e.target.value
    Axios.post(URL + '/getDatabaseRouterAdmin/getWardsDistrict', { idDistrict: idDistrict })
      .then((res) => {
        // console.log(res.data);
        setWards(res.data)
        document.getElementById('AddAccountWard').removeAttribute('disabled')
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getWardsDistrict', err);
      })
  }

  const checkFullname = (fullname) => {
    setAddAccountName(fullname)
    return validateFullname(fullname, 'notificationAccountNameFail')
  }

  const checkPhoneNumber = (phone) => {
    setAddAccountPhone(phone)
    return validatePhoneNumber(phone, 'notificationAccountPhoneFail')
  }

  const checkEmail = (email) => {
    setAddAccountEmail(email)
    return validateEmail(email, 'notificationAccountEmailFail')
  }

  const checkPassword = (pass) => {
    setAddAccountPassword(pass)
    return validatePassword(pass, 'notificationAccountPasswordFail')
  }

  const checkPosition = (position) => {
    setAddAccountPosition(position)
    return validateSelect(position, 'AddAccountPosition')
  }

  const checkAddress = (address) => {
    setAddAccountAddress(address)
    return validateAddress(address, 'notificationAccountAddressFail')
  }

  const checkProvince = (province) => {
    setAddAccountProvince(province)
    return validateSelect(province, 'AddAccountProvince')
  }

  const checkDistrict = (district) => {
    setAddAccountDistrict(district)
    return validateSelect(district, 'AddAccountDistrict')
  }

  const checkWard = (ward) => {
    setAddAccountWard(ward)
    return validateSelect(ward, 'AddAccountWard')
  }

  const registerAdmin = () => {
    if (
      checkFullname(addAccountName) && checkPhoneNumber(addAccountPhone)
      && checkEmail(addAccountEmail) && checkPassword(addAccountPassword)
      && checkPosition(addAccountPosition) && checkAddress(addAccountAddress)
      && checkProvince(addAccountProvince) && checkDistrict(addAccountDistrict)
      && checkWard(addAccountWard)
    ) {
      Axios.post(URL + '/authAdmin/registerAdmin',
        {
          accountName: addAccountName,
          accountPhone: addAccountPhone,
          accountAddress: addAccountAddress,
          accountEmail: addAccountEmail,
          accountWard: addAccountWard,
          accountPassword: addAccountPassword,
          accountPosition: addAccountPosition,
        }
      )
        .then((res) => {
          setRegisterAdminStatus(res.data)
          setModalRegisterAdminStatus(true)
          if (res.data.registerAdminStatus) {
            setAddAccountName('')
            setAddAccountPhone('')
            setAddAccountEmail('')
            setAddAccountPassword('')
            setAddAccountPosition('')
            setAddAccountAddress('')
            setAddAccountProvince('')
            setAddAccountDistrict('')
            setAddAccountWard('')
          }
        })
        .catch((err) => {
          console.log('registerAdmin', err);
        })
    }
  }


  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />


          <Grid container spacing={0}>
            {/* <div className='bg-primary'> */}
            <Grid item xs={12}>
              <div className='p-2'>
                <h6>Thêm Tài Khoản</h6>
              </div>
            </Grid>
            <Grid item xs={12} className='m-1 bg-light rounded'>
              <Form className='pe-2 mt-3 mb-5 px-5'>
                <Grid container spacing={5}>

                  <Grid item xs={5}>
                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddAccountName'>Họ Tên: </Form.Label>
                      <Form.Control
                        id='AddAccountName'
                        type="text"
                        size="sm"
                        value={addAccountName}
                        autoFocus
                        onChange={(e) => checkFullname(e.target.value)}
                      />
                      <Form.Text id='notificationAccountNameFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddAccountPhone'>Số Điện Thoại: </Form.Label>
                      <Form.Control
                        id='AddAccountPhone'
                        type="text"
                        size="sm"
                        value={addAccountPhone}
                        onChange={(e) => checkPhoneNumber(e.target.value)}
                      />
                      <Form.Text id='notificationAccountPhoneFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddAccountEmail'>Email: </Form.Label>
                      <Form.Control
                        id='AddAccountEmail'
                        type="text"
                        size="sm"
                        value={addAccountEmail}
                        onChange={(e) => checkEmail(e.target.value)}
                      />
                      <Form.Text id='notificationAccountEmailFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddAccountPassword'>Mật Khẩu: </Form.Label>
                      <Form.Control
                        id='AddAccountPassword'
                        type="password"
                        size="sm"
                        value={addAccountPassword}
                        onChange={(e) => checkPassword(e.target.value)}
                      />
                      <Form.Text id='notificationAccountPasswordFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddAccountPosition">
                      Chức Vụ
                    </Form.Label>
                    <Form.Select
                      id="AddAccountPosition"
                      value={addAccountPosition}
                      className="mb-2"
                      size='sm'
                      onChange={(e) => {
                        checkPosition(e.target.value)
                      }}
                    >
                      <option value='' disabled></option>
                      {
                        positions.map((position) => {
                          return (
                            <option value={position.id_cv} key={position.id_cv}>{position.ten_cv}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>

                  <Grid item xs={5}>
                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddAccountAddress'>Địa Chỉ: </Form.Label>
                      <Form.Control
                        id='AddAccountAddress'
                        type="text"
                        size="sm"
                        value={addAccountAddress}
                        onChange={(e) => checkAddress(e.target.value)}
                      />
                      <Form.Text id='notificationAccountAddressFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddAccountProvince">
                      Tỉnh Thành Phố
                    </Form.Label>
                    <Form.Select
                      id="AddAccountProvince"
                      value={addAccountProvince}
                      className="mb-1"
                      size='sm'
                      onChange={(e) => {
                        getDistrictsProvince(e);
                        checkProvince(e.target.value)
                      }}
                    >
                      <option value='' disabled></option>
                      {
                        provinces.map((province) => {
                          return (
                            <option value={province.id_ttp} key={province.id_ttp}>{province.ten_ttp}</option>
                          )
                        })
                      }
                    </Form.Select>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddAccountDistrict">
                      Quận Huyện
                    </Form.Label>
                    <Form.Select
                      id="AddAccountDistrict"
                      value={addAccountDistrict}
                      className="mb-1"
                      size='sm'
                      disabled
                      onChange={(e) => {
                        getWardsDistrict(e);
                        checkDistrict(e.target.value)
                      }}
                    >
                      <option value='' disabled></option>
                      {
                        districts.map((district) => {
                          return (
                            <option value={district.id_qh} key={district.id_qh}>{district.ten_qh}</option>
                          )
                        })
                      }
                    </Form.Select>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddAccountWard">
                      Xã Phường
                    </Form.Label>
                    <Form.Select
                      id="AddAccountWard"
                      value={addAccountWard}
                      className="mb-1"
                      size='sm'
                      disabled
                      onChange={(e) => {
                        checkWard(e.target.value)
                      }
                      }
                    >
                      <option value='' disabled></option>
                      {
                        wards.map((ward) => {
                          return (
                            <option value={ward.id_xp} key={ward.id_xp}>{ward.ten_xp}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>

                  <Grid item xs={12}>
                    <div className='text-center'>
                      <Button
                        variant="contained"
                        className='mt-3 w-50'
                        onClick={registerAdmin}
                      >
                        Thêm Tài Khoản
                      </Button>
                    </div>
                  </Grid>

                </Grid>
              </Form>
            </Grid>
            {/* </div> */}
          </Grid>

          {/* call modal Add Product Status */}
          <ModalNotification
            show={modalRegisterAdminStatus}
            onHide={() => setModalRegisterAdminStatus(false)}
            status={registerAdminStatus.registerAdminStatus}
            title={registerAdminStatus.registerAdminStatus ? 'Thành Công' : 'Thất Bại'}
            message={registerAdminStatus.registerAdminMessage}
          />

        </div>
      </div >
    </>
  );
};

export default AddAccount;
