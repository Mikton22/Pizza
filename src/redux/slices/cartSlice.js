import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const uniqueKey = `${action.payload.id}_${action.payload.type}_${action.payload.size}`;

      const findItem = state.items.find((obj) => obj.key === uniqueKey);

      if (findItem) {
        findItem.count++;
        state.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, key: uniqueKey, count: 1 });
        state.totalPrice += action.payload.price;
      }
      state.totalCount++;
    },
    removeItem(state, action) {
      const findItem = state.items.find(
        (obj) => obj.key === action.payload.key,
      );

      if (!findItem) return;

      if (action.payload.count === 0) {
        state.items = state.items.filter(
          (obj) => !obj.key !== action.payload.key,
        );
        state.totalPrice -= action.payload.price;
        state.totalCount -= findItem.count;
      } else {
        state.totalPrice -= action.payload.price;
        state.totalCount -= findItem.count - action.payload.count;
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

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
