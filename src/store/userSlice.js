import { createSlice } from '@reduxjs/toolkit';

// store.js가 길어지면 따로 파일을 만들어 뺄 수 있다.

// 1. string state 변경 방법.
const user1 = createSlice({
  // state 이름
  name: 'user1',
  // state 값
  initialState: 'june',
  // state 변경 함수
  // 함수에 파라미터를 추가하면 기존 state이다.
  reducers: {
    change(state) {
      return 'jujuny';
    },
    // 여러 함수를 만들 수 있다. 
  }
});
// 만든 함수를 export
// export {함수1, 함수2, ...} = state이름.actions 
export const { change } = user1.actions;


// 2. object state 변경 방법.
const user2 = createSlice({
  name: 'user2',
  initialState: { name: 'jo', age: 1 },
  reducers: {
    changeName(state) {
      // string에서처럼 return을 사용하지 않고 직접 수정한다.
      state.name = 'june';
    },
    changeAge(state) {
      state.age += 1;
    },
    // 첫 번째 파라미터는 기존 state
    // 두 번째 파라미터는 함수를 사용할 때 값을 넣을 수 있다.
    increase(state, action) {
      // ex) increase(10)은 +10씩, increase(100)은 +100씫
      state.age += action.payload;
    }
  }
});
export const { changeName, changeAge, increase } = user2.actions;

export { user1, user2 };