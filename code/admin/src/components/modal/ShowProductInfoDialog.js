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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowProductDetailDialog(props) {
  console.log('1', props.productInfo);
  
  useEffect(() => {
    // if (Object.entries(props.productInfo).length > 0) {
    //   if (!props.productInfo.getOneProductStatus) {
    //     if (props.productInfo.getOneProductMessage) {
    // document.getElementById('abc').innerHTML = `<h3>${props.productInfo.getOneProductStatus}</h3>`
    let a = document.getElementById('abc')
    console.log('a', a);
    //     }
    //   }
    // }
  }, [])

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >

        <AppBar sx={{ position: 'relative' }}>
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

        <div id='abc'>
          {/* <List >
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List> */}
        </div>

      </Dialog>
    </div>
  );
}
