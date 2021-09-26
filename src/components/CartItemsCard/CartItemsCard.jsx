import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useLoading } from '../../hooks/useLoading'
import productService from '../../services/productService'
import { removeItemFromCart } from '../../store/actions/cartActions'
import { AppLoading } from '../AppLoading'
import { ProductColorButton } from '../ProductColorButton'
import { ProductSizeButton } from '../ProductSizeButton'
import './CartItemsCard.scss'

export const CartItemsCard = ({ item }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [executeFunc, isLoading, isError] = useLoading()
  const [fullProduct, setFullProduct] = useState(null)

  const loadFullProduct = async () => {
    // @ts-ignore
    const res = await executeFunc(() =>
      productService.getProduct(item.productId)
    )
    setFullProduct(res)
  }

  const commitRemoveItem = () => {
    dispatch(removeItemFromCart(item.id))
  }

  const redirectToProduct = () => {
    history.push(`/product/${fullProduct._id}`)
  }

  useEffect(() => {
    loadFullProduct()
  }, [item])

  return (
    <div className='cart-item-card'>
      {isLoading && <AppLoading />}
      {fullProduct && (
        <div className='content center-childs column'>
          <div className='image-container' onClick={redirectToProduct}>
            <img
              src={fullProduct.inventory[item.size].colorsMap[item.color].image}
              alt=''
            />
          </div>
          <h4 className='title'>{fullProduct.name}</h4>
          <div className='details flex space-between align-center'>
            <ProductSizeButton isClickable={false} size={item.size} />
            <ProductColorButton isClickable={false} color={item.color} />
            <h4 className='price-text'>{fullProduct.price}₪</h4>
          </div>
          <button
            className='x-button primary-button'
            onClick={commitRemoveItem}
          >
            Remove From Cart
          </button>
        </div>
      )}
    </div>
  )
}
