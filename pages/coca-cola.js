import request from '../utils/request';
import slug from 'slug';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Img from '../components/Img';
import Layout from '../components/Layout';

function CocaCola({ data }) {
  const router = useRouter();
  const bundles = data.bundles.products.slice(0, 6);
  const other = data.other.products.slice(0, 12);

  return (
    <Layout className='mb-4'>
      {/* <iframe
        id='coca-cola-iframe'
        src='https://server.zcforce.com/coca-cola?is_web=true'
        frameborder='0'
        width='100%'
        style={{ height: '100vh' }}
      ></iframe> */}

      <div className='py-3'>
        <Container className='text-center'>
          <Img
            src={`https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/coca-cola-landing-top.jpg`}
            alt='coca-cola'
            className='rounded'
          />
        </Container>
      </div>
      <Container className='mb-5'>
        <h3 className='text-center'>
          {data.bundles.mm_title || data.bundles.title}
        </h3>
        <Row>
          {bundles.map((product, index) => (
            <Col xs={4} sm={4} md={2} lg={2} key={index}>
              <ProductCard
                product={product}
                href={router.query.is_mobile && `zaychin://p/${product.id}`}
                hideQuantitySelector={router.query.is_mobile && 'none'}
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
        <Row className='mt-3'>
          <Button
            href={
              router.query.is_mobile
                ? `zaychin://c/collection/134`
                : `collections/${data.bundles.id}/${slug(data.bundles.title)}`
            }
            block
            variant='light'
            className='text-danger'
            passHref
          >
            View All
          </Button>
        </Row>
      </Container>

      <div className='my-4'>
        <Container className='text-center'>
          <Img
            src={`https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/coca-cola-landing-bottom.jpg`}
            alt='coca-cola-2'
            className='rounded'
          />
        </Container>
      </div>
      <Container>
        <h3 className='mb-0 text-center'>
          {data.other.mm_title || data.other.title}
        </h3>
        <Row>
          {other.map((product, index) => (
            <Col xs={4} sm={4} md={2} lg={2} key={index}>
              <ProductCard
                product={product}
                href={router.query.is_mobile && `zaychin://p/${product.id}`}
                hideQuantitySelector={router.query.is_mobile && 'none'}
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
        <Row className='mt-3'>
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
      </Container>
    </Layout>
  );
}
CocaCola.getInitialProps = async (ctx) => {
  try {
    const response = await request('coca-cola', {
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
