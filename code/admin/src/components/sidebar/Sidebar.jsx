import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Link, NavLink } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserLoginAdmin } from "../../redux/userSlice";
import Axios from "axios";


const Sidebar = () => {
  // const { dispatch2 } = useContext(DarkModeContext);
  const dispatch = useDispatch()
  const userLoginAdmin = useSelector((state) => state.userLoginAdmin.infoUserAdmin)

  const logoutAdmin = () => {
    const URL = 'http://localhost:3001/authAdmin/logoutAdmin'
    Axios.post(URL)
      .then(function (response) {
        // props.deleteInfoUser()
        dispatch(deleteUserLoginAdmin())
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">HT Shop</span>
        </Link>
      </div>
      <hr />
      <div className="center mb-5">
        <ul>

          <p className="title">THỐNG KÊ</p>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/basicAnalysis'
            >
              <AnalyticsIcon className="icon" />
              <span>Thống Kê Cơ Bản</span>
            </NavLink>
          </li>

          {/* Sản phẩm */}
          <p className="title">SẢN PHẨM</p>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/allProducts'
            >
              <BorderAllIcon className="icon" />
              <span>Tất Cả Sản Phẩm</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/smartphones'
            >
              <PhoneIphoneIcon className="icon" />
              <span>Điện Thoại</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/headphones'
            >
              <HeadphonesIcon className="icon" />
              <span>Tai Nghe</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/phonecases'
            >
              <SmartphoneIcon className="icon" />
              <span>Ốp Lưng</span>
            </NavLink>
          </li>

          <p className="title">ĐƠN HÀNG</p>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/allOrders'
            >
              <FactCheckIcon className="icon" />
              <span>Tất Cả Đơn Hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/ordersUnprocessed'
            >
              <BrowserNotSupportedIcon className="icon" />
              <span>Chưa Xử Lý</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/ordersProcessed'
            >
              <NoteAltIcon className="icon" />
              <span>Đã Xử Lý</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/ordersTransported'
            >
              <LocalShippingIcon className="icon" />
              <span>Đang Vận Chuyển</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/ordersDelivery'
            >
              <CardGiftcardIcon className="icon" />
              <span>Đang Giao Hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to='/ordersSuccessDelivery'
            >
              <AssignmentTurnedInIcon className="icon" />
              <span>Giao Hàng Thành Công</span>
            </NavLink>
          </li>

          {/* Tài Khoản */}

          <p className="title">TÀI KHOẢN</p>
          {
            userLoginAdmin.id_cv == 'AD' || userLoginAdmin.id_cv == 'QT' ?
              <>
                {
                  userLoginAdmin.id_cv == 'AD' ?
                    <>
                      <li>
                        <NavLink
                          style={({ isActive }) => {
                            return {
                              width: '100%',
                              borderRadius: '5px',
                              padding: '2px',
                              textDecoration: 'none',
                              backgroundColor: isActive ? "#d4e6f9" : "",
                            };
                          }}
                          to='/allAccounts'
                        >
                          <PersonOutlineIcon className="icon" />
                          <span>Tất Cả Tài Khoản</span>
                        </NavLink>
                      </li>
                    </>
                    : <></>
                }

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        width: '100%',
                        borderRadius: '5px',
                        padding: '2px',
                        textDecoration: 'none',
                        backgroundColor: isActive ? "#d4e6f9" : "",
                      };
                    }}
                    to='/allManagementAccounts'
                  >
                    <PersonOutlineIcon className="icon" />
                    <span>Quản Trị</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        width: '100%',
                        borderRadius: '5px',
                        padding: '2px',
                        textDecoration: 'none',
                        backgroundColor: isActive ? "#d4e6f9" : "",
                      };
                    }}
                    to='/allStaffAccounts'
                  >
                    <PersonOutlineIcon className="icon" />
                    <span>Nhân Viên</span>
                  </NavLink>
                </li>
              </>
              : <></>
          }

          <li>
            <NavLink
              style={({ isActive }) => {
                return {
                  width: '100%',
                  borderRadius: '5px',
                  padding: '2px',
                  textDecoration: 'none',
                  backgroundColor: isActive ? "#d4e6f9" : "",
                };
              }}
              to={`/updateAccount/${userLoginAdmin.id_nv}`}
            >
              <PersonOutlineIcon className="icon" />
              <span>Cá Nhân</span>
            </NavLink>
          </li>

          {/* hệ thống */}

          <p className="title">Hệ Thống</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={() => logoutAdmin()}>Đăng Xuất</span>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
