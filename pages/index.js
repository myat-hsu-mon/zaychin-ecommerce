import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import HomeLayout from '../components/HomeLayout';
import Img from '../components/Img';
import request from '../utils/request';
import CollectionSection from '../components/CollectionSection';
import _ from 'lodash';

const slider = [
  {
    name: 'Elan',
    img: 'https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/elan.jpg',
    href: '/elan',
    as: '/elan',
  },
  {
    name: 'Coca-Cola',
    img: 'https://zaychin.sgp1.cdn.digitaloceanspaces.com/coca-cola/coca-cola-slider.jpg',
    href: '/coca-cola',
    as: '/coca-cola',
  },
  // {
  //   name: 'Vito',
  //   img: 'https://zaychin.sgp1.cdn.digitaloceanspaces.com/new/slider/vito.jpg',
  //   href: '/products/search?q=vito',
  //   as: '/products/search?q=vito',
  // },
];

function Index({ data }) {
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState(data.pagination);
  console.log('pagination: ', pagination);
  const [extraData, setExtraData] = React.useState([]);

  const handleOnDragStart = (e) => e.preventDefault();

  const handleScroll = React.useCallback((event) => {
    if (
      window.scrollY + window.innerHeight >
      document.body.scrollHeight - 250
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  React.useEffect(() => {
    if (pagination && pagination.lastPage >= page && page > 1) {
      fetchIndexByPage(page);
    }
  }, [page]);

  React.useEffect(() => {
    setPagination(data.pagination);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  async function fetchIndexByPage(page) {
    const indexPage = await request('pages/index', {
      params: {
        page,
        limit: 5,
      },
    });
    setExtraData((prev) => [...prev, ...indexPage.data]);
  }

  return (
    <>
      <HomeLayout className='home-page'>
        <Head>
          <meta
            name='apple-itunes-app'
            content='app-id=1420150360, app-argument=zaychin://index'
          />
        </Head>
        <div className='hero'>
          <Container>
            <Carousel
              showStatus={false}
              // centerSlidePercentage={80}
              showThumbs={false}
              centerMode
              swipeable
              // emulateTouch
              showArrows={false}
              // onChange={onChange}
              // onClickItem={onClickItem}
              // onClickThumb={onClickThumb}
            >
              {_.map(_.shuffle(slider), (slide, index) => (
                <div className='home-slider-item' key={index}>
                  <Link href={slide.href} as={slide.as}>
                    <a>
                      <Img
                        src={slide.img}
                        // src={'imgs/coca-cola/slider.jpg'}
                        onDragStart={handleOnDragStart}
                        alt={slide.name}
                      />
                    </a>
                  </Link>
                </div>
              ))}
            </Carousel>
            {/* <Row className={`${styles.homeShortcuts} justify-content-center`}>
            <Col
              md={2}
              sm={3}
              lg={2}
              xs={3}
              className={styles.homeShortcutItem}
            >
              <Link
                href={`/categories/[categoryId]/products`}
                as={`/categories/6/products`}
              >
                <a>
                  <img src={'/imgs/meat.png'} style={{ maxWidth: 32 }} />
                  <h6>အသားငါး</h6>
                </a>
              </Link>
            </Col>
            <Col
              md={2}
              sm={3}
              lg={2}
              xs={3}
              className={styles.homeShortcutItem}
            >
              <Link
                href={`/categories/[categoryId]/products`}
                as={`/categories/5/products`}
              >
                <a>
                  <img src={'/imgs/vegetable.png'} />
                  <h6>ဟင်းသီးဟင်းရွက်</h6>
                </a>
              </Link>
            </Col>
            <Col
              md={2}
              sm={3}
              lg={2}
              xs={3}
              className={styles.homeShortcutItem}
            >
              <Link
                href={`/categories/[categoryId]/products`}
                as={`/categories/7/products`}
              >
                <a>
                  <img src={'/imgs/snack.png'} />
                  <h6>အချိုရည်နှင့်မုန့်မျိုးစုံ</h6>
                </a>
              </Link>
            </Col>
            <Col
              md={2}
              sm={3}
              lg={2}
              xs={3}
              className={styles.homeShortcutItem}
            >
              <Link href={`/categories`}>
                <a>
                  <img src={'/imgs/atoz.png'} />
                  <h6>အခြားပစ္စည်းများ</h6>
                </a>
              </Link>
            </Col>
          </Row> */}
          </Container>
        </div>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
          {data.data &&
            data.data.map((collection, index) => {
              if (collection.id === 122) {
                return (
                  <div key={index} className='cursor-pointer'>
                    <Container>
                      <Link
                        href='collections/[collectionId]/[collectionName]'
                        as='collections/103/hydro'
                        passHref
                      >
                        <Img
                          src='https://zaychin.sgp1.cdn.digitaloceanspaces.com/new/dpop.jpg'
                          alt='dpop'
                        />
                      </Link>
                    </Container>
                    <CollectionSection collection={collection} />
                  </div>
                );
              }
              // if (index === 2) {
              //   return (
              //     <div key={index} className='cursor-pointer'>
              //       <Container>
              //         <Link
              //           href='coca-cola'
              //           as='coca-cola'
              //           passHref
              //         >
              //           <Img
              //             src='https://zaychin.sgp1.cdn.digitaloceanspaces.com/new/coca-cola-banner.jpg'
              //             alt='Coca-Cola'
              //           />
              //         </Link>
              //       </Container>
              //       <CollectionSection collection={collection} />
              //     </div>
              //   );
              // }
              return <CollectionSection collection={collection} key={index} />;
            })}
          {extraData &&
            extraData.map((collection, index) => {
              return <CollectionSection collection={collection} key={index} />;
            })}
        </Container>
      </HomeLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const getIndex = await request('pages/index', {
    params: {
      page: 1,
      limit: 5,
    },
  });
  return {
    props: {
      data: getIndex,
      iphone: /iPhone|iPad|iPod/i.test(context.req.headers['user-agent']),
      android: /Android/i.test(context.req.headers['user-agent']),
    },
  };
}

export default Index;
