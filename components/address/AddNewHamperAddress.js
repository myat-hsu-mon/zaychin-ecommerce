import DatesAndTimeRanges from '../DatesAndTimeRanges'
import request from '../../utils/request'
import { Form, Button } from 'react-bootstrap'
import styles from '../../scss/Address.module.scss'
import Cookies from 'js-cookie'
import moment from 'moment'
import MyanmarPhone from 'myanmar-phonenumber'
import { useRecoilValue } from 'recoil'
import { userToken } from '../../utils/recoil-helper'
// import {allAddresses} from '../../utils/recoil-helper'
// import {useRecoilState} from 'recoil'
export default function AddNewHamperAddress({ ...addressInfo }) {
  const [address, setAddress] = React.useState('')
  const [receiverPhone, setReceiverPhone] = React.useState('')
  const [townships, setTownships] = React.useState([])
  const [township_id, setTownship_id] = React.useState(1)
  const [note, setNote] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState()
  const [selectedTimeRange, setSelectedTimeRange] = React.useState()
  const token = useRecoilValue(userToken)
  const [invalidAddress, setInvalidAddress] = React.useState('')
  const [invalidPhone, setInvalidPhone] = React.useState('')

  // const [allAddress, setAllAddress]= useRecoilState(allAddresses)

  const fetchTownships = async () => {
    const response = await request('township');
    setTownships(response.data)
  }

  React.useEffect(() => {
    fetchTownships()
  }, [])

  const confirm = async () => {
    // console.log(address, receiverPhone, township_id, note, selectedDate, selectedTimeRange)
    // const data = {
    //   address,
    //   township_id,
    //   receiverPhone,
    //   note,
    //   selectedDate,
    //   selectedTimeRange
    // }
    if (address) {
      setInvalidAddress('')
    } if (receiverPhone) {
      setInvalidPhone('')
    } if (MyanmarPhone.isValidMMPhoneNumber(receiverPhone)) {
      setInvalidPhone('')
    }
    if (!address) {
      setInvalidAddress('ကျေးဇူးပြု၍ လက်ခံမည့်သူ၏လိပ်စာဖြည့်ပါ')
    }
    if (!receiverPhone) {
      setInvalidPhone('ကျေးဇူးပြု၍ လက်ခံမည့်သူ၏ဖုန်းနံပါတ်ဖြည့်ပါ')
    } else if (!MyanmarPhone.isValidMMPhoneNumber(receiverPhone)) {
      setInvalidPhone('ဖုန်းနံပါတ်မှားယွင်းနေပါသည်')
    } else {
      try {
        let data;
        const response = await request('addresses', {
          method: 'post',
          body: {
            address,
            township_id,
            phone: receiverPhone,
            note,
            default: false
          },
          params: {
            platform: 'new_web',
            hamper: true
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.success) {
          data = {
            ...response.data,
            selectedDate: moment(selectedDate).format('YYYY-MM-DD'),
            selectedTimeRange
          }
          addressInfo.onAddNewAddress(data)
          addressInfo.handleClose()
          console.log("addred saved: ", data)
          console.log('save successfully')
        } else {
          console.log('Save Address error: ')
        }
      } catch (error) {
        console.log('Adding HamperAddress Error: ', error)
      }
    }
  }

  const onSelectDate = (selectedDate) => {
    console.log(selectedDate)
    setSelectedDate(selectedDate)
  }

  const onSelectTimeRange = (selectedTimeRange) => {
    console.log(selectedTimeRange)
    setSelectedTimeRange(selectedTimeRange)
  }
  return (
    <div className='m-4'>
      <Form.Group>
        <Form.Label label='address'>လိပ်စာအပြည့်အစုံ</Form.Label>
        <Form.Control
          id='address'
          placeholder={invalidAddress}
          className={`${styles.fontSize} ${invalidAddress && styles.border}`}
          type='text'
          size='lg'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label for='township'>မြို့နယ်</Form.Label>
        <Form.Control
          id='township'
          className={styles.fontSize}
          as="select"
          size='lg'
          value={township_id}
          onChange={e => setTownship_id(e.target.value)}
        >
          {
            townships && townships.map(township => (
              <option value={township.id} key={township.id}>
                {township.name}
              </option>
            ))
          }
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label for='phone'>လက်ခံမည့်သူ၏ဖုန်းနံပါတ်ထည့်ပေးပါ</Form.Label>
        <Form.Control
          id='phone'
          placeholder={invalidPhone}
          type="number"
          size='lg'
          value={receiverPhone}
          className={`${styles.phone} ${styles.fontSize} ${invalidPhone && styles.border}`}
          onChange={e => setReceiverPhone(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>ပို့ပေးရမည့်အချိန်ရွေးပေးပါ</Form.Label>
        <DatesAndTimeRanges
          onSelectDate={onSelectDate}
          onSelectTimeRange={onSelectTimeRange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label for='note'>မှတ်ချက်</Form.Label>
        <Form.Control
          id='note'
          className={styles.fontSize}
          type='text'
          size='lg'
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </Form.Group>
      <Button onClick={confirm} block>အတည်ပြုပါသည်</Button>
    </div>
  )
}