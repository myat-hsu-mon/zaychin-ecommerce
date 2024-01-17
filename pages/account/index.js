import Router from 'next/router'
import Cookies from 'js-cookie'
import { ListGroup } from 'react-bootstrap'
import {  useRecoilState, useRecoilValue } from 'recoil'
import { loggedIn, userInfo } from '../../utils/recoil-helper'
import HomeLayout from '../../components/HomeLayout'
import Icon from '../../components/Icon'
import AppContainer from '../../components/AppContainer'
import ProtectedPage from '../../components/ProtectedPage'

function Account() {
  const userInformation = useRecoilValue(userInfo)
  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(loggedIn)
  //handle edit
  const editHandler = () => {
    if (isUserLoggedIn) {
      Router.replace('/account/edit')
    } else {
      Router.replace('/login?redirect=')
    }
  }

  //handle signout
  const signOutHandler = () => {
    Cookies.remove('TOKEN')
    Cookies.remove('userAddress')
    Router.replace('/')
    setIsUserLoggedIn(false)
  }

  return (
    <ProtectedPage>
      <HomeLayout>
        <AppContainer style={{ maxWidth: 500 }}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='d-flex justify-content-between'>
              <span>အမည်</span>
              <strong>{userInformation.name}</strong>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-between'>
              <span>ဖုန်း</span>
              <strong>{userInformation.phone}</strong>
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={editHandler}
              className='d-flex justify-content-between'
            >
              အချက်အလက်ပြင်မည်
            <Icon name={'ChevronRight'} size={18} color='#6c757d' />
            </ListGroup.Item>
            <ListGroup.Item action onClick={signOutHandler}>
              ထွက်မည်
          </ListGroup.Item>
          </ListGroup>
        </AppContainer>
      </HomeLayout>
    </ProtectedPage>
  )
}
export default Account
