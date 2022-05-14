import { useEffect, useState } from 'react'
import { Grid, Button } from '@mui/material';
import { Form } from 'react-bootstrap'
import Axios from 'axios'
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useNavigate, useParams } from 'react-router-dom';

import { URL } from '../../config/config'
import SunEditorTranslationArea from '../editor/SunEditorTranslationArea';
import ModalNotification from '../modal/modalNotification/ModalNotification';
import {
  validateProductName,
  validateProductPrice,
  validateProductNumber,
  validateSelect,
  deleteDots
} from '../../functions/validateFormFunction'
import { moneyFormat } from '../../functions/moneyFunction'

function UpdateHeadphone() {

  const params = useParams()

  // modal
  const [modalContentIntro, setModalContentIntro] = useState(false)
  const [modalUpdateProductStatus, setModalUpdateProductStatus] = useState(false)

  const [updateProductStatus, setUpdateProductStatus] = useState({});

  // get info config of product
  const [origin, setOrigin] = useState([]);
  const [connectionType, setConnectionType] = useState([]);
  const [trademark, setTrademark] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [productAvatarDatabase, setProductAvatarDatabase] = useState('');
  const [productImagesDatabase, setProductImagesDatabase] = useState([]);

  const [reviewDefaultImage, setReviewDefaultImage] = useState('');
  const [reviewImages, setReviewImages] = useState([]);

  const [productDefaultImage, setProductDefaultImage] = useState({ defaultImage: '' });
  const [productImages, setProductImages] = useState({ images: '' });
  const [productIntroduceUpdate, setProductIntroduceUpdate] = useState('');
  const [productNameUpdate, setProductNameUpdate] = useState('')
  const [productPriceUpdate, setProductPriceUpdate] = useState('')
  const [productNumberUpdate, setProductNumberUpdate] = useState('')
  const [productOriginUpdate, setProductOriginUpdate] = useState('')
  const [productConnectionTypeUpdate, setProductConnectionTypeUpdate] = useState('')
  const [productTrademarkUpdate, setProductTrademarkUpdate] = useState('')
  const [productPromotionUpdate, setProductPromotionUpdate] = useState('')
  const [productStatusUpdate, setProductStatusUpdate] = useState('')

  //get product info and config info
  useEffect(() => {
    // get product info
    Axios.post(URL + '/productsAdmin/getDetailProductInfo', { idProduct: params.idProduct })
      .then((res) => {
        if (res.data.getDetailProductInfotStatus) {
          let product = res.data.getDetailProductInfotData
          setProductIntroduceUpdate(product.gioi_thieu_sp)
          setProductNameUpdate(product.ten_sp)
          setProductPriceUpdate(moneyFormat(product.gia_sp))
          setProductAvatarDatabase(product.anh_sp)
          setProductImagesDatabase(product.images)
          setProductNumberUpdate(moneyFormat(product.so_luong_sp))
          setProductTrademarkUpdate(product.id_th)
          setProductOriginUpdate(product.id_xx)
          setProductPromotionUpdate(product.id_km)
          setProductStatusUpdate(product.id_ttsp)
          setProductConnectionTypeUpdate(product.configInfo.id_lkn)
          document.getElementById('UpdateProductPrice').value = moneyFormat(product.gia_sp)
          document.getElementById('UpdateProductNumber').value = moneyFormat(product.so_luong_sp)
        }

      })
      .catch((err) => {
        console.log('updateProduct => headphone', err);

      })

    // get origin
    Axios.get(URL + '/productConfigInfoAdmin/getAllOrigin')
      .then((res) => {
        setOrigin(res.data.getAllOriginData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllOrigin', err);
      })

    // get Trademark
    Axios.get(URL + '/productConfigInfoAdmin/getAllTrademark')
      .then((res) => {
        setTrademark(res.data.getAllTrademarkData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllTrademark', err);
      })

    // get Promotion
    Axios.get(URL + '/productConfigInfoAdmin/getAllPromotion')
      .then((res) => {
        setPromotion(res.data.getAllPromotionData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllPromotion', err);
      })

    // get product status
    Axios.get(URL + '/productConfigInfoAdmin/getAllProductStatus')
      .then((res) => {
        setProductStatus(res.data.getAllProductStatusData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllProductStatus', err);
      })

    // get ConnectionType
    Axios.get(URL + '/productConfigInfoAdmin/getAllConnectionType')
      .then((res) => {
        setConnectionType(res.data.getAllConnectionTypeData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllMgetAllConnectionType', err);
      })

  }, [])

  // select and review default image
  const onSelectDefaultImage = (e) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0]
      const URLImage = window.URL.createObjectURL(selectedImage);
      setReviewDefaultImage(URLImage)
      setProductDefaultImage({ defaultImage: [selectedImage] })
    }
  };

  // select and review list image
  const onSelectImages = (event) => {
    if (event.target.files.length > 0) {
      const reviewImages = event.target.files;
      const selectedImagesArray = Array.from(reviewImages);

      const imagesArray = selectedImagesArray.map((image) => {
        return window.URL.createObjectURL(image);
      });

      setReviewImages(imagesArray);
      setProductImages({ images: [...event.target.files] });
    }
  };

  const checkProductName = (productName) => {
    setProductNameUpdate(productName)
    return validateProductName(productName, 'notificationProductNameFail', 'UpdateProductName')
  }

  const checkProductPrice = (price) => {
    setProductPriceUpdate(deleteDots(price))
    return validateProductPrice(price, 'UpdateProductPrice', 'notificationProductPriceFail', 'UpdateProductPrice')
  }

  const checkProductNumber = (number) => {
    setProductNumberUpdate(deleteDots(number))
    return validateProductNumber(number, 'UpdateProductNumber', 'notificationProductNumberFail', 'UpdateProductNumber')
  }

  const checkProductOrigin = (origin) => {
    setProductOriginUpdate(origin);
    return validateSelect(origin, 'UpdateProductOrigin')
  }

  const checkProductTrademark = (trademark) => {
    setProductTrademarkUpdate(trademark);
    return validateSelect(trademark, 'UpdateProductTrademark')
  }

  const checkProductPromotion = (promotion) => {
    setProductPromotionUpdate(promotion);
    return validateSelect(promotion, 'UpdateProductPromotion')
  }

  const checkProductStatus = (status) => {
    setProductStatusUpdate(status);
    return validateSelect(status, 'UpdateProductStatus')
  }

  const checkProductConnectionType = (connectionType) => {
    setProductConnectionTypeUpdate(connectionType);
    return validateSelect(connectionType, 'UpdateProductConnectionType')
  }

  // submit update product
  const updateProduct = () => {
    //check intro of product
    if (productIntroduceUpdate.length > 0) {
      // check form product
      if (
        checkProductName(productNameUpdate) && checkProductPrice(productPriceUpdate)
        && checkProductNumber(productNumberUpdate) && checkProductOrigin(productOriginUpdate) && checkProductStatus(productStatusUpdate)
        && checkProductTrademark(productTrademarkUpdate) && checkProductPromotion(productPromotionUpdate) && checkProductConnectionType(productConnectionTypeUpdate)
      ) {
        // create form 
        const formData = new FormData();
        formData.append("productDefaultImage", productDefaultImage.defaultImage[0])
        for (const key of Object.keys(productImages.images)) {
          formData.append('productImages', productImages.images[key])
        }

        formData.append("idProduct", params.idProduct);
        formData.append("productName", productNameUpdate);
        formData.append("productPrice", deleteDots(productPriceUpdate));
        formData.append("productNumber", deleteDots(productNumberUpdate));
        formData.append("productOrigin", productOriginUpdate);
        formData.append("productConnectionType", productConnectionTypeUpdate);
        formData.append("productTrademark", productTrademarkUpdate);
        formData.append("productStatus", productStatusUpdate);
        formData.append("productPromotion", productPromotionUpdate);
        formData.append("productIntro", productIntroduceUpdate);
        // for (var value of formData.values()) {
        //     console.log('form', value);
        // }

        Axios.post(URL + '/updateProductAdmin/updateHeadphone',
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          .then((res) => {
            setUpdateProductStatus(res.data)
            setModalUpdateProductStatus(true)
            console.log(res);
          })
          .catch((err) => {
            console.log('/updateProductAdmin/updateHeadphone', err);
          })
      }
    } else {
      setModalContentIntro(true)
    }
  }

  return (
    <>
      <Grid container spacing={0}>
        {/* <div className='bg-primary'> */}
        <Grid item xs={12}>
          <div className='p-2'>
            <h6>Cập Nhật Tai Nghe</h6>
          </div>
        </Grid>
        <Grid item xs={12} className='m-1 bg-light rounded'>
          <Grid container spacing={0} className='d-flex justify-content-center'>
            {/* images */}
            <Grid item xs={4}>
              {/* Default product image */}
              <div className='d-flex justify-content-center mt-3'>
                <label
                  htmlFor='defaultImage'
                  className={
                    `
                                        d-flex 
                                        justify-content-center 
                                        align-items-center 
                                        border 
                                        border-secondary 
                                        rounded
                                        mt-2
                                        `
                  }
                  style={{ color: 'gray', height: '250px', width: '200px' }}
                >
                  {
                    reviewDefaultImage ?
                      <img
                        src={reviewDefaultImage}
                        className='rounded border border-secondary'
                        style={{
                          height: '250px',
                          width: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      :
                      <>
                        <img
                          src={URL + productAvatarDatabase}
                          className='rounded border border-secondary'
                          style={{
                            height: '250px',
                            width: '200px',
                            objectFit: 'cover'
                          }}
                        />
                      </>
                  }
                </label>
                <input
                  id='defaultImage'
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={(e) => onSelectDefaultImage(e)}
                />
              </div>

              {/* product image list */}
              <div className='m-2'>
                <p className='mb-1 mt-3'>Tải lên album ảnh của sản phẩm: </p>
                <label htmlFor="imagesList">
                  <input
                    id="imagesList"
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => onSelectImages(e)}
                  />
                  <Button
                    variant="contained"
                    component='span'
                    size='small'
                    style={{ fontSize: '10px' }}
                  >
                    Tải lên
                  </Button>
                </label>

                {/* review images before upload */}
                <div className='mt-2'>
                  {
                    reviewImages.length > 0 ?
                      reviewImages.map((image, index) => {
                        return (
                          <div key={image} className="float-start me-1 my-1 border rounded bg-white text-center">
                            <img src={image} style={{ height: "250px", width: '200px', objectFit: 'contain' }} />
                            <br />
                            <p style={{ fontSize: '12px' }}>Ảnh {index + 1}</p>
                          </div>
                        );
                      })
                      :
                      productImagesDatabase.map((image, index) => {
                        return (
                          <div key={image} className="float-start me-1 my-1 border rounded bg-white text-center">
                            <img src={URL + image} style={{ height: "250px", width: '200px', objectFit: 'contain' }} />
                            <br />
                            <p style={{ fontSize: '12px' }}>Ảnh {index + 1}</p>
                          </div>
                        );
                      })
                  }
                </div>
              </div>
            </Grid>

            {/* input info product */}
            <Grid item xs={8}>
              <Form className='pe-2 mt-3 mb-5'>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateProductName'>Tên sản phẩm: </Form.Label>
                      <Form.Control
                        id='UpdateProductName'
                        type="text"
                        size="sm"
                        autoFocus
                        value={productNameUpdate}
                        onChange={(e) => checkProductName(e.target.value)}
                      />
                      <Form.Text id='notificationProductNameFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateProductPrice'>Giá: </Form.Label>
                      <Form.Control
                        id='UpdateProductPrice'
                        type="text"
                        size="sm"
                        onChange={(e) => checkProductPrice(e.target.value)}
                      />
                      <Form.Text id='notificationProductPriceFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='UpdateProductNumber'>Số Lượng: </Form.Label>
                      <Form.Control
                        id='UpdateProductNumber'
                        type="text"
                        size="sm"
                        onChange={(e) => checkProductNumber(e.target.value)}
                      />
                      <Form.Text id='notificationProductNumberFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductOrigin">
                      Loại kết nối:
                    </Form.Label>
                    <Form.Select
                      id='UpdateProductConnectionType'
                      className='mb-1'
                      size="sm"
                      value={productConnectionTypeUpdate}
                      onChange={(e) => {
                        checkProductConnectionType(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        connectionType.map((val) => {
                          return (
                            <option key={val.id_lkn} value={val.id_lkn}>{val.ten_lkn}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>

                  <Grid item xs={6}>
                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductOrigin">
                      Xuất xứ:
                    </Form.Label>
                    <Form.Select
                      id='UpdateProductOrigin'
                      className='mb-1'
                      size="sm"
                      value={productOriginUpdate}
                      onChange={(e) => {
                        checkProductOrigin(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        origin.map((val) => {
                          return (
                            <option key={val.id_xx} value={val.id_xx}>{val.ten_xx}</option>
                          )
                        })
                      }
                    </Form.Select>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductTrademark">
                      Thương hiệu:
                    </Form.Label>
                    <Form.Select
                      id='UpdateProductTrademark'
                      className='mb-1'
                      size="sm"
                      value={productTrademarkUpdate}
                      onChange={(e) => {
                        checkProductTrademark(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        trademark.map((val) => {
                          return (
                            <option key={val.id_th} value={val.id_th}>{val.ten_th}</option>
                          )
                        })
                      }
                    </Form.Select>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductPromotion">
                      Khuyến mãi:
                    </Form.Label>
                    <Form.Select
                      id='UpdateProductPromotion'
                      className='mb-1'
                      size="sm"
                      value={productPromotionUpdate}
                      onChange={(e) => {
                        checkProductPromotion(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        promotion.map((val) => {
                          if (val.giam_km == 0) {
                            return (
                              <option key={val.id_km} value={val.id_km}>Không Giảm</option>
                            )
                          } else {
                            return (
                              <option key={val.id_km} value={val.id_km}>{val.giam_km}%</option>
                            )
                          }
                        })
                      }
                    </Form.Select>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductStatus">
                      Trạng thái sản phẩm:
                    </Form.Label>
                    <Form.Select
                      id='UpdateProductStatus'
                      className='mb-1'
                      size="sm"
                      value={productStatusUpdate}
                      onChange={(e) => {
                        checkProductStatus(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        productStatus.map((val) => {
                          return (
                            <option key={val.id_ttsp} value={val.id_ttsp}>{val.ten_ttsp}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>

                  {/* giới thiệu */}
                  <Grid item xs={12}>
                    <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductPromotion">
                      Giới Thiệu:
                    </Form.Label>
                    <Form.Text id='notificationProductIntroduceFail' className="text-danger"></Form.Text>
                    {/* editor */}
                    <SunEditorTranslationArea
                      initialContent={productIntroduceUpdate}
                      setContent={setProductIntroduceUpdate}
                    />

                    <div className='text-center'>
                      <Button
                        variant="contained"
                        className='mt-3 w-50 bg-warning'
                        onClick={updateProduct}
                      >
                        Cập Nhật Sản Phẩm
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Form>

            </Grid>
          </Grid>
        </Grid>
        {/* </div> */}
      </Grid>


      {/* call modal intro */}
      <ModalNotification
        show={modalContentIntro}
        onHide={() => setModalContentIntro(false)}
        status={false}
        title={'Thất Bại'}
        message={'Bạn chưa nhập giới thiệu cho sản phẩm'}
      />

      {/* call modal Update Product Status */}
      <ModalNotification
        show={modalUpdateProductStatus}
        onHide={() => setModalUpdateProductStatus(false)}
        status={updateProductStatus.updateHeadphoneStatus}
        title={updateProductStatus.updateHeadphoneStatus ? 'Thành Công' : 'Thất Bại'}
        message={updateProductStatus.updateHeadphoneMessage}
      />
    </>
  )
}

export default UpdateHeadphone








