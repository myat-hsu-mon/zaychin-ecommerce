import {
  ListGroup,
  Button,
  Modal,
  Row,
  Col,
  Card
} from 'react-bootstrap'
import styles from '../../scss/Address.module.scss'

import moment from '../../utils/moment'
import request from '../../utils/request'
import _ from 'lodash'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  productsInCart,
  clearCart,
  userInfo,
  productsInHamperCart,
  userToken
} from '../../utils/recoil-helper'
import Router, { useRouter } from 'next/router'
import Icon from '../../components/Icon'
import HomeLayout from '../../components/HomeLayout'
import AppContainer from '../../components/AppContainer'
import AddNewHamperAddress from '../../components/address/AddNewHamperAddress'
import Timeline from '../../components/Timeline'
const timeRanges = [
  {
    key: 'flexible',
    name: 'မည့်သည့်အချိန်ဖြစ်ဖြစ် အဆင်ပြေသည်',
    shortName: 'တစ်နေကုန်',
  },
  {
    key: '0900-1300',
    name: 'မနက် ၉နာရီ မှ နေ့လည် ၁နာရီ',
    shortName: '၉နာရီ - ၁နာရီ',
  },
  {
    key: '1400-1800',
    name: 'နေ့လည် ၂နာရီ မှ ညနေ ၆နာရီ',
    shortName: '၂နာရီ - ၆နာရီ',
  },
]

const paymentMethods = [
  {
    key: 'cod',
    name: 'အိမ်ရောက်ငွေချေ',
    shortName: 'အိမ်ရောက်ငွေချေ',
  },
  {
    key: 'bank_transfer',
    name: 'ဘဏ်လွှဲ',
    shortName: 'ဘဏ်လွှဲ',
    subs: [
      {
        key: 'kbz',
        name: 'KBZ',
        shortName: 'KBZ',
      },
      {
        key: 'cb',
        name: 'CB',
        shortName: 'CB',
      },
      {
        key: 'aya',
        name: 'AYA',
        shortName: 'AYA',
      },
    ],
  },
]

export default function Address() {
  const router = useRouter()
  const diyAddress = router.query.diyAddress
  const cart = useRecoilValue(productsInCart) 
  const token = useRecoilValue(userToken)
  const userInformation = useRecoilValue(userInfo)
  const [productsInsideHamperCart, setProductsInsideHamperCart] = useRecoilState(productsInHamperCart)

  const [note, setNote] = React.useState('')
  const [clear, setClear] = useRecoilState(clearCart)

  const [addresses, setAddresses] = React.useState([])
  const [isOpenAddress, setIsOpenAddress] = React.useState(false)

  React.useEffect(() => {
    setAddresses(productsInsideHamperCart.addresses)
  }, [])

  async function getOrderDates() {
    try {
      const response = await request('order-dates', {
        params: { platform: 'new_web' },
      })

      if (response.success) {
        setOrderDates(response.data)
      }
    } catch (error) {
      alert('Error fetching order dates')
    }
  }

  const onAddNewAddress = (item) => {
    setAddresses([...addresses, item])
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      addresses: [...productsInsideHamperCart.addresses, item]
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }
   
console.log('adddress in hamper', productsInsideHamperCart.addresses)
console.log('addess: ', addresses)
    const deleteAddress = async (address_id) => {
      // Delete address_id of user_id
      const response = await request(`addresses/${address_id}`, {
        method: 'delete',
        params: { platform: 'new_web' },
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.success) {
        let indexOfDeletedId = _.findIndex(addresses, function (address) {
          return address.id === address_id
        })
        let removedArray = [...addresses]
        removedArray.splice(indexOfDeletedId, 1)
        console.log(removedArray)
        setAddresses(removedArray)

        Cookies.set('hamperCart', {
          ...productsInsideHamperCart,
          addresses: [...removedArray]
        })
        setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
      }
    }
  const goToNext = () => {
    console.log('go to next')
    Router.push('/diy-hamper/payment')
  }
  return (
    <HomeLayout>
      <AppContainer>
        <Timeline active={3} total={5} />
        <Row>
          <Col md={10} className={` m-auto ${styles.addressCard}`}>
            <Card className={`mt-4 `}>
              <Card.Header>
                <h5 className='d-inline-block'>ပေးပို့ရမည့် လိပ်စာများထည့်ပါ </h5>
                <Button
                  className={`d-inline-block ${styles.addNewButton}`}
                  onClick={() => setIsOpenAddress(true)}
                  size="lg"
                >
                  လိပ်စာအသစ်ထည့်ပါ
                  </Button>
              </Card.Header>
              <div>
                <ListGroup >
                  {
                    addresses && addresses.map((address, index) => (
                      <ListGroup.Item key={index}>
                        <div className='d-inline-block w-75'  >
                          <h4 className={`text-truncate ${styles.address}`}>
                            {address && address.address} , Township
                          </h4>
                          <p
                            className={styles.deliverDate}
                          >
                            {`${address && moment(address.selectedDate).format('YYYY-MM-DD')} ${address && moment(address.selectedDate).format('dddd')}`}
                          </p>
                        </div>
                        <div className='text-right d-inline-block  w-25' >
                          <Button
                            onClick={() => deleteAddress(address.id)}
                            variant='light'
                          >
                            <Icon name='Trash' size={10} color='#545a65' />
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))
                  }
                </ListGroup>
                <Modal
                  show={isOpenAddress}
                  onHide={() => setIsOpenAddress(false)}
                >
                  <AddNewHamperAddress
                    diyAddress={true}
                    handleClose={() => setIsOpenAddress(false)}
                    onAddNewAddress={onAddNewAddress}
                  />
                </Modal>
              </div>
              <div>
                {
                  addresses.length > 0 && <Button onClick={goToNext} block >ရှေ့ဆက်ရန်</Button> 
                }
              </div>
            </Card>
          </Col>
        </Row>
      </AppContainer>
    </HomeLayout>
  )
}