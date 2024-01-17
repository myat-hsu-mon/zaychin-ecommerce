import React, { useState, useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  phoneForOTP,
  userInfo,
  loggedIn,
  userToken
} from '../utils/recoil-helper'
import request from '../utils/request'
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import OtpInput from 'react-otp-input'

function Verification() {
  const router = useRouter()
  const setUserLoggin = useSetRecoilState(loggedIn)
  const setUserToken = useSetRecoilState(userToken)
  // const otpInput = useRef(null)
  const phone = useRecoilValue(phoneForOTP)
  const [isResend, setIsResend] = useState(false)
  const [otpValue, setOtpValue] = useState(false)
  const setUserInfo = useSetRecoilState(userInfo)
  const [timer, setTimer] = useState(40)
  const [errorMessage, setErrorMessage] = useState(null)
  let interval

  useEffect(() => {
    interval = setInterval(countTimer, 1000)
    // otpInput.current.focus()
    return () => {
      clearInterval(interval)
    }
  }, [])

  React.useEffect(() => {
    if (otpValue.length === 4) {
      loginHandler(otpValue)
    }
  }, [otpValue])

  const countTimer = () => {
    setTimer((prevTime) => {
      if (prevTime === 1) {
        clearTimeout(interval)
      }
      return prevTime - 1
    })
  }

  const resendHandler = async (e) => {
    try {
      e.preventDefault()
      setTimer(60)
      interval = setInterval(countTimer(), 1000)
      console.log('body:', { phone })
      const getOTP = await request('otp', {
        method: 'post',
        body: { phone },
      })
      setIsResend(true)
    } catch (error) {
      console.log(error)
    }
  }

  //Handle login button
  const loginHandler = async (otp) => {
    try {
      const loginResponse = await request('login', {
        method: 'post',
        body: { phone, otp },
      })
      if (loginResponse.success) {
        const user = {
          name: loginResponse.data.name,
          phone: loginResponse.data.phone,
          id: loginResponse.data.id,
        }
        setUserInfo(user)
        setUserLoggin(true)
        setUserToken(loginResponse.token.token)
        Cookies.set('TOKEN', loginResponse.token.token, { expires: 365 })
        if(router.query.redirect){
          Router.replace(`/${router.query.redirect}`)
        }else{
          Router.replace('/')
        }
      } else {
        setErrorMessage(loginResponse.message)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  function onChangeOtpInput(otpText) {
    setOtpValue(otpText)
    // loginHandler(otpText)
  }

  return (
    <Container className='h-100 bg-art'>
      <div className='p-4'>
        <h3 className='text-center m-4'>အတည်ပြုပါ</h3>
        <p className='text-center m-4'>
          သင့် SMS တွင်ရောက်ရှိလာသော ကဏန်း ၄ လုံးအား​ရိုက်ထည့်ပါ
        </p>
        {errorMessage && <Alert variant={'danger'}>{errorMessage}</Alert>}
        <Form>
          <Form.Group>
            <OtpInput
              value={otpValue}
              shouldAutoFocus
              isInputNum
              onChange={onChangeOtpInput}
              numInputs={4}
              containerStyle={{
                justifyContent: 'space-evenly',
                maxWidth: 300,
                margin: '0 auto',
              }}
              inputStyle={{
                width: 50,
                height: 50,
                borderRadius: 10,
                border: 'none',
                backgroundColor: '#eaedef',
              }}
              focusStyle={{
                backgroundColor: '#dbdfe2',
                outline: 'none',
              }}
            />
            {/* <Form.Control
              ref={otpInput}
              type='text'
              placeholder='0000'
              onChange={(e) => onChangeOtpInput(e.target.value)}
            /> */}
          </Form.Group>
          {timer === 0 ? (
            <Button className='mb-3' block onClick={resendHandler}>
              ကုဒ်ပြန်ယူမည်
            </Button>
          ) : (
              <p className='text-center'>
                ကုဒ်ရောက်မလာပါက <strong>စက္ကန့် {timer} အတွင်း</strong>{' '}
              ကုဒ်ပြန်တောင်းပါ
              </p>
            )}
        </Form>
      </div>
    </Container>
  )
}
export default Verification
