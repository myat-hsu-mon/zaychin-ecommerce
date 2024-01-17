import { Modal, Button, ListGroup } from 'react-bootstrap'
import AddNewAddress from './AddNewAddress'
import Icon from '../Icon'

function AddressCard({
  address,
  deleteAddress,
  as,
  className,
  disabledDelete = false,
  selectable,
  onSelect,
  isActive,
}) {
  const [show, setShow] = React.useState(false)

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  return (
    <ListGroup.Item
      className={`${className} d-flex justify-content-between align-items-center`}
      onClick={() => onSelect && onSelect(address)}
    >
      <span className='d-inline-block text-truncate w-75'>
        {selectable && (
          <div
            className={`zc-checkbox mr-3 ${isActive && 'checked'}`}
            style={{ float: 'left' }}
          />
        )}
        {address.address}{' , '}{address.township.name} Township
      </span>
        <Button onClick={showModal} variant='light'>
          <Icon name='PencilSquare' size={10} color='#545a65' />
        </Button>
      {!disabledDelete && (
        <Button
          onClick={() => deleteAddress(address.id)}
          variant='light'
          className='ml-3'
        >
          <Icon name='Trash' size={10} color='#545a65' />
        </Button>
      )}
      <Modal show={show} onHide={hideModal}>
        <Modal.Body>
          <AddNewAddress {...address} hideModal = {hideModal}/>
        </Modal.Body>
      </Modal>
    </ListGroup.Item>
  )
}
export default AddressCard
