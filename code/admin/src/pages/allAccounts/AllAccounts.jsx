import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Tooltip, Zoom, IconButton } from '@mui/material';
import Axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";


import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { height } from '@mui/system';
import ShowAccountInfoDialog from '../../components/modal/ShowAccountInfoDialog';
import { Link, useNavigate } from 'react-router-dom';

const AllAccounts = () => {
  document.body.style.backgroundImage = `none`;
  document.body.style.backgroundColor = "white";

  const navigate = useNavigate()

  // show dialog show product detail
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [accounts, setAccounts] = useState([])
  const [accountInfo, setAccountInfo] = useState({});

  // get all accounts
  useEffect(() => {
    Axios.get(URL + '/accountsAdmin/getAllAccounts')
      .then((res) => {
        if (res.data.getAllAccountsStatus && res.data.getAllAccountsData.length > 0) {
          setAccounts(res.data.getAllAccountsData)

        } else if (res.data.getAllAccountsStatus && res.data.getAllAccountsData.length <= 0) {
          document.getElementById('showAllAccounts').innerHTML = '<h3>hiện tại chưa có tài khoản</h3>'

        } else if (!res.data.getAllAccountsStatus) {
          document.getElementById('showAllAccounts').innerHTML = `<h3>${res.data.getAllAccountsMessage}</h3>`

        }

      })
      .catch((err) => {
        console.log('/accountsAdmin/getAllAccounts', err);

      })
  }, [])

  // Axios get Basic Product Info => show dialog view product
  const getAccountInfo = (idAccount) => {
    Axios.post(URL + '/accountsAdmin/getAccountInfo', { idAccount: idAccount })
      .then((res) => {
        setAccountInfo(res.data)
        setOpen(true)
      })
      .catch((err) => {
        console.log('/accountsAdmin/getAccountInfo', err);
      })
  }

  // Table DataGrid MUI Colums
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
      field: 'staffName', headerName: 'Họ Tên', width: 220,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.staffName} followCursor>
              <span>{params.row.staffName}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'staffPhoneNumber', headerName: 'Điện Thoại', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.staffPhoneNumber} followCursor>
              <span>{params.row.staffPhoneNumber}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'staffEmail', headerName: 'Email', width: 250,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.staffEmail} followCursor>
              <span>{params.row.staffEmail}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'staffPosition', headerName: 'Chức Vụ', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.staffPosition} followCursor>
              <span>{params.row.staffPosition}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'staffStatus', headerName: 'Hoạt Động', width: 120,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.staffStatus} followCursor>
              <span>{params.row.staffStatus}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'tools',
      headerName: 'Công Cụ',
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title="Xem Tài Khoản" followCursor >
              <IconButton color="primary" onClick={() => getAccountInfo(params.row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="Cập Nhật" followCursor>
              <IconButton
                color="warning"
              >
                <UpgradeIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
  ];

  // Table DataGrid MUI Rows
  const rows = [];

  // Insert accounts into Rows Table DataGrid MUI
  accounts.map((account) => {
    let object = {}
    object.id = account.id_nv
    object.staffName = account.ten_nv
    object.staffPhoneNumber = account.sdt_nv
    object.staffEmail = account.email_nv
    object.staffPosition = account.ten_cv
    object.staffStatus = account.ten_tthd
    rows.push(object)
  })

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div id='showAllAccounts' style={{ height: 500, width: '100%', padding: '10px' }}>
            <div className='mb-2'>
              <h6 className='float-start'>Tất Cả Tài Khoản</h6>
              <Link to='/addAccount' className='float-end ms-1' style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small" style={{ fontSize: '12px' }}>
                  <PersonOutlineIcon fontSize='small' />
                  Thêm Tài Khoản
                </Button>
              </Link>
              <div className="clearfix"></div>
            </div>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={5}
              rowHeight={100}
              showColumnRightBorder={true}
            />
          </div>
        </div>
      </div>

      {/* call modal dialog show account information */}
      <ShowAccountInfoDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        accountInfo={accountInfo}
      />
    </>
  );
};

export default AllAccounts;
