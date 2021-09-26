// Thunk - Action Dispatcher

import { notificationService } from '../../services/notificationService'

export function addItemToCart(item) {
  return (dispatch, getState) => {
    const action = {
      type: 'ADD_CART_ITEM',
      item,
    }
    dispatch(action)
    notificationService.notify('success', `Added to cart`)
  }
}

export function removeItemFromCart(itemId) {
  return (dispatch, getState) => {
    const action = {
      type: 'REMOVE_CART_ITEM',
      itemId,
    }
    dispatch(action)
    notificationService.notify('success', `Removed from cart`)
  }
}
