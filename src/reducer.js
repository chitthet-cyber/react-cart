export const reducer = (state, action) => {

 // clear carts
 if (action.type === 'CLEAR_CART') {
  return { ...state, cart: [] };
 }

 // remove cart
 if (action.type === 'REMOVE_CART') {
  return { ...state, cart: state.cart.filter(cartItem => cartItem.id !== action.payload) };
 }

 // increase amount
 // if (action.type === 'INCREASE_AMOUNT') {
 //  let tempCart = state.cart.map(cartItem => {
 //   if (cartItem.id === action.payload) {
 //    return { ...cartItem, amount: cartItem.amount + 1 };
 //   }
 //   return cartItem;
 //  });
 //  return { ...state, cart: tempCart };
 // }

 // decrease amount
 // if (action.type === 'DECREASE_AMOUNT') {
 //  let tempCart = state.cart.map(cartItem => {
 //   if (cartItem.id === action.payload) {
 //    return { ...cartItem, amount: cartItem.amount - 1 };
 //   }
 //   return cartItem;
 //  }).filter(cartItem => cartItem.amount !== 0);
 //  return { ...state, cart: tempCart };
 // }

 // get totals
 if (action.type === 'GET_TOTALS') {
  let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
   console.log(cartItem);
   const { price, amount } = cartItem;
   cartTotal.amount += amount;
   cartTotal.total += price * amount;
   return cartTotal;
  }, { total: 0, amount: 0 });
  console.log(typeof total);
  total = parseFloat(total.toFixed(2));
  return { ...state, amount, total };
 }

 // data fetching
 if (action.type === 'LOADING') {
  return { ...state, loading: true };
 }
 if (action.type === 'DISPLAY_ITEMS') {
  return { ...state, loading: false, cart: action.payload };
 }

 // togging amount 
 if (action.type === 'TOGGLE_AMOUNT') {
  let tempCart = state.cart.map(cartItem => {
   if (cartItem.id === action.payload.id) {
    if (action.payload.type === 'inc') {
     return { ...cartItem, amount: cartItem.amount + 1 };

    }
    if (action.payload.type === 'dec') {
     return { ...cartItem, amount: cartItem.amount - 1 };

    }
   }
   return cartItem;
  }).filter(cartItem => cartItem.amount !== 0);

  return { ...state, cart: tempCart };
 }


 throw new Error('no matching action type');

};