import React from 'react'
import _ from 'lodash'
import Router from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import {
  allAddresses, loggedIn, userToken,
} from '../utils/recoil-helper'
import AddressCard from '../components/address/AddressCard'
import AddNewAddress from '../components/address/AddNewAddress'
import request from '../utils/request'

export default function MyAddresses({ selectable, onSelect, selectedAddress }) {
  const [allAddress, setAllAddress] = useRecoilState(allAddresses)
  const [show, setShow] = React.useState(false)
  const isUserLoggedIn = useRecoilValue(loggedIn)
  const token = useRecoilValue(userToken)

  if (allAddress.length === 1) {
    onSelect && onSelect(allAddress[0])
  }
  
  React.useEffect(() => {
    if (isUserLoggedIn) {
      fetchAddresses()
    }
  }, [token])

  const fetchAddresses = async () => {
    const response = await request('addresses', {
      method: 'get',
      params: { platform: 'new_web' },
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.data.length) {
      setAllAddress(response.data)
      if (onSelect) {
        onSelect(_.find(response.data, (address) => address.default))
      }
    }
  }

  const deleteAddress = async (address_id) => {
    // Delete address_id of user_id
    const response = await request(`addresses/${address_id}`, {
      method: 'delete',
      params: { platform: 'new_web' },
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.success) {
      let indexOfDeletedId = _.findIndex(allAddress, function (address) {
        return address.id === address_id
      })
      let removedArray = [...allAddress]
      removedArray.splice(indexOfDeletedId, 1)
      setAllAddress(removedArray)
    }
  }

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    if (isUserLoggedIn) {
      setShow(true)
    } else {
      Router.push('/login?redirect=addresses')
    }
  }

  return (
    <div>
      <ListGroup variant='flush'>
        {allAddress &&
          allAddress.map((address, index) => (
            <AddressCard
              as={ListGroup.Item}
              address={address}
              deleteAddress={deleteAddress}
              key={index}
              className={'row no-gutters'}
              disabledDelete={selectable}
              selectable={selectable}
              onSelect={() => onSelect && onSelect(address)}
              isActive={selectedAddress && selectedAddress.id === address.id}
            />
          ))}
      </ListGroup>
      <div className='m-3'>
        <Button block onClick={handleShow} variant='light'>
          လိပ်စာအသစ်ထည့်ရန်
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} className='modal-bottom'>
        <Modal.Body>
          <AddNewAddress hideModal={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
