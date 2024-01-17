import HomeLayout from '../components/HomeLayout'
import MyAddresses from '../components/MyAddresses'
import Container from '../components/AppContainer'
import ProtectedPage from '../components/ProtectedPage'
import Layout from '../components/Layout'

function Addresses() {
  return (
    <ProtectedPage>
      <Layout>
        <Container>
          <MyAddresses />
        </Container>
      </Layout>
    </ProtectedPage>
  )
}

// Addresses.getInitialProps = async (context) => {
//   const token = parseCookie(context.req, 'TOKEN')
//   const response = await request('addresses', {
//     params: { page: 1, limit: 20 },
//     platform: 'new_web',
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   return { token, productsData: response.data }
// }

export default Addresses