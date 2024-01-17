import { Component } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Icon from '../components/Icon'
import { totalCount as totalCountSelector } from '../utils/recoil-helper'

function CartIcon() {
  const total = useRecoilValue(totalCountSelector)
  const [cartClassName, setCartClassName] = React.useState(
    'rounded-circle top-cart-icon'
  )

  React.useEffect(() => {
    setCartClassName(
      total > 0
        ? 'rounded-circle top-cart-icon active'
        : 'rounded-circle top-cart-icon'
    )
  }, [])

  return (
    <Nav.Link as={Link} href='/cart' passHref>
      <div className='d-flex align-items-center'>
        <span className={cartClassName}>
          <Icon name='Basket' size={16} color={'#fff'} />
          {total > 0 && <span className={'cart-icon-count'}>{total}</span>}
        </span>
        <a className='nav-link'>ခြင်း</a>
      </div>
    </Nav.Link>
  )
}

export default function withMasterLayout(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        android: false,
        iphone: false
      }

    }

    componentDidMount() {
      const mainNav = document.getElementById('main-nav')
      window.onscroll = function () {
        if (window.pageYOffset >= 65) {
          // mainNav.classList.add('border-bottom')
          mainNav.classList.add('nav-shadow')
        } else {
          mainNav.classList.remove('nav-shadow')
        }
      }
      if (window) {
        if (/Android/i.test(navigator.userAgent)) {
          this.setState({
            android: true
          })
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          this.setState({
            iphone: true
          })
        }
      }
    }

    openStore = () => {
      // if (this.state.android) {
      //   window.location.href = 'https://play.google.com/store/apps/details?id=com.zaychin' ///playstore
      // } else {
      //   window.location.href = 'https://itunes.apple.com/us/app/zay-chin/id1420150360' //app store
      // }
      if (window.location.href.includes('unilever')) {
        window.location.href = 'https://l.zaychin.com/?p=c/collection&s=164'
      } else if (window.location.href.includes('coca-cola')) {
        window.location.href = 'https://l.zaychin.com/?p=c/collection&s=142'
      } else {
        window.location.href = 'https://l.zaychin.com'
      }
    }

    static getInitialProps = WrappedComponent.getInitialProps


    render() {
      const { hideSearch } = this.props
      return (
        <div>
          {
            (this.state.iphone || this.state.android) &&
            <div className='d-flex justify-content-between align-items-center  p-2  pl-4 pr-4 ' >
              <div className='d-flex align-items-center'>
                {/* <div className='mr-1'>
                    <img src={'/zaychin.png'} style={{ width: '30px', borderRadius: '50%', }} />
                  </div> */}
                <p style={{ color: '#47566980' }} className='m-0 mr-2 text-center '>Zay Chin App နဲ့အတူ စျေးဝယ်ရန် </p>
              </div>
              <Button onClick={this.openStore} className='text-center p-1' >Open with App</Button>
            </div>
          }

          <Navbar
            expand='lg'
            // sticky='top'
            className='top-bar d-none d-md-block'
          >
            <Navbar.Collapse>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} href='/app' passHref>
                    <a className='nav-link'>
                      <Icon name='Phone' size={16} className={'mr-1'} />{' '}
                      Application ရယူရန်
                    </a>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav className='ml-auto'>
                <Nav.Item>
                  <Nav.Link as={Link} href='/about' passHref>
                    <a className='nav-link'>Zay Chin အကြောင်း</a>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href='/free-delivery' passHref>
                    <a className='nav-link'>အခမဲ့ ပို့ဆောင်မှု</a>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Navbar
            bg='light'
            expand='lg'
            sticky='top'
            className='main-nav-bar'
            id='main-nav'
          >
            <Link href='/' passHref>
              <Navbar.Brand as={'a'}>
                <img
                  src='/imgs/zaychin-icon-sm.png'
                  width={'40px'}
                  alt='Zay Chin'
                />
              </Navbar.Brand>
            </Link>
            <Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0 mr-3'>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} href='/categories' passHref>
                    <a className='nav-link'>အမျိုးအစားများ</a>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} href='/sales'>
                    <a className='nav-link'>လျော့စျေးများ</a>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            {!hideSearch ? (
              <Link href='/products/search' passHref>
                <div className='search-bar mr-auto'>
                  <Icon name='Search' size={20} />
                  <span>ပစ္စည်းများရှာရန်</span>
                </div>
              </Link>
            ) : (
                <div className='mr-auto' />
              )}
            <Nav className='ml-3'>
              <Nav.Item className='d-none d-lg-block d-xl-block d-md-block d-lg-none mr-3'>
                <Nav.Link as={Link} href='/more'>
                  <a className='nav-link'>
                    <Icon name='PersonCircle' size={28} className={'mr-1'} />{' '}
                    <span>အကောင့်</span>
                  </a>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <CartIcon />
              </Nav.Item>
            </Nav>
          </Navbar>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}

