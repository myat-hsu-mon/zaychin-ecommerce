import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from 'next/link'
import HomeLayout from '../../components/HomeLayout'
import request from '../../utils/request'

function Notifications() {
  const [notifications, setNotifications] = React.useState([])
  const token = useRecoilValue(userToken)

  const fetchNotifications = async () => {
    const response = await request('notification', { 
      params: { 
        platform: 'new_web' 
      }, 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })
    setNotifications(response.data)
  }
  React.useEffect(() => {
    fetchNotifications()
  }, [])
  return (
    <div>
      <HomeLayout>
        <ListGroup>
          {notifications && notifications.map((noti, index) => (
            <Link 
            href="/notifications/[notificationId]" 
            as={`notifications/${noti.id}`} 
            key={index}
            >
              <ListGroupItem active={!noti.is_read} action>
                <span>{noti.is_read}<br></br>{noti.content}</span>
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      </HomeLayout>
    </div>
  )
}
export default Notifications;