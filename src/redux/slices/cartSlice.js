import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findItem) {
        findItem.count++;
        state.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
      }
      state.totalCount++;
    },
    removeItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (action.payload.count === 0) {
        state.items = state.items.filter(
          (obj) =>
            !(
              obj.id === action.payload.id &&
              obj.type === action.payload.type &&
              obj.size === action.payload.size
            ),
        );
        state.totalPrice -= action.payload.price;
        state.totalCount -= findItem.count;
      } else {
        
        state.totalPrice -= action.payload.price;
        state.totalCount -= (findItem.count-action.payload.count);
        findItem.count = action.payload.count;
      }
    },
    clearItem(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart 

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;