import { createSlice } from '@reduxjs/toolkit';
import type {
  INews,
  INewsWithoutContent,
} from '../../../types/news/news.types';
import { createPost, deletePost, getPostById, getPosts } from './posts.thunks';

export interface IPostsState {
  posts: INewsWithoutContent[];
  post: INews | null;
  loading: {
    fetchLoading: boolean;
    sendLoading: boolean;
    deleteLoading: boolean;
  };
  isError: boolean;
}

const initialState: IPostsState = {
  posts: [],
  post: null,
  loading: {
    fetchLoading: false,
    sendLoading: false,
    deleteLoading: false,
  },
  isError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading.fetchLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, { payload: posts }) => {
      state.loading.fetchLoading = false;
      state.posts = posts;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });

    builder.addCase(createPost.pending, (state) => {
      state.loading.sendLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.loading.sendLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.loading.sendLoading = false;
      state.isError = true;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading.deleteLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.loading.deleteLoading = false;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading.deleteLoading = false;
      state.isError = true;
    });

    builder.addCase(getPostById.pending, (state) => {
      state.loading.fetchLoading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, { payload: post }) => {
      state.loading.fetchLoading = false;
      state.post = post;
    });
    builder.addCase(getPostById.rejected, (state) => {
      state.loading.fetchLoading = false;
      state.isError = true;
    });
  },
});

export const postsReducer = postsSlice.reducer;
