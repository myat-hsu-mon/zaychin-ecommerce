import React from 'react'
import { useRouter } from 'next/router'
import { Col, Container, Row, Button } from 'react-bootstrap'
import slug from 'slug'
import request from '../utils/request'
import ProductCard from '../components/ProductCard'
import Img from '../components/Img'
import Layout from '../components/Layout'

export default function UnileverPage({ data }) {
  const router = useRouter()
  const collections = data.data || []
  const arr = []

  const elan = collections[0]
  const familyCare = collections[1]
  const signal = collections[2]
  const clear = collections[3]

  return (
    <Layout>
      {/* COVERPHOTO */}
      {/* <div
        style={{
          height: 500,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            // 'url(https://yt3.ggpht.com/myzqmHQvrh2MX1KYaa-K4UM0TvkqhH6B8SsA8nMLnxnX7tWCy27y8qtg3xOSW6WyMQQKbCTQyu0=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)',
            'url(imgs/unilever/hero.jpg)'
        }}
        className='d-flex align-items-end'
      >
        <div
          style={{
            color: '#fff',
            flex: 1,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <Container style={{ paddingLeft: 32, paddingRight: 32 }}>
            <Row className='align-items-center'>
              <Col md={1} sm={2} xs={2}>
                <Image fluid src='https://logo.clearbit.com/unilever.com' />
              </Col>
              <Col md={6} sm={10} xs={10}>
                <h2 className='en h6 mb-0'>
                  We make some of the best known brands in the world, and those
                  brands are used by 2.5 billion people every day
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </div> */}

      <div className='mb-4 mt-4'>
        <Container className="text-center" >
          <Img src={'imgs/unilever/elan.png'} alt="elan" className='rounded' />
        </Container>
      </div>

      {/* BRANDS_COLLECTIONS */}
      {
        // arr.map(collection => (

        //   collection.items.length > 0 &&
        //   <Container >
        //     <h3
        //       className='text-center en'
        //     >
        //       {/* {data.bundles.mm_title || data.bundles.title} */}
        //       {collection.mm_title || collection.title}
        //     </h3>
        //     <Row>
        //       {
        //         collection.items.map((product, index) => (
        //           <Col
        //             xs={4}
        //             sm={4}
        //             md={2}
        //             lg={2}
        //             key={index}
        //           >
        //             <ProductCard
        //               product={product}
        //               href={router.query.is_mobile && `zaychin://p/${product.id}`}
        //               hideQuantitySelector={router.query.is_mobile && 'none'}
        //             />
        //             {
        //               router.query.is_mobile &&
        //               (product.discount ? (
        //                 <div>
        //                   <div className={`text-danger text-center`}>
        //                     <s>{product.price} ks</s>
        //                   </div>
        //                   <div className={`text-primary text-center`}>
        //                     {product.discount.discounted_price} ks
        //               </div>
        //                 </div>
        //               ) : (
        //                   <div className={`text-primary text-center`}>
        //                     {product.price} ks
        //                   </div>
        //                 )
        //               )
        //             }

        //           </Col>
        //         ))
        //       }
        //     </Row>
        //     <Row className="mt-3 mb-3 en">
        //       <Button
        //         href={
        //           router.query.is_mobile ?
        //             `zaychin://c/collection/${collection.id}` :
        //             `collections/${collection.id}/${slug(collection.title)}`}
        //         block
        //         variant="light"
        //         className="text-primary"
        //         passHref
        //       >View All
        //   </Button>
        //     </Row>
        //   </Container>
        // ))
      }


      {/* ELAN */}
      <Container >
        <h3
          className='text-center mb-2 mt-3'>
          {elan.mm_title || elan.title}
        </h3>
        <Row>
          {
            elan.items.map((product, index) => (
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
            variant="light"
            href={
              router.query.is_mobile ?
                `zaychin://c/collection/165` :
                `collections/${elan.id}/${slug(elan.title)}`
            }
            className="text-primary"
            passHref
          >
            View All
            </Button>
        </Row>
      </Container>


      {/* FAMILYCARE */}
      <Container >
        <h3
          className='text-center mb-2 mt-3'>
          {familyCare.mm_title || familyCare.title}
        </h3>
        <div className='mb-4 mt-4'>
          <Container className="text-center" >
            <Img
              src={'imgs/unilever/familycare.jpg'}
              alt="familycare"
              className='rounded'
            />
          </Container>
        </div>
        <Row>
          {
            familyCare.items.map((product, index) => (
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
            variant="light"
            href={
              router.query.is_mobile ?
                `zaychin://c/collection/166` :
                `collections/${familyCare.id}/${slug(familyCare.title)}`
            }
            className="text-primary"
            passHref
          >
            View All
            </Button>
        </Row>
      </Container>

      {/* SIGNAL */}
      <Container >
        <h3
          className='text-center mb-2 mt-3'>
          {signal.mm_title || signal.title}
        </h3>
        <div className='mb-4 mt-4'>
          <Container className="text-center" >
            <Img src={'imgs/unilever/signal.jpg'} alt="signal" className='rounded' />
          </Container>
        </div>
        <Row>
          {
            signal.items.map((product, index) => (
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
                  hideQuantitySelector={router.query.is_mobile}
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
            variant="light"
            href={
              router.query.is_mobile ?
                `zaychin://c/collection/167` :
                `collections/${signal.id}/${slug(signal.title)}`
            }
            className="text-primary"
            passHref
          >
            View All
            </Button>
        </Row>
      </Container>

      {/* CLEAR */}
      <Container >
        <h3
          className='text-center mb-2 mt-3'>
          {clear.mm_title || clear.title}
        </h3>
        <div className='mb-4 mt-4'>
          <Container className="text-center" >
            <Img src={'imgs/unilever/clear.jpg'} alt="clear" className='rounded' />
          </Container>
        </div>
        <Row>
          {
            clear.items.map((product, index) => (
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
        <Row className='mb-5 mt-3'>
          <Button
            block
            variant="light"
            href={
              router.query.is_mobile ?
                `zaychin://c/collection/168` :
                `collections/${clear.id}/${slug(clear.title)}`
            }
            className="text-primary"
            passHref
          >
            View All
            </Button>
        </Row>
      </Container>

      {/* BRANDS */}
      {/* <Container style={{ paddingLeft: 32, paddingRight: 32 }}>
        <div className='my-4'>
          <h4 className='en'>Our Brands</h4>
          <Row>
            <Col>
              <Image
                src='https://www.unilever.com/Images/lifebuoy-logo-2016-280x280_tcm244-408770_1_w198.jpg'
                fluid
              />
            </Col>
            <Col>
              <Image
                src='https://www.unilever.com/Images/lux_tcm244-408773_w198.png'
                fluid
              />
            </Col>
            <Col>
              <Image
                src='https://www.unilever.com/Images/dove_tcm244-408752_w198.png'
                fluid
              />
            </Col>
            <Col>
              <Image
                src='https://www.unilever.com/Images/global-clear-logo_tcm244-521204_w198.jpg'
                fluid
              />
            </Col>
            <Col>
              <Image
                src='https://www.unilever.com/Images/ponds_tcm244-408782_w198.png'
                fluid
              />
            </Col>
            <Col>
              <Image
                src='https://www.unilever.com/Images/LIPTON_OPTIMUM_RGB_STANDARD_tcm244-408771_w198.png'
                fluid
              />
            </Col>
          </Row>
        </div>
      </Container> */}
    </Layout>
  )
}
UnileverPage.getInitialProps = async (ctx) => {
  try {
    const response = await request('unilever', {
      params: {
        platform: 'new_web'
      }
    })
    if (response.success) {
      return {
        data: response
      }
    } else {
      return {
        data: {}
      }
    }
  } catch (error) {
    console.log(error)
  }

}
