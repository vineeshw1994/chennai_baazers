import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: null,
  error: null,
  loading: false,
};

const cartCountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    getCartCountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartCountSuccess: (state, action) => {
      state.cartCount = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCartCountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cartCountNull: (state) =>{
      state.cartCount = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const { getCartCountStart, cartCountSuccess, getCartCountFailure, cartCountNull } =
  cartCountSlice.actions;

export default cartCountSlice.reducer;
