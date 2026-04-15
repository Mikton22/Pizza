import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { category, search, sortBy, currentPage, order } = params;
  const res = await axios.get(
    `https://68149373225ff1af16294cea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  ); 
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success'
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = [];
    });
  },
});

export const selectPizzasData = (state) => state.pizzas

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;