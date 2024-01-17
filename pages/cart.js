import { useRecoilValue, useRecoilState } from 'recoil'
import { productsInCart, totalCost, userToken } from '../utils/recoil-helper'
import { Button, ListGroup, Row, Col } from 'react-bootstrap'
import Router from 'next/router'
import ProductCard from '../components/ProductCard'
import request from '../utils/request'
import { useEffect } from 'react'
import HomeLayout from '../components/HomeLayout'
import _, { keys } from 'lodash'
import Loading from '../components/Loading'
import Icon from '../components/Icon'
import Cookies from 'js-cookie'
import AppContainer from '../components/AppContainer'
import OrderTotalDetail from '../components/OrderTotalDetail'

function Cart() {
  const productsInsideCart = useRecoilValue(productsInCart) //[{id:quantity},{id:quantity}]
  const [totalCosts, setTotalCosts] = useRecoilState(totalCost)
  const [products, setProducts] = React.useState(null)
  const token = useRecoilValue(userToken)

  //Go to checkout route
  const goToCheckout = () => {
    token
      ? Router.replace('/checkout')
      : Router.replace('/login?redirect=checkout')
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (productsInsideCart && products) {
      let total = _.map(productsInsideCart, (product, id) => {
        if(products[id].discount) {
          return productsInsideCart[id].quantity * products[id].discount.discounted_price
        }
        return productsInsideCart[id].quantity * products[id].price
      })
      console.log('totalL ', total)
      const result = _.reduce(total, function (sum, cost) {
        return sum + cost
      })
      console.log("rs: ", result)
      setTotalCosts(result || 0)
      Cookies.set('totalCost', result || 0)
    }

  }, [products, productsInsideCart])

  async function fetchProducts() {
    try {
      const getProductsByIds = await request('products', {
        params: {
          ids: _.keys(productsInsideCart).join(','),
        },
      })
      console.log('getproductby id', getProductsByIds) //[{},{}]
      setProducts(_.mapValues(_.keyBy(getProductsByIds, 'id')))
    } catch (error) {
      console.log(error)
    }
  }

  //   useEffect(async () => {
  //     let promises = []
  //     for (let id in productsInsideCart) {
  //       const product = await fetch(id)
  //       promises.push(product)
  //     }
  //     Promise.all(promises).then((product) =>
  //       setProductsArray(...productsArray, product)
  //     )
  //   }, [])

  //   const fetch = async (productId) => {
  //     const response = await request(`products/${productId}`, {
  //       method: 'get',
  //       platform: 'new_web',
  //     })
  //     return {
  //       ...response.data,
  //       quantity: productsInsideCart[productId].quantity,
  //     }
  //   }

  return (
    <HomeLayout className='cart-container'>
      <AppContainer>
        {!products && <Loading />}
        {products && productsInsideCart && !_.isEmpty(productsInsideCart) && (
          <Row>
            <Col md={8}>
              <div className='mb-4'>
                <ListGroup variant='flush'>
                  {_.map(productsInsideCart, (product, id) => (
                    <ListGroup.Item key={id}>
                      <ProductCard product={products[id]} horizontal />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
            <Col md={4}>
              <OrderTotalDetail
                onClickContinue={goToCheckout}
                continueBtnText={'အော်ဒါတင်ရန် ရှေ့ဆက်မည်'}
              />
            </Col>
          </Row>
        )}
        {_.isEmpty(productsInsideCart) && (
          <div>
            <div className='text-center mt-4'>
              <Icon name='Basket' size={100} color='#b1c705' />
            </div>
            <h4 className='mt-4 text-center'>
              လူကြီးမင်း၏ စျေးဝယ်ခြင်းတွင် ပစ္စည်းမရှိသေးပါ
            </h4>
            <div className='d-flex justify-content-center'>
              <Button
                className='mx-2'
                onClick={() => {
                  Router.push('/')
                }}
              >
                ဆက်လက်ဝယ်ယူမည်
              </Button>
            </div>
          </div>
        )}
      </AppContainer>
    </HomeLayout>
  )
}
export default Cart
