import './AppHeader.scss'
import heartImg from '../../assets/images/heart-icon.png'
import cartImg from '../../assets/images/cart-icon.png'
import userImg from '../../assets/images/user-icon.png'
import searchImg from '../../assets/images/search-icon.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import hamburgerImg from '../../assets/images/hamburger.svg'

const pages = [
  {
    name: 'NEW',
  },
  {
    name: 'Pants',
  },
  {
    name: 'Shirts',
  },
  {
    name: 'Dresses',
  },
  {
    name: 'Skirts',
  },
]

const NavItem = ({ name, url }) => {
  const history = useHistory()
  return <button onClick={() => history.push(url)}>{name}</button>
}

export const AppHeader = (props) => {
  const history = useHistory()
  const location = useLocation()
  const lastScroll = useRef(0)
  const [isActive, setIsActive] = useState(true)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  // @ts-ignore
  const cart = useSelector((rootReducer) => rootReducer.cartReducer.cart)

  useEffect(() => setIsHamburgerOpen(false), [location.pathname])

  useEffect(() => {
    window.addEventListener(
      'scroll',
      function () {
        // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScroll.current) {
          // downscroll code
          setIsActive(false)
        } else {
          // upscroll code
          setIsActive(true)
        }
        lastScroll.current = st <= 0 ? 0 : st // For Mobile or negative scrolling
      },
      false
    )
  }, [])

  return (
    <>
      <div className={`fixed-header ${isActive ? 'active' : ''}`}>
        <div className={`app-header`}>
          <div className='content flex space-between main-container'>
            <div className='navigation-container flex'>
              <button
                className='hamburger-button'
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              >
                <img src={hamburgerImg} />
              </button>
              <button
                className='logo-container center-childs'
                onClick={() => history.push('/')}
              >
                <h2>FIXME</h2>
              </button>
              <nav className='main-nav flex'>
                <NavItem name='create product' url='/create-product' />
                <NavItem name='just for you' url='/just-for-you' />
                <NavItem name='my measurements' url='/suggest-me' />
              </nav>
            </div>
            <div className='left-container flex column'>
              <div className='top-bar flex align-center'>
                <button className='center-childs'>
                  <img src={heartImg} alt='' />
                </button>
                <button
                  className='cart-button center-childs'
                  onClick={() => history.push('/cart')}
                >
                  <img src={cartImg} alt='' />
                  <div className='circle'>
                    <p>{cart.length}</p>
                  </div>
                </button>
                <button
                  className='center-childs'
                  onClick={() => history.push('/account')}
                >
                  <img src={userImg} alt='' />
                </button>
              </div>
              {/* <div className='search-box flex'>
            <img src={searchImg} alt='Search' />
            <input type='text fg-1' placeholder='search "summer shop" here' />
          </div> */}
            </div>
          </div>
        </div>
        <div className={`app-hamburger ${isHamburgerOpen ? 'active' : ''}`}>
          <nav className='hamburger-nav center-childs column'>
            <NavItem name='create product' url='/create-product' />
            <NavItem name='just for you' url='/just-for-you' />
            <NavItem name='my measurements' url='/suggest-me' />
          </nav>
        </div>
      </div>
    </>
  )
}
