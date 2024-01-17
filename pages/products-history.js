import request from '../utils/request'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { parseCookie } from '../utils/cookie'
import HomeLayout from '../components/HomeLayout'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Container, Row, Col } from 'react-bootstrap'
import CollectionLoading from '../components/CollectionLoading'

function ProductsHistory({ productsData, token }) {
  console.log("productsData: ", productsData)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setProducts(productsData)
  }, [])

  // fetch products per page
  const fetchProductsPerPage = async () => {
    const data = await request('products-history', {
      params: { 
        page: 1, 
        limit: 20 ,
        platform: 'new_web'
      },
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    })
    console.log('page: ', data.page)
    if (page >= data.lastPage) {
      setHasMore(false)
    }
    setPage((page) => page + 1)
    setProducts((prevProducts) => [...prevProducts, ...data.data])
  }

  // console.log("products history: ", products)
  return (
    <HomeLayout>
      <InfiniteScroll
        dataLength={products.length}
        hasMore={hasMore}
        next={fetchProductsPerPage}
        loader={
          <Container>
            <CollectionLoading count={6} />
          </Container>
        }
      >
        <Container>
          {products && (
            <Row>
              {products.map((product) => (
                <Col 
                sm={4} 
                xs={4} 
                lg={2} 
                md={4} 
                key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </InfiniteScroll>
    </HomeLayout>
  )
}
ProductsHistory.getInitialProps = async (context) => {
  const token = parseCookie(context.req, 'TOKEN')
  const response = await request('products-history', {
    params: { page: 1, limit: 20 , platform: 'new_web'},
    headers: { Authorization: `Bearer ${token}` },
  })
  return { token, productsData: response.data.data }
}
export default ProductsHistory
