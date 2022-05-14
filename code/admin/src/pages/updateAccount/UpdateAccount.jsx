import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Axios from 'axios'

import { URL } from '../../config/config'

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Form } from 'react-bootstrap';
import { validateEmail, validateFullname, validatePhoneNumber, validatePassword, validateSelect, validateAddress } from '../../functions/validateFormFunction';
import ModalNotification from '../../components/modal/modalNotification/ModalNotification';
import { useParams } from 'react-router-dom';

const UpdateAccount = () => {
  document.body.style.backgroundImage = `none`;
  document.body.style.backgroundColor = "white";

  let params = useParams()

  const [modalUpdateAccountAdminStatus, setModalUpdateAccountAdminStatus] = useState(false)

  // saved data from database 
  const [positions, setPositions] = useState([])
  const [activeStatus, setActiveStatus] = useState([])
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [updateAccountAdminStatus, setUpdateAccountAdminStatus] = useState({})


  const [updateAccountName, setUpdateAccountName] = useState('')
  const [updateAccountPhone, setUpdateAccountPhone] = useState('')
  const [updateAccountEmail, setUpdateAccountEmail] = useState('')
  const [updateAccountPassword, setUpdateAccountPassword] = useState('')
  const [updateAccountPosition, setUpdateAccountPosition] = useState('')
  const [updateAccountAddress, setUpdateAccountAddress] = useState('')
  const [updateAccountProvince, setUpdateAccountProvince] = useState('')
  const [updateAccountDistrict, setUpdateAccountDistrict] = useState('')
  const [updateAccountWard, setUpdateAccountWard] = useState('')
  const [updateAccountActiveStatus, setUpdateAccountActiveStatus] = useState('')

  // get info database
  useEffect(() => {
    // get info account
    Axios.post(URL + '/accountsAdmin/getAccountInfo', { idAccount: params.idAccount })
      .then((res) => {
        if (res.data.getAccountInfoStatus) {
          let data = res.data.getAccountInfoData
          setUpdateAccountName(data.ten_nv)
          setUpdateAccountPhone(data.sdt_nv)
          setUpdateAccountEmail(data.email_nv)
          setUpdateAccountPosition(data.id_cv)
          setUpdateAccountAddress(data.dia_chi_nv)
          setUpdateAccountProvince(data.id_ttp)
          setUpdateAccountDistrict(data.id_qh)
          setUpdateAccountWard(data.id_xp)
          setUpdateAccountActiveStatus(data.id_tthd)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /accountsAdmin/getAccountInfo', err);
      })
      
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

    // get all active status
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllActiveStatus')
      .then((res) => {
        if (res.data.getAllActiveStatusStatus) {
          setActiveStatus(res.data.getAllActiveStatusData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllActiveStatus', err);
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

    // get all districts
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllDistricts')
      .then((res) => {
        if (res.data.getAllDistrictsStatus) {
          setDistricts(res.data.getAllDistrictsData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllDistricts', err);
      })

    // get all wards
    Axios.get(URL + '/getDatabaseRouterAdmin/getAllWards')
      .then((res) => {
        if (res.data.getAllWardsStatus) {
          setWards(res.data.getAllWardsData)
        }
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getAllWards', err);
      })

    
  }, [])

  // get district when click choose province
  const getDistrictsProvince = (e) => {
    const idProvince = e.target.value
    Axios.post(URL + '/getDatabaseRouterAdmin/getDistrictsProvince', { idProvince: idProvince })
      .then((res) => {
        // console.log(res.data);
        setDistricts(res.data)
        document.getElementById('UpdateAccountDistrict').removeAttribute('disabled')
        setWards([])
        document.getElementById('UpdateAccountWard').setAttribute('disabled', true)
        //reset state DistrictUpdateAccount empty
        setUpdateAccountDistrict('')
        setUpdateAccountWard('')
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
        document.getElementById('UpdateAccountWard').removeAttribute('disabled')
      })
      .catch((err) => {
        console.log('AddAccount => /getDatabaseRouterAdmin/getWardsDistrict', err);
      })
  }

  const checkFullname = (fullname) => {
    setUpdateAccountName(fullname)
    return validateFullname(fullname, 'notificationAccountNameFail')
  }

  const checkPhoneNumber = (phone) => {
    setUpdateAccountPhone(phone)
    return validatePhoneNumber(phone, 'notificationAccountPhoneFail')
  }

  const checkEmail = (email) => {
    setUpdateAccountEmail(email)
    return validateEmail(email, 'notificationAccountEmailFail')
  }

  const checkPassword = (pass) => {
    setUpdateAccountPassword(pass)
    return validatePassword(pass, 'notificationAccountPasswordFail')
  }

  const checkPosition = (position) => {
    setUpdateAccountPosition(position)
    return validateSelect(position, 'UpdateAccountPosition')
  }

  const checkAddress = (address) => {
    setUpdateAccountAddress(address)
    return validateAddress(address, 'notificationAccountAddressFail')
  }

  const checkProvince = (province) => {
    setUpdateAccountProvince(province)
    return validateSelect(province, 'UpdateAccountProvince')
  }

  const checkDistrict = (district) => {
    setUpdateAccountDistrict(district)
    return validateSelect(district, 'UpdateAccountDistrict')
  }

  const checkWard = (ward) => {
    setUpdateAccountWard(ward)
    return validateSelect(ward, 'UpdateAccountWard')
  }

  const checkActiveStatus = (activeStatus) => {
    setUpdateAccountActiveStatus(activeStatus)
    return validateSelect(activeStatus, 'UpdateAccountActiveStatus')
  }

  const updateAccountAdmin = () => {
    // nếu đổi mật khẩu
    if (updateAccountPassword.length > 0) {
      if (
        checkFullname(updateAccountName) && checkPhoneNumber(updateAccountPhone)
        && checkEmail(updateAccountEmail) && checkPassword(updateAccountPassword)
        && checkPosition(updateAccountPosition) && checkAddress(updateAccountAddress)
        && checkProvince(updateAccountProvince) && checkDistrict(updateAccountDistrict)
        && checkWard(updateAccountWard)
      ) {
        console.log('1');
        Axios.post(URL + '/authAdmin/updateAccountAdmin',
          {
            idAccount: params.idAccount,
            accountName: updateAccountName,
            accountPhone: updateAccountPhone,
            accountAddress: updateAccountAddress,
            accountEmail: updateAccountEmail,
            accountWard: updateAccountWard,
            accountPassword: updateAccountPassword,
            accountPosition: updateAccountPosition,
            accountActiveStatus: updateAccountActiveStatus,
          }
        )
          .then((res) => {
            setUpdateAccountAdminStatus(res.data)
            setModalUpdateAccountAdminStatus(true)
            if (res.data.updateAccountAdminStatus) {
              setUpdateAccountPassword('')
            }
          })
          .catch((err) => {
            console.log('updateAccountAdmin', err);
          })
      }

    } else {
      if (
        checkFullname(updateAccountName) && checkPhoneNumber(updateAccountPhone)
        && checkEmail(updateAccountEmail)
        && checkPosition(updateAccountPosition) && checkAddress(updateAccountAddress)
        && checkProvince(updateAccountProvince) && checkDistrict(updateAccountDistrict)
        && checkWard(updateAccountWard)
      ) {
        console.log('2');
        Axios.post(URL + '/authAdmin/updateAccountAdmin',
          {
            idAccount: params.idAccount,
            accountName: updateAccountName,
            accountPhone: updateAccountPhone,
            accountAddress: updateAccountAddress,
            accountEmail: updateAccountEmail,
            accountWard: updateAccountWard,
            accountPassword: updateAccountPassword,
            accountPosition: updateAccountPosition,
            accountActiveStatus: updateAccountActiveStatus,
          }
        )
          .then((res) => {
            console.log(res.data);
            setUpdateAccountAdminStatus(res.data)
            setModalUpdateAccountAdminStatus(true)
          })
          .catch((err) => {
            console.log('updateAccountAdmin', err);
          })
      }
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
                <h6>Cập Nhật Tài Khoản</h6>
              </div>
            </Grid>
            <Grid item xs={12} className='m-1 bg-light rounded'>
              <Form className='pe-2 mt-3 mb-5 px-5'>
                <Grid container spacing={5}>

                  <Grid item xs={5}>
                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateAccountName'>Họ Tên: </Form.Label>
                      <Form.Control
                        id='UpdateAccountName'
                        type="text"
                        size="sm"
                        value={updateAccountName}
                        autoFocus
                        onChange={(e) => checkFullname(e.target.value)}
                      />
                      <Form.Text id='notificationAccountNameFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateAccountPhone'>Số Điện Thoại: </Form.Label>
                      <Form.Control
                        id='UpdateAccountPhone'
                        type="text"
                        size="sm"
                        value={updateAccountPhone}
                        onChange={(e) => checkPhoneNumber(e.target.value)}
                      />
                      <Form.Text id='notificationAccountPhoneFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateAccountEmail'>Email: </Form.Label>
                      <Form.Control
                        id='UpdateAccountEmail'
                        type="text"
                        size="sm"
                        value={updateAccountEmail}
                        onChange={(e) => checkEmail(e.target.value)}
                      />
                      <Form.Text id='notificationAccountEmailFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateAccountPassword'>Mật Khẩu: </Form.Label>
                      <Form.Control
                        id='UpdateAccountPassword'
                        type="password"
                        size="sm"
                        value={updateAccountPassword}
                        onChange={(e) => checkPassword(e.target.value)}
                      />
                      <Form.Text id='notificationAccountPasswordFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateAccountPosition">
                      Chức Vụ
                    </Form.Label>
                    <Form.Select
                      id="UpdateAccountPosition"
                      value={updateAccountPosition}
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
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateAccountAddress'>Địa Chỉ: </Form.Label>
                      <Form.Control
                        id='UpdateAccountAddress'
                        type="text"
                        size="sm"
                        value={updateAccountAddress}
                        onChange={(e) => checkAddress(e.target.value)}
                      />
                      <Form.Text id='notificationAccountAddressFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateAccountProvince">
                      Tỉnh Thành Phố
                    </Form.Label>
                    <Form.Select
                      id="UpdateAccountProvince"
                      value={updateAccountProvince}
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

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateAccountDistrict">
                      Quận Huyện
                    </Form.Label>
                    <Form.Select
                      id="UpdateAccountDistrict"
                      value={updateAccountDistrict}
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

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateAccountWard">
                      Xã Phường
                    </Form.Label>
                    <Form.Select
                      id="UpdateAccountWard"
                      value={updateAccountWard}
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

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateAccountActiveStatus">
                      Trạng Thái Hoạt Động
                    </Form.Label>
                    <Form.Select
                      id="UpdateAccountActiveStatus"
                      value={updateAccountActiveStatus}
                      className="mb-1"
                      size='sm'
                      onChange={(e) => {
                        checkActiveStatus(e.target.value)
                      }
                      }
                    >
                      <option value='' disabled></option>
                      {
                        activeStatus.map((val) => {
                          return (
                            <option value={val.id_tthd} key={val.id_tthd}>{val.ten_tthd}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>

                  <Grid item xs={12}>
                    <div className='text-center'>
                      <Button
                        variant="contained"
                        className='mt-3 w-50 bg-warning'
                        onClick={updateAccountAdmin}
                      >
                        Cập Nhật Tài Khoản
                      </Button>
                    </div>
                  </Grid>

                </Grid>
              </Form>
            </Grid>
            {/* </div> */}
          </Grid>

          {/* call modal update Product Status */}
          <ModalNotification
            show={modalUpdateAccountAdminStatus}
            onHide={() => setModalUpdateAccountAdminStatus(false)}
            status={updateAccountAdminStatus.updateAccountAdminStatus}
            title={updateAccountAdminStatus.updateAccountAdminStatus ? 'Thành Công' : 'Thất Bại'}
            message={updateAccountAdminStatus.updateAccountAdminMessage}
          />

        </div>
      </div >
    </>
  );
};

export default UpdateAccount;
