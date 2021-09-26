import { useSelector } from 'react-redux'
import { CartItemsCard } from '../CartItemsCard'
import './CartItemsGallery.scss'

export const CartItemsGallery = (props) => {
  // @ts-ignore
  const cart = useSelector((rootReducer) => rootReducer.cartReducer.cart)
  if (!cart.length)
    return (
      <div className='main-container'>
        <h3 className='empty-cart-text'>
          Oops, its looks like you dont have any items in your cart
        </h3>
      </div>
    )
  return (
    <div className='cart-items-gallery flex'>
      {cart.map((currItem) => (
        <CartItemsCard item={currItem} key={currItem.id} />
      ))}
    </div>
  )
}
