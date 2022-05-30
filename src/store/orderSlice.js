import { createSlice } from '@reduxjs/toolkit';

const order = createSlice({
  name: 'order',
  initialState: false,
  reducers: {
    openOrder() {
      return true;
    },
    closeOrder() {
      return false;
    },
  }
});
export const { openOrder, closeOrder, increaseAmount, decreaseAmount } = order.actions;
export default order;