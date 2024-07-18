import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  error: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    fetchCategoryStart: (state) => {
      (state.loading = true), (error = null);
    },
    fetchCategorySuccess: (state, action) => {
      state.categories = action.payload;
      (state.loading = false), (state.error = null);
    },
    fetchCategoryFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    addCategoryStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    addCategorySuccess: (state, action) => {
      (state.categories = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    addCategoryFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateCategoryStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateCategorySuccess: (state, action) => {
      (state.categories = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    updateCategoryFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
