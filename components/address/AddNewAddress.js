import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import MyanmarPhone from 'myanmar-phonenumber'
import { Form, Button, } from 'react-bootstrap'
import { allAddresses, userInfo, userToken } from '../../utils/recoil-helper'
import request from '../../utils/request'
import styles from '../../scss/Address.module.scss'

function AddNewAddress({ ...addressInfo }) {
  const userInformation = useRecoilValue(userInfo)
  const [allAddress, setAllAddress] = useRecoilState(allAddresses)
  const [address, setAddress] = useState(addressInfo.address || '')
  const [townships, setTownships] = useState([])
  const [township_id, setTownship_id] = useState(addressInfo.township_id || null)
  const [phone, setPhone] = useState(
    userInformation.phone ?
    userInformation.phone.replace('+959', '09') :
    ''
    )
    const [note, setNote] = useState(addressInfo.note || '')
    const [isDefault, setIsDefault] = useState(addressInfo.default || false)
    const [addressError, setAddressError] = React.useState(null)
    const [phoneError, setPhoneError] = React.useState(null)
    const [townshipError, setTownshipError] = React.useState(null)
    const token = useRecoilValue(userToken)

  //Save new address
  const saveHandler = async (e) => {
    try {
      e.preventDefault()
      if (!address || !township_id || township_id === '0' || !phone || !MyanmarPhone.isValidMMPhoneNumber(phone)) {
        if (!address) {
          setAddressError('ကျေးဇူးပြု၍ လိပ်စာဖြည့်ပါ')
        } else {
          setAddressError('')
        }
        if (township_id === '0' || !township_id) {
          setTownshipError('ကျေးဇူးပြု၍ မြို့နယ်ရွေးပါ')
        } else {
          setTownshipError('')
        }
        if (!phone) {
          setPhoneError('ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပေးပါ')
        } else {
          setPhoneError('')
        }
        if (!MyanmarPhone.isValidMMPhoneNumber(phone)) {
          setPhoneError('ဖုန်းနံပါတ်မှားယွင်းနေပါသည်')
        } else if (MyanmarPhone.isValidMMPhoneNumber(phone)) {
          setPhoneError('')
        }
      } else {
        const data = {
          address,
          township_id,
          phone:
            (phone && phone) ||
            (userInformation.phone && userInformation.phone.replace('+959', '09')),
          note,
          default: isDefault
        }
        const response = await request('addresses', {
          method: 'post',
          body: data,
          params: {
            platform: 'new_web'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.success) {
          addressInfo.hideModal()
          setAllAddress(response.data.data)
        } else {
          console.log('Save Address error: ')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTownships = async () => {
    const response = await request('township');
    setTownships(response.data)
  }

  useEffect(() => {
    fetchTownships();
  }, [])

  return (
    <div>
      <Form onSubmit={saveHandler}>
        <Form.Group>
          <Form.Label>လိပ်စာ</Form.Label>
          <Form.Control
            type="text"
            className={`${styles.fontSize} ${addressError && styles.border}`}
            placeholder={addressError && addressError}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
              if (e.target.value.length) {
                setAddressError('')
              }
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label >မြို့နယ်</Form.Label>
          <Form.Control
            className={townshipError && styles.border}
            as="select"
            defaultValue={10}
            value={township_id}
            onChange={(e) => {
              console.log('township id: ', e.target.value)
              setTownship_id(e.target.value)
              if (e.target.value) {
                console.log('value', e.target.value)
                setTownshipError('')
              }
            }}
          >
            <option value={0}>မြို့နယ်ရွေးပါ</option>
            {
              townships && townships.map((township, index) => {
                return (
                  <option
                    value={township.id}
                    key={index}>
                    {township.name}
                  </option>
                )
              })
            }
          </Form.Control>

        </Form.Group>
        <Form.Group>
          <Form.Label>ဖုန်းနံပါတ်</Form.Label>
          <Form.Control
            type="number"
            className={`${styles.phone} ${phoneError && styles.border} ${styles.fontSize}`}
            placeholder={phoneError && phoneError}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>မှတ်ချက်</Form.Label>
          <Form.Control
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="default"
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
          >
          </Form.Check>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}
export default AddNewAddress;