import request from '../../../utils/request'
import { Image, Container, Row, Col, Card } from 'react-bootstrap'
import Quantity from '../../../components/Quantity'
import HomeLayout from '../../../components/HomeLayout'
import styles from '../../../scss/Product.module.scss'
import collectionStyle from '../../../scss/Collection.module.scss'
import Img from '../../../components/Img'
import Head from 'next/head'
import ProductCard from '../../../components/ProductCard'
import { analytics } from 'firebase'
function ProductDetail({ product }) {
  React.useEffect(() => {
    analytics().setCurrentScreen(`Product: ${product.name}`)
  }, [])
  return (
    <HomeLayout>
      <Head>
        <meta
          key='ios-app-install'
          name='apple-itunes-app'
          content={`app-id=1420150360, app-argument=zaychin://p/${product.id}`}
        />
        <title>{product.name}</title>
      </Head>
      <Container className='mt-4'>
        <Row>
          <Col md={5}>
            <Img src={product.cover} />
          </Col>
          <Col md={7}>
            <h1 className={styles.productName}>{product.mm_name}</h1>
            {product.desc && <div className='my-4'>{product.desc}</div>}
            <div
              className={`d-block d-md-none d-lg-none ${styles.openInAppBtn}`}
            >
              <a
                href={`https://l.zaychin.com/?p=p&s=${product.id}`}
                target='_blank'
              >
                App ဖြင့်ကြည့်မည်
              </a>
            </div>
            <Quantity horizontal product={product} />
            <hr />
            <div className={styles.relatedProducts}>
              <h6>ဆက်စပ်ပစ္စည်းများ</h6>
              <Row>
                {product.relatedProducts &&
                  product.relatedProducts.map((product, index) => (
                    <Col md={3} xs={3} sm={3} key={index}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}

ProductDetail.getInitialProps = async (ctx) => {
  try {
    const { productId } = ctx.query
    const response = await request(`products/${productId}`, { method: 'get' })
    return { product: response }
  } catch (error) {
    console.error(error)
  }
}
export default ProductDetail
