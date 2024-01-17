import React from 'react'
import request from '../utils/request'
import Router, { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { phoneForOTP } from '../utils/recoil-helper'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import styles from '../scss/Auth.module.scss'

function Login() {
  const router = useRouter()
  const { redirect } = router.query
  const phoneInput = React.useRef(null)
  const [phone, setPhone] = useRecoilState(phoneForOTP)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setTimeout(() => {
      phoneInput.current.focus()
    }, 1000)
  }, [])

  //Handle get OTP
  const getOTPHandler = async (e) => {
    try {
      e.preventDefault()
      const getOTP = await request('otp', {
        method: 'post',
        body: { phone },
      })
      if (getOTP.success) {
        Router.replace({
          pathname: `/verification`,
          query: {
            redirect: redirect || ''
          },
        })
        return
      }
      setError(getOTP.message)
    } catch (error) {
      console.error('OTP error', error)
    }
  }

  return (
    <Container className='h-100 bg-art'>
      <div className='p-4'>
        <h3 className='text-center m-4'>မိမိဖုန်းနံပါတ်ဖြင့် မှတ်ပုံတင်ပါ</h3>
        <Form onSubmit={getOTPHandler} className={styles.form}>
          {error && <Alert variant={'danger'}>{error}</Alert>}
          <Form.Group>
            <Form.Control
              ref={phoneInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='09'
              type='tel'
            />
          </Form.Group>
          <Button block type='submit'>
            မှတ်ပုံတင်မည်
          </Button>
        </Form>
      </div>
    </Container>
  )
}
export default Login
