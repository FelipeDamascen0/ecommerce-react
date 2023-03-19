import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentContext } from "./payment";
import { UserContext } from "./user";

export const CartContext = createContext();
CartContext.displayName = 'Carrinho';


export const CartProvider = ({ children }) => {
  const [ cart, setCart ] = useState([]);
  const [ quantityState, setQuantityState ] = useState(0);
  const [ total, setTotal ] = useState(0);

  return(
    <CartContext.Provider value={{
      cart, 
      setCart, 
      quantityState, 
      setQuantityState,
      total,
      setTotal
    }}>
      { children }
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const { cart, setCart, quantityState, setQuantityState, total, setTotal } = useContext(CartContext);
  const { paymentMethod } = usePaymentContext();
  const { setBalance } = useContext(UserContext);
  const navigate = useNavigate();

  const changeQuantity = (id, quantity) => {
    return cart.map((itemCart) => {
      if(itemCart.id === id) itemCart.quantity += quantity;
      return itemCart
    })
  }

  const addProduct = (newProduct) => {
    const sameProduct = cart.some(cartItem => cartItem.id === newProduct.id);
    if(!sameProduct){
      newProduct.quantity = 1;
      return setCart(previusCart => [...previusCart, newProduct])
    }

    return setCart(changeQuantity(newProduct.id, +1))
  }

  const removeProduct = (id) => {
    const item = cart.find(itemCart => itemCart.id === id);
    const isTheLast = item.quantity === 1;
    console.log(isTheLast)
    if(isTheLast){
      return setCart(previusCart => previusCart.filter(itemCart => itemCart.id !== id))
    }

    return setCart(changeQuantity(id, -1))
  }

  const makePurchase = () => {
    setCart([]);
    setBalance(currentBalance => currentBalance - total);
    setTimeout(() => {
      navigate(-1);
    },2000)
  }

  useEffect(() => {
    const quantityItems = cart.reduce((count, item) => count + item.quantity, 0)
    const total = cart.reduce((count, item) => count + item.valor * item.quantity, 0)
    setTotal(total * paymentMethod.juros)
    setQuantityState(quantityItems);
  }, [cart, setQuantityState, setTotal, paymentMethod])

  return{
    cart, addProduct, removeProduct, quantityState, total, makePurchase
  };
}