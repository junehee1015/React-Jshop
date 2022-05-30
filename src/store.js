import { configureStore } from '@reduxjs/toolkit';
import { user1, user2 } from './store/userSlice.js';
import cart from './store/cartSlice.js';
import order from './store/orderSlice.js';
import { postCode, postAdr, openPost } from './store/postSlice.js';

export default configureStore({
  reducer: {
    user1: user1.reducer,
    user2: user2.reducer,
    cart: cart.reducer,
    order: order.reducer,
    postCode: postCode.reducer,
    postAdr: postAdr.reducer,
    openPost: openPost.reducer,
  }
});