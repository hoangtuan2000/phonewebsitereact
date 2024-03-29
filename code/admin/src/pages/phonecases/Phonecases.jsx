import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Tooltip, Zoom, IconButton } from '@mui/material';
import Axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import { URL } from '../../config/config'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ShowProductInfoDialog from '../../components/modal/ShowProductInfoDialog';
import { Link, useNavigate } from 'react-router-dom';

const Phonecaes = () => {
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

  const [products, setProducts] = useState([])
  const [basicProductInfo, setBasicProductInfo] = useState({});

  // get all products
  useEffect(() => {
    Axios.get(URL + '/productsAdmin/getAllPhonecases')
      .then((res) => {
        if (res.data.getAllPhonecasesStatus && res.data.getAllPhonecasesData.length > 0) {
          setProducts(res.data.getAllPhonecasesData)

        } else if (res.data.getAllPhonecasesStatus && res.data.getAllPhonecasesData.length <= 0) {
          document.getElementById('showAllProducts').innerHTML = '<h3>hiện tại chưa có sản phẩm</h3>'

        } else if (!res.data.getAllPhonecasesStatus) {
          document.getElementById('showAllProducts').innerHTML = `<h3>${res.data.getAllPhonecasesMessage}</h3>`

        }

      })
      .catch((err) => {
        console.log('/productsAdmin/getAllPhonecases', err);

      })
  }, [])

  // Axios get Basic Product Info => show dialog view product
  const getBasicProductInfo = (idProduct) => {
    Axios.post(URL + '/productsAdmin/getBasicProductInfo', { idProduct: idProduct })
      .then((res) => {
        setBasicProductInfo(res.data)
        setOpen(true)
      })
      .catch((err) => {
        console.log('/productsAdmin/getBasicProductInfo', err);
      })
  }

  // Table DataGrid MUI Colums
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
      field: 'typeProduct', headerName: 'Loại', width: 100,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.typeProduct} followCursor>
              <span>{params.row.typeProduct}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'imageProduct',
      headerName: 'Ảnh',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <img
              src={URL + params.row.imageProduct}
              style={{
                height: '90px',
                width: '90px',
                backgroundColor: '#c9c9dd',
                padding: '5px',
                borderRadius: '8%'
              }}
            />
          </>
        )
      }
    },
    {
      field: 'nameProduct', headerName: 'Tên Sản Phẩm', width: 130, flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.nameProduct} followCursor>
              <span>{params.row.nameProduct}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'priceProduct', headerName: 'Giá', width: 130, flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.priceProduct + ' VNĐ'} followCursor>
              <span>{params.row.priceProduct} VNĐ</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'promotionProduct', headerName: 'Khuyến Mãi', width: 130,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.promotionProduct} followCursor>
              <span>{params.row.promotionProduct}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'statusProduct', headerName: 'Trạng Thái', width: 130,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title={params.row.statusProduct} followCursor>
              <span>{params.row.statusProduct}</span>
            </Tooltip>
          </>
        )
      }
    },
    {
      field: 'tools',
      headerName: 'Công Cụ',
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            <Tooltip TransitionComponent={Zoom} title="Xem" followCursor>
              <IconButton color="primary" onClick={() => getBasicProductInfo(params.row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="Cập Nhật" followCursor>
              <IconButton color="warning" onClick={() => navigate(`/updateProduct/${params.row.id}?productType=phonecase`)}>
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

  // Insert products into Rows Table DataGrid MUI
  products.map((product) => {
    let object = {}
    object.id = product.id_sp
    object.typeProduct = product.ten_lsp
    object.imageProduct = product.anh_sp
    object.nameProduct = product.ten_sp
    object.priceProduct = moneyFormat(product.gia_sp)
    product.giam_km > 0 ? object.promotionProduct = product.giam_km + '%' : object.promotionProduct = 'Không Giảm'
    object.statusProduct = product.ten_ttsp
    rows.push(object)
  })

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div id='showAllProducts' style={{ height: 500, width: '100%', padding: '10px' }}>
            <div className='mb-2'>
              <h6 className='float-start'>Tất Cả Tai Nghe</h6>
              <Link to='/addProduct/phonecase' className='float-end ms-1' style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small" style={{ fontSize: '12px' }}>
                  <PhoneIphoneIcon fontSize='small' />
                  Thêm Ốp Lưng
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
            />
          </div>
        </div>
      </div>

      {/* call modal dialog show product information */}
      <ShowProductInfoDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        basicProductInfo={basicProductInfo}
      />
    </>
  );
};

export default Phonecaes;
