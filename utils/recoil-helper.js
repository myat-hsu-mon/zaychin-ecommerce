import { atom, selector } from 'recoil'
import Cookies from 'js-cookie'

//ATOMS
export const productsInCart = atom({
  key: 'productsInCart',
  default:
    Cookies.get('cart') ?
      JSON.parse(Cookies.get('cart')) :
      {},
})

export const productsInHamperCart = atom({
  key: 'productsInHamperCart',
  default:
    Cookies.get('hamperCart') ?
      JSON.parse(Cookies.get('hamperCart')) :
      {
        basket: {},
        ribbon: {},
        products: {},
        postCard: {
        },
        content: {
          to: '',
          body: '',
          from: ''
        },
        addresses: [],
        paymentMethod: {
          key: 'cod',
          name: 'အိမ်ရောက်ငွေချေ',
          shortName: 'အိမ်ရောက်ငွေချေ',
        },
        subPaymentMethod: {}
      }
})

export const totalCost = atom({
  key: 'totalCost',
  default:
    Cookies.get('totalCost') ?
      parseInt(Cookies.get('totalCost')) :
      0,
})

export const hamperTotalCost = atom({
  key: 'hamperTotalCost',
  default:
    Cookies.get('hamperTotalCost') ?
      parseInt(Cookies.get('hamperTotalCost')) :
      0
})

export const userAddress = atom({
  key: 'userAddress',
  default: {}
})

//PhoneNumber for OTP
export const phoneForOTP = atom({
  key: 'phone',
  default: '',
})

//Userdata for successful login
export const userInfo = atom({
  key: 'userInfo',
  default: {},
})

export const userLoading = atom({
  key: 'userLoading',
  default: true
})

export const loggedIn = atom({
  key: 'loggedIn',
  default: false
})

export const userToken = atom({
  key: 'userToken',
  default: Cookies.get('TOKEN') || ''
})

//Addresses Array
export const allAddresses = atom({
  key: 'allAddresses',
  default: [],
})

//Assign for clientId
export const clientID = atom({
  key: 'clientID',
  default: Cookies.get('clientID') || '',
})

//SELECTORS
export const clearCart = selector({
  key: 'clearCart',
  get: ({ get }) => {

  },
  set: ({ set }) => {
    Cookies.remove('cart')
    set(productsInCart, {})
    Cookies.remove('totalCost')
    set(totalCost, 0)
  }
})

export const clearHamperCart = selector({
  key: 'clearHamperCart',
  get: ({ get }) => {

  },
  set: ({ set }) => {
    Cookies.remove('hamperCart')
    set(productsInHamperCart, {})
    Cookies.remove('hamperTotalCost')
    set(hamperTotalCost, 0)
  }
})

export const totalCount = selector({
  key: 'totalCount',
  get: ({ get }) => {
    const products = get(productsInCart)
    return Object.keys(products).length
  }
})
