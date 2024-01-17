import { ListGroup, Badge, Row, Col, Alert } from 'react-bootstrap'
import { parseCookie } from '../../utils/cookie'
import request from '../../utils/request'
import Link from 'next/link'
import moment from 'moment'
import HomeLayout from '../../components/HomeLayout'
import AppContainer from '../../components/AppContainer'
import styles from '../../scss/Orders.module.scss'
import Loading from '../../components/Loading'
import ProtectedPage from '../../components/ProtectedPage'

export default function Orders({ token, ordersData, lastPageData }) {
  console.log('ordersData: ', ordersData)
  const [orders, setOrders] = React.useState([])
  const [page, setPage] = React.useState(2)
  const [lastPage, setLastPage] = React.useState(lastPageData)
  console.log('orders', orders)

  const fetchOrders = async () => {
    try {
      const response = await request('orders-history', {
        params: {
          page,
          limit: 20,
          platform: 'new_web',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('response', response)
      if (response.success) {
        setOrders(orders => [...orders, ...response.data])
      } else {
        console.log('Response Fail')
      }
    } catch (error) {
      console.log('Fetch Orders Error: ', error)
    }
  }

  React.useEffect(() => {
    console.log('useeffect initial')
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    console.log('useeffect for page')
    if (lastPage >= page) {
      fetchOrders()
    }
  }, [page])

  const handleScroll = React.useCallback((event) => {
    if (window.scrollY + window.innerHeight > document.body.scrollHeight - 600) {
      setPage(page => page + 1)
    }
  }, [])

  if (!ordersData.length) {
    return (
      <ProtectedPage>
        <HomeLayout>
          <div className='text-center mt-4'>
            <Alert
              className='d-inline mg-auto mt-4 text-warning bg-light'
            >
              မှာဖူးသော အော်ဒါမရှိပါ
          </Alert>
          </div>
        </HomeLayout>
      </ProtectedPage>
    )
  }

  return (
    <ProtectedPage>
      <HomeLayout>
        <AppContainer className='p-0 mt-4'>
          {ordersData && (
            <Row className='justify-content-center'>
              <Col md={5} lg={10}>
                <ListGroup variant='flush'>
                  {ordersData.map((order, index) => {
                    return (
                      <Link
                        href={`orders/[orderId]`}
                        as={`orders/${order.order_number}`}
                        key={index}
                        passHref
                      >
                        <ListGroup.Item eventKey={index}>
                          {order.delivery_date ? moment(order.delivery_date).format('YYYY-MM-DD') : 'Order Cancelled'}
                          {/* <Badge
                          variant='dark'
                          className={`d-flex float-right ${styles['status-' + order.status]
                            }`}
                        >
                          {order.status}
                        </Badge> */}
                        </ListGroup.Item>
                      </Link>
                    )
                  })}
                </ListGroup>
              </Col>
            </Row>
          )}
          {orders && (
            <Row className='justify-content-center'>
              <Col md={5}>
                <ListGroup variant='flush'>
                  {orders.map((order, index) => {
                    return (
                      <Link
                        href={`orders/[orderId]`}
                        as={`orders/${order.order_number}`}
                        key={index}
                        passHref
                      >
                        <ListGroup.Item eventKey={index}>
                          {order.delivery_date ? moment(order.delivery_date).format('YYYY-MM-DD') : 'Order Cancelled'}
                          {/* <Badge
                          variant='dark'
                          className={`d-flex float-right ${styles['status-' + order.status]
                            }`}
                        >
                          {order.status}
                        </Badge> */}
                        </ListGroup.Item>
                      </Link>
                    )
                  })}
                </ListGroup>
              </Col>
            </Row>
          )}
        </AppContainer>
      </HomeLayout>
    </ProtectedPage>
  )
}
Orders.getInitialProps = async (context) => {
  try {
    const token = parseCookie(context.req, 'TOKEN')
    const response = await request('orders-history', {
      params: {
        page: 1,
        limit: 20,
        platform: 'new_web',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('response for order', response)
    if (response.success) {
      return {
        token,
        ordersData: response.data,
        lastPageData: response.pagination.lastPage
      }
    } else {
      return {
        token,
        ordersData: [],
        lastPageData: 1
      }
    }
  } catch (error) {
    console.log(error)
  }
}
