import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import {
  productsInCart,
  productsInHamperCart,
  clientID
} from '../utils/recoil-helper'
import Icon from './Icon'
import request from '../utils/request'
import Cookies from 'js-cookie'
import moment from 'moment'

function Quantity({ product, horizontal, displayPrice = true, cartKey }) {
  // console.log("cartKkay: ", cartKey)
  const [productsInsideCart, setProductsInsideCart] = useRecoilState(productsInCart)
  const [productsInsideHamperCart, setProductsInsideHamperCart] = useRecoilState(productsInHamperCart)
  const clientId = useRecoilValue(clientID)

  //////////////For Products In Cart///////////////////////
  const addProducts = (id) => {
    try {
      const updatedCart = {
        ...productsInsideCart,
        [id]: {
          quantity: productsInsideCart[id]
            ? productsInsideCart[id].quantity + 1
            : 1,
        },
      }
      Cookies.set('cart', JSON.stringify(updatedCart))
      setProductsInsideCart(updatedCart)
    } catch (error) {
      console.error(error)
    }
  }

  const updateProducts = (id) => {
    try {
      let updatedCart = {
        ...productsInsideCart,
        [id]: {
          quantity: productsInsideCart[id].quantity - 1,
        },
      }

      //Delete when quantity=0
      if (updatedCart[id].quantity === 0) {
        var newObj = { ...updatedCart }
        delete newObj[id]
        updatedCart = { ...newObj }
      }
      Cookies.set('cart', JSON.stringify(updatedCart))
      setProductsInsideCart(updatedCart)
    } catch (error) {
      console.error(error)
    }
  }

  const increaseCount = () => {
    addProducts(product.id)
    //Save to the database
    const data = {
      clientId,
      product: {
        id: product.id,
        quantity: productsInsideCart[product.id]
          ? productsInsideCart[product.id].quantity + 1
          : 1,
      },
    }
    clearTimeout(timer)
    var timer = setTimeout(async () => {
      const response = await request('cart', {
        method: 'put',
        body: data,
        platform: 'new_web',
      })
      clearTimeout(timer)
    }, 2000)
  }

  const decreaseCount = () => {
    try {
      if (productsInsideCart[product.id].quantity > 0) {
        updateProducts(product.id)

        //Save to the database
        const data = {
          clientId,
          product: {
            id: product.id,
            quantity: productsInsideCart[product.id].quantity - 1,
          },
        }
        clearTimeout(timer)
        let timer = setTimeout(async () => {
          const response = await request('cart', {
            method: 'put',
            body: data,
            platform: 'new_web',
          })
          clearTimeout(timer)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //////////////For Products in HamperCart
  const increaseCountForHamperCart = () => {
    addProductsForHamperCart(product.id)
  }

  const decreaseCountForHamperCart = () => {
    updateProductsForHamperCart(product.id)
  }

  const addProductsForHamperCart = (id) => {
    try {
      var updatedCart = {
        ...productsInsideHamperCart.products,
        [id]: {
          quantity: productsInsideHamperCart.products[id]
            ? productsInsideHamperCart.products[id].quantity + 1
            : 1,
        }
      }

      Cookies.set('hamperCart', JSON.stringify({
        ...productsInsideHamperCart,
        products: {
          ...updatedCart
        }
      })
      )
      setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
    } catch (error) {
      console.error(error)
    }
  }

  const updateProductsForHamperCart = (id) => {
    try {
      let updatedCart = {
        ...productsInsideHamperCart.products,
        [id]: {
          quantity: productsInsideHamperCart.products[id].quantity - 1,
        },
      }

      //Delete when quantity=0
      if (updatedCart[id].quantity === 0) {
        var newObj = { ...updatedCart }
        delete newObj[id]
        updatedCart = { ...newObj }
      }
      Cookies.set('hamperCart', JSON.stringify({
        ...productsInsideHamperCart,
        products: {
          ...updatedCart
        }
      })
      )
      setProductsInsideHamperCart(JSON.parse(Cookies.get('hamperCart')))
      // setProductsInsideHamperCart(updatedCart)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='product-card-buy'>
      {displayPrice && (
        <div style={{ height: 60 }} className='d-flex flex-column justify-content-center align-items-center'>
          {product.discount ?
            product.discount.discount_type === 'buy_1_get_1' ? (
              <>
                <span className='text-danger'>Buy 1 Get 1</span>
                <div className={`text-primary ${!horizontal && 'text-center'}`}>
                  {product.price} ks
                </div>
              </>
            )
              :
              (
                <div>
                  <div className={`text-danger ${!horizontal && 'text-center'}`}>
                    <s>{(product.discount.discount_price !== 0) && `${product.price} ks`}</s>
                  </div>
                  <div className={`text-primary ${!horizontal && 'text-center'}`}>
                    <span>{product.discount.discounted_price} ks</span>
                  </div>
                </div>
              ) : (
              <div className={`text-primary ${!horizontal && 'text-center'}`}>
                {product.price} ks
              </div>
            )}
        </div>
      )}
      {
        cartKey ?   //////is From Hamper Cart?

          <div className={`quantity-selector ${horizontal && 'horizontal'}`}>
            {(productsInsideHamperCart.products && productsInsideHamperCart.products[product.id]) ? (
              <InputGroup>
                <InputGroup.Prepend>
                  <Button
                    onClick={decreaseCountForHamperCart}
                    variant='light'
                    className='count-btn'
                  >
                    <Icon name='Dash' size={10} />
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  type='text'
                  value={productsInsideHamperCart.products[product.id].quantity || 0}
                  className='quantity'
                />
                <InputGroup.Prepend>
                  <Button
                    onClick={increaseCountForHamperCart}
                    variant='light'
                    className='count-btn'
                  >
                    <Icon name='Plus' size={10} />
                  </Button>
                </InputGroup.Prepend>
              </InputGroup>
            ) : (
                <Button
                  onClick={increaseCountForHamperCart}
                  variant='light'
                  block
                  className='rounded-pill text-secondary rounded-circle'
                >
                  <small>ခြင်းထဲထည့်ရန်</small>
                </Button>
              )}
          </div>

          :

          <div className={`quantity-selector ${horizontal && 'horizontal'}`}>
            {
              !product.out_of_stock ?

                productsInsideCart[product.id] ? (
                  <InputGroup>
                    <InputGroup.Prepend>
                      <Button
                        onClick={decreaseCount}
                        variant='light'
                        className='count-btn'
                      >
                        <Icon name='Dash' size={10} />
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      type='text'
                      value={productsInsideCart[product.id].quantity || 0}
                      className='quantity'
                    />
                    <InputGroup.Prepend>
                      <Button
                        onClick={increaseCount}
                        variant='light'
                        className='count-btn'
                      >
                        <Icon name='Plus' size={10} />
                      </Button>
                    </InputGroup.Prepend>
                  </InputGroup>
                ) : (
                    <Button
                      onClick={increaseCount}
                      variant='light'
                      block
                      className='rounded-pill text-secondary rounded-circle'
                    >
                      <small>ခြင်းထဲထည့်ရန်</small>
                    </Button>

                  )

                :
                <p
                  className='text-danger text-center p-2'
                  variant='light'>ပစ္စည်းကုန်</p>
            }

          </div>

      }

    </div>
  )
}
export default Quantity
