import { useEffect, useState } from 'react'
import { Grid, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Form } from 'react-bootstrap'
import Axios from 'axios'

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

function UpdatePhonecase() {

  // modal
  const [modalSelectDefaultImage, setModalSelectDefaultImage] = useState(false)
  const [modalSelectImages, setModalSelectImages] = useState(false)
  const [modalContentIntro, setModalContentIntro] = useState(false)
  const [modalAddProductStatus, setModalAddProductStatus] = useState(false)

  const [addProductStatus, setAddProductStatus] = useState({});

  // get info config of product
  const [origin, setOrigin] = useState([]);
  const [material, setMaterial] = useState([]);
  const [trademark, setTrademark] = useState([]);
  const [promotion, setPromotion] = useState([]);

  const [reviewDefaultImage, setReviewDefaultImage] = useState('');
  const [reviewImages, setReviewImages] = useState([]);

  const [productDefaultImage, setProductDefaultImage] = useState({ defaultImage: '' });
  const [productImages, setProductImages] = useState({ images: '' });
  const [productIntroduceAdd, setProductIntroduceAdd] = useState('');
  const [productNameAdd, setProductNameAdd] = useState('')
  const [productPriceAdd, setProductPriceAdd] = useState('')
  const [productNumberAdd, setProductNumberAdd] = useState('')
  const [productOriginAdd, setProductOriginAdd] = useState('')
  const [productMaterialAdd, setProductMaterialAdd] = useState('')
  const [productTrademarkAdd, setProductTrademarkAdd] = useState('')
  const [productPromotionAdd, setProductPromotionAdd] = useState('')

  //get product config info
  useEffect(() => {
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

    // get material
    Axios.get(URL + '/productConfigInfoAdmin/getAllMaterial')
      .then((res) => {
        setMaterial(res.data.getAllMaterialData);
      })
      .catch((err) => {
        console.log('/productConfigInfoAdmin/getAllMgetAllMaterialemory', err);
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
    setProductNameAdd(productName)
    return validateProductName(productName, 'notificationProductNameFail', 'AddProductName')
  }

  const checkProductPrice = (price) => {
    setProductPriceAdd(deleteDots(price))
    return validateProductPrice(price, 'AddProductPrice', 'notificationProductPriceFail', 'AddProductPrice')
  }

  const checkProductNumber = (number) => {
    setProductNumberAdd(deleteDots(number))
    return validateProductNumber(number, 'AddProductNumber', 'notificationProductNumberFail', 'AddProductNumber')
  }

  const checkProductOrigin = (origin) => {
    setProductOriginAdd(origin);
    return validateSelect(origin, 'AddProductOrigin')
  }

  const checkProductTrademark = (trademark) => {
    setProductTrademarkAdd(trademark);
    return validateSelect(trademark, 'AddProductTrademark')
  }

  const checkProductPromotion = (promotion) => {
    setProductPromotionAdd(promotion);
    return validateSelect(promotion, 'AddProductPromotion')
  }

  const checkProductMaterial = (material) => {
    setProductMaterialAdd(material);
    return validateSelect(material, 'AddProductMaterial')
  }


  // submit add product
  const addProduct = async () => {
    // check default image
    if (productDefaultImage.defaultImage.length > 0) {
      // check album images
      if (productImages.images.length > 0) {
        //check intro of product
        if (productIntroduceAdd.length > 0) {
          // check form product
          if (
            checkProductName(productNameAdd) && checkProductPrice(productPriceAdd)
            && checkProductNumber(productNumberAdd) && checkProductOrigin(productOriginAdd)
            && checkProductTrademark(productTrademarkAdd) && checkProductPromotion(productPromotionAdd)
            && checkProductMaterial(productMaterialAdd)
          ) {
            // create form 
            const formData = new FormData();
            formData.append("productImages", productDefaultImage.defaultImage[0]);
            for (const key of Object.keys(productImages.images)) {
              formData.append('productImages', productImages.images[key])
            }
            formData.append("productName", productNameAdd);
            formData.append("productPrice", productPriceAdd);
            formData.append("productNumber", productNumberAdd);
            formData.append("productOrigin", productOriginAdd);
            formData.append("productTrademark", productTrademarkAdd);
            formData.append("productPromotion", productPromotionAdd);
            formData.append("productIntro", productIntroduceAdd);
            formData.append("productMaterial", productMaterialAdd);

            // for (var value of formData.values()) {
            //     console.log('form', value);
            // }

            Axios.post(URL + '/addProductAdmin/addPhonecase',
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                }
              })
              .then((res) => {
                setAddProductStatus(res.data)
                setModalAddProductStatus(true)

                if (res.data.addPhonecaseStatus) {
                  setReviewDefaultImage('')
                  setReviewImages([])
                  setProductDefaultImage({ defaultImage: '' })
                  setProductImages({ images: '' })
                  setProductIntroduceAdd('')
                  setProductNameAdd('')
                  setProductPriceAdd('')
                  setProductNumberAdd('')
                  setProductOriginAdd('')
                  setProductTrademarkAdd('')
                  setProductPromotionAdd('')
                  setProductMaterialAdd('')
                  document.getElementById('AddProductName').value = ''
                  document.getElementById('AddProductPrice').value = ''
                  document.getElementById('AddProductNumber').value = ''
                  setTimeout(
                    window.location.reload()
                    , 1000)
                }
              })
              .catch((err) => {
                console.log('/addProductAdmin/addPhonecase', err);
              })
          }
        } else {
          setModalContentIntro(true)
        }
      } else {
        setModalSelectImages(true)
      }
    } else {
      setModalSelectDefaultImage(true)
    }
  }

  return (
    <>
      <Grid container spacing={0}>
        {/* <div className='bg-primary'> */}
        <Grid item xs={12}>
          <div className='p-2'>Cập Nhật Ốp Lưng</div>
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
                        <div className='text-center'>
                          <AddPhotoAlternateIcon fontSize='large' />
                          <h6>Avatar Product</h6>
                          <h6>600 x 600</h6>
                        </div>
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
                  {reviewImages &&
                    reviewImages.map((image, index) => {
                      return (
                        <div key={image} className="float-start me-1 my-1 border rounded bg-white text-center">
                          <img src={image} style={{ height: "250px", width: '200px', objectFit: 'contain' }} />
                          <br />
                          {/* <Button
                                                        variant="contained"
                                                        color='error'
                                                        size='small'
                                                        className='float-start mx-1 p-0'
                                                        style={{ fontSize: '8px' }}
                                                        onClick={() => {
                                                            setReviewImages(reviewImages.filter((e) => e !== image));
                                                            delete productImages.images[index]
                                                            console.log(productImages.images);
                                                        }
                                                        }
                                                    >
                                                        Xóa
                                                    </Button> */}
                          <p style={{ fontSize: '12px' }}>Ảnh {index + 1}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Grid>

            {/* input info product */}
            <Grid item xs={8}>
              <Form className='pe-2 mt-3 mb-5'>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductName'>Tên sản phẩm: </Form.Label>
                      <Form.Control
                        id='AddProductName'
                        type="text"
                        size="sm"
                        autoFocus
                        onChange={(e) => checkProductName(e.target.value)}
                      />
                      <Form.Text id='notificationProductNameFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductPrice'>Giá: </Form.Label>
                      <Form.Control
                        id='AddProductPrice'
                        type="text"
                        size="sm"
                        onChange={(e) => checkProductPrice(e.target.value)}
                      />
                      <Form.Text id='notificationProductPriceFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-1' >
                      <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductNumber'>Số Lượng: </Form.Label>
                      <Form.Control
                        id='AddProductNumber'
                        type="text"
                        size="sm"
                        onChange={(e) => checkProductNumber(e.target.value)}
                      />
                      <Form.Text id='notificationProductNumberFail' className="text-danger"></Form.Text>
                    </Form.Group>

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductMaterial">
                      Chất liệu::
                    </Form.Label>
                    <Form.Select
                      id='AddProductMaterial'
                      className='mb-1'
                      size="sm"
                      value={productMaterialAdd}
                      onChange={(e) => {
                        checkProductMaterial(e.target.value)
                      }}
                    >
                      <option value=''></option>
                      {
                        material.map((val) => {
                          return (
                            <option key={val.id_cl} value={val.id_cl}>{val.ten_cl}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductTrademark">
                      Thương hiệu:
                    </Form.Label>
                    <Form.Select
                      id='AddProductTrademark'
                      className='mb-1'
                      size="sm"
                      value={productTrademarkAdd}
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

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductPromotion">
                      Khuyến mãi:
                    </Form.Label>
                    <Form.Select
                      id='AddProductPromotion'
                      className='mb-1'
                      size="sm"
                      value={productPromotionAdd}
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

                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductOrigin">
                      Xuất xứ:
                    </Form.Label>
                    <Form.Select
                      id='AddProductOrigin'
                      className='mb-1'
                      size="sm"
                      value={productOriginAdd}
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
                  </Grid>

                  {/* giới thiệu */}
                  <Grid item xs={12}>
                    <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductPromotion">
                      Giới Thiệu:
                    </Form.Label>
                    <Form.Text id='notificationProductIntroduceFail' className="text-danger"></Form.Text>
                    {/* editor */}
                    <SunEditorTranslationArea
                      initialContent={productIntroduceAdd}
                      setContent={setProductIntroduceAdd}
                    />

                    <div className='text-center'>
                      <Button
                        variant="contained"
                        className='mt-3 w-50'
                        onClick={addProduct}
                      >
                        Thêm Sản Phẩm
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

      {/* call modal Select Default Image */}
      <ModalNotification
        show={modalSelectDefaultImage}
        onHide={() => setModalSelectDefaultImage(false)}
        status={false}
        title={'Thất Bại'}
        message={'Bạn chưa chọn ảnh Avatar'}
      />

      {/* call modal Select Images */}
      <ModalNotification
        show={modalSelectImages}
        onHide={() => setModalSelectImages(false)}
        status={false}
        title={'Thất Bại'}
        message={'Bạn chưa chọn album ảnh cho sản phẩm'}
      />

      {/* call modal Select Images */}
      <ModalNotification
        show={modalContentIntro}
        onHide={() => setModalContentIntro(false)}
        status={false}
        title={'Thất Bại'}
        message={'Bạn chưa nhập giới thiệu cho sản phẩm'}
      />


      {/* call modal Add Product Status */}
      <ModalNotification
        show={modalAddProductStatus}
        onHide={() => setModalAddProductStatus(false)}
        status={addProductStatus.addPhonecaseStatus}
        title={addProductStatus.addPhonecaseStatus ? 'Thành Công' : 'Thất Bại'}
        message={addProductStatus.addPhonecaseMessage}
      />
    </>
  )
}

export default UpdatePhonecase








