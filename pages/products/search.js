import {
  Form,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useEffect } from 'react'
import request from '../../utils/request'
import Icon from '../../components/Icon'
import ProductCard from '../../components/ProductCard'
import HomeLayout from '../../components/HomeLayout'
import styles from '../../scss/Search.module.scss'
import { useRouter } from 'next/router'

function Search() {
  const router = useRouter()
  const q = router.query.q
  const [text, setText] = React.useState(q)
  console.log('text', text)
  const [searchData, setSearchData] = React.useState([])

  useEffect(() => {
    fetchSearchData()
  }, [text])

  useEffect(() => {
    setText(q)
  }, [q])

  const handleChange = async (text) => {
    setText(text)
    router.push({
      pathname: '/products/search',
      query: {
        q: text
      }
    })
  }

  const fetchSearchData = async () => {
    const response = await request(`products/search`, {
      params: {
        platform: 'new_web',
        q: text,
      },
    })
    setSearchData(response.data)
  }

  return (
    <HomeLayout hideSearch >
      <Container >
        <div style={{ margin: '0 auto', marginBottom: 45 }}>
          <FormControl
            type='text'
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='Search'
            className={styles.searchInput}
            size='lg'
            autoFocus
          />
        </div>
        <Row style={{ paddingBottom: 79 }}>
          {searchData &&
            searchData.map((product, index) => {
              return (
                <Col sm={4} xs={4} lg={2} md={4} key={index}>
                  <ProductCard product={product} />
                </Col>
              )
            })}
        </Row>
      </Container>
    </HomeLayout>
  )
}
export default Search
