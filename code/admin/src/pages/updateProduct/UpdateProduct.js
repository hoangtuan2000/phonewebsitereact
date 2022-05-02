import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import { URL } from '../../config/config'

function UpdateProduct() {

    const params = useParams()

    const [product, setProduct] = useState({})

    // get Detail Product Info
    useEffect(() => {
        Axios.post(URL + '/productsAdmin/getDetailProductInfo', { idProduct: params.idProduct })
            .then((res) => {
                setProduct(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log('/productsAdmin/getDetailProductInfo', err);
            })
    }, [])

    return (
        <>
        d
        </>
    )
}

export default UpdateProduct