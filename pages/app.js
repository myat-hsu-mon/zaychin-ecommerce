import React from 'react'
import styles from '../scss/AppPage.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import HomeLayout from '../components/HomeLayout'
import Icon from '../components/Icon'

export default function AppPage() {
  return (
    <HomeLayout>
      <Container className='mt-4'>
        <Row className='align-items-center justify-content-center'>
          <Col md={5} sm={8} xs={8}>
            <h2>Application နဲ့စျေးဝယ်ပါ</h2>
            <p>
              နေ့စဥ်လိုအပ်တဲ့ပစ္စည်းတွေကို ပိုပြီးလွယ်လွယ်ကူကူနဲ့
              ဝယ်လို့ရဖို့အတွက် Zay Chin app ကိုအသုံးပြုပြီးဝယ်လိုက်ပါ။
            </p>
            <div className='d-flex'>
              <a
                href='https://play.google.com/store/apps/details?id=com.zaychin'
                className='mr-2'
                target='_blank'
              >
                <img
                  src='https://get.zaychin.com/frontend/play-store.png'
                  width={120}
                  className='img-fluid'
                />
              </a>
              <a
                href='https://itunes.apple.com/us/app/zay-chin/id1420150360'
                target='_blank'
              >
                <img
                  src='https://get.zaychin.com/frontend/app-store.png'
                  width={120}
                  className='img-fluid'
                />
              </a>
            </div>
            <div className='mt-2'>
              <a href='https://zaychin.sgp1.digitaloceanspaces.com/apks/zaychin-latest.apk'>
                <small>
                  <Icon name='CloudDownload' size={16} className='mr-1' />
                  APK တိုက်ရိုက်ရယူရန်
                </small>
              </a>
            </div>
          </Col>
          <Col md={5} sm={4} xs={4} className='overflow-hidden py-3'>
            <div className={styles.device}>
              <div className={styles.screenshot}>
                <img src='/imgs/app-screenshot.png' />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}
