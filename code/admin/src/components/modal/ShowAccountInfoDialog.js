import { useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';

import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowAccountInfoDialog(props) {

  let screenHeight = window.innerHeight
  let status = props.accountInfo.getAccountInfoStatus
  let data = props.accountInfo.getAccountInfoData
  let message = props.accountInfo.getAccountInfoMessage

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >

        <AppBar sx={{ position: 'relative', marginBottom: '10px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thông Tin Tài Khoản
            </Typography>
          </Toolbar>
        </AppBar>

        {
          status ?
            <List >
              <Grid container spacing={2}>
                <Grid item xs={12} className='border-end'>
                  <div className='p-3'>
                    <ul>
                      <li>
                        <span className='me-2 fw-bold'>ID Nhân Viên:</span>
                        <span>{data.id_nv}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Họ Tên:</span>
                        <span>{data.ten_nv}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Điện Thoại:</span>
                        <span>{data.sdt_nv}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Email:</span>
                        <span>{data.email_nv}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Chức Vụ:</span>
                        <span>{data.ten_cv}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Trạng Thái Hoạt Động:</span>
                        <span>{data.ten_tthd}</span>
                      </li>
                      <li>
                        <span className='me-2 fw-bold'>Địa Chỉ:</span>
                        <span>{data.dia_chi_nv + ' - ' + data.ten_xp + ' - ' + data.ten_qh + ' - ' + data.ten_ttp}</span>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>

            </List>
            : <h5 className='mx-auto my-auto'>{message}</h5>
        }

      </Dialog>
    </div>
  );
}
