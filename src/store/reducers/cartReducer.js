const INITIAL_STATE = {
  cart: [],
}

export function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'RESTORE_CART':
      return INITIAL_STATE
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.item],
      }
    case 'REMOVE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.filter(
          (currCartItem) => currCartItem.id !== action.itemId
        ),
      }
    // case 'UPDATE_CART_PRODUCT':
    //   const { updatedCartProduct } = action
    //   return {
    //     ...state,
    //     cart: state.cart.map((currCartProduct) =>
    //       currCartProduct._id === updatedCartProduct._id
    //         ? updatedCartProduct
    //         : currCartProduct
    //     ),
    //   }
    default:
      return state
  }
}
