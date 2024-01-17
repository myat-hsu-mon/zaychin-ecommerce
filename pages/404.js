import React from 'react'
import { Button, Container } from 'react-bootstrap'
import HomeLayout from '../components/HomeLayout'
import classes from '../scss/Fourofour.module.scss'

export default function FourOFour() {
  return (
    <HomeLayout>
      <Container className={classes.container}>
        <h1 className='border rounded-pill p-4 bg-light'> 404</h1>
        <h3> ဤစာမျက်နှာအား မတွေ့ပါ</h3>
        <Button href='/' passHref className='mt-3'>ဆက်လက်ဝယ်ယူမည် </Button>
      </Container>
    </HomeLayout>
  )
}
