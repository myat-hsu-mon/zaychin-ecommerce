import {
  ListGroup,
  Button,
  Modal,
  Row,
  Col,
  Table
} from 'react-bootstrap'
import styles from '../../scss/Checkout.module.scss'
import moment from '../../utils/moment'
import request from '../../utils/request'
import _ from 'lodash'
import Loading from '../../components/Loading'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  productsInCart,
  clearCart,
  clearHamperCart,
  userInfo,
  productsInHamperCart,
  hamperTotalCost,
  userToken
} from '../../utils/recoil-helper'
import Router, { useRouter } from 'next/router'
import HomeLayout from '../../components/HomeLayout'
import AppContainer from '../../components/AppContainer'
import Timeline from '../../components/Timeline'

export default function Checkout() {
  const router = useRouter()
  const token = useRecoilValue(userToken)
  const [clearHamper, setClearHamper] = useRecoilState(clearHamperCart)
  const hamper = router.query.hamper
  console.log('hamper', hamper)
  const userInformation = useRecoilValue(userInfo)
  const [productsInsideHamperCart, setProductsInsideHamperCart] = useRecoilState(productsInHamperCart)

  const [note, setNote] = React.useState('')
  const [clear, setClear] = useRecoilState(clearCart)
  const [errors, setErrors] = React.useState(null)
  const [addresses, setAddresses] = React.useState([])
  const [isOpenAddress, setIsOpenAddress] = React.useState(false)
  const hamperTotal = useRecoilValue(hamperTotalCost)
  const [loading, setLoading] = React.useState(false)
  const [selectedAddress, setSelectedAddress] = React.useState(null)
  const [alertMessage, setAlertMessage] = React.useState(null)
  const [alertOpen, setAlertOpen] = React.useState(false)

  const submit = async () => {
    try {
      setLoading(true)
      let items = _.map(productsInsideHamperCart.products, (c, key) => ({
        product_id: key,
        quantity: c.quantity,
      }))
      items = [
        ...items,
        {
          product_id: productsInsideHamperCart.basket.id,
          quantity: 1,
        },
        {
          product_id: productsInsideHamperCart.ribbon.id,
          quantity: 1,
        },
        {
          product_id: productsInsideHamperCart.postCard.id,
          quantity: 1,
        },
      ]

      await productsInsideHamperCart.addresses.map(async address => {
        const order = await request('orders', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            name,
            address_id: address.id,
            delivery_date: address.selectedDate,
            preferred_delivery_time: address.selectedTimeRange.key,
            payment_method: productsInsideHamperCart.paymentMethod.key,
            payment_bank_id:
              productsInsideHamperCart.subPaymentMethod && productsInsideHamperCart.subPaymentMethod.key,
            note: `${address.note} \n ${productsInsideHamperCart.content.to} \n ${productsInsideHamperCart.content.body} \n ${productsInsideHamperCart.content.from}`,
            request_plastic_bag: false,
            call_before_delivery: false,
            items,
          },
        })
        console.log('response of order ', order)

        setLoading(false)
        if (order.success) {
          if (
            productsInsideHamperCart.paymentMethod.key === 'cod' ||
            productsInsideHamperCart.paymentMethod.key === 'bank_transfer'
          ) {
            Router.push('/checkout/success')
            hamper && setClearHamper()
          } else {
            if (hamper && hamperTotal < 1000) {
              setAlertMessage(
                `ငွေ ၁၀၀၀ကျပ်အောက်ပမာဏကို ${productsInsideHamperCart.paymentMethod.key && productsInsideHamperCart.paymentMethod.key.toUpperCase()} ဖြင့် ပေးချေ၍မရပါ`
              )
              setAlertOpen(true)
            } else {
              window.location.href =
                `https://payui.zaychin.com/validate?channel=${productsInsideHamperCart.paymentMethod.key}&orderId=${order.data.id}&orderNumber=${order.data.order_number}&token=${token}&platform=new_web&redirect=` +
                encodeURIComponent('https://zaychin.com/checkout/success')
              hamper && setClearHamper()
            }
          }
        } else {
          if (order.message) {
            setErrors([{
              message: order.message
            }])
          } else {
            // setErrors(order.messages)
            setAlertMessage('ကျေးဇူးပြု၍ သင့်လိပ်စာတစ်ခုခုရွေးပါ')
            setAlertOpen(true)
          }
        }
      })
      console.log('hamper: ', productsInsideHamperCart)

    } catch (error) {
      console.log('hamper checkout error: ', error)
    }
    // Router.push('/checkout/success')
  }


  return (
    <HomeLayout>
      <AppContainer>
        <Timeline active={5} total={5} />
        {loading && <Loading />}
        <Table className='mt-4'>
          <tbody>
            <tr>
              <td>ပစ္စည်းစုစုပေါင်းကျသင့်ငွေ</td>
              <td>{hamperTotal && hamperTotal || '0'} Ks</td>
            </tr>
            <tr>
              <td>လက်ဆောင်ခြင်းအရေအတွက်</td>
              <td>{productsInsideHamperCart.addresses && productsInsideHamperCart.addresses.length || '0'}  ခြင်း </td>
            </tr>
            <tr>
              <td>ပေးချေရမည့်ငွေ</td>
              <td>{productsInsideHamperCart.addresses && hamperTotal * productsInsideHamperCart.addresses.length || '0'} Ks</td>
            </tr>
          </tbody>
        </Table>
        <Button
          className='m-auto d-block'
          block
          onClick={submit}
        >အော်ဒါတင်မည်
        </Button>
      </AppContainer>
    </HomeLayout>
  )
}