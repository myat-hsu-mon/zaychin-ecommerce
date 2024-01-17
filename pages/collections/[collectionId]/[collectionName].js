import request from '../../../utils/request'
import HomeLayout from '../../../components/HomeLayout'
import { useEffect, useRef } from 'react'
import ProductCard from '../../../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Img from '../../../components/Img'

function Index({ collectionDetail, collectionId }) {
  console.log('initial collections', collectionDetail)
  const [collections, setCollections] = React.useState([])
  const [page, setPage] = React.useState(2)
  const [lastPage, setLastPage] = React.useState(null)

  const fetchCollectionsPerPage = async () => {
    try {
      const response = await request(`collections/${collectionId}`, {
        params: {
          platform: 'new_web',
          page,
          limit: 20,
        },
      })
      if (response.success) {
        setCollections((prev) => [...prev, ...response.data])
        setLastPage(response.pagination.lastPage)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('lastpage: ', lastPage)
    if (lastPage >= page && page > 1) {
      fetchCollectionsPerPage()
    }
  }, [page])

  useEffect(() => {
    fetchCollectionsPerPage()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = React.useCallback(event => {
    if (window.scrollY + window.innerHeight > document.body.scrollHeight - 600) {
      setPage(prevPage => prevPage + 1)
    }
  }, [])

  return (
    <HomeLayout>
      <Head>
        <title>{collectionDetail.collection.title}</title>
      </Head>
      <div className='border-bottom py-3 mb-4'>
        <Container>
          <h6 className='mb-0'>
            {collectionDetail.collection.mm_title ||
              collectionDetail.collection.title}
          </h6>
        </Container>
      </div>
      <Container>
        <div >
          <Img src={collectionDetail.collection.cover} width='100%' className='rounded'/>
        </div>
      </Container>
      <Container>
        <Row>
          {collectionDetail.data &&
            collectionDetail.data.map((product, index) => {
              return (
                <Col
                  sm={4}
                  xs={4}
                  lg={2}
                  md={4}
                  key={index}
                >
                  <ProductCard product={product}/>
                </Col>
              )
            })
          }
          {collections &&
            collections.map((product, index) => {
              return (
                <Col
                  sm={4}
                  xs={4}
                  lg={2}
                  md={4}
                  key={index}
                >
                  <ProductCard product={product}/>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </HomeLayout>
  )
}
Index.getInitialProps = async (ctx) => {
  const { collectionId } = ctx.query
  console.log('collectionId', collectionId)
  const response = await request(`collections/${collectionId}`, {
    params: {
      page: 1,
      limit: 20,
      platform: 'new_web',
    },
  })
  return {
    collectionId,
    collectionDetail: response,
  }
}
export default Index
