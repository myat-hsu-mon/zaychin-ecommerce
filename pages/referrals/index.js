import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import {
  ListGroup,
  Button,
  Row,
  Col,
  Modal,
  Pagination,
  Alert,
  InputGroup,
  FormControl,
  Jumbotron,
  Container
} from 'react-bootstrap'
import Link from 'next/link'
// import Container from '../../components/AppContainer'
import request from '../../utils/request'
import Loading from '../../components/Loading'
import Icon from '../../components/Icon'
import { parseCookie } from '../../utils/cookie'
import styles from '../../scss/Referral.module.scss'
import Layout from '../../components/Layout'
import { useRecoilValue } from 'recoil'
import { userInfo, userToken } from '../../utils/recoil-helper'
import isMmPhoneNumber from '../../utils/isMmPhoneNumber'
import ProtectedPage from '../../components/ProtectedPage'

export default function Referrals({ data }) {
  console.log('initial referrals: ', data)

  const router = useRouter()
  const token = useRecoilValue(userToken)
  const [referrals, setReferrals] = React.useState(data.data ? data.data.data : [])
  const [referral, setReferral] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [lastPage, setLastPage] = React.useState(data.data ? data.data.lastPage : 0)
  const [isModalShown, setIsModalShown] = React.useState(false)
  const [alertType, setAlertType] = React.useState('warning')
  const [isAlertShown, setIsAlertShown] = React.useState(false)
  const [alertSuccessMessage, setAlertSuccessMessage] = React.useState('')
  const [alertWarningMessage, setAlertWarningMessage] = React.useState('')

  const focusText = React.useRef()
  const { phone } = useRecoilValue(userInfo)
  const [referreePhones, setReferreePhones] = React.useState([''])
  const [isError, setIsError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleChange = (value, index) => {
    try {
      setIsError(false)
      const tempReferreePhones = [...referreePhones]
      tempReferreePhones[index] = value
      if (index === referreePhones.length - 1) {
        tempReferreePhones[index + 1] = ''
      }
      setReferreePhones(tempReferreePhones)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleRemove = (index) => {
    if (referreePhones.length > 1) {
      const temp = [...referreePhones]
      temp.splice(index, 1)
      setReferreePhones(temp)
    }
  }

  const onSubmit = async () => {
    try {
      setAlertSuccessMessage('')
      setAlertWarningMessage('')
      setIsAlertShown(false)
      setIsLoading(true)
      const phones = referreePhones.filter(phone => phone)
      console.log('phones', phones)
      const isAllValid = phones.every(phone => isMmPhoneNumber(phone))

      if (isAllValid && phones.length) {
        const response = await request('referrals/send', {
          method: 'POST',
          body: {
            referree_phones: phones
          },
          params: {
            platform: 'new_web',
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('invitaiton response ', response)
        if (response.success) {
          setReferreePhones([''])
          setIsLoading(false)

          let fail = response.result
            .filter(({ success }) => !success)
            .map(({ phone }) => phone)

          let success = response.result
            .filter(({ success }) => success)
            .map(({ phone }) => phone)

          fail = fail.toString()
          success = success.toString()

          setIsAlertShown(true)
          success && setAlertSuccessMessage(`${success.replace(',', ', ')} အား ဖိတ်ခေါ်မှု အောင်မြင်ပါသည်။`)
          success && setAlertType('success')
          fail && setAlertWarningMessage(`${fail.replace(',', ', ')} သည် ဝယ်ယူဖူးသည့် customer ဖြစ်သည့်အတွက် ဖိတ်ခေါ်၍ မရနိုင်ပါ။`)
          fail && setAlertType('warning')
        } else {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        setIsError(true)
        setErrorMessage('ဖုန်းနံပါတ် မှားယွင်းနေပါသည်။')
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setErrorMessage('တစ်ခုခု မှားယွင်းနေပါသည်။')
    }
  }

  const fetchReferrals = async (page) => {
    try {
      setIsLoading(true)
      const response = await request('referrals', {
        params: {
          platform: 'new_web',
          page,
          limit: 20,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.success) {
        setPage(response.data.page)
        setReferrals(response.data.data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        console.log('response fail')
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Error', error)
    }
  }

  const handleOnClick = async (referral) => {
    setIsModalShown(true)
    setReferral(referral)
  }

  React.useEffect(() => {
    // if (!isLoading) {
    //   focusText.current.focus()
    // }
  }, [])

  return (
    <ProtectedPage>
      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
            <div>
              <Jumbotron>
                <Container>
                  <Row className='justify-content-md-center '>
                    <Col md={8} className='text-center'>
                      <img
                        src='https://zaychin.sgp1.cdn.digitaloceanspaces.com/other/refer-a-friend.jpg'
                        className='img-fluid '
                        width='100px'
                      />
                    </Col>
                  </Row>
                  <Row >
                    <Col md={8} className='m-auto'>
                      <h1 className='my-4 h2 text-center'>သူငယ်ချင်းတွေကို ဖိတ်ခေါ်ပြီး ၃၀၀၀ ကျပ် ကူပွန်ကုဒ်များ<br />အကန့်အသတ်မဲ့ရယူပါ</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8} className='m-auto'>
                      <p className='lead mb-4 text-center'>သင်ဖိတ်ခေါ်ပေးတဲ့ သူငယ်ချင်းက စျေးစဝယ်ပြီဆိုတာနဲ့ သင်ရော သင့်သူငယ်ချင်းတွေပါ ၃၀၀၀ ကျပ်တန်ကူပွန် လက်ဆောင်ရရှိမှာဖြစ်ပါတယ်</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={8} lg={4} className='m-auto'>
                      {
                        isAlertShown &&
                        <Alert
                          variant={alertType}
                          dismissible
                          className='mt-4 text-center'
                          onClose={() => setIsAlertShown(false)}
                        >
                          <div>{alertSuccessMessage}</div>
                          <div>{alertWarningMessage}</div>
                        </Alert>
                      }
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col xs={12} md={8} lg={4} className='m-auto'>
                      <div>
                        <label>သင့်သူငယ်ချင်းဖုန်းနံပါတ်ထည့်ပါ</label>
                        {
                          referreePhones.map((referree, index) => (
                            <div className='d-flex align-items-center justify-content-between mb-2' key={index}>
                              <InputGroup>
                                <FormControl
                                  ref={focusText}
                                  type='tele'
                                  placeholder='09'
                                  value={referree}
                                  onChange={(e) => handleChange(e.target.value, index)}
                                />
                              </InputGroup>
                              {
                                index > 0 &&
                                <Button onClick={() => handleRemove(index)} variant='danger' className='ml-2'>
                                  <Icon name='Trash' size={10} />
                                </Button>
                              }
                            </div>
                          ))
                        }
                      </div>
                      <Button block onClick={onSubmit} className={`mt-4 ${!referreePhones[0].length && 'btn-secondary'}`} disabled={!referreePhones[0].length}>ဖိတ်ခေါ်မည် </Button>
                      {
                        isError &&
                        <Alert
                          variant='warning'
                          dismissible
                          className='mt-4'
                          onClose={() => setIsError(false)}
                        >
                          {errorMessage}
                        </Alert>
                      }
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>

              {
                referrals.length > 0 &&
                <Container>
                  <Row>
                    <Col xs={12} md={8} lg={6} className='m-auto'>
                      <div className='justify-content-center align-items-center'>
                        <h3 className='text-center' id='referrals'>ဖိတ်ခေါ်မှု မှတ်တမ်းများ </h3>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <div className='d-flex justify-content-between align-items-center '>
                              <div className='font-weight-bold'>ဖုန်းနံပါတ်</div>
                              <div className='font-weight-bold'>အခြေအနေ</div>
                            </div>
                          </ListGroup.Item>
                          {referrals.map((referral, index) => (
                            <ListGroup.Item
                              className=' mb-2'
                              key={index}
                              id='referral-detail'
                            >
                              <a onClick={() => handleOnClick(referral)}>
                                <div className='d-flex justify-content-between align-items-center '>
                                  <div>{referral.referree_phone}</div>
                                  <span
                                    className={`badge badge-pill ${referral.status === 'send'
                                      ? 'badge-warning'
                                      : 'badge-primary'
                                      }`}
                                  >
                                    {referral.status}
                                  </span>
                                </div>
                              </a>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Pagination className='justify-content-between align-items-center px-4'>
                          <Pagination.First
                            disabled={page === 1 ? true : false}
                            onClick={() => fetchReferrals(page - 1)}
                          />
                          <Pagination.Last
                            disabled={page === lastPage ? true : false}
                            onClick={() => fetchReferrals(page + 1)}
                          />
                        </Pagination>
                      </div>
                    </Col>
                  </Row>
                </Container>
              }
              <Modal
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
                centered
              >
                <Modal.Header className='d-flex align-items-center justify-content-between'>
                  <h4 className='ml-4 mt-2'>Referral Details</h4>
                  <span onClick={() => setIsModalShown(false)}>
                    <Icon name='X' size={20} />
                  </span>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>လက်ခံမည့်သူ၏ဖုန်းနံပါတ် </div>
                        <div>{referral?.referree_phone}</div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>ကုန်ဆုံးရက် </div>
                        <div>{referral?.expiration_date}</div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>အခြေအနေ </div>
                        <span
                          className={`badge badge-pill ${referral?.status === 'send'
                            ? 'badge-warning'
                            : 'badge-primary'
                            }`}
                        >
                          {referral?.status}
                        </span>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Modal.Body>
              </Modal>
            </div>
          )}
      </Layout>
    </ProtectedPage>
  )
}
Referrals.getInitialProps = async (ctx) => {
  try {
    const token = parseCookie(ctx.req, 'TOKEN')
    console.log('token', token)
    const response = await request('referrals', {
      params: {
        platform: 'new_web',
        page: 1,
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('response: ', response)
    if (response.success) {
      return {
        data: response,
      }
    } else {
      return {
        data: {},
      }
    }
  } catch (error) {
    console.log('Error: ', error)
  }
}
