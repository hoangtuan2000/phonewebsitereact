// import { useEffect, useState } from 'react'
// import { Grid, Button } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { Form } from 'react-bootstrap'
// import Axios from 'axios'

// import { URL } from '../../config/config'
// import SunEditorTranslationArea from '../editor/SunEditorTranslationArea';
// import ModalNotification from '../modal/modalNotification/ModalNotification';
// import {
//     validateProductName,
//     validateProductPrice,
//     validateProductNumber,
//     validateSelect
// } from '../../functions/validateFormFunction'

// function AddSmartphone() {

//     // modal
//     const [modalSelectDefaultImage, setModalSelectDefaultImage] = useState(false)
//     const [modalSelectImages, setModalSelectImages] = useState(false)
//     const [modalContentIntro, setModalContentIntro] = useState(false)

//     // get info config of product
//     const [origin, setOrigin] = useState([]);
//     const [memory, setMemory] = useState([]);
//     const [ram, setRam] = useState([]);
//     const [trademark, setTrademark] = useState([]);
//     const [operatingSystem, setOperatingSystem] = useState([]);
//     const [design, setDesign] = useState([]);
//     const [chip, setChip] = useState([]);
//     const [size, setSize] = useState([]);
//     const [promotion, setPromotion] = useState([]);

//     const [reviewDefaultImage, setReviewDefaultImage] = useState('');
//     const [reviewImages, setReviewImages] = useState([]);

//     const [productDefaultImage, setProductDefaultImage] = useState({ defaultImage: '' });
//     const [productImages, setProductImages] = useState({ images: '' });
//     const [productIntroduceAdd, setProductIntroduceAdd] = useState('');
//     const [productNameAdd, setProductNameAdd] = useState('')
//     const [productPriceAdd, setProductPriceAdd] = useState('')
//     const [productNumberAdd, setProductNumberAdd] = useState('')
//     const [productOriginAdd, setProductOriginAdd] = useState('')
//     const [productMemoryAdd, setProductMemoryAdd] = useState('')
//     const [productRamAdd, setProductRamAdd] = useState('')
//     const [productTrademarkAdd, setProductTrademarkAdd] = useState('')
//     const [productOperatingSystemAdd, setProductOperatingSystemAdd] = useState('')
//     const [productDesignAdd, setProductDesignAdd] = useState('')
//     const [productChipAdd, setProductChipAdd] = useState('')
//     const [productSizeAdd, setProductSizeAdd] = useState('')
//     const [productPromotionAdd, setProductPromotionAdd] = useState('')

//     //get product config info
//     useEffect(() => {
//         // get origin
//         Axios.get(URL + '/productConfigInfoAdmin/getAllOrigin')
//             .then((res) => {
//                 setOrigin(res.data.getAllOriginData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllOrigin', err);
//             })

//         // get Memory
//         Axios.get(URL + '/productConfigInfoAdmin/getAllMemory')
//             .then((res) => {
//                 setMemory(res.data.getAllMemoryData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllMemory', err);
//             })

//         // get ram
//         Axios.get(URL + '/productConfigInfoAdmin/getAllRam')
//             .then((res) => {
//                 setRam(res.data.getAllRamData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllRam', err);
//             })

//         // get Trademark
//         Axios.get(URL + '/productConfigInfoAdmin/getAllTrademark')
//             .then((res) => {
//                 setTrademark(res.data.getAllTrademarkData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllTrademark', err);
//             })

//         // get Trademark
//         Axios.get(URL + '/productConfigInfoAdmin/getAllTrademark')
//             .then((res) => {
//                 setTrademark(res.data.getAllTrademarkData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllTrademark', err);
//             })

//         // get OperatingSystem
//         Axios.get(URL + '/productConfigInfoAdmin/getAllOperatingSystem')
//             .then((res) => {
//                 setOperatingSystem(res.data.getAllOperatingSystemData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllOperatingSystem', err);
//             })

//         // get Design
//         Axios.get(URL + '/productConfigInfoAdmin/getAllDesign')
//             .then((res) => {
//                 setDesign(res.data.getAllDesignData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllDesign', err);
//             })

//         // get Chip
//         Axios.get(URL + '/productConfigInfoAdmin/getAllChip')
//             .then((res) => {
//                 setChip(res.data.getAllChipData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllChip', err);
//             })

//         // get Size
//         Axios.get(URL + '/productConfigInfoAdmin/getAllSize')
//             .then((res) => {
//                 setSize(res.data.getAllSizeData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllSize', err);
//             })

//         // get Promotion
//         Axios.get(URL + '/productConfigInfoAdmin/getAllPromotion')
//             .then((res) => {
//                 setPromotion(res.data.getAllPromotionData);
//             })
//             .catch((err) => {
//                 console.log('/productConfigInfoAdmin/getAllPromotion', err);
//             })
//     }, [])

//     // select and review default image
//     const onSelectDefaultImage = (e) => {
//         if (e.target.files.length > 0) {
//             const selectedImage = e.target.files[0]
//             const URLImage = window.URL.createObjectURL(selectedImage);
//             setReviewDefaultImage(URLImage)
//             setProductDefaultImage({ defaultImage: [selectedImage] })
//         }
//     };

//     // select and review list image
//     const onSelectImages = (event) => {
//         if (event.target.files.length > 0) {
//             const reviewImages = event.target.files;
//             const selectedImagesArray = Array.from(reviewImages);

//             const imagesArray = selectedImagesArray.map((image) => {
//                 return window.URL.createObjectURL(image);
//             });

//             setReviewImages(imagesArray);
//             setProductImages({ images: [...event.target.files] });
//         }
//     };

//     const checkProductName = (productName) => {
//         setProductNameAdd(productName)
//         return validateProductName(productName, 'notificationProductNameFail', 'AddProductName')
//     }

//     const checkProductPrice = (price) => {
//         setProductPriceAdd(price)
//         return validateProductPrice(price, 'AddProductPrice', 'notificationProductPriceFail', 'AddProductPrice')
//     }

//     const checkProductNumber = (number) => {
//         setProductNumberAdd(number)
//         return validateProductNumber(number, 'AddProductNumber', 'notificationProductNumberFail', 'AddProductNumber')
//     }

//     const checkProductOrigin = (origin) => {
//         setProductOriginAdd(origin);
//         return validateSelect(origin, 'AddProductOrigin')
//     }

//     const checkProductMemory = (memory) => {
//         setProductMemoryAdd(memory);
//         return validateSelect(memory, 'AddProductMemory')
//     }

//     const checkProductRam = (ram) => {
//         setProductRamAdd(ram);
//         return validateSelect(ram, 'AddProductRam')
//     }

//     const checkProductTrademark = (trademark) => {
//         setProductTrademarkAdd(trademark);
//         return validateSelect(trademark, 'AddProductTrademark')
//     }

//     const checkProductOperatingSystem = (os) => {
//         setProductOperatingSystemAdd(os);
//         return validateSelect(os, 'AddProductOperatingSystem')
//     }

//     const checkProductDesign = (design) => {
//         setProductDesignAdd(design);
//         return validateSelect(design, 'AddProductDesign')
//     }

//     const checkProductChip = (chip) => {
//         setProductChipAdd(chip);
//         return validateSelect(chip, 'AddProductChip')
//     }

//     const checkProductSize = (size) => {
//         setProductSizeAdd(size);
//         return validateSelect(size, 'AddProductSize')
//     }

//     const checkProductPromotion = (promotion) => {
//         setProductPromotionAdd(promotion);
//         return validateSelect(promotion, 'AddProductPromotion')
//     }

//     // submit add product
//     const addProduct = async () => {
//         // check default image
//         if (productDefaultImage.defaultImage.length > 0) {
//             // check album images
//             if (productImages.images.length > 0) {
//                 //check intro of product
//                 if (productIntroduceAdd.length > 0) {
//                     // check form product
//                     if (
//                         checkProductName(productNameAdd) && checkProductPrice(productPriceAdd)
//                         && checkProductNumber(productNumberAdd) && checkProductOrigin(productOriginAdd)
//                         && checkProductMemory(productMemoryAdd) && checkProductRam(productRamAdd)
//                         && checkProductTrademark(productTrademarkAdd) && checkProductOperatingSystem(productOperatingSystemAdd)
//                         && checkProductDesign(productDesignAdd) && checkProductChip(productChipAdd)
//                         && checkProductSize(productSizeAdd) && checkProductPromotion(productPromotionAdd)
//                     ) {
//                         // create form 
//                         // const formData = new FormData();
//                         // formData.append("a", productDefaultImage.defaultImage[0]);
//                         // for (const key of Object.keys(productImages.images)) {
//                         //     formData.append('a', productImages.images[key])
//                         // }
//                         // formData.append("productName", productNameAdd);
//                         // formData.append("productPrice", productPriceAdd);
//                         // formData.append("productNumber", productNumberAdd);
//                         // formData.append("productOrigin", productOriginAdd);
//                         // formData.append("productMemory", productMemoryAdd);
//                         // formData.append("productRam", productRamAdd);
//                         // formData.append("productTrademark", productTrademarkAdd);
//                         // formData.append("productOperatingSystem", productOperatingSystemAdd);
//                         // formData.append("productDesign", productDesignAdd);
//                         // formData.append("productChip", productChipAdd);
//                         // formData.append("productSize", productSizeAdd);
//                         // formData.append("productPromotion", productPromotionAdd);
//                         // formData.append("productIntro", productIntroduceAdd);
//                         // for (var value of formData.values()) {
//                         //     console.log('form', value);
//                         // }

