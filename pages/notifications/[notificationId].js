import { useEffect, useState } from "react";
import { Card } from "react-bootstrap"
import request from '../../utils/request'
import { useRecoilValue } from "recoil";
import { userToken } from "../../utils/recoil-helper";
function NotificationId({ notificationId }) {
  const [notiDetail, setNotiDetail] = useState();
  const token = useRecoilValue(userToken)

  const fetchNotiDetail = async () => {
   try{
    const response = await request(`notification/${notificationId}`, { 
      params: { 
        platform: 'new_web' 
      }, 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })
    console.log(response.data)
    setNotiDetail(response.data[0])
   }catch(error){
     console.error(error)
   }
  }

  useEffect(() => {
    fetchNotiDetail()
  }, [])

  return (
    <div>
     {
       notiDetail&&(
         <div>
         <h2>{notiDetail.user_id}</h2>
        
        <h2>{notiDetail.content}</h2>
        </div>
       )
     }
    </div>
  )
}

NotificationId.getInitialProps = async (ctx) => {
  const { notificationId } = ctx.query;
  return {
    notificationId
  }
}

export default NotificationId;