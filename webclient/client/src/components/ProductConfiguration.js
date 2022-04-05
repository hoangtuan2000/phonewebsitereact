import { Table } from 'react-bootstrap'

function ProductConfiguration(props) {
    const data = props.data
    if (data.id_lsp == 'DT') {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={2} className='text-center'>Thông Tin Cấu Hình</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td className='fw-bold'>Thương Hiệu:</td>
                            <td>{data.ten_th}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Bộ Nhớ:</td>
                            <td>{data.dung_luong_bn}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Ram:</td>
                            <td>{data.dung_luong_ram}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Hệ Điều Hành:</td>
                            <td>{data.ten_hdh}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Vi xử lý:</td>
                            <td>{data.ten_chip}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Thiết Kế:</td>
                            <td>{data.kieu_tk}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Màn Hình:</td>
                            <td>{data.kich_thuoc_mh}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Xuất Xứ:</td>
                            <td>{data.ten_nsx}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    } else if (data.id_lsp == 'TN') {
        return (
            <>
               <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={2} className='text-center'>Thông Tin Cấu Hình</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td className='fw-bold'>Thương Hiệu:</td>
                            <td>{data.ten_th}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Loại Kết Nối:</td>
                            <td>{data.ten_lkn}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Xuất Xứ:</td>
                            <td>{data.ten_nsx}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    } else if (data.id_lsp == 'OL') {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th colSpan={2} className='text-center'>Thông Tin Cấu Hình</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td className='fw-bold'>Thương Hiệu:</td>
                            <td>{data.ten_th}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Chất Liệu:</td>
                            <td>{data.ten_cl}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Xuất Xứ:</td>
                            <td>{data.ten_nsx}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    } else {
        // file productDetail.js gui lan dau chua co du lieu nen phai rerder file rong tranh loi
        return (
            <></>
        )
    }
}

export default ProductConfiguration