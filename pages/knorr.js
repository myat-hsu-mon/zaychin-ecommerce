import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import HomeLayout from "../components/HomeLayout";
import ProductCard from "../components/ProductCard";
import request from "../utils/request";
import Img from '../components/Img'
import Layout from '../components/Layout'

export default function Knorr({ data }) {
  console.log('data', data)
  const router = useRouter()
  // const initialProduct = data.data.items.slice(0, 3)
  // const remainingProduct = data.data.items.slice(3)
  const knorr = data.data || {}
  console.log('knorr', knorr)
 

  return (
    <Layout>
      <div className='py-3'>
        <Container>
          <Img src={'imgs/knorr/knorr_banner.jpg'} alt='knorr_banner' className='img-fluid rounded' />
        </Container>
      </div>
      {/* <Container className='mt-2 mb-3'>
        <Row className='d-flex align-items-center justify-content-between'>
          <Col sm={12} md={6}>
            <div>
              <img src={'imgs/knorr/knorr_hero.jpg'} alt='knorr_hero' className='img-fluid' />
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
          {knorr.mm_title || knorr.title}
        </h3>
        <Row>
          {
            knorr.items.map((product, index) => (
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
Knorr.getInitialProps = async (context) => {
  try {
    const response = await request('knorr', {
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
    console.log('Fetch Knorr Error: ', error)
  }
}