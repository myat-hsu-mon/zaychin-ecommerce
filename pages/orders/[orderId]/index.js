import React from 'react'
import request from '../../../utils/request'
import HomeLayout from '../../../components/HomeLayout'
import {
  Container,
  ListGroup,
  Table,
  Row,
  Col,
  Alert
} from 'react-bootstrap'
import Loading from '../../../components/Loading'
import { parseCookie } from '../../../utils/cookie'
import _ from 'lodash'

export default function Index({ success, order }) {

  if (success && !Object.keys(order).length || !success) {
    return (
      <HomeLayout>
        <div className='text-center mt-4'>
          <Alert
            className='d-inline mg-auto mt-4 text-warning bg-light'
          >
            မှာဖူးသော အော်ဒါမရှိပါ
        </Alert>
        </div>
      </HomeLayout>
    )
  }
  console.log('product for order detail', order)

  return (
    <HomeLayout>
      {
        order.moved ?
          <iframe
            src={`https://server.zcforce.com/orders/track/${order.secure_id}`}
            frameBorder='0'
            width='100%'
            style={{ height: '100vh' }}
          />
          :
          <Container >
            <Row>
              <Col xs={12} sm={12} md={6} lg={5} className='mt-4'>
                <ListGroup className='mr-3'>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>အော်ဒါနံပါတ်</span>
                    <span>{order.order_number}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>အခြေအနေ</span>
                    <span>{order.status}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>ငွေပေးချေမည့်နည်းလမ်း</span>
                    <span>{order.payment_method}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>လိပ်စာ</span>
                    <span>{order.shipping_address}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className='d-flex justify-content-between'>
                    <span>ဖုန်းနံပါတ်</span>
                    <span>{order.phone}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col xs={12} sm={12} md={6} lg={7} className='mt-4'>
                <Table>
                  <thead>
                    <tr>
                      <th>ပစ္စည်းအမည်</th>
                      <th>အရေအတွက်</th>
                      <th>စျေးနှုန်း</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product.mm_name || item.product.name}</td>
                          <td>{item.quantity}</td>
                          {item.product.discount ? (
                            <td>
                              <s className='text-danger'>{item.price} ks</s><br/>
                              {item.product.discount.discounted_price} ks
                            </td>
                          ) : (
                              <td>
                                {item.price} ks
                              </td>
                            )}
                        </tr>
                      ))
                    }
                    <tr>
                      <th colSpan={2} className='text-right'>Total</th>
                      <th>{_.sumBy(order.items, (item)=> item.product.discount ? item.product.discount.discounted_price : item.price)} Ks</th>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>


      }
    </HomeLayout>
  )
}
Index.getInitialProps = async (context) => {
  try {
    const token = parseCookie(context.req, 'TOKEN')
    const { orderId } = context.query
    const response = await request(`orders/${orderId}`, {
      params: {
        platform: 'new_web',
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.success) {
      return {
        success: true,
        order: response.data || {}
      }
    } else {
      return {
        success: false,
        order: {}
      }
    }
  } catch (error) {
    console.log('Fetch OrderDetail Error: ', error)
  }
}