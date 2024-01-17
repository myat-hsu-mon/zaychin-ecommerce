import { useRouter } from "next/router"
import HomeLayout from "./HomeLayout"

export default function Layout({ children, className }) {
  const router = useRouter()
  console.log('layout is_mobile', router.query.is_mobile)
  let L = HomeLayout
  if (router.query.is_mobile) {
    L = 'div'
  }
  return (
    <L className={className}>
      {children}
    </L>
  )
}