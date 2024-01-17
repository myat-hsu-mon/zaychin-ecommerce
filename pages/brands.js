import { Container, Row, Col, Image, Button } from "react-bootstrap"
import Img from '../components/Img'
import { useRouter } from 'next/router'
import HomeLayout from "../components/HomeLayout"
import slug from 'slug'
import Layout from '../components/Layout'

export default function BrandsPage({ data }) {
  const router = useRouter()
  console.log('data', data)
  const chicken = data && data.chicken || []
  const nest = data && data.chicken || []
  const supplement = data && data.supplement || []


  return (
    <Layout>
      <div>
        {/* <div style={{
          // height: 200,
          // backgroundImage: 'url(imgs/brands/brandgreen.jpeg)',
          // backgroundImage: 'linear-gradient(to bottom,#0b5c04,#84ad42)',
          //  backgroundImage: 'linear-gradient(#e66465, #9198e5)',
          // backgroundAttachment: 'top',
          // backgroundSize: 'cover'
        }}
          className='d-flex align-items-end'
        >
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: '100%',
            color: '#fff',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 32,
            paddingRight: 32
          }}>
            <Container>
              <Row className='align-items-center'>
                <Col xs={2} md={1}>
                  <Image fluid src='imgs/brands/brandred.jpeg' width={40} />
                </Col>
                <Col xs={6} md={8}>
                  <h6 className='en  mb-0'>
                    We make some of the best known brands in the world, and those
                    brands are used by 2.5 billion people every day
                </h6>
                </Col>
              </Row>
            </Container>
          </div>
        </div> */}

        <div className='mb-4 mt-4'>
          <Container className="text-center" >
            <Img src={'imgs/brands/brandcover.jpg'} alt="brands-hero" className='rounded' />
          </Container>
        </div>

        <Container >
          <h3
            className='text-center mb-2 mt-3'>
            {chicken.mm_title || chicken.title}
          </h3>
          <div className='mb-4 mt-4'>
            <Container className="text-center" >
              <Img src={'imgs/brands/elan.png'} alt="chicken" className='rounded' />
            </Container>
          </div>
          <Row>
            {
              chicken.length && chicken.items.map((product, index) => (
                <Col
                  xs={4}
                  sm={4}
                  md={2}
                  lg={2}
                  key={index}
                >
                  <ProductCard
                    product={product}
                    href={router.query.is_mobile && `zaychin://p/${product.id}`}
                    hideQuantitySelector={router.query.is_mobile && 'none'}
                  />
                  {
                    router.query.is_mobile &&
                    (product.discount ? (
                      <div>
                        <div className={`text-danger text-center`}>
                          <s>{product.price} ks</s>
                        </div>
                        <div className={`text-primary text-center`}>
                          {product.discount.discounted_price} ks
                      </div>
                      </div>
                    ) : (
                        <div className={`text-primary text-center`}>
                          {product.price} ks
                        </div>
                      )
                    )
                  }
                </Col>
              ))
            }
          </Row>
          <Row className='mt-3'>
            <Button
              block
              variant='primary'
              href={
                router.query.is_mobile ?
                  `zaychin://c/collection/165` :
                  `collections/${chicken.id}/${slug('chicken.title')}`
              }
              className="text-white"
              passHref
            >
              View All
            </Button>
          </Row>
        </Container>

      </div>
    </Layout>
  )
}

// BrandsPage.getInitialProps = async (ctx) => {
//   try {
//     const response = await request('brands', {
//       params: {
//         platform: 'new_web'
//       }
//     })
//     if (response.success) {
//       return {
//         data: response
//       }
//     } else {
//       return {
//         data: {}
//       }
//     }
//   } catch (error) {
//     console.log(error)
//   }

// }