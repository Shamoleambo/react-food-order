import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = { items: [], totalAmount: 0 }

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const itemPrice = action.item.price
    const itemAmount = action.item.amount

    const totalAmount = state.totalAmount + itemPrice * itemAmount

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    let items

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      items = [...state.items]
      items[existingCartItemIndex] = updatedItem
    } else {
      items = state.items.concat(action.item)
    }

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