//                         const formData = new FormData();
//                         formData.append("productName", productNameAdd);
//                         for (var value of formData.values()) {
//                             console.log(value);
//                         }
//                         try {
//                             const res = await Axios.post(
//                                 URL + '/addProductAdmin/addSmartphone',
//                                 formData
//                             );

//                         } catch (ex) {

//                         }

//                         console.log('productNameAdd', productNameAdd);

//                         // Axios.post(URL + '/addProductAdmin/addSmartphone', formData, {headers: {
//                         //     "Content-Type": "multipart/form-data",
//                         //   }})
//                         //     .then((res) => {
//                         //         console.log(res);
//                         //     })
//                         //     .catch((err) => {
//                         //         console.log('/addProductAdmin/addSmartphone', err);
//                         //     })

//                         // try {
//                         //     const res = await Axios.post(
//                         //         URL + '/addProductAdmin/addSmartphone',
//                         //         formData,
//                         //         // {
//                         //         //     headers: {
//                         //         //         "Content-Type": "multipart/form-data",
//                         //         //     }
//                         //         // }
//                         //     );
//                         //     console.log(res);
//                         // } catch (ex) {
//                         //     console.log(ex);
//                         // }
//                     }
//                 } else {
//                     setModalContentIntro(true)
//                 }
//             } else {
//                 setModalSelectImages(true)
//             }
//         } else {
//             setModalSelectDefaultImage(true)
//         }
//     }

//     return (
//         <>
//             <Grid container spacing={0}>
//                 {/* <div className='bg-primary'> */}
//                 <Grid item xs={12}>
//                     <div className='p-2'>
//                         <h6>Thêm Điện Thoại</h6>
//                     </div>
//                 </Grid>
//                 <Grid item xs={12} className='m-1 bg-light rounded'>
//                     <Grid container spacing={0} className='d-flex justify-content-center'>
//                         {/* images */}
//                         <Grid item xs={4}>
//                             {/* Default product image */}
//                             <div className='d-flex justify-content-center mt-3'>
//                                 <label
//                                     htmlFor='defaultImage'
//                                     className={
//                                         `
//                                         d-flex 
//                                         justify-content-center 
//                                         align-items-center 
//                                         border 
//                                         border-secondary 
//                                         rounded
//                                         mt-2
//                                         `
//                                     }
//                                     style={{ color: 'gray', height: '250px', width: '200px' }}
//                                 >
//                                     {
//                                         reviewDefaultImage ?
//                                             <img
//                                                 src={reviewDefaultImage}
//                                                 className='rounded border border-secondary'
//                                                 style={{
//                                                     height: '250px',
//                                                     width: '200px',
//                                                     objectFit: 'cover'
//                                                 }}
//                                             />
//                                             :
//                                             <>
//                                                 <div className='text-center'>
//                                                     <AddPhotoAlternateIcon fontSize='large' />
//                                                     <h6>Avatar Product</h6>
//                                                     <h6>600 x 600</h6>
//                                                 </div>
//                                             </>
//                                     }
//                                 </label>
//                                 <input
//                                     id='defaultImage'
//                                     type='file'
//                                     accept='image/*'
//                                     hidden
//                                     onChange={(e) => onSelectDefaultImage(e)}
//                                 />
//                             </div>

//                             {/* product image list */}
//                             <div className='m-2'>
//                                 <p className='mb-1 mt-3'>Tải lên album ảnh của sản phẩm: </p>
//                                 <label htmlFor="imagesList">
//                                     <input
//                                         id="imagesList"
//                                         type="file"
//                                         accept="image/*"
//                                         multiple
//                                         hidden
//                                         onChange={(e) => onSelectImages(e)}
//                                     />
//                                     <Button
//                                         variant="contained"
//                                         component='span'
//                                         size='small'
//                                         style={{ fontSize: '10px' }}
//                                     >
//                                         Tải lên
//                                     </Button>
//                                 </label>

//                                 {/* review images before upload */}
//                                 <div className='mt-2'>
//                                     {reviewImages &&
//                                         reviewImages.map((image, index) => {
//                                             return (
//                                                 <div key={image} className="float-start me-1 my-1 border rounded bg-white text-center">
//                                                     <img src={image} style={{ height: "250px", width: '200px', objectFit: 'contain' }} />
//                                                     <br />
//                                                     {/* <Button
//                                                         variant="contained"
//                                                         color='error'
//                                                         size='small'
//                                                         className='float-start mx-1 p-0'
//                                                         style={{ fontSize: '8px' }}
//                                                         onClick={() => {
//                                                             setReviewImages(reviewImages.filter((e) => e !== image));
//                                                             delete productImages.images[index]
//                                                             console.log(productImages.images);
//                                                         }
//                                                         }
//                                                     >
//                                                         Xóa
//                                                     </Button> */}
//                                                     <p style={{ fontSize: '12px' }}>Ảnh {index + 1}</p>
//                                                 </div>
//                                             );
//                                         })}
//                                 </div>
//                             </div>
//                         </Grid>

//                         {/* input info product */}
//                         <Grid item xs={8}>
//                             <Form className='pe-2 mt-3 mb-5'>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={6}>
//                                         <Form.Group className='mb-1' >
//                                             <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductName'>Tên sản phẩm: </Form.Label>
//                                             <Form.Control
//                                                 id='AddProductName'
//                                                 type="text"
//                                                 size="sm"
//                                                 onChange={(e) => checkProductName(e.target.value)}
//                                             />
//                                             <Form.Text id='notificationProductNameFail' className="text-danger"></Form.Text>
//                                         </Form.Group>

//                                         <Form.Group className='mb-1' >
//                                             <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductPrice'>Giá: </Form.Label>
//                                             <Form.Control
//                                                 id='AddProductPrice'
//                                                 type="text"
//                                                 size="sm"
//                                                 onChange={(e) => checkProductPrice(e.target.value)}
//                                             />
//                                             <Form.Text id='notificationProductPriceFail' className="text-danger"></Form.Text>
//                                         </Form.Group>

//                                         <Form.Group className='mb-1' >
//                                             <Form.Label style={{ fontSize: '14px' }} htmlFor='AddProductNumber'>Số Lượng: </Form.Label>
//                                             <Form.Control
//                                                 id='AddProductNumber'
//                                                 type="text"
//                                                 size="sm"
//                                                 onChange={(e) => checkProductNumber(e.target.value)}
//                                             />
//                                             <Form.Text id='notificationProductNumberFail' className="text-danger"></Form.Text>
//                                         </Form.Group>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductOrigin">
//                                             Xuất xứ::
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductOrigin'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productOriginAdd}
//                                             onChange={(e) => {
//                                                 checkProductOrigin(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 origin.map((val) => {
//                                                     return (
//                                                         <option key={val.id_xx} value={val.id_xx}>{val.ten_xx}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductMemory">
//                                             Bộ nhớ trong:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductMemory'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productMemoryAdd}
//                                             onChange={(e) => {
//                                                 checkProductMemory(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 memory.map((val) => {
//                                                     return (
//                                                         <option key={val.id_bn} value={val.id_bn}>{val.dung_luong_bn}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductRam">
//                                             Ram:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductRam'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productRamAdd}
//                                             onChange={(e) => {
//                                                 checkProductRam(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 ram.map((val) => {
//                                                     return (
//                                                         <option key={val.id_ram} value={val.id_ram}>{val.dung_luong_ram}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductTrademark">
//                                             Thương hiệu:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductTrademark'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productTrademarkAdd}
//                                             onChange={(e) => {
//                                                 checkProductTrademark(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 trademark.map((val) => {
//                                                     return (
//                                                         <option key={val.id_th} value={val.id_th}>{val.ten_th}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductOperatingSystem">
//                                             Hệ điều hành:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductOperatingSystem'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productOperatingSystemAdd}
//                                             onChange={(e) => {
//                                                 checkProductOperatingSystem(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 operatingSystem.map((val) => {
//                                                     return (
//                                                         <option key={val.id_hdh} value={val.id_hdh}>{val.ten_hdh}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductDesign">
//                                             Thiết kế:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductDesign'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productDesignAdd}
//                                             onChange={(e) => {
//                                                 checkProductDesign(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 design.map((val) => {
//                                                     return (
//                                                         <option key={val.id_tk} value={val.id_tk}>{val.kieu_tk}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductChip">
//                                             Chip xử lý:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductChip'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productChipAdd}
//                                             onChange={(e) => {
//                                                 checkProductChip(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 chip.map((val) => {
//                                                     return (
//                                                         <option key={val.id_chip} value={val.id_chip}>{val.ten_chip}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductSize">
//                                             Kích thước màn hình:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductSize'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productSizeAdd}
//                                             onChange={(e) => {
//                                                 checkProductSize(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 size.map((val) => {
//                                                     return (
//                                                         <option key={val.id_mh} value={val.id_mh}>{val.kich_thuoc_mh}</option>
//                                                     )
//                                                 })
//                                             }
//                                         </Form.Select>

