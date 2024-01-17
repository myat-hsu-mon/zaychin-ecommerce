import { InputGroup, FormControl, Container, Row, Col, Button } from 'react-bootstrap'
import Icon from '../components/Icon'
import { useEffect } from 'react'
import request from '../utils/request'
import ProductCard from './ProductCard'

function DIY({ onSelectProduct, onHide }) {
  const [text, setText] = React.useState('')
  const [searchData, setSearchData] = React.useState([])

  async function fetchAllProducts() {
    const response = await request(`collections/48`, {
      params: {
        platform: 'new_web',
        page: 1,
        limit: 10
      }
    })
    if (response.success) {
      setSearchData(response.data)
    }
  }

  async function fetchSearchData() {
    const response = await request(`collections/48/search`, {
      params: {
        platform: 'new_web',
        q: text
      }
    })
    console.log("search data: ", response.data)
    setSearchData([...response.data])
  }

  const handleClick = (product, index) =>{
    onSelectProduct(product)
    // const array = [...searchData]
    // array.splice(index)
    // setSearchData(array)
  }

  useEffect(() => {
    if (text.length >= 2) {
      fetchSearchData()
    }
  }, [text])

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      <InputGroup size='lg'>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <Icon name='Search' size={20} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          placeholder="ပစ္စည်းများကိုရှာပါ"
        />
        {/* <span><Icon name='XSquare' size={40} color='red'/></span> */}
          <Button onClick={onHide} variant='success' size="sm">ပိတ်မည်</Button>

      </InputGroup>
      <Container>
        <Row>
          {
            searchData && searchData.map((product, index) => (
              <Col
                xs={6}
                md={4}
                key={index}
                onClick={() => handleClick(product,index)}
              >
                <ProductCard product={product} cartKey="hamperCart" />
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}
export default DIY