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
import { Link, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useSelector } from 'react-redux'


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const userLoginAdmin = useSelector((state) => state.userLoginAdmin.infoUserAdmin)

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">HT Shop</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>

          {
            userLoginAdmin.id_cv == 'AD' || userLoginAdmin.id_cv == 'QT' ?
              <>
                <p className="title">TÀI KHOẢN</p>
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
                    <span>Tài Khoản Quản Trị</span>
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
                    <span>Tài Khoản Nhân Viên</span>
                  </NavLink>
                </li>
              </>
              : <></>
          }


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

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
