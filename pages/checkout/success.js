import React from 'react'
import Icon from '../../components/Icon'
import HomeLayout from '../../components/HomeLayout'
import { Button, Alert } from 'react-bootstrap'
import Router, { useRouter } from 'next/router'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const payment = router.query.payment
  const orderNumber = router.query.orderNumber

  return (
    <HomeLayout>
      <div className='text-center m-4'>
        <Icon name='ClipboardCheck' size={100} color='#05c76e' />
        <h4 className='mt-4'>သင့်၏အော်ဒါအား လက်ခံရရှိပါသည်</h4>
        <p>Zay Chin ဖက်မှ မကြာခင်အတည်ပြုပေးပါမည်</p>
        <div className='d-flex justify-content-center'>
          <Button className='mx-2' variant='light' onClick={() => {
            Router.push(`/orders/${orderNumber}`)
          }}>
            အော်ဒါအသေးစိတ်အားကြည့်မည်
          </Button>
          <Button className='mx-2' onClick={() => {
            Router.push('/')
          }}>ဆက်လက်ဝယ်ယူမည်</Button>
        </div>
        {
          payment &&
          <div className='mt-4'>
            <Alert show={payment === 'true'} variant='success' className='d-inline'>ငွေပေးချေမှုအောင်မြင်သည်</Alert>
            <Alert show={payment !== 'true'} variant='warning' className='d-inline'>ငွေပေးချေမှုမအောင်မြင်ပါ</Alert>
          </div>
        }
      </div>
    </HomeLayout>
  )
}
