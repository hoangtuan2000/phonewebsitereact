import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { URL } from '../../config/config'

function SearchProduct() {

    const [searchContent, setSearchContent] = useState('')

    useEffect(() => {
        Axios.get(URL + `/api/products/searchProduct/${searchContent}`)
            .then((res) => {
                console.log('SearchProduct', res);
            })
            .catch((err) => {
                console.log('SearchProduct', err);
            })
    }, [searchContent])

    return (
        <>
            <InputGroup size='sm'>
                <FormControl
                    htmlSize='40'
                    placeholder='Tìm Kiếm Sản Phẩm'
                    onChange={(e) => setSearchContent(e.target.value)}
                />
                <Button variant='primary' size='sm'>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </>
    )
}

export default SearchProduct