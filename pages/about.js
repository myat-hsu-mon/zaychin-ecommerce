import React from 'react'
import HomeLayout from '../components/HomeLayout'
import { Container, Row, Col } from 'react-bootstrap'
import Img from '../components/Img'

export default function about() {
  return (
    <HomeLayout>
      <div
        style={{
          backgroundImage:
            'url(https://zaychin.sgp1.cdn.digitaloceanspaces.com/new/80127560_1008660512834291_78906593701265408_o.jpg)',
          height: 600,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 300,
            margin: 'auto',
            top: '50%',
            left: 0,
            right: 0,
            marginTop: -150,
            backgroundColor: '#fff',
            padding: 64,
          }}
        >
          <h1>#စျေးခြင်း</h1>
          <p className='lead'>
            အိမ်ရှင်မတွေ နေ့စဥ်လိုအပ်တဲ့ အသားငါ၊​ ဟင်းသီးဟင်းရွက်နဲ့
            အခြားလိုအပ်တဲ့ကုန်ပစ္စည်းတွေကို ဖုန်းထဲကနေပဲ​
            အလွယ်တကူဝယ်ယူနိုင်အောင် Zay Chin ကို ၂၀၁၈ ခုနှစ်မှာ စတင်ခဲ့ပါတယ်။
          </p>
        </div>
      </div>
      <Container className='mt-4'>
        <Row>
          <Col md={6} className='align-self-center mt-4 p-3'>
            <h1>#စျေးခြင်း</h1>
            <p className='lead'>
              အိမ်ရှင်မတွေ နေ့စဥ်လိုအပ်တဲ့ အသားငါ၊​ ဟင်းသီးဟင်းရွက်နဲ့
              အခြားလိုအပ်တဲ့ကုန်ပစ္စည်းတွေကို ဖုန်းထဲကနေပဲ​
              အလွယ်တကူဝယ်ယူနိုင်အောင် Zay Chin ကို ၂၀၁၈ ခုနှစ်မှာ စတင်ခဲ့ပါတယ်။
            </p>
          </Col>
          <Col>
            <Img
              className='rounded'
              src='https://zaychin.sgp1.cdn.digitaloceanspaces.com/new/80226113_1008660552834287_2676955529644867584_o.jpg'
            />
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}
