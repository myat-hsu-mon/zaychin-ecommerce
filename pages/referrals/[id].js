import { useRouter } from 'next/router'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import Container from '../../components/AppContainer'
import HomeLayout from '../../components/HomeLayout'
import Loading from '../../components/Loading'
import request from '../../utils/request'
export default function Detail() {
  const router = useRouter()
  const { id } = router.query
  const [referal, setReferal] = React.useState({ userCode: 'rerxat454', friendCode: '3454fseg', expiredDate: '2020-11-30', promotion: 'Buy20000-Save-3000', status: 'Sent' })
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchReferalDetail = async () => {
    try {
      setIsLoading(true)
      const response = await request(`referals/${id}`)
      if (response.success) {
        setReferal(response.data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Error: ', error)
    }
  }

  React.useEffect(() => {
    fetchReferalDetail()
  }, [])

  if (isLoading) {
    return (
      <HomeLayout>
        <Loading />
      </HomeLayout>
    )
  }

  return (
    <HomeLayout>
      <Container className='mt-3 '>
        {/* <div>{id} im detail</div> */}
        <Row>
          <Col sm={12} md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>Your Promo-Code: </div>
                  <div>{referal.userCode}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>Friend Promo-Code: </div>
                  <div>{referal.friendCode}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>Expired: </div>
                  <div>{referal.expiredDate}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>Promotion : </div>
                  <div>{referal.promotion}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>Status </div>
                  <div>{referal.status}</div>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Link href='/referrals' >See Referrals</Link>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}