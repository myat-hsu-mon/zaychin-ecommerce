import React from 'react'
import Cookies from 'js-cookie'
import RandExp from 'randexp'
import request from '../utils/request'
import {
  userInfo,
  clientID,
  productsInCart,
  userLoading,
  loggedIn,
  userToken,
} from '../utils/recoil-helper'
import {
  useSetRecoilState,
  useRecoilState,
  useRecoilValue
} from 'recoil'
import { useRouter } from 'next/router'

function Startup({ children }) {
  console.log('startup starts')
  const router = useRouter()
  const live = router.query.live
  const [clientId, setClientId] = useRecoilState(clientID)
  const setUserInfo = useSetRecoilState(userInfo)
  const setUserLoggin = useSetRecoilState(loggedIn)
  const setUserLoading = useSetRecoilState(userLoading)
  const token = useRecoilValue(userToken)
  const [productsInsideCart, setProductsInsideCart] = useRecoilState(productsInCart)

  //Generate client Id
  if (!clientId) {
    let timestamp = new Date().getTime()
    let exp1 = new RandExp(/^([0-9]){4}([a-zA-Z]){4}([a-zA-Z]){1}$/).gen()
    let exp2 = new RandExp(/^([a-zA-Z]){3}([0-9]){2}([a-zA-Z]){1}$/).gen()
    let timestamp_exp = exp1 + timestamp + exp2
    Cookies.set('clientID', timestamp_exp)
    setClientId(timestamp_exp)
  }

  //Fetch user data and cookies
  const fetchData = async (token) => {
    try {
      const userData = await request('token', {
        method: 'get',
        params: {
          platform: 'new_web'
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      console.log('user info', userData)
      if (userData.success) {
        const { name, phone, id } = userData.data
        setUserInfo({ name, phone, id })
        setUserLoggin(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setUserLoading(false)
    }
  }

  //Fetch products inside cart from database
  const fetchProductsInCart = async (clientId) => {
    try {
      const response = await request(`cart/${clientId}`, {
        params: {
          platform: 'new_web'
        }
      })
      response.data.map((data) => {
        return setProductsInsideCart((productsInsideCart) => {
          return {
            ...productsInsideCart,
            [data.product_id]: {
              quantity: data.quantity,
            },
          }
        })
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  React.useEffect(() => {
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault()
    })
    if (token) {
      fetchData(token)
    } else {
      setUserLoggin(false)
      setUserLoading(false)
    }
    if (live) {
      Cookies.set('live', true, { expires: 3 / 24 })
    }
    // fetchProductsInCart(getClientId)
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}
export default Startup
