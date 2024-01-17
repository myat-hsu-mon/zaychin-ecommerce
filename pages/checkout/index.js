import { useEffect } from 'react';
import {
  Accordion,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
  Toast,
  InputGroup,
  FormControl,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import withMasterLayout from '../../hocs/withMasterLayout';
import Icon from '../../components/Icon';
import styles from '../../scss/Checkout.module.scss';
import moment from '../../utils/moment';
import MyAddresses from '../../components/MyAddresses';
import request from '../../utils/request';
import _ from 'lodash';
import Loading from '../../components/Loading';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  productsInCart,
  productsInHamperCart,
  clearCart,
  userInfo,
  userAddress,
  totalCost,
  hamperTotalCost,
  clearHamperCart,
  userToken,
} from '../../utils/recoil-helper';
import Router, { useRouter } from 'next/router';
import AppContainer from '../../components/AppContainer';
import OrderTotalDetail from '../../components/OrderTotalDetail';
import DatesAndTimeRanges from '../../components/DatesAndTimeRanges';
import Timeline from '../../components/Timeline';
import ProtectedPage from '../../components/ProtectedPage';
import HomeLayout from '../../components/HomeLayout';
import Cookies from 'js-cookie';
import { remove } from 'lodash'

let paymentMethods = [
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
        key: 3,
        name: 'KBZ',
        shortName: 'KBZ',
      },
      {
        key: 1,
        name: 'CB',
        shortName: 'CB',
      },
      {
        key: 2,
        name: 'AYA',
        shortName: 'AYA',
      },
      {
        key: 4,
        name: 'WAVE MONEY',
        shortName: 'wavemoney',
      },
    ],
  },
  // {
  //   key: 'kbzpay',
  //   name: 'KBZ PAY',
  //   shortName: 'kbzpay'
  // },
  {
    key: 'ayapay',
    name: 'AYA PAY',
    shortName: 'ayapay',
  },
  // {
  //   key: 'mytelpay',
  //   name: 'MYTEL PAY',
  //   shortName: 'mytelpay'
  // }
  {
    key: 'onepay',
    name: 'Onepay',
    shortName: 'onepay'
  },
  {
    key: 'mptmoney',
    name: 'MPT Pay',
    shortName: 'mptmoney',
  },
];

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
];

function Checkout() {
  const router = useRouter();
  const diyAddress = router.query.diyAddress;
  const hamper = router.query.hamper;
  const cart = useRecoilValue(productsInCart);
  const productsInsideHamperCart = useRecoilValue(productsInHamperCart);
  const token = useRecoilValue(userToken);
  const userInformation = useRecoilValue(userInfo);
  const [usAddress, setUsAddress] = useRecoilState(userAddress);
  const total = useRecoilValue(totalCost);
  const hamperTotal = useRecoilValue(hamperTotalCost);
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [dates, setDates] = React.useState([]);
  const [orderDates, setOrderDates] = React.useState([]); // order dates from db
  const [selectedDate, setSelectedDate] = React
    .useState
    // new Date().getHours() < 17 ? moment().add(1, 'd') : moment().add(2, 'd')
    ();
  const [selectedDeliveryTimeRange, setSelectedDeliveryTimeRange] =
    React.useState(timeRanges[0]);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(
    paymentMethods[0]
  );
  const [plasticBag, setPlasticBag] = React.useState(false);
  const [callBeforeDelivery, setCallBeforeDelivery] = React.useState(true);
  const [selectedSubPaymentMethod, setSelectedSubPaymentMethod] =
    React.useState(null);
  const [activeItem, setActiveItem] = React.useState(
    userInformation.name ? 'address' : 'name'
  );
  const [note, setNote] = React.useState('');
  const [clear, setClear] = useRecoilState(clearCart);
  const [clearHamper, setClearHamper] = useRecoilState(clearHamperCart);
  const [display, setDisplay] = React.useState('none');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);

  function toggleItem(key) {
    setActiveItem(activeItem === key ? null : key);
  }

  async function getOrderDates() {
    try {
      const response = await request('order-dates', {
        params: { platform: 'new_web' },
      });
      if (response.success) {
        const earliestOrderDate = _.find(response.data, { disabled: false });
        setOrderDates(response.data);
        setSelectedDate(moment(earliestOrderDate.date));
      }
    } catch (error) {
      alert('Error fetching order dates', error);
    }
  }

  React.useEffect(() => {
    getOrderDates();
    // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //   remove(paymentMethods, function (n) {
    //     return n.key == 'kbzpay';
    //   })
    // }
  }, []);

  async function submitOrder() {
    let items;
    setLoading(true);
    try {
      if (!selectedAddress) {
        setLoading(false);
        setDisplay('');
      } else if (hamper === 'true') {
        console.log('I WILL ORDER HAMPER CART');
        setLoading(false);
        items = _.map(productsInsideHamperCart.products, (c, key) => ({
          product_id: key,
          quantity: c.quantity,
        }));
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
        ];
        console.log('tiems ', items);
      } else {
        items = _.map(cart, (c, key) => ({
          product_id: key,
          quantity: c.quantity,
        }));
      }
      try {
        if (!userInformation.name && !name) {
          setLoading(false);
          setAlertMessage('ကျေးဇူးပြု၍ သင့်နာမည်ဖြည့်ပေးပါ');
          setAlertOpen(true);
        } else {
          const order = await request('orders', {
            method: 'POST',
            params: {
              platform: 'new_web',
            },
            headers: { Authorization: `Bearer ${token}` },
            body: {
              name,
              address_id: selectedAddress && selectedAddress.id,
              delivery_date: selectedDate.format('YYYY-MM-DD'),
              preferred_delivery_time: selectedDeliveryTimeRange.key,
              payment_method: selectedPaymentMethod.key,
              payment_bank_id:
                selectedSubPaymentMethod && selectedSubPaymentMethod.key,
              note: hamper
                ? ` ${note} \n ${productsInsideHamperCart.content.to} \n ${productsInsideHamperCart.content.body} \n ${productsInsideHamperCart.content.from}`
                : `${note} ${Cookies.get('live') ? ' , order from live sale' : ''
                }`,
              request_plastic_bag: plasticBag,
              call_before_delivery: callBeforeDelivery,
              items,
            },
          });
          console.log('response of order ', order);
          setLoading(false);
          if (order.success) {
            if (
              order.data.payment_method === 'cod' ||
              order.data.payment_method === 'bank_transfer'
            ) {
              Router.push({
                pathname: '/checkout/success',
                query: {
                  orderNumber: order.data.order_number,
                },
              });
              !hamper && setClear();
              hamper && setClearHamper();
            } else {
              if (hamper && hamperTotal < 1000) {
                setAlertMessage(
                  `ငွေ ၁၀၀၀ကျပ်အောက်ပမာဏကို ${order.data.payment_method.toUpperCase()} ဖြင့် ပေးချေ၍မရပါ`
                );
                setAlertOpen(true);
              }
              // else if (order.data.payment_method === 'ayapay' && !hamper && total < 1000) {
              //   setAlertMessage(
              //     `ငွေ ၁၀၀၀ကျပ်အောက်ပမာဏကို ${order.data.payment_method.toUpperCase()} ဖြင့် ပေးချေ၍မရပါ`
              //   )
              //   setAlertOpen(true)
              // }
              else {
                window.location.href =
                  `https://payui.zaychin.com/validate?channel=${order.data.payment_method}&orderId=${order.data.id}&orderNumber=${order.data.order_number}&token=${token}&platform=new_web&redirect=` +
                  encodeURIComponent('https://zaychin.com/checkout/success');
                !hamper && setClear();
                hamper && setClearHamper();
              }
            }
          } else {
            if (order.message) {
              setErrors([
                {
                  message: order.message,
                },
              ]);
            } else {
              // setErrors(order.messages)
              setAlertMessage('ကျေးဇူးပြု၍ သင့်လိပ်စာတစ်ခုခုရွေးပါ');
              setAlertOpen(true);
            }
          }
        }
      } catch (error) {
        console.log('checkout error', error);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const onSelectDate = (selectedDate) => {
    setSelectedDate(selectedDate);
  };
  const onSelectTimeRange = (selectedTimeRange) => {
    setSelectedDeliveryTimeRange(selectedTimeRange);
  };

  useEffect(() => {
    if (selectedAddress) {
      setDisplay('none');
      setUsAddress(selectedAddress);
    }
    userInformation.name ? setActiveItem('address') : setActiveItem('name');
  }, [selectedAddress, orderDates]);

  return (
    <ProtectedPage>
      <HomeLayout>
        <AppContainer>
          {hamper && <Timeline active={3} total={3} />}
          <Row>
            <Col md={8}>
              {loading && <Loading />}
              {errors && (
                <Toast className='m-3'>
                  <Toast.Header>
                    <strong className='mr-auto'>အမှားအချို့ရှိနေပါသည်</strong>
                  </Toast.Header>
                  <Toast.Body>
                    <ListGroup variant='flush'>
                      {errors.map((error, index) => (
                        <ListGroup.Item key={index}>
                          {error.message}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Toast.Body>
                </Toast>
              )}

              <Accordion
                as={ListGroup}
                activeKey={activeItem}
                variant='flush'
                className='mt-3'
              // defaultActiveKey={'name'}
              >
                {!userInformation.name && (
                  <>
                    <Accordion.Toggle
                      as={ListGroupItem}
                      variant='flush'
                      eventKey={'name'}
                      className='d-flex justify-content-between align-items-center cursor-pointer'
                      onClick={() => toggleItem('name')}
                    >
                      <span>အမည်ထည့်သွင်းရန်</span>
                      <div className='d-flex align-items-center'>
                        {activeItem !== 'name' && name && (
                          <span
                            className='mr-3 text-truncate text-right'
                            style={{ maxWidth: '100px' }}
                          >
                            {name}
                          </span>
                        )}
                        <Icon
                          name={
                            activeItem === 'name' ? 'ChevronUp' : 'ChevronDown'
                          }
                          size={18}
                          color='#6c757d'
                        />
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={'name'}>
                      <InputGroup>
                        <FormControl
                          placeholder='သင့်နာမည်ထည့်ပါ'
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          ref={(input) => {
                            input &&
                              window.requestAnimationFrame(() => {
                                input.focus();
                              });
                          }}
                          className={styles.name}
                        />
                      </InputGroup>
                    </Accordion.Collapse>
                  </>
                )}

                {!diyAddress && (
                  <>
                    <Accordion.Toggle
                      as={ListGroupItem}
                      variant='flush'
                      eventKey={'address'}
                      className='d-flex justify-content-between align-items-center cursor-pointer'
                      onClick={() => toggleItem('address')}
                    >
                      <span>လိပ်စာထည့်ရန်</span>
                      <div className='d-flex align-items-center'>
                        {activeItem !== 'address' && selectedAddress && (
                          <span
                            className='mr-3 text-truncate text-right'
                            style={{ maxWidth: '100px' }}
                          >
                            {selectedAddress.address}
                          </span>
                        )}
                        <Icon
                          name={
                            activeItem === 'address'
                              ? 'ChevronUp'
                              : 'ChevronDown'
                          }
                          size={18}
                          color='#6c757d'
                        />
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={'address'}>
                      <MyAddresses
                        selectedAddress={selectedAddress}
                        selectable
                        onSelect={setSelectedAddress}
                      />
                    </Accordion.Collapse>
                  </>
                )}

                <Accordion.Toggle
                  as={ListGroupItem}
                  variant='flush'
                  eventKey={'delivery'}
                  className='d-flex justify-content-between align-items-center cursor-pointer'
                  onClick={() => toggleItem('delivery')}
                >
                  <span>ပို့ဆောင်အချိန်ရွေးချယ်မှု</span>
                  <div className='d-flex align-items-center'>
                    {activeItem !== 'delivery' && selectedDeliveryTimeRange && (
                      <span className='mr-3'>
                        {selectedDeliveryTimeRange.shortName}
                      </span>
                    )}
                    <Icon
                      name={
                        activeItem === 'delivery' ? 'ChevronUp' : 'ChevronDown'
                      }
                      size={18}
                      color='#6c757d'
                    />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={'delivery'}>
                  <div>
                    <DatesAndTimeRanges
                      onSelectDate={onSelectDate}
                      onSelectTimeRange={onSelectTimeRange}
                    />
                  </div>
                </Accordion.Collapse>

                <Accordion.Toggle
                  as={ListGroupItem}
                  variant='flush'
                  eventKey={'payment'}
                  className='d-flex justify-content-between align-items-center cursor-pointer'
                  onClick={() => toggleItem('payment')}
                >
                  <span>ငွေပေးချေမှု</span>
                  <div className='d-flex align-items-center'>
                    {activeItem !== 'payment' && selectedPaymentMethod && (
                      <span className='mr-3'>
                        {selectedPaymentMethod.shortName}
                      </span>
                    )}
                    <Icon
                      name={
                        activeItem === 'payment' ? 'ChevronUp' : 'ChevronDown'
                      }
                      size={18}
                      color='#6c757d'
                    />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={'payment'}>
                  <ul className='list-unstyled px-3'>
                    {paymentMethods.map((paymentMethod) => (
                      <li key={paymentMethod.key} className='py-2'>
                        <Form.Check
                          type={'checkbox'}
                          id={`payment-method-${paymentMethod.key}`}
                          custom
                        >
                          <Form.Check.Input
                            checked={
                              paymentMethod.key === selectedPaymentMethod.key
                            }
                            type={'checkbox'}
                            onClick={() =>
                              setSelectedPaymentMethod(paymentMethod)
                            }
                          />
                          <Form.Check.Label>
                            {paymentMethod.name}
                          </Form.Check.Label>
                          {paymentMethod.subs &&
                            paymentMethod.key === selectedPaymentMethod.key && (
                              <ul className='list-unstyled pl-0'>
                                {paymentMethod.subs.map((subPaymentMethod) => (
                                  <Form.Check
                                    type={'checkbox'}
                                    id={`sub-payment-method-${subPaymentMethod.key}`}
                                    custom
                                    key={subPaymentMethod.key}
                                  >
                                    <Form.Check.Input
                                      checked={
                                        selectedSubPaymentMethod &&
                                        subPaymentMethod.key ===
                                        selectedSubPaymentMethod.key
                                      }
                                      type={'checkbox'}
                                      onClick={() =>
                                        setSelectedSubPaymentMethod(
                                          subPaymentMethod
                                        )
                                      }
                                    />
                                    <Form.Check.Label>
                                      {subPaymentMethod.name}
                                    </Form.Check.Label>
                                  </Form.Check>
                                ))}
                              </ul>
                            )}
                        </Form.Check>
                      </li>
                    ))}
                  </ul>
                </Accordion.Collapse>

                <Accordion.Toggle
                  as={ListGroupItem}
                  variant='flush'
                  eventKey={'instructions'}
                  className='d-flex justify-content-between align-items-center cursor-pointer'
                  onClick={() => toggleItem('instructions')}
                >
                  <span>အထူးညွှန်ကြားချက်များ</span>
                  <div className='d-flex align-items-center'>
                    <Icon
                      name={
                        activeItem === 'instructions'
                          ? 'ChevronUp'
                          : 'ChevronDown'
                      }
                      size={18}
                      color='#6c757d'
                    />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={'instructions'}>
                  <div className='p-3'>
                    <Form.Group>
                      <Form.Label>မှတ်ချက်</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='2'
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Check type={'checkbox'} custom>
                      <Form.Check.Input
                        id='plasticBag'
                        checked={plasticBag}
                        type={'checkbox'}
                        onClick={() => setPlasticBag(!plasticBag)}
                      />
                      <Form.Check.Label htmlFor='plasticBag'>
                        ပလပ်စတစ်အိတ်​ ယူမည်
                      </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type={'checkbox'} custom>
                      <Form.Check.Input
                        id='callBeforeDelivery'
                        checked={callBeforeDelivery}
                        type={'checkbox'}
                        onClick={() =>
                          setCallBeforeDelivery(!callBeforeDelivery)
                        }
                      />
                      <Form.Check.Label htmlFor='callBeforeDelivery'>
                        မပို့ပေးမီ ဖုန်းခေါ်ပေးပါ
                      </Form.Check.Label>
                    </Form.Check>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </Col>
            <Col md={4}>
              <OrderTotalDetail
                hamper={hamper}
                onClickContinue={submitOrder}
                continueBtnText={'အော်ဒါတင်မည်'}
              />
              <Modal
                show={alertOpen}
                onHide={() => setAlertOpen(false)}
                size='sm'
                centered
              >
                <Modal.Body>{alertMessage && alertMessage}</Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setAlertOpen(false)}>ပိတ်မည်</Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </AppContainer>
      </HomeLayout>
    </ProtectedPage>
  );
}
export default Checkout;
