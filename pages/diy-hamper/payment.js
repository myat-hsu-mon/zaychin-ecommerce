import AppContainer from '../../components/AppContainer'
import HomeLayout from '../../components/HomeLayout'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import Router from 'next/router'
import PaymentMethods from '../../components/PaymentMethods'
import { productsInHamperCart } from '../../utils/recoil-helper'
import { useRecoilState } from 'recoil'
import styles from '../../scss/Address.module.scss'
import Cookies from 'js-cookie'
import Timeline from '../../components/Timeline'

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState()
  const [selectedSubPaymentMethod, setSelectedSubPaymentMethod] = React.useState(null)
  const [productsInsideHamperCart, setProductsInsideHamperCart] = useRecoilState(productsInHamperCart)

  const submitOrder = (e) => {
    Router.push({
      pathname: '/diy-hamper/checkout',
      query: {
        hamper: true
      }
    })
  }
  
  const onSelectPaymentMethod = (paymentMethod) => {
    console.log('pay: ', paymentMethod)
    setSelectedPaymentMethod(paymentMethod)
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      paymentMethod
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const onSelectSubPaymentMethod = (subPaymentMethod) => {
    setSelectedSubPaymentMethod(subPaymentMethod)
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      subPaymentMethod
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  React.useEffect(() => {
    console.log('parent useeffect')
    if (selectedPaymentMethod && selectedPaymentMethod !== 'bank_transfer') {
      setSelectedSubPaymentMethod(null)
      Cookies.set('hamperCart', {
        ...productsInsideHamperCart,
        subPaymentMethod: {}
      })
      setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
    }
  }, [selectedPaymentMethod])

console.log('paymentMethods ', productsInsideHamperCart.paymentMethod)
console.log('selectedPayment', selectedPaymentMethod)

  return (
    <HomeLayout>
      <AppContainer>
        <Timeline active={4} total={5}/>
        <Row>
          <Col md={10} className='m-auto'>
            <Card className={`mt-4 ${styles.addressCard}`}>
              <h4 className='ml-4 mt-4'>ငွေပေးချေမည့်နည်းလမ်းကိုရွေးပါ</h4>
              <PaymentMethods
                onSelectPaymentMethod={onSelectPaymentMethod}
                onSelectSubPaymentMethod={onSelectSubPaymentMethod}
              />
              <Card.Footer style={{ backgroundColor: 'white' }}>
                <Button
                  style={{ float: 'right' }}
                  onClick={submitOrder}
                  >ရှေ့ဆက်ရန်
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </AppContainer>
    </HomeLayout>
  )
}