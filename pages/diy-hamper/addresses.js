import Router from 'next/router'
import Cookies from 'js-cookie'
import { Button, Form, Card } from 'react-bootstrap'
import HomeLayout from '../../components/HomeLayout'
import classes from '../../scss/Diy.module.scss'
import Timeline from '../../components/Timeline'
import AppContainer from '../../components/AppContainer'
import { useRecoilValue } from 'recoil'
import { loggedIn } from '../../utils/recoil-helper'
export default function Addresses() {
  const isUserLoggedIn = useRecoilValue(loggedIn)
  const [chooseAddress, setChooseAddress] = React.useState('myself')
  const [total, setTotal] = React.useState(3)

  const goToNext = () => {
    console.log('choose', chooseAddress)
    if (chooseAddress === 'myself') {
      Router.push(isUserLoggedIn ? '/checkout?hamper=true' : '/login?redirect=checkout&&hamper=true')
    } else {
      Router.push(isUserLoggedIn ? '/diy-hamper/address' : '/login?redirect=diy-hamper/address')
    }
  }

  return (
    <HomeLayout>
      <AppContainer>
        <Timeline active={2} total={total} />
        <div className={`w-50 text-center ${classes.chooseAddress}`}>
          <Card className={`{classes.addressCard} shadow`}>
            <Card.Title>
              <h2 className={`mt-4 mb-4`}>ပို့ရန်လိပ်စာကိုရွေးချယ်ပါ</h2>
            </Card.Title>
            <Form>
              <Form.Group controlId="address">
                {/* checkbox1 */}
                <Form.Check
                  name='address'
                  type={'radio'}
                >
                  <Form.Check.Input
                    name='address'
                    id='1'
                    checked={chooseAddress === 'myself'}
                    type={'radio'}
                    value={chooseAddress}
                    onChange={e => {
                      setTotal(3)
                      setChooseAddress('myself')
                    }}
                  />
                  <Form.Check.Label for='1'>မိမိလိပ်စာကိုပို့ပါ</Form.Check.Label>
                </Form.Check>

                {/* checkbox2 */}
                <Form.Check
                  name='address'
                  type={'radio'}
                >
                  <Form.Check.Input
                    name='address'
                    type={'radio'}
                    id='2'
                    checked={chooseAddress === 'others'}
                    value={chooseAddress}
                    onChange={e => {
                      setTotal(5)
                      setChooseAddress('others')
                    }}
                  />
                  <Form.Check.Label for='2'>အခြားသူများထံပေးပို့ပါ</Form.Check.Label>
                </Form.Check>
              </Form.Group>

            </Form>
            <Button onClick={goToNext} className={`mt-4 mb-4 ${classes.button}`}>ရှေ့ဆက်ရန်</Button>
          </Card>
        </div>
      </AppContainer>
    </HomeLayout>
  )
}