import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import _ from 'lodash'
import {
  totalCost,
  userAddress,
  productsInHamperCart,
  hamperTotalCost
} from '../utils/recoil-helper'
import {
  useRecoilValue,
  useRecoilState
} from 'recoil'
import styles from '../scss/OrderTotalDetail.module.scss'
import request from '../utils/request'
import Cookies from 'js-cookie'

export default function OrderTotalDetail({ continueBtnText, onClickContinue, hamper }) {
  //RECOIL VALUES
  const total = useRecoilValue(totalCost)
  const address = useRecoilValue(userAddress) //{}
  const productsInsideHamperCart = useRecoilValue(productsInHamperCart)
  const [hamperTotal, setHamperTotal] = useRecoilState(hamperTotalCost)

  //STATES
  const [products, setProducts] = useState(null)

  async function fetchProducts() {
    try {
      const getProductsByIds = await request('products', {
        params: {
          ids: _.keys(productsInsideHamperCart.products).join(','),
        },
      })
      setProducts(_.mapValues(_.keyBy(getProductsByIds, 'id')))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!_.isEmpty(productsInsideHamperCart.products)) {
      fetchProducts()//fetch products 
    }
  }, [productsInsideHamperCart.products])

  useEffect(() => {
    let result = 0;
    let productSum = 0;
    result = (!_.isEmpty(productsInsideHamperCart.basket) ? productsInsideHamperCart.basket.price : 0) +
             (!_.isEmpty(productsInsideHamperCart.ribbon) ? productsInsideHamperCart.ribbon.price : 0) +
             (!_.isEmpty(productsInsideHamperCart.postCard)? productsInsideHamperCart.postCard.price : 0)

    if (productsInsideHamperCart.products && products) {
      let total = _.map(productsInsideHamperCart.products, (product, id) => {
        if (products[id]) {
          return productsInsideHamperCart.products[id].quantity * products[id].price
        }
      })
      productSum = _.reduce(total, function (sum, item) {
        return sum + item
      })
    }
    result = productSum + result
    result && setHamperTotal(result)
    result && Cookies.set('hamperTotalCost', result)
  }, [productsInsideHamperCart, products])

  return (
    <div className='mt-3'>
      <ListGroup className={styles.list}>
        <ListGroup.Item
          className={`${styles.listItem} d-flex justify-content-between`}
        >
          ပစ္စည်းစုစုပေါင်း <span>{((hamper === 'true') && hamperTotal) || (hamper === 'true' && !hamperTotal && '0') || total} ကျပ်</span>
        </ListGroup.Item>
        {address && address.township && (
          <>
            <ListGroup.Item
              className={`${styles.listItem} d-flex justify-content-between`}
            >
              ပို့ဆောင်ခ <span>{address.township.delivery_fee || 0} ကျပ်</span>
            </ListGroup.Item>
            <ListGroup.Item
              className={`${styles.listItem} d-flex justify-content-between`}
            >
              အနည်းဆုံးဝယ်ရန်ငွေပမာဏ{' '}
              <span>
                {(address && address.township.minimum_amount) || 0} ကျပ်
              </span>
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item variant='light' className={styles.listItem}>
          <Button block onClick={onClickContinue}>
            {continueBtnText}
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}
