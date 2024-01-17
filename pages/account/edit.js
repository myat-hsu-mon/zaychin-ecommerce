import Router from 'next/router'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Form, Button } from 'react-bootstrap'
import { userInfo, userToken } from '../../utils/recoil-helper'
import request from '../../utils/request'
import HomeLayout from '../../components/HomeLayout'
import AppContainer from '../../components/AppContainer'

function Edit() {
  const [user, setUser] = useRecoilState(userInfo)
  const { id, name, phone } = useRecoilValue(userInfo)
  const token = useRecoilValue(userToken)

  const saveHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await request(`users/${id}`, {
        method: 'put',
        body: { name },
        params: {
          platform: 'new_web'
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if (response.success) {
        setUser({
          ...user,
          name: response.data.name
        })
        Router.push('/account')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <HomeLayout>
      <AppContainer style={{ maxWidth: 500 }}>
        <Form onSubmit={saveHandler}>
          <Form.Group>
            <Form.Label>အမည်</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>ဖုန်း</Form.Label>
            <Form.Control type='text' value={phone} disabled></Form.Control>
          </Form.Group>
            <Button block variant='primary' type='submit'>
              မှတ်မည်
            </Button>
        </Form>
      </AppContainer>
    </HomeLayout>
  )
}
export default Edit
