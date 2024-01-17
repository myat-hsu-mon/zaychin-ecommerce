import { useRouter } from "next/router"
import { Col, Row, Button } from "react-bootstrap"
import slug from "slug"
import Layout from "../components/Layout"
import request from "../utils/request"
import Container from '../components/AppContainer'
import Img from "../components/Img"
import ProductCard from "../components/ProductCard"

export default function NewYearLiveSales({ data }) {
  // console.log('livesales', data)
  const router = useRouter()
  const liveSales = data.data.slice(0, 12)
  
  return (
    <Layout>
      <Container className='py-3'>
        <Img src='imgs/newyearlivesales.jpg' alt='live-sales cover image'  className='rounded'/>
      </Container>
      <Container >
        <h3 className='text-center'>{data.collection.title}</h3>
        <Row className='mx-2'>
          {
            liveSales.map((product, index) => (
              <Col xs={4} sm={4} md={2} lg={2} key={index} className='py-2'>
                <ProductCard
                  product={product}
                  href={router.query.is_mobile && `zaychin://p/${product.id}`}
                  hideQuantitySelector={router.query.is_mobile && 'none'}
                />
                {
                  router.query.is_mobile &&
                  (
                    product.discount ? (
                      <div>
                        <div className='text-center text-danger'>
                          <s>{product.discount.discounted_price} ks</s>
                        </div>
                        <div className='text-center text-primary'>
                          {product.price} ks
                        </div>
                      </div>
                    ) : (
                        <div className='text-center text-primary'>
                          {product.price} ks
                        </div>
                      )
                  )
                }
              </Col>
            ))
          }
        </Row>
        <Row className='py-4'>
          <Button
            passHref
            block
            className='text-danger'
            variant='light'
            href={router.query.is_mobile ? `zaychin://c/collection/182` : `collections/${data.collection.id}/${slug(data.collection.title)}`}

          >
            View All
          </Button>
        </Row>
      </Container>
    </Layout>
  )
}
NewYearLiveSales.getInitialProps = async (ctx) => {
  try {
    const response = await request('collections/107', {
      params: {
        platform: 'new-web'
      }
    })
    if (response.success) {
      return {
        data: response
      }
    } else {
      return {
        data: {
          collection: {},
          data: []
        }
      }
    }

  } catch (error) {
    return {
      data: {
        collection: {},
        data: []
      }
    }
  }
}