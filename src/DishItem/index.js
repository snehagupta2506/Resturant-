import React, {useContext} from 'react'
import './index.css'
import {CartContext} from '../CartContext'

const DishItem = ({dishDetails}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const {
    cartList,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const cartItem = cartList.find(item => item.dishId === dishId)

  const handleAddToCart = () => {
    if (dishAvailability && cartItem?.quantity === 0) {
      addCartItem({...dishDetails, quantity: 1})
    }
  }

  const handleIncrementQuantity = () => {
    if (dishAvailability) {
      if (cartItem) {
        incrementCartItemQuantity(dishId)
      } else {
        addCartItem({...dishDetails, quantity: 1})
      }
    }
  }

  const handleDecrementQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      decrementCartItemQuantity(dishId) // Decrement quantity if cart item exists and quantity is greater than 0
    }
  }

  const getQuantity = () => {
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <li className="mb-3 p-3 dish-item-container d-flex">
      <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} me-3`}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && (
          <div className="controller-container d-flex align-items-center bg-success">
            <button
              className="button"
              type="button"
              onClick={handleDecrementQuantity} // Call handleDecrementQuantity when "-" button is clicked
            >
              -
            </button>
            <p className="quantity">{getQuantity()}</p>
            <button
              className="button"
              type="button"
              onClick={handleIncrementQuantity}
            >
              +
            </button>
          </div>
        )}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {dishAvailability && cartItem?.quantity === 0 && (
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        )}
        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-calories text-warning">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
