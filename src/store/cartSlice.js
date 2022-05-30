import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    increase(state, action) {
      state[action.payload].amount += 1;
      if (state[action.payload].amount > 99) state[action.payload].amount = 99;
    },
    decrease(state, action) {
      state[action.payload].amount -= 1;
      if (state[action.payload].amount < 1) state[action.payload].amount = 1;
    },
    addCart(state, action) {
      return [...state, action.payload];
    },
    delCart(state, action) {
      return state.filter((val, i) => i !== action.payload);
    },
    allDel() {
      return [];
    }
  }
});
export const { increase, decrease, addCart, delCart, allDel } = cart.actions;
export default cart;