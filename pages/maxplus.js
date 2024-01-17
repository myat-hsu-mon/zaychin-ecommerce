import request from '../utils/request';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import slug from 'slug';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import Img from '../components/Img';
import Quantity from '../components/Quantity';
import styles from '../scss/ProductCard.module.scss';
import Layout from '../components/Layout';

function CocaCola({ data }) {
  const router = useRouter();
  const bundles = data.bundles.products;
  const other = data.other.products && data.other.products;

  return (
    <Layout>
      {/* <iframe
        id='coca-cola-iframe'
        src='https://server.zcforce.com/coca-cola?is_web=true'
        frameborder='0'
        width='100%'
        style={{ height: '100vh' }}
      ></iframe> */}
      <div className='py-3 text-center'>
        <Container>
          <Img
            src={`https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/max-plus-jan-2022.jpg`}
            alt='coca-cola'
            className='rounded'
          />
        </Container>
      </div>
      <Container className='mb-5'>
        <h3 className='text-center'>
          {data.bundles.mm_title || data.bundles.title}
        </h3>
        <Row className='justify-content-center'>
          {bundles.map((product, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <Col xs={4} sm={4} md={2} lg={2} key={index}>
                <ProductCard
                  product={product}
                  href={router.query.is_mobile && `zaychin://p/${product.id}`}
                  display={router.query.is_mobile && 'none'}
                />
                {router.query.is_mobile &&
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
                  ))}
              </Col>
            );
          })}
        </Row>
        {/* <Row className='mt-5'>
          <Button
            href={
              router.query.is_mobile
                ? `zaychin://c/collection/134`
                : `collections/${data.bundles.id}`
            }
            block
            variant='light'
            className='text-danger'
            passHref
          >
            View All
          </Button>
        </Row> */}
      </Container>

      <div className='mb-4'>
        <Container className='text-center'>
          <Img
            src={`https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/max-plus-banner-jan-2022.jpg`}
            alt='Max+'
            className='rounded'
          />
        </Container>
      </div>
      <Container className='mb-5'>
        <h3 className='mb-0 text-center'>
          {data.other.mm_title || data.other.title}
        </h3>
        <Row>
          {other &&
            other.map((product, index) => (
              <Col xs={4} sm={4} md={2} lg={2} key={index}>
                <ProductCard
                  product={product}
                  href={router.query.is_mobile && `zaychin://p/${product.id}`}
                  display={router.query.is_mobile && 'none'}
                />
                {router.query.is_mobile &&
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
                  ))}
              </Col>
            ))}
        </Row>
        {other && (
          <Row className='mx-5'>
            <Button
              block
              variant='light'
              href={
                router.query.is_mobile
                  ? `zaychin://c/collection/89`
                  : `collections/${data.other.id}/${slug(data.other.title)}`
              }
              className='text-danger'
              passHref
            >
              View All
            </Button>
          </Row>
        )}
      </Container>
    </Layout>
  );
}
CocaCola.getInitialProps = async (ctx) => {
  try {
    const response = await request('max-plus', {
      params: {
        platform: 'new_web',
      },
    });
    if (response.success) {
      return {
        data: response,
      };
    } else {
      return {
        data: {},
      };
    }
  } catch (error) {
    console.log(error);
  }
};
export default CocaCola;