//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductPromotion">
//                                             Khuyến mãi:
//                                         </Form.Label>
//                                         <Form.Select
//                                             id='AddProductPromotion'
//                                             className='mb-1'
//                                             size="sm"
//                                             value={productPromotionAdd}
//                                             onChange={(e) => {
//                                                 checkProductPromotion(e.target.value)
//                                             }}
//                                         >
//                                             <option value=''></option>
//                                             {
//                                                 promotion.map((val) => {
//                                                     if (val.giam_km == 0) {
//                                                         return (
//                                                             <option key={val.id_km} value={val.id_km}>Không Giảm</option>
//                                                         )
//                                                     } else {
//                                                         return (
//                                                             <option key={val.id_km} value={val.id_km}>{val.giam_km}%</option>
//                                                         )
//                                                     }
//                                                 })
//                                             }
//                                         </Form.Select>
//                                     </Grid>

//                                     {/* giới thiệu */}
//                                     <Grid item xs={12}>
//                                         <Form.Label style={{ fontSize: '14px' }} htmlFor="AddProductPromotion">
//                                             Giới Thiệu:
//                                         </Form.Label>
//                                         <Form.Text id='notificationProductIntroduceFail' className="text-danger"></Form.Text>
//                                         {/* editor */}
//                                         <SunEditorTranslationArea
//                                             initialContent={productIntroduceAdd}
//                                             setContent={setProductIntroduceAdd}
//                                         />

//                                         <div className='text-center'>
//                                             <Button
//                                                 variant="contained"
//                                                 className='mt-3 w-50'
//                                                 onClick={addProduct}
//                                             >
//                                                 Thêm Sản Phẩm
//                                             </Button>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Form>

//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 {/* </div> */}
//             </Grid>

//             {/* call modal Select Default Image */}
//             <ModalNotification
//                 show={modalSelectDefaultImage}
//                 onHide={() => setModalSelectDefaultImage(false)}
//                 status={false}
//                 title={'Thất Bại'}
//                 message={'Bạn chưa chọn ảnh Avatar'}
//             />

//             {/* call modal Select Images */}
//             <ModalNotification
//                 show={modalSelectImages}
//                 onHide={() => setModalSelectImages(false)}
//                 status={false}
//                 title={'Thất Bại'}
//                 message={'Bạn chưa chọn album ảnh cho sản phẩm'}
//             />

//             {/* call modal Select Images */}
//             <ModalNotification
//                 show={modalContentIntro}
//                 onHide={() => setModalContentIntro(false)}
//                 status={false}
//                 title={'Thất Bại'}
//                 message={'Bạn chưa nhập giới thiệu cho sản phẩm'}
//             />
//         </>
//     )
// }

// export default AddSmartphone








//==================================================================================================================================================

import { useState } from 'react'
import axios from 'axios';

function AddSmartphone() {

    const [file, setFile] = useState({ imagesArray: '' });

    const saveFile = (e) => {
        setFile(
            {
                imagesArray: [...file.imagesArray, ...e.target.files]
            }
        );
    };

    const uploadFile = async () => {
        let bodyFormData = new FormData();
        // formData.append("file", file);
        // console.log('file', file);
        for (const key of Object.keys(file.imagesArray)) {
            bodyFormData.append('imagesArray', file.imagesArray[key])
            // console.log('loop: ', file.imagesArray[key]);
        }

        for (var value of bodyFormData.values()) {
            console.log('form', value);
        }

        try {
            const res = await axios.post(
                'http://localhost:3001/addProductAdmin/addSmartphone',
                bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="App">
            <input type="file" onChange={saveFile} multiple />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default AddSmartphone;