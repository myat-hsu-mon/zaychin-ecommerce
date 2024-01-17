import request from '../utils/request';
import slug from 'slug';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Img from '../components/Img';
import Layout from '../components/Layout';
import Axios from 'axios';

function Nestle({ data }) {
  const router = useRouter();

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
            src={`https://zaychin.sgp1.cdn.digitaloceanspaces.com/nestle/nestle-banner.jpg`}
            alt='Nestle'
            className='rounded'
          />
        </Container>
      </div>
      {_.map(data, (row) => (
        <Container className='mb-5'>
          {row.cover && <img className='img-fluid mb-2' src={row.cover} />}
          <h3 className='text-center'>{row.title}</h3>
          <Row>
            {row.products.map((product, index) => (
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
          {/* <Row className='mt-3'>
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
          </Row> */}
        </Container>
      ))}
    </Layout>
  );
}
Nestle.getInitialProps = async (ctx) => {
  try {
    const response = await Axios.get('https://apiv2.zaychin.com/api/v1/nestle');
    if (response.data.success) {
      console.log(response.data.data);
      return {
        data: response.data.data,
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
export default Nestle;
