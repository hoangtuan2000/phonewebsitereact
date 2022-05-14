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

function UpdateSmartphone() {

    const params = useParams()

    // modal
    const [modalContentIntro, setModalContentIntro] = useState(false)
    const [modalUpdateProductStatus, setModalUpdateProductStatus] = useState(false)

    const [updateProductStatus, setUpdateProductStatus] = useState({});

    // get info config of product
    const [origin, setOrigin] = useState([]);
    const [memory, setMemory] = useState([]);
    const [ram, setRam] = useState([]);
    const [trademark, setTrademark] = useState([]);
    const [operatingSystem, setOperatingSystem] = useState([]);
    const [design, setDesign] = useState([]);
    const [chip, setChip] = useState([]);
    const [size, setSize] = useState([]);
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
    const [productMemoryUpdate, setProductMemoryUpdate] = useState('')
    const [productRamUpdate, setProductRamUpdate] = useState('')
    const [productTrademarkUpdate, setProductTrademarkUpdate] = useState('')
    const [productOperatingSystemUpdate, setProductOperatingSystemUpdate] = useState('')
    const [productDesignUpdate, setProductDesignUpdate] = useState('')
    const [productChipUpdate, setProductChipUpdate] = useState('')
    const [productSizeUpdate, setProductSizeUpdate] = useState('')
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
                    setProductMemoryUpdate(product.configInfo.id_bn)
                    setProductRamUpdate(product.configInfo.id_ram)
                    setProductOperatingSystemUpdate(product.configInfo.id_hdh)
                    setProductDesignUpdate(product.configInfo.id_tk)
                    setProductChipUpdate(product.configInfo.id_chip)
                    setProductSizeUpdate(product.configInfo.id_mh)
                    document.getElementById('UpdateProductPrice').value = moneyFormat(product.gia_sp)
                    document.getElementById('UpdateProductNumber').value = moneyFormat(product.so_luong_sp)
                }

            })
            .catch((err) => {
                console.log('updateProduct => smartphone', err);

            })

        // get origin
        Axios.get(URL + '/productConfigInfoAdmin/getAllOrigin')
            .then((res) => {
                setOrigin(res.data.getAllOriginData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllOrigin', err);
            })

        // get Memory
        Axios.get(URL + '/productConfigInfoAdmin/getAllMemory')
            .then((res) => {
                setMemory(res.data.getAllMemoryData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllMemory', err);
            })

        // get ram
        Axios.get(URL + '/productConfigInfoAdmin/getAllRam')
            .then((res) => {
                setRam(res.data.getAllRamData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllRam', err);
            })

        // get Trademark
        Axios.get(URL + '/productConfigInfoAdmin/getAllTrademark')
            .then((res) => {
                setTrademark(res.data.getAllTrademarkData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllTrademark', err);
            })

        // get OperatingSystem
        Axios.get(URL + '/productConfigInfoAdmin/getAllOperatingSystem')
            .then((res) => {
                setOperatingSystem(res.data.getAllOperatingSystemData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllOperatingSystem', err);
            })

        // get Design
        Axios.get(URL + '/productConfigInfoAdmin/getAllDesign')
            .then((res) => {
                setDesign(res.data.getAllDesignData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllDesign', err);
            })

        // get Chip
        Axios.get(URL + '/productConfigInfoAdmin/getAllChip')
            .then((res) => {
                setChip(res.data.getAllChipData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllChip', err);
            })

        // get Size
        Axios.get(URL + '/productConfigInfoAdmin/getAllSize')
            .then((res) => {
                setSize(res.data.getAllSizeData);
            })
            .catch((err) => {
                console.log('/productConfigInfoAdmin/getAllSize', err);
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

    const checkProductMemory = (memory) => {
        setProductMemoryUpdate(memory);
        return validateSelect(memory, 'UpdateProductMemory')
    }

    const checkProductRam = (ram) => {
        setProductRamUpdate(ram);
        return validateSelect(ram, 'UpdateProductRam')
    }

    const checkProductTrademark = (trademark) => {
        setProductTrademarkUpdate(trademark);
        return validateSelect(trademark, 'UpdateProductTrademark')
    }

    const checkProductOperatingSystem = (os) => {
        setProductOperatingSystemUpdate(os);
        return validateSelect(os, 'UpdateProductOperatingSystem')
    }

    const checkProductDesign = (design) => {
        setProductDesignUpdate(design);
        return validateSelect(design, 'UpdateProductDesign')
    }

    const checkProductChip = (chip) => {
        setProductChipUpdate(chip);
        return validateSelect(chip, 'UpdateProductChip')
    }

    const checkProductSize = (size) => {
        setProductSizeUpdate(size);
        return validateSelect(size, 'UpdateProductSize')
    }

    const checkProductPromotion = (promotion) => {
        setProductPromotionUpdate(promotion);
        return validateSelect(promotion, 'UpdateProductPromotion')
    }

    const checkProductStatus = (status) => {
        setProductStatusUpdate(status);
        return validateSelect(status, 'UpdateProductStatus')
    }

    // submit update product
    const updateProduct = () => {
        //check intro of product
        if (productIntroduceUpdate.length > 0) {
            // check form product
            if (
                checkProductName(productNameUpdate) && checkProductPrice(productPriceUpdate)
                && checkProductNumber(productNumberUpdate) && checkProductOrigin(productOriginUpdate)
                && checkProductMemory(productMemoryUpdate) && checkProductRam(productRamUpdate)
                && checkProductTrademark(productTrademarkUpdate) && checkProductOperatingSystem(productOperatingSystemUpdate)
                && checkProductDesign(productDesignUpdate) && checkProductChip(productChipUpdate)
                && checkProductSize(productSizeUpdate) && checkProductPromotion(productPromotionUpdate) && checkProductStatus(productStatusUpdate)
            ) {
                // create form 
                const formData = new FormData();
                formData.append("productDefaultImage", productDefaultImage.defaultImage[0])
                for (const key of Object.keys(productImages.images)) {
                    formData.append('productImages', productImages.images[key])
                }

                for (var value of formData.values()) {
                    console.log('form', value);
                }

                formData.append("idProduct", params.idProduct);
                formData.append("productName", productNameUpdate);
                formData.append("productPrice", deleteDots(productPriceUpdate));
                formData.append("productNumber", deleteDots(productNumberUpdate));
                formData.append("productOrigin", productOriginUpdate);
                formData.append("productMemory", productMemoryUpdate);
                formData.append("productRam", productRamUpdate);
                formData.append("productTrademark", productTrademarkUpdate);
                formData.append("productStatus", productStatusUpdate);
                formData.append("productOperatingSystem", productOperatingSystemUpdate);
                formData.append("productDesign", productDesignUpdate);
                formData.append("productChip", productChipUpdate);
                formData.append("productSize", productSizeUpdate);
                formData.append("productPromotion", productPromotionUpdate);
                formData.append("productIntro", productIntroduceUpdate);
                // for (var value of formData.values()) {
                //     console.log('form', value);
                // }

                Axios.post(URL + '/updateProductAdmin/updateSmartphone',
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    })
                    .then((res) => {
                        setUpdateProductStatus(res.data)
                        setModalUpdateProductStatus(true)
                    })
                    .catch((err) => {
                        console.log('/updateProductAdmin/updateSmartphone', err);
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
                        <h6>Cập Nhật Điện Thoại</h6>
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

                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductMemory">
                                            Bộ nhớ trong:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductMemory'
                                            className='mb-1'
                                            size="sm"
                                            value={productMemoryUpdate}
                                            onChange={(e) => {
                                                checkProductMemory(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                memory.map((val) => {
                                                    return (
                                                        <option key={val.id_bn} value={val.id_bn}>{val.dung_luong_bn}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductRam">
                                            Ram:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductRam'
                                            className='mb-1'
                                            size="sm"
                                            value={productRamUpdate}
                                            onChange={(e) => {
                                                checkProductRam(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                ram.map((val) => {
                                                    return (
                                                        <option key={val.id_ram} value={val.id_ram}>{val.dung_luong_ram}</option>
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
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductOperatingSystem">
                                            Hệ điều hành:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductOperatingSystem'
                                            className='mb-1'
                                            size="sm"
                                            value={productOperatingSystemUpdate}
                                            onChange={(e) => {
                                                checkProductOperatingSystem(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                operatingSystem.map((val) => {
                                                    return (
                                                        <option key={val.id_hdh} value={val.id_hdh}>{val.ten_hdh}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductDesign">
                                            Thiết kế:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductDesign'
                                            className='mb-1'
                                            size="sm"
                                            value={productDesignUpdate}
                                            onChange={(e) => {
                                                checkProductDesign(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                design.map((val) => {
                                                    return (
                                                        <option key={val.id_tk} value={val.id_tk}>{val.kieu_tk}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductChip">
                                            Chip xử lý:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductChip'
                                            className='mb-1'
                                            size="sm"
                                            value={productChipUpdate}
                                            onChange={(e) => {
                                                checkProductChip(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                chip.map((val) => {
                                                    return (
                                                        <option key={val.id_chip} value={val.id_chip}>{val.ten_chip}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>

                                        <Form.Label style={{ fontSize: '14px' }} htmlFor="UpdateProductSize">
                                            Kích thước màn hình:
                                        </Form.Label>
                                        <Form.Select
                                            id='UpdateProductSize'
                                            className='mb-1'
                                            size="sm"
                                            value={productSizeUpdate}
                                            onChange={(e) => {
                                                checkProductSize(e.target.value)
                                            }}
                                        >
                                            <option value=''></option>
                                            {
                                                size.map((val) => {
                                                    return (
                                                        <option key={val.id_mh} value={val.id_mh}>{val.kich_thuoc_mh}</option>
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
                status={updateProductStatus.updateSmartphoneStatus}
                title={updateProductStatus.updateSmartphoneStatus ? 'Thành Công' : 'Thất Bại'}
                message={updateProductStatus.updateSmartphoneMessage}
            />
        </>
    )
}

export default UpdateSmartphone








