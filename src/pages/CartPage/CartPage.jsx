import { CartItemsGallery } from '../../components/CartItemsGallery'
import './CartPage.scss'

export const CartPage = (props) => {
  return (
    <div className='cart-page page'>
      <h2 className='title'>Cart</h2>
      <CartItemsGallery />
    </div>
  )
}
