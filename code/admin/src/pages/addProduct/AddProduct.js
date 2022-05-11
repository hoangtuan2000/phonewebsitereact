import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import { URL } from '../../config/config'
import AddSmartphone from '../../components/addProduct/AddSmartphone'
import AddHeadphone from '../../components/addProduct/AddHeadphone'
import AddPhoneCase from '../../components/addProduct/AddPhonecase'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function AddProduct() {

    const params = useParams()

    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />

                    <div>
                        {
                            params.productType === 'smartphone' ?
                                <AddSmartphone />
                                :
                                params.productType === 'headphone' ?
                                    <AddHeadphone />
                                    :
                                    params.productType === 'phonecase' ?
                                        <AddPhoneCase />
                                        : <></>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct