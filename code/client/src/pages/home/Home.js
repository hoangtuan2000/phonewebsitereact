import { useState, useEffect } from 'react'
import { Col, Container, Row, Card, Badge, OverlayTrigger, Tooltip, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import Slider from '../slider/Slider'
import PromotionalProducts from '../../components/promotionalProducts/PromotionalProducts'
import MostPopularProducts from '../../components/mostPopularProducts/MostPopularProducts'
import NoProductsFound from '../../components/noProductsFound/NoProductsFound'
import { nameProductFormat } from '../../functions/stringFormatFunction'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import { URL } from '../../config/config'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

function Home() {

    const [promotionalProducts, setPromotionalProducts] = useState([])
    const [highPriceSmartphones, setHighPriceSmartphones] = useState([])
    const [highPriceHeadphones, setHighPriceHeadphones] = useState([])
    const [highPricePhonecases, setHighPricePhonecases] = useState([])

    useEffect(() => {
        const getPromotionalProducts = async () => {
            const { data } = await Axios.get(URL + '/api/products/getPromotionalProducts')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log(data);
                setPromotionalProducts(data)
            }
        }

        const getHighPriceSmartphones = async () => {
            const { data } = await Axios.get(URL + '/api/products/getHighPriceSmartphones')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log('a',data);
                setHighPriceSmartphones(data)
            }
        }

        const getHighPriceHeadphones = async () => {
            const { data } = await Axios.get(URL + '/api/products/getHighPriceHeadphones')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log('b',data);
                setHighPriceHeadphones(data)
            }
        }

        const getHighPricePhonecases = async () => {
            const { data } = await Axios.get(URL + '/api/products/getHighPricePhonecases')
            if (data.errno) {
                console.log('loi server')
            } else {
                // console.log('c',data);
                setHighPricePhonecases(data)
            }
        }

        getPromotionalProducts()
        getHighPriceSmartphones()
        getHighPriceHeadphones()
        getHighPricePhonecases()

    }, [])

    return (
        <>
            <Breadcrumbs />
            <Container className='my-2'>

                <Slider />

                {
                    promotionalProducts.length > 0
                    &&
                    <PromotionalProducts
                        titlePromotion={'Sản Phẩm Khuyến Mãi Nổi Bậc'}
                        promotionalProducts={promotionalProducts}
                    />
                }

                {
                    highPriceSmartphones.length > 0
                    &&
                    <MostPopularProducts
                        titlePromotion={'Điện Thoại Nổi Bậc'}
                        products={highPriceSmartphones}
                        page={'smartphone'}
                    />
                }

                {
                    highPriceHeadphones.length > 0
                    &&
                    <MostPopularProducts
                        titlePromotion={'Tai Nghe Nổi Bậc'}
                        products={highPriceHeadphones}
                        page={'headphone'}
                    />
                }


                {
                    highPricePhonecases.length > 0
                    &&
                    <MostPopularProducts
                        titlePromotion={'Ốp Lưng Nổi Bậc'}
                        products={highPricePhonecases}
                        page={'phonecase'}
                    />
                }

            </Container>
        </>
    )
}

export default Home