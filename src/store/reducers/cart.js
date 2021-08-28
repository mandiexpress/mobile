import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.items.filter(item => item.id !== productId);
      state.items = updatedCart;
    },
    updateQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      state.items.map(item => {
        if (item.id === id) {
          item.quantity = quantity;
          item.subtotal = item.price * quantity;
        }
      });
    },
    emptyCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity, emptyCart} =
  cartSlice.actions;
export default cartSlice.reducer;
