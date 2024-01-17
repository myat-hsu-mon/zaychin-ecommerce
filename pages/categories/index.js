import React, { useState, useEffect } from 'react'
import {
  Accordion,
  ListGroup,
  ListGroupItem,
  Spinner,
  Container,
} from 'react-bootstrap'
import request from '../../utils/request'
import Icon from '../../components/Icon'
import HomeLayout from '../../components/HomeLayout'
import Link from 'next/link'

function Categories(props) {
  const [activeItem, setActiveItem] = React.useState()

  function toggleCategory(categoryId) {
    setActiveItem(activeItem === categoryId ? null : categoryId)
  }

  return (
    <HomeLayout>
      <Container className='p-0'>
        <Accordion as={ListGroup} variant='flush' activeKey={activeItem}>
          {props.categories.map((category) => {
            return (
              <React.Fragment key={category.id}>
                <Accordion.Toggle
                  as={ListGroupItem}
                  variant='flush'
                  eventKey={category.id}
                  className='d-flex justify-content-between align-items-center'
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.mm_title}</span>
                  <Icon
                    name={
                      activeItem === category.id ? 'ChevronUp' : 'ChevronDown'
                    }
                    size={18}
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={category.id}>
                  <ListGroup variant='flush'>
                    <Link
                      href={`/categories/[categoryId]/products`}
                      as={`/categories/${category.id}/products`}
                    >
                      <ListGroupItem className='text-muted'>
                        <Icon name='ArrowBarRight' size={10} />{' '}
                        <span className='ml-2'>အားလုံးကြည့်ရန်</span>
                      </ListGroupItem>
                    </Link>
                    {category.subs.map((sub) => {
                      const href = `/categories/[categoryId]/products`
                      const url = `/categories/${sub.id}/products`
                      return (
                        <Link href={href} as={url} key={sub.id}>
                          <ListGroupItem key={sub.id} className='text-muted'>
                            <span className='ml-2'>
                              <Icon name='ArrowReturnRight' size={10} />{' '}
                              {sub.mm_title || sub.title}
                            </span>
                          </ListGroupItem>
                        </Link>
                      )
                    })}
                  </ListGroup>
                </Accordion.Collapse>
              </React.Fragment>
            )
          })}
        </Accordion>
      </Container>
    </HomeLayout>
  )
}

Categories.getInitialProps = async (context) => {
  try {
    const data = await request('categories', {
      params: {
        platform: 'new_web',
      },
      mode: 'no-cors',
    })
    return {
      categories: data.data,
    }
  } catch (err) {
    return {
      categories: [],
    }
  }
}

export default Categories
