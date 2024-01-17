import {
  Accordion,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Row,
  Container,
  Col,
  Card,
  Form,
} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import Cookies from 'js-cookie'

import HomeLayout from '../../components/HomeLayout'
import Icon from '../../components/Icon'
import DIY from '../../components/DIY'
import request from '../../utils/request'
import ProductCard from '../../components/ProductCard'
import _ from 'lodash'
import {
  loggedIn,
  productsInHamperCart,
} from '../../utils/recoil-helper'
import AppContainer from '../../components/AppContainer'
import OrderTotalDetail from '../../components/OrderTotalDetail'
import classes from '../../scss/Diy.module.scss'
import Timeline from '../../components/Timeline'

export default function DiyHamper() {
  const isUserLoggedIn = useRecoilValue(loggedIn)
  const [
    productsInsideHamperCart,
    setProductsInsideHamperCart,
  ] = useRecoilState(productsInHamperCart)
  const [activeItem, setActiveItem] = React.useState('basket')
  const [baskets, setBaskets] = useState([]) // Baskets
  const [selectedBasket, setSelectedBasket] = useState(
    productsInsideHamperCart.basket || baskets[0]
  )
  const [ribbons, setRibbons] = useState([]) // Ribbons
  const [selectedRibbon, setSelectedRibbon] = useState(
    productsInsideHamperCart.ribbon || ribbons[0]
  )
  const [products, setProducts] = useState([]) //Products
  const [selectedProducts, setSelectedProducts] = useState()
  const [postCards, setPostCards] = useState([])
  const [selectedPostCard, setSelectedPostCard] = useState(
    productsInsideHamperCart.postCard || postCards[0]
  )
  const [to, setTo] = useState(
    productsInsideHamperCart.content ? productsInsideHamperCart.content.to : ''
  )
  const [body, setBody] = useState(
    productsInsideHamperCart.content
      ? productsInsideHamperCart.content.body
      : ''
  )
  const [from, setFrom] = useState(
    productsInsideHamperCart.content
      ? productsInsideHamperCart.content.from
      : ''
  )

  const [addresses, setAddresses] = useState([])
  const [isOpenProduct, setIsOpenProduct] = useState(false)
  const [isOpenAddress, setIsOpenAddress] = useState(false)

  const [isDisabled, setIsDisabled] = useState(true)
  const [postCardIndex, setPostCardIndex] = useState()
  console.log('ini: ', postCardIndex)

  function toggleItem(key) {
    setActiveItem(activeItem === key ? null : key)
  }

  const onSelectProduct = (item) => {
    setProducts([...products, item])
  }

  // console.log("products: ", products)
  // console.log('selected', selectedProducts)

  const deleteProduct = (index) => {
    const array = [...selectedProducts]
    array.splice(index, 1)
    setSelectedProducts(array)
  }

  const fetchAllBaskets = async () => {
    const response = await request(`collections/48`, {
      params: {
        platform: 'new_web',
      },
    })
    if (response.success) {
      setBaskets(response.data)
    }
  }

  const fetchAllRibbons = async () => {
    const response = await request(`collections/48`, {
      params: {
        platform: 'new_web',
      },
    })
    if (response.success) {
      setRibbons(response.data)
    }
  }

  const fetchAllPostCards = async () => {
    const response = await request(`collections/48`, {
      params: {
        platform: 'new_web',
      },
    })
    if (response.success) {
      setPostCards(response.data)
    }
  }

  async function fetchHamperProducts() {
    try {
      if (!_.isEmpty(productsInsideHamperCart.products)) {
        const getProductsByIds = await request('products', {
          params: {
            ids: _.keys(productsInsideHamperCart.products).join(','),
          },
        })
        setSelectedProducts(_.mapValues(_.keyBy(getProductsByIds, 'id')))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBasketSelection = (basket) => {
    setSelectedBasket(basket)
    toggleItem('ribbon')
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      basket,
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const handleRibbonSelection = (ribbon) => {
    setSelectedRibbon(ribbon)
    toggleItem('products')
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      ribbon,
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const handlePostCardSelection = (postCard, index) => {
    setPostCardIndex(index)
    setSelectedPostCard(postCard)
    toggleItem('content')
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      postCard,
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const handleToChange = (e) => {
    setTo(e.target.value)
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      content: {
        ...productsInsideHamperCart.content,
        to: e.target.value,
      },
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      content: {
        ...productsInsideHamperCart.content,
        body: e.target.value,
      },
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const handleFromChange = (e) => {
    setFrom(e.target.value)
    Cookies.set('hamperCart', {
      ...productsInsideHamperCart,
      content: {
        ...productsInsideHamperCart.content,
        from: e.target.value,
      },
    })
    setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
  }

  const submit = () => {
    Router.replace(
      isUserLoggedIn
        ? {
          pathname: '/diy-hamper/addresses',
          query: {
            diyAddress: true,
          },
        }
        : {
          pathname: '/login',
          query: {
            redirect: 'diy-hamper/addresses',
            diyAddress: true,
          },
        }
    )
  }

  const onHide = () => {
    // toggleItem('postCard')
    setIsOpenProduct(false)
  }

  useEffect(() => {
    fetchAllBaskets()
    fetchAllRibbons()
    fetchHamperProducts()
    fetchAllPostCards()
  }, [])

  useEffect(() => {
    if (products.length) {
      const values = _.mapValues(_.keyBy(products, 'id'))
      setSelectedProducts({ ...selectedProducts, ...values })
    }
  }, [products])

  return (
    <HomeLayout>
      <AppContainer>
        <Row>
          <Col md={8}>
            <Timeline active={1} total={3} />
            <Accordion
              as={ListGroup}
              variant='flush'
              activeKey={activeItem}
              className='mt-3'
            >
              {/* Choice for Basket */}
              <Accordion.Toggle
                as={ListGroupItem}
                variant='flush'
                eventKey={'basket'}
                className='d-flex justify-content-between align-items-center'
                onClick={() => toggleItem('basket')}
              >
                <span>လက်ဆောင်ခြင်းရွေးချယ်ပါ </span>
                <div className='d-flex align-items-center'>
                  {activeItem !== 'basket' && selectedBasket && (
                    <span className='mr-3'>{selectedBasket.name}</span>
                  )}
                  <Icon
                    name={activeItem === 'basket' ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    color='#6c757d'
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={'basket'}>
                <Row className='mt-3'>
                  {baskets.map((basket, index) => {
                    // return (
                    //   <li className={`list-inline-item`} key={index}>
                    //     <Card
                    //       className={`${
                    //         selectedBasket.id === basket.id && classes.selected
                    //       } ${classes.card}`}
                    //       onClick={() => handleBasketSelection(basket)}
                    //     >
                    //       <img src={basket.thumb} alt='basket' />
                    //       <div>{basket.price} Ks</div>
                    //       <div>{basket.name}</div>
                    //     </Card>
                    //   </li>
                    // )
                    return (
                      <Col md={3}>
                        {selectedBasket.id === basket.id && (
                          <div className={classes.selected}>
                            <Icon name='CheckCircleFill' color={'#05c76e'} />
                          </div>
                        )}
                        <ProductCard
                          hideQuantitySelector
                          product={basket}
                          key={index}
                          onClick={() => handleBasketSelection(basket)}
                        />
                      </Col>
                    )
                  })}
                </Row>
              </Accordion.Collapse>

              {/* Choice for Ribbon */}
              <Accordion.Toggle
                as={ListGroupItem}
                variant='flush'
                eventKey={'ribbon'}
                className='d-flex justify-content-between align-items-center'
                onClick={() => toggleItem('ribbon')}
              >
                <span>ဖဲကြိုးရွေးချယ်ပါ</span>
                <div className='d-flex align-items-center'>
                  {activeItem !== 'ribbon' && selectedRibbon && (
                    <span className='mr-3'>{selectedRibbon.name}</span>
                  )}
                  <Icon
                    name={activeItem === 'ribbon' ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    color='#6c757d'
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={'ribbon'}>
                <Row className='mt-3'>
                  {ribbons.map((ribbon, index) => {
                    return (
                      <Col md={3}>
                        {selectedRibbon.id === ribbon.id && (
                          <div className={classes.selected}>
                            <Icon name='CheckCircleFill' color={'#05c76e'} />
                          </div>
                        )}
                        <ProductCard
                          hideQuantitySelector
                          product={ribbon}
                          key={index}
                          onClick={() => handleRibbonSelection(ribbon)}
                        />
                      </Col>
                    )
                  })}
                </Row>
              </Accordion.Collapse>

              {/* Selection for Products */}
              <Accordion.Toggle
                as={ListGroupItem}
                variant='flush'
                eventKey={'products'}
                className='d-flex justify-content-between align-items-center'
                onClick={() => toggleItem('products')}
              >
                <span>လက်ဆောင်ပစ္စည်းများထည့်ပါ</span>
                <Icon
                  name={activeItem === 'products' ? 'ChevronUp' : 'ChevronDown'}
                  size={18}
                  color='#6c757d'
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={'products'}>
                <ul className={`p-3`}>
                  <Container>
                    <Row>
                      {!_.isEmpty(selectedProducts) &&
                        _.map(selectedProducts, (product, id) => {
                          if (
                            productsInsideHamperCart.products &&
                            productsInsideHamperCart.products[id]
                          ) {
                            product.show = true
                            return (
                              <Col 
                              sm={4}
                              xs={4}
                              lg={3}
                              md={3}
                              key={id}>
                              <ProductCard
                                product={selectedProducts[id]}
                                cartKey='hamperCart'
                              />
                              </Col>
                            )
                          } else if (!product.show) {
                            return (
                              <Col
                                sm={4}
                                xs={4}
                                lg={3}
                                md={3}
                                key={id}
                              >
                                <ProductCard
                                  product={selectedProducts[id]}
                                  cartKey='hamperCart'
                                />
                              </Col>
                            )
                          }
                        })}
                      <Col
                        xs={4}
                        sm={4}
                        md={3}
                        lg={2}
                        className='divst-inline-item'
                      >
                        <Button
                        className={classes.addNewProductBtn}
                          onClick={() => setIsOpenProduct(true)}
                          // size='lg'
                        >
                          ပစ္စည်းအသစ်ထည့်ရန်
                        </Button>
                        <Modal show={isOpenProduct} onHide={onHide}>
                          <DIY
                            onSelectProduct={onSelectProduct}
                            onHide={onHide}
                          />
                        </Modal>
                      </Col>
                    </Row>
                  </Container>
                </ul>
              </Accordion.Collapse>

              {/* Choice for PostCard */}
              <Accordion.Toggle
                as={ListGroupItem}
                variant='flush'
                eventKey={'postCard'}
                className='d-flex justify-content-between align-items-center'
                onClick={() => toggleItem('postCard')}
              >
                <span>ပို့စကတ်ကိုရွေးချယ်ပါ</span>
                <div className='d-flex align-items-center'>
                  {activeItem !== 'postCard' && selectedPostCard && (
                    <span className='mr-3'>{selectedPostCard.name}</span>
                  )}
                  <Icon
                    name={
                      activeItem === 'postCard' ? 'ChevronUp' : 'ChevronDown'
                    }
                    size={18}
                    color='#6c757d'
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={'postCard'}>
                <Row className='mt-3'>
                  {postCards.map((postCard, index) => {
                    return (
                      <Col md={3}>
                        {
                          selectedPostCard.id === postCard.id && (
                            <div className={classes.selected}>
                              <Icon name='CheckCircleFill' color='#05c76e' />
                            </div>
                          )
                        }
                        <ProductCard
                          hideQuantitySelector
                          product={postCard}
                          key={index}
                          onClick={() => handlePostCardSelection(postCard)}
                        >

                        </ProductCard>
                      </Col>
                    )
                  })}
                </Row>
              </Accordion.Collapse>
              {/* Choice for Content */}
              <Accordion.Toggle
                as={ListGroupItem}
                variant='flush'
                eventKey={'content'}
                className='d-flex justify-content-between align-items-center'
                onClick={() => toggleItem('content')}
              >
                <span>လက်ဆောင်စကား ပေးပို့ပါ</span>
                <div className='d-flex align-items-center'>
                  {activeItem !== 'content' && selectedPostCard && (
                    <span className='mr-3'>{to}</span>
                  )}
                  <Icon
                    name={
                      activeItem === 'content' ? 'ChevronUp' : 'ChevronDown'
                    }
                    size={18}
                    color='#6c757d'
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='content'>
                <Container className='mt-4'>
                  <div
                    className={`${classes.postCard} ${postCards.length && postCards[0].id !== selectedPostCard.id && classes.alignRight}`}
                    style={{
                      backgroundImage: `url(${productsInsideHamperCart.postCard.thumb})`,
                    }}
                  >
                    <div>
                      <h3 className={`${classes.postCardTitle}`}>Happy Thadindyut</h3>
                      <Form className={classes.form}>
                        <Form.Group className={`flex-0 ${classes.input}`}>
                          <Form.Control
                            placeholder='ဆီသို့'
                            autoFocus
                            type='text'
                            value={to}
                            onChange={(e) => handleToChange(e)}
                            style={{ border: 'none' }}
                          />
                        </Form.Group>
                        <Form.Group className={`flex-0 ${classes.input}`}>
                          <Form.Control
                            as='textarea'
                            rows='2'
                            placeholder='စကားလက်ဆောင်'
                            value={body}
                            onChange={(e) => handleBodyChange(e)}
                            style={{ border: 'none' }}
                          />
                        </Form.Group>
                        <Form.Group className={`flex-0 ${classes.input}`}>
                          <Form.Control
                            placeholder='မှ'
                            value={from}
                            onChange={(e) => handleFromChange(e)}
                            style={{ border: 'none' }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </Container>
              </Accordion.Collapse>
            </Accordion>
          </Col>
          <Col md={4}>
            <OrderTotalDetail
              onClickContinue={submit}
              hamper='true'
              diyTotal='true'
              continueBtnText={'အော်ဒါတင်ရန် ရှေ့ဆက်မည်'}
            />
          </Col>
        </Row>
      </AppContainer>
    </HomeLayout>
  )
}
