// CartContext.js
import React, {createContext, useState} from 'react'

const CartContext = createContext()

const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = item => {
    setCartList(prevCartList => [...prevCartList, item])
  }

  const removeCartItem = id => {
    setCartList(prevCartList => prevCartList.filter(item => item.id !== id))
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export {CartContext, CartContextProvider}
