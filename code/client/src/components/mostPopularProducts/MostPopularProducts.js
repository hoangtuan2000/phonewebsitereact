import { Row, Col, Card, Badge, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { URL } from '../../config/config'
import { nameProductFormat } from '../../functions/stringFormatFunction'
import { moneyFormat, reducedPrice } from '../../functions/moneyFunction'


function MostPopularProducts(props) {

  const products = props.products

  // console.log(props.type, products);

  return (
    <>
      <Row>
        <Col className='p-0 pb-3' data-aos="zoom-in">
          <div className='backgroundBlue rounded' style={{ overflow: 'hidden' }} >
            <h4 className='my-2 mx-3 float-start'
              style={
                { color: 'white' }}
            >
              {props.titlePromotion}
            </h4>

            <Link to={props.page} className='float-end'>
              <button className='my-2 mx-3 btn btn-light rounded-pill'>
                Xem Tất Cả Sản Phẩm
              </button>
            </Link>

            <div className='clearfix'></div>

            <div>
              {
                products.map((product) => {
                  return (
                    <>
                      <div className='p-1 pb-3 float-start cardProduct' key={product.id_sp} style={{ width: '220px' }}>
                        <Link to={`/product-detail/${product.id_sp}`}>
                          <Card >
                            <Card.Img variant="top"
                              src={URL + product.anh_sp}
                              className='mt-2'
                            />
                            <Card.Body className='p-2' >
                              {
                                product.giam_km > 0 ?
                                  <Badge bg="danger"> Giảm {product.giam_km} % </Badge>
                                  :
                                  <br />
                              }
                              <Card.Title>
                                <OverlayTrigger
                                  placement='top'
                                  overlay={
                                    <Tooltip>
                                      {product.ten_sp}
                                    </Tooltip>
                                  }
                                >
                                  <span>
                                    {nameProductFormat(product.ten_sp, 18)}
                                  </span>
                                </OverlayTrigger>
                              </Card.Title>
                              {
                                product.giam_km > 0 ?
                                  <>
                                    <h6>{moneyFormat(product.gia_sp)} VNĐ</h6>
                                    <h5>{moneyFormat(reducedPrice(product.gia_sp, product.giam_km))} VNĐ</h5>
                                  </>
                                  :
                                  <>
                                    <h6><br /></h6>
                                    <h5>{moneyFormat(reducedPrice(product.gia_sp, product.giam_km))} VNĐ</h5>
                                  </>
                              }
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    </>
                  )
                })
              }
            </div>

          </div>
        </Col>
      </Row >
    </>
  )
}

export default MostPopularProducts