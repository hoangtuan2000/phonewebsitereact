import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, FormControl, InputGroup, Table } from 'react-bootstrap'
import { URL } from '../../config/config'
import { Link, NavLink } from 'react-router-dom';
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'

function SearchProduct() {

    const [searchContent, setSearchContent] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios.get(URL + `/api/products/searchProduct/${searchContent}`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log('SearchProduct', err);
            })
    }, [searchContent])

    const hidePropose = () => {
        setProducts([])
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <InputGroup size='sm'>
                    <FormControl
                        htmlSize='40'
                        placeholder='Tìm Kiếm Sản Phẩm'
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                    <NavLink
                        to={`/search?searchContent=${searchContent}`}
                        className='btn bg-primary text-white'
                        onClick={hidePropose}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </NavLink>
                </InputGroup>

                <Table
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        top: '32px',
                        zIndex: '9999',
                        borderRadius: '2px'
                    }}
                    onMouseLeave={hidePropose}
                >
                    <Scrollbars
                        autoHeight
                        style={{ width: '550px' }}
                    >
                        {
                            products.map((val) => {
                                return (
                                    <>
                                        <Link to={`/product-detail/${val.id_sp}`} style={{ textDecoration: "none", color: "black" }}>
                                            <tr>
                                                <th
                                                    style={{ width: "70px" }}
                                                >
                                                    <img
                                                        style={{ width: '60px', height: '60px', margin: '5px' }}
                                                        src={URL + val.anh_sp}
                                                        className="img-rounded"
                                                        alt="..."
                                                    />
                                                </th>
                                                <th
                                                    style={{ width: "300px" }}
                                                >
                                                    {val.ten_sp}
                                                </th>
                                                <th
                                                    className='text-end'
                                                    style={{
                                                        width: "150px",
                                                        color: 'red'
                                                    }}
                                                >
                                                    <div className='text-right'>
                                                        {moneyFormat(reducedPrice(val.gia_sp, val.giam_km))} đ
                                                    </div>
                                                </th>
                                            </tr>
                                        </Link>
                                    </>
                                )
                            })
                        }
                    </Scrollbars>
                </Table>
            </div>
        </>
    )
}

export default SearchProduct