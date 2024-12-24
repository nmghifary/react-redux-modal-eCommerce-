import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  selectedItemsID: [],
  checkoutItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(product => product.id === newItem.id);

      if (selectCartIndex === -1) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        })
      } else {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * newItem.price
      }
    },
    removeItemFromCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(product => product.id === newItem.id);

      if (state.cartItems[selectCartIndex].quantity === 1) {
        state.selectedItemsID.filter(item => item !== newItem.id)
        state.cartItems.splice(selectCartIndex, 1)
      } else {
        state.cartItems[selectCartIndex].quantity -= 1;
        state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * newItem.price
      }

      state.checkoutItems = state.cartItems.filter(product => state.selectedItemsID.includes(product.id))
    },
    checkoutCartItems: (state, action) => {
      const newItem = action.payload;
      const selectItemsIDIndex = state.selectedItemsID.findIndex(product => product === newItem);

      if (selectItemsIDIndex === -1) {
        state.selectedItemsID.push(newItem);
      } else {
        state.selectedItemsID.splice(selectItemsIDIndex, 1);
      }

      state.checkoutItems = state.cartItems.filter(product => state.selectedItemsID.includes(product.id))
    }
  },
});

export const { addItemToCart, removeItemFromCart, checkoutCartItems } = cartSlice.actions;

export default cartSlice;

// selector
export const selectCartItems = state => state.cart.cartItems;
export const selectCartTotalItems = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
export const selectSelectedItemsID = state => state.cart.selectedItemsID;
export const selectCheckoutTotalItems = state => state.cart.checkoutItems.reduce((total, item) => total + item.quantity, 0)
export const selectCheckoutTotalPrices = state => state.cart.checkoutItems.reduce((total, item) => total + item.totalPrice, 0)