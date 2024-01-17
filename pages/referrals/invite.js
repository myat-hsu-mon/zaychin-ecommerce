import { FormControl, InputGroup, Row, Col, Button, Alert } from 'react-bootstrap';
import { useRecoilValue } from 'recoil'
import Router, { useRouter } from 'next/router'
import Container from '../../components/AppContainer'
import HomeLayout from "../../components/HomeLayout"
import request from '../../utils/request';
import Loading from '../../components/Loading'
import isMmPhoneNumber from '../../utils/isMmPhoneNumber'
import Icon from '../../components/Icon'
import Layout from '../../components/Layout'
import { userInfo, userToken } from '../../utils/recoil-helper'
import classes from '../../scss/Referral.module.scss'

export default function Invite() {
  const focusText = React.useRef()
  const router = useRouter()
  const token = useRecoilValue(userToken)
  const {phone} = useRecoilValue(userInfo)
  const [referreePhones, setReferreePhones] = React.useState([''])
  const [isLoading, setIsLoading] = React.useState(false)
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

  // const handleAdd = () => {
  //   const isAllValid = referreePhones.every(phone => isMmPhoneNumber(phone))
  //   if (isAllValid) {
  //     setReferreePhones([...referreePhones, '09'])
  //   }
  // }

  const handleRemove = (index) => {
    if (referreePhones.length > 1) {
      const temp = [...referreePhones]
      temp.splice(index, 1)
      setReferreePhones(temp)
    }
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const phones = referreePhones.filter(phone => phone)
      // console.log('phones', phones)
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
          setIsLoading(false)

          const fail = response.result
            .filter(({ success }) => !success)
            .map(({ phone }) => phone)

          const success = response.result
            .filter(({ success }) => success)
            .map(({ phone }) => phone)

          router.push({
            pathname: '/referrals',
            query: {
              success: success.toString(),
              fail: fail.toString()
            }
          })
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

  React.useEffect(() => {
    focusText.current.focus()
  }, [])

  if (isLoading) {
    return (
      <HomeLayout>
        <Loading />
      </HomeLayout>
    )
  }

  return (
    // <Layout>
      <Container className='mt-3'>
        <Row className='d-flex flex-column justify-content-center align-items-center ml-3 mr-3' >
          <Col xs={12} md={8} lg={6}>
            <div className={`${classes.referralMessage}`}>
            ၁၅၀၀၀ ကျပ်ဖိုး ဝယ်ယူရုံဖြင့် Zay Chin App တွင် ၃၀၀၀ ကျပ် လျှော့စျေး ရရှိရန် {phone} မှ ဖိတ်ခေါ်ထားပါသည်။ လျှော့စျေးကုဒ် XXXXXX ကို အသုံးပြုပေးပါ။ 
            </div>
            <label>သင်ဖိတ်ခေါ်မည့် သူငယ်ချင်းများ၏ ဖုန်းနံပါတ်ဖြည့်ပါ</label>
            {
              referreePhones.map((referree, index) => (
                <div className='d-flex align-items-center justify-content-between mb-2' key={index}>
                  <InputGroup className='mr-2'>
                    <FormControl
                      ref={focusText}
                      type='tele'
                      placeholder='09'
                      value={referree}
                      onChange={(e) => handleChange(e.target.value, index)}
                    />
                  </InputGroup>
                  <Button onClick={() => handleRemove(index)} variant='danger' >
                    <Icon name='Trash' size={10} />
                  </Button>
                </div>
              ))
            }
            <Button block onClick={onSubmit} className='mt-4' >ဖိတ်ခေါ်မည် </Button>
            {
              isError &&
              <Alert
                variant='warning'
                dismissible
                className='mt-4'
                onClose={() => setIsError(false)}
              >
                {errorMessage}</Alert>
            }
            {/* <div className='mt-3 border p-3 rounded-top rounded-right' >
              hello
            </div> */}
          </Col>
        </Row>
      </Container>
    // </Layout>
  )
}