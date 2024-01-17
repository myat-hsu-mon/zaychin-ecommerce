import { useRouter } from 'next/router'
import request from '../../../utils/request'
import ProductCard from '../../../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import HomeLayout from '../../../components/HomeLayout'
import { useState, useRef, useCallback } from 'react'
import Head from 'next/head'

export default function Products({ initialProducts, category, categoryId }) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef()
  let lastProduct = useCallback((node) => {
    try {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProductsPerPage()
        }
      })
      if (node) observer.current.observe(node)
    } catch (error) {
      console.error(error)
    }
  })

  // fetch products per page
  const fetchProductsPerPage = async () => {
    try {
      const data = await request(`categories/${categoryId}/products`, {
        params: {
          page,
          limit: 20,
          platform: 'new_web',
        },
      })
      if(data.success){
        if (page >= data.pagination.lastPage) {
          setHasMore(false)
        }
        setPage((page) => page + 1)
        setProducts((prevProducts) => [...prevProducts, ...data.data])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <HomeLayout>
      <Head>
        <title>{category.mm_title || category.title}</title>
      </Head>
      <div className='border-bottom py-3 mb-4'>
        <Container>
          <h6 className='mb-0'>{category.mm_title || category.title}</h6>
        </Container>
      </div>
      <Container>
        {initialProducts && (
          <Row>
            {initialProducts.map((product, index) => {
              if (initialProducts.length === index + 1) {
                return (
                  <Col
                    sm={4}
                    xs={4}
                    lg={2}
                    md={4}
                    key={product.id}
                    ref={lastProduct}
                  >
                    <ProductCard product={product} />
                  </Col>
                )
              } else {
                return (
                  <Col sm={4} xs={4} lg={2} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                )
              }
            })}
            {products &&
              products.map((product, index) => {
                if (products.length === index + 1) {
                  return (
                    <Col
                      sm={4}
                      xs={4}
                      lg={2}
                      md={4}
                      key={product.id}
                      ref={lastProduct}
                    >
                      <ProductCard product={product} />
                    </Col>
                  )
                } else {
                  return (
                    <Col sm={4} xs={4} lg={2} md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  )
                }
              })}
          </Row>
        )}
      </Container>
    </HomeLayout>
  )
}
Products.getInitialProps = async (ctx) => {
  try {
    const { categoryId } = ctx.query
    const url = `categories/${categoryId}/products`
    const data = await request(url, {
      params: {
        page: 1,
        limit: 20,
        platform: 'new_web',
      },
    })
    return {
      initialProducts: data.data,
      pagination: data.pagination,
      category: data.category,
      categoryId,
    }
  } catch (error) {
    return {
      initialProducts: [],
      pagination: {},
      category: {},
      categoryId,
    }
  }
}

//Handle Scroll
// const handleScroll = (event) => {
//   if (
//     window.scrollY + window.innerHeight >
//     document.body.scrollHeight - 250
//   ) {
//     if(!isEnd ){
//       setPage((prevPage) => prevPage + 1)

//     }
//   }
// }
