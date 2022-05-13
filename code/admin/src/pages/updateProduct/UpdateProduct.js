import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Axios from 'axios'

import { URL } from '../../config/config'
import UpdateSmartphone from '../../components/updateProduct/UpdateSmartphone'
import UpdateHeadphone from '../../components/updateProduct/UpdateHeadphone'
import UpdatePhoneCase from '../../components/updateProduct/UpdatePhonecase'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function UpdateProduct() {
    let [searchParams, setSearchParams] = useSearchParams() 

    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />

                    <div>
                        {
                            searchParams.get("productType") === 'smartphone' ?
                                <UpdateSmartphone />
                                :
                                searchParams.get("productType") === 'headphone' ?
                                    <UpdateHeadphone />
                                    :
                                    searchParams.get("productType") === 'phonecase' ?
                                        <UpdatePhoneCase />
                                        : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct