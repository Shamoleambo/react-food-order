import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = { items: [], totalAmount: 0 }

const cartReducer = (state, action) => {
  if (action === 'ADD') {
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

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD', item })
  }
  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const cartContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
