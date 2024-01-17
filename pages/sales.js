import request from '../utils/request'
import _, { initial } from 'lodash'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button
} from 'react-bootstrap'
import HomeLayout from '../components/HomeLayout'
import ProductCard from '../components/ProductCard'
import { useRouter } from 'next/router'
import styles from '../scss/OrderTotalDetail.module.scss'
import Cookies from 'js-cookie'

export default function Sales({ data }) {
  const router = useRouter()
  const [ids, setIds] = React.useState(router.query.categories ? router.query.categories.split(',') : [])
  // console.log('ids', ids.toString())
  const [sales, setSales] = React.useState(data.data)
  const [page, setPage] = React.useState(1)
  const [lastPage, setLastPage] = React.useState(data.pagination.lastPage)
  const [categories, setCategories] = React.useState(data.categories)
  const [isClicked, setIsClicked] = React.useState(false)
  const [isInitial, setIsInitial] = React.useState(true)
  const [hasMore, setHasMore] = React.useState(false)
  const [onChangeToggle, setOnChangeToggle] = React.useState(false)
  const [isReset, setIsReset] = React.useState(false)

  const fetchSalesPerPage = async () => {
    try {
      console.log('fetch sales')
      const response = await request('sales', {
        params: {
          categories: ids.toString() || null,
          page,
          limit: 20,
          platform: 'new_web'
        }
      })
      console.log('more sales', response.data)

      if (response.success) {
        // isClicked && !(page < response.pagination.lastPage) ? setSales(response.data) : setSales(sales => [...sales, ...response.data])
        setSales([...sales, ...response.data])
        isClicked && setLastPage(response.pagination.lastPage)
      } else {
        console.log('Response Fail')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const handleOnChange = (id) => {
    try {
      const categories = ids.includes(id) ? ids.filter(ids => ids !== id) : [...ids, id]
      setIds(categories)
      setIsInitial(false)
      setIsClicked(true)
      setPage(1)
      setOnChangeToggle(!onChangeToggle)
      setSales([])
      router.push({
        pathname: '/sales',
        query: {
          categories: categories.toString()
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleScroll = React.useCallback(() => {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      setIsInitial(false)
      setPage(page => (page < lastPage) ? page + 1 : page)
    }
  }, [])

  const handleReset = () => {
    setIds([])
    setLastPage(data.pagination.lastPage)
    router.push({
      pathname: '/sales',
      query: {
        categories: ''
      }
    })
    setIsReset(true)
  }

  React.useEffect(() => {
    setIsReset(false)
    ids.length && setIsClicked(true)
    ids.length && setIsInitial(false)
    console.log('initial', ids)
    setCategories(categories => categories.map(category => ({ ...category, checked: ids.includes(category.id.toString()) })))
  }, [ids])
  categories.length && console.log('checked', categories)

  React.useEffect(() => {
    if (isReset) {
      setSales([])
    }
    if (!isInitial && page <= lastPage || isReset) {
      fetchSalesPerPage()
    }
  }, [page, onChangeToggle, isReset, isClicked])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <HomeLayout>
      <div className='border-bottom py-3 mb-4'>
        <Container>
          <h6 className='mb-0'>အထူးလျှော့စျေးများ</h6>
        </Container>
      </div>
      <Container>
        <Row>
          <Col sm={12} md={9}>
            <Row>
              {
                sales.map((sale, index) => (
                  <Col xs={4} sm={4} md={4} lg={2} key={index}>
                    <ProductCard product={sale} />
                  </Col>
                ))
              }

            </Row>
          </Col>
          <Col sm={12} md={3} >
            <div className='d-flex flex-column ' style={{ position: 'sticky', top: 70 }}>
              <ListGroup  >
                <ListGroup.Item className='text-center' variant='light' >
                  Filter
                </ListGroup.Item>
                <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                  {
                    categories.map((category, index) => (
                      <ListGroup.Item key={index}>
                        <div className='form-check'>
                          <input
                            type='checkbox'
                            id={index}
                            className='form-check-input'
                            checked={category.checked}
                            onChange={() => handleOnChange(category.id.toString())}
                          />
                          <label htmlFor={index} className='form-check-label'>{category.mm_title || category.title}</label>
                        </div>
                      </ListGroup.Item>
                    ))
                  }
                </div>
              </ListGroup>
              <ListGroup.Item variant='light' className={`${styles.listItem}`}>
                <Button block onClick={handleReset} className='btn-secondary'>
                  Reset
                </Button>
              </ListGroup.Item>
            </div>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}
Sales.getInitialProps = async (ctx) => {
  try {
    console.log('ctx', ctx.query.categories)
    const response = await request('sales', {
      params: {
        // categories: ctx.query.categories || null,
        platform: 'new_web',
        page: 1,
        limit: 20,
      },
    })
    if (response.success) {
      return {
        data: response,
      }
    } else {
      return {
        data: {
          data: [],
          categories: [],
          pagination: {},
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}