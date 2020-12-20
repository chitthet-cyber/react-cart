import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import { reducer } from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // clear carts
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // remove cart
  const removeCart = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: id });
  };

  // increase cart
  const increaseAmount = (id) => {
    dispatch({ type: 'INCREASE_AMOUNT', payload: id });
  };

  // decrease cart
  const decreaseAmount = (id) => {
    dispatch({ type: 'DECREASE_AMOUNT', payload: id });
  };

  // toggle amount
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
  };

  // get totals
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  // fetch cart items
  const fetchData = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: 'DISPLAY_ITEMS', payload: cart });

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={ {
        ...state,
        clearCart,
        removeCart,
        increaseAmount,
        decreaseAmount,
        toggleAmount


      } }
    >
      {children }
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
