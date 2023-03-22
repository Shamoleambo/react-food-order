import { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const [buttonHighlight, setButtonHighlight] = useState(false)

  const numberOfCartItems = items.reduce(
    (totalItems, item) => totalItems + item.amount,
    0
  )

  const btnClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) return

    setButtonHighlight(true)

    const timer = setTimeout(() => {
      setButtonHighlight(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
