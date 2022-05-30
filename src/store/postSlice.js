import { createSlice } from '@reduxjs/toolkit';

const postCode = createSlice({
  name: 'postCode',
  initialState: '',
  reducers: {
    getPostCode(state, action) {
      return state + action.payload;
    },
    delPostCode() {
      return '';
    }
  }
});
export const { getPostCode, delPostCode } = postCode.actions;

const postAdr = createSlice({
  name: 'adr',
  initialState: '',
  reducers: {
    getPostAdr(state, action) {
      return state + action.payload;
    },
    delPostAdr() {
      return '';
    }
  }
});
export const { getPostAdr, delPostAdr } = postAdr.actions;

const openPost = createSlice({
  name: 'openPost',
  initialState: false,
  reducers: {
    openDaumPost() {
      return true;
    },
    closeDaumPost() {
      return false;
    }
  }
});
export const { openDaumPost, closeDaumPost } = openPost.actions;

export { postCode, postAdr, openPost };