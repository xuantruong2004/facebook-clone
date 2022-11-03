import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    UPLOAD_START: (state, action) => {
      state.uploading = true;
    },
    UPLOAD_SUCCESS: (state, action) => {
      state.posts.unshift(action.payload);
      state.uploading = false;
    },
    UPLOAD_FAIL: (state, action) => {
      state.uploading = false;
      state.error = true;
    },
    RETREIVING_START: (state, action) => {
      state.loading = true;
    },
    RETREIVING_SUCCESS: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    RETREIVING_FAIL: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
