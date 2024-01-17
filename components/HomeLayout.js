import React from 'react'
import { Nav, NavLink, Button, Modal } from 'react-bootstrap'
import Icon from '../components/Icon'
import Link from 'next/link'
import withMasterLayout from '../hocs/withMasterLayout'
import { useRecoilValue } from 'recoil'
import { totalCount as totalCountSelector} from '../utils/recoil-helper'
import styles from '../scss/HomeLayout.module.scss'
// console.log(styles)
function HomeLayout({ children, className, hideSearch }) {
  const total = useRecoilValue(totalCountSelector)
  const [cartClassName, setCartClassName] = React.useState(styles.cartButtonBg)

  React.useEffect(() => {
    setCartClassName(
      total > 0
        ? `${styles.cartButtonBg} ${styles.cartButtonActive}`
        : styles.cartButtonBg
    )
  }, [])

  return (
    <div className={`${styles.container} ${className}`}>
      {children}
      <Nav
        variant='pills'
        className='home-tabbar fixed-bottom d-lg-none'
        fill
        justify
      >
        <Nav.Item>
          <Nav.Link as={Link} href='/'>
            <a className='nav-link'>
              <Icon name='House' size={20} />
              <span>မူလ</span>
            </a>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href='/sales'>
            <a className='nav-link'>
              <Icon name='ArrowDownRight' size={20} />
              <span>လျော့စျေးများ</span>
            </a>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={styles.cartButton}>
          <Nav.Link as={Link} href='/cart'>
            <a className='nav-link'>
              <div className={cartClassName} />
              <Icon name='Basket' size={20} color='#fff' />
              {total > 0 && (
                <span className={styles.cartButtonCount}>{total}</span>
              )}
            </a>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href='/categories'>
            <a className='nav-link'>
              <Icon name='Folder' size={20} />
              <span>အမျိုးအစားများ</span>
            </a>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} href='/more'>
            <a className='nav-link'>
              <Icon name='ThreeDots' size={20} />
              <span>အခြား</span>
            </a>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default withMasterLayout(HomeLayout)
