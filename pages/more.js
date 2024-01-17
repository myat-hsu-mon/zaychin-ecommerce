import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { ListGroup, ListGroupItem, Row, Col, Container } from 'react-bootstrap'
import Link from 'next/link'
import Icon from '../components/Icon'
import { useRecoilValue } from 'recoil'
import request from '../utils/request'
import styles from '../scss/More.module.scss'
import { loggedIn, userToken } from '../utils/recoil-helper'

export default function More() {
  const isUserLoggedIn = useRecoilValue(loggedIn)
  const token = useRecoilValue(userToken)
  const [notifications, setNotifications] = useState([])
  const [notiCount, setNotiCount] = useState(0)

  const fetchNotifications = async () => {
    const response = await request('more', {
      params: { platform: 'new_web' },
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('Notifications ', response.data)
    response.data.map((data) => setNotiCount((prev) => prev + data.count))
    setNotifications(response.data)
  }

  return (
    <HomeLayout>
      <Container>
        <Row className='justify-content-center'>
          <Link
            href={isUserLoggedIn ? '/account' : '/login?redirect='}
            passHref
            className='text-muted'
          >
            <Col md={2} className={styles.gridItem}>
              <div className={`${styles.gridItemIcon} bg-gradient-primary`}>
                <Icon name='PersonCircle' size={20} color='#fff' />
              </div>
              <span>မိမိအကောင့်</span>
            </Col>
          </Link>
          <Link
            href={isUserLoggedIn ? '/orders' : '/login?redirect=orders'}
            passHref>
            <Col md={2} className={styles.gridItem}>
              <div className={`${styles.gridItemIcon} bg-gradient-info`}>
                <Icon name='Basket' size={20} color='#fff' />
              </div>
              <span>မှာဖူးသော အော်ဒါများ</span>
            </Col>
          </Link>
          <Link
            href={isUserLoggedIn ? '/addresses' : '/login?redirect=addresses'}
            passHref
            className='text-muted'>
            <Col md={2} className={styles.gridItem}>
              <div className={`${styles.gridItemIcon} bg-gradient-danger`}>
                <Icon name='Map' size={20} color='#fff' />
              </div>
              <span>မိမိလိပ်စာများ</span>
            </Col>
          </Link>
          <Link
            href={isUserLoggedIn ? '/referrals' : '/login?redirect=referrals'}
            passHref>
            <Col md={2} className={styles.gridItem}>
              <div className={`${styles.gridItemIcon} bg-gradient-primary`}>
                <Icon name='Link' size={20} color='#fff' />
              </div>
              <span>ဖိတ်ခေါ်ခြင်း </span>
            </Col>
          </Link>
        </Row>
      </Container>
    </HomeLayout >
  )
}
