import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Table, Image, InputGroup, Button, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap"


function Cart() {
    return (
        <>
            <Container>
                <Row>
                    <Col className="bg-light rounded">
                        <div className="pt-3">
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
                                    <tr className="text-center align-middle">
                                        <td className="p-1" style={{ width: '70px' }}>
                                            <Image
                                                // src={require('../../asset/imageProducts/smartphone/01.jpg')}
                                                rounded
                                                fluid
                                                thumbnail
                                                style={{
                                                    width: '50px',
                                                    height: '50px'
                                                }}
                                            />
                                        </td>
                                        <td>Samsung A121 512GB</td>
                                        <td style={{ width: '100px' }}>
                                            <InputGroup size='sm' >
                                                <Button className="p-0">
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                <FormControl className="p-0 text-center" />
                                                <Button className="p-0">
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </InputGroup>
                                        </td>
                                        <td className="text-end">30.900.000 đ</td>
                                        <td className="text-end">30.900.000 đ</td>
                                        <td>
                                            <Button className="p-0 bg-transparent border-0">
                                                <OverlayTrigger
                                                    placement='bottom'
                                                    overlay={
                                                        <Tooltip>
                                                            Xóa Sản Phẩm
                                                        </Tooltip>
                                                    }
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faTrashCan} className='text-danger' />
                                                    </span>
                                                </OverlayTrigger>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr className="text-end text-danger fw-bold">
                                        <td colSpan={3}></td>
                                        <td>
                                            Tổng Tiền:
                                        </td>
                                        <td>
                                            60.000.000 đ
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart