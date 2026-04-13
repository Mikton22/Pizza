import { createSlice } from "@reduxjs/toolkit";
import { sortList } from "../../components/Sort";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  selectedSort: sortList[0],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.selectedSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      const sort = sortList.find(
        (obj) => obj.sortProperty === action.payload.selectedSort?.sortProperty
      );

      state.selectedSort = sort || sortList[0];
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
