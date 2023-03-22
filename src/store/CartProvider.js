import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = { items: [], totalAmount: 0 }

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const itemPrice = action.item.price
    const itemAmount = action.item.amount

    const items = state.items.concat(action.item)
    const totalAmount = state.totalAmount + itemPrice * itemAmount

    return { items, totalAmount }
  } else if (action === 'REMOVE') {
  }

  return defaultCartState
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item })
  }
  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const cartContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
