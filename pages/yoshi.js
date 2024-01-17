import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import HomeLayout from "../components/HomeLayout";
import ProductCard from "../components/ProductCard";
import request from "../utils/request";
import Img from '../components/Img'
import Layout from '../components/Layout'

export default function Yoshi({ data }) {
  console.log('data', data)
  const router = useRouter()
  // const initialProduct = data.data.items.slice(0, 3)
  // const remainingProduct = data.data.items.slice(3)
  const yoshi = data.data || {}
  console.log('yoshi', yoshi)


  return (
    <Layout>
      <div className='py-3'>
        <Container>
          <Img src={'https://zaychin.sgp1.cdn.digitaloceanspaces.com/yoshi.jpg'} alt='yoshi_banner' className='img-fluid rounded' />
        </Container>
      </div>
      {/* <Container className='mt-2 mb-3'>
        <Row className='d-flex align-items-center justify-content-between'>
          <Col sm={12} md={6}>
            <div>
              <img src={'imgs/yoshi/yoshi_hero.jpg'} alt='yoshi_hero' className='img-fluid' />
            </div>
          </Col>
          {
            initialProduct.map((product, index) => (
              <Col xs={4} sm={4} md={2} key={index}>
                <ProductCard
                  product={product}
                  href={router.query.is_mobile && `zaychin://p/${product.id}`}
                  hideQuantitySelector={router.query.is_mobile && 'none'}
                >
                  {
                    router.query.is_mobile && (
                      product.discount ?
                        <div>
                          <div className='text-danger text-center'><s>{product.price} Ks</s></div>
                          <div className='text-primary text-center'>{product.discount.discounted_price} Ks</div>
                        </div>
                        :
                        <div className='text-primary text-center'>{product.price} Ks</div>
                    )
                  }
                </ProductCard>
              </Col>
            ))
          }
        </Row>
      </Container> */}

      <Container>
        <h3 className='text-center mb-2 mt-2'>
          Yoshi
        </h3>
        <Row className='justify-content-md-center'>
          {
            yoshi.map((product, index) => (
              <Col xs={4} sm={4} md={2} lg={2} key={index}>
                <ProductCard
                  product={product}
                  href={router.query.is_mobile && `zaychin://p/${product.id}`}
                  hideQuantitySelector={router.query.is_mobile && 'none'}
                >
                  {
                    router.query.is_mobile && (
                      product.discount ?
                        <div>
                          <div className='text-danger text-center'><s>{product.price} Ks</s></div>
                          <div className='text-primary text-center'>{product.discount.discounted_price} Ks</div>
                        </div>
                        :
                        <div className='text-primary text-center'>{product.price} Ks</div>
                    )
                  }
                </ProductCard>
              </Col>
            ))
          }
        </Row>
      </Container>
    </Layout>
  )
}
Yoshi.getInitialProps = async (context) => {
  try {
    const response = await request('collections/127', {
      params: {
        platform: 'new_web'
      }
    })
    if (response.success) {
      return {
        data: response
      }
    } else {
      return {}
    }
  } catch (error) {
    console.log('Fetch Yoshi Error: ', error)
  }
}