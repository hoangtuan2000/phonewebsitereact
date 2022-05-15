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

export default function ShowProductDetailDialog(props) {

  const screenHeight = window.innerHeight
  let product = props.basicProductInfo

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
              Thông Tin Sản Phẩm
            </Typography>
          </Toolbar>
        </AppBar>

        {
          product.getBasicProductInfoStatus ?
            <List >
              <Grid container spacing={2}>
                <Grid item xs={7} className='border-end'>
                  <div className='mb-2'>
                    <img
                      src={URL + product.getBasicProductInfoData.anh_sp}
                      style={{
                        width: '200px',
                        height: '200px',
                        backgroundColor: 'gray',
                        borderRadius: '10%',
                        objectFit: 'cover'
                      }}
                      className='p-1 ms-3 mb-2'
                    />

                    {
                      product.getBasicProductInfoData.anh_asp.map((img, index) => {
                        return (
                          <img
                            key={index}
                            src={URL + img}
                            style={{
                              width: '200px',
                              height: '200px',
                              backgroundColor: 'gray',
                              borderRadius: '10%',
                              objectFit: 'cover'
                            }}
                            className='p-1 ms-3 mb-2'
                          />
                        )
                      })
                    }
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <span className='fw-bold' style={{fontSize: '18px'}}>Tên Sản Phẩm:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px'}}>
                      {product.getBasicProductInfoData.ten_sp}
                    </li>
                  </ul>

                  <span className='fw-bold' style={{fontSize: '18px'}}>Giá:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px'}}>
                      {moneyFormat(product.getBasicProductInfoData.gia_sp) + ' VNĐ'}
                    </li>
                  </ul>

                  <span className='fw-bold' style={{fontSize: '18px'}}>Số lượng:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px'}}>
                      {moneyFormat(product.getBasicProductInfoData.so_luong_sp) + ' sản phẩm'}
                    </li>
                  </ul>

                  <span className='fw-bold' style={{fontSize: '18px'}}>Khuyến mãi:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px'}}>
                      {product.getBasicProductInfoData.giam_km + '%'}
                    </li>
                  </ul>

                  <span className='fw-bold' style={{fontSize: '18px'}}>Giá khuyến mãi:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px'}}>
                      {moneyFormat(reducedPrice(product.getBasicProductInfoData.gia_sp, product.getBasicProductInfoData.giam_km)) + ' VNĐ'}
                    </li>
                  </ul>

                  <span className='fw-bold' style={{fontSize: '18px'}}>Trạng Thái:</span>
                  <ul className='mb-3'>
                    <li style={{fontSize: '16px', color: 'red'}}>
                      {product.getBasicProductInfoData.ten_ttsp}
                    </li>
                  </ul>
                  
                </Grid>
              </Grid>

            </List>
            : <h5 className='mx-auto my-auto'>{product.getBasicProductInfoMessage}</h5>
        }

      </Dialog>
    </div>
  );
}
