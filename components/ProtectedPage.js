import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"
import { loggedIn, userLoading } from "../utils/recoil-helper"
import Login from '../pages/login'
import Loading from './Loading'
import Layout from './Layout'

export default function ProtectedPage({ children }) {
  const isUserLoading = useRecoilValue(userLoading)
  const isLoggedIn = useRecoilValue(loggedIn)
  const router = useRouter()

  if (isUserLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (isLoggedIn) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    router.push(`/login?redirect=${router.pathname.slice(1)}`)
    return null
  }

}