import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Table, Image, InputGroup, Button, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap"

import { URL } from '../../config/config'
import { reducedPrice, moneyFormat } from '../../functions/moneyFunction'
import { Link } from "react-router-dom"

function TableOrderCart({ products, changeNumberProduct, handleDeleteProductCart, totalPrice }) {
    return (
        <Table striped bordered={false} hover className="p-1">
            <thead className="text-center">
                <tr>
                    <th></th>
                    <th>Tên Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th>Giá</th>
                    <th>Thành Tiền</th>
                    <th>Xóa</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product) => {
                        const PromotionPrice = reducedPrice(product.gia_sp, product.giam_km)
                        return (
                            <tr key={product.id_sp} className="text-center align-middle">
                                <td className="p-1" style={{ width: '70px' }}>
                                    <Image
                                        src={URL + product.anh_sp}
                                        rounded
                                        fluid
                                        thumbnail
                                        style={{
                                            width: '50px',
                                            height: '50px'
                                        }}
                                    />
                                </td>
                                <td>
                                    <Link
                                        to={`/product-detail/${product.id_sp}`}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        {product.ten_sp}
                                    </Link>
                                </td>
                                <td style={{ width: '100px' }}>
                                    <InputGroup size='sm' >
                                        <Button
                                            className="p-0"
                                            onClick={() => changeNumberProduct(product.id_sp, 'minus')}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </Button>
                                        <FormControl id={`numberProductCart${product.id_sp}`} className="p-0 text-center" value={product.so_luong} readOnly />
                                        <Button
                                            className="p-0"
                                            onClick={() => changeNumberProduct(product.id_sp, 'plus')}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </InputGroup>
                                </td>
                                <td className="text-end">
                                    {
                                        moneyFormat(PromotionPrice) + ' đ'
                                    }
                                </td>
                                <td className="text-end">
                                    {
                                        moneyFormat(PromotionPrice * product.so_luong) + ' đ'
                                    }
                                </td>
                                {/* button delete product cart */}
                                <td>
                                    <Button
                                        className="p-0 bg-transparent border-0"
                                        onClick={() => handleDeleteProductCart(product.id_sp)}
                                    >
                                        <OverlayTrigger
                                            placement='bottom'
                                            overlay={
                                                <Tooltip>
                                                    Xóa Sản Phẩm
                                                </Tooltip>
                                            }
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className='text-danger'
                                                />
                                            </span>
                                        </OverlayTrigger>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                <tr className="text-end text-danger fw-bold">
                    <td colSpan={3}></td>
                    <td>
                        Tổng Tiền:
                    </td>
                    <td>
                        {moneyFormat(totalPrice) + ' đ'}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TableOrderCart