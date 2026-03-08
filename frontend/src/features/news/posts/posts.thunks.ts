import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  INews,
  INewsMutation,
  INewsWithoutContent,
} from '../../../types/news/news.types';
import axiosApi from '../../../api/axiosApi';
import type { AppDispatch } from '../../../app/store';

export const getPosts = createAsyncThunk<INewsWithoutContent[], void>(
  'news/getPosts',
  async () => {
    const response = await axiosApi.get<INewsWithoutContent[]>('/news');
    const posts: INewsWithoutContent[] = response.data;

    return posts;
  },
);

export const getPostById = createAsyncThunk<INews, { id: string }>(
  'news/getPostById',
  async ({id}) => {
    const response = await axiosApi.get<INews>(`/news/${id}`);
    const post = response.data;

    return post;
  },
);

export const createPost = createAsyncThunk<
  void,
  INewsMutation,
  { dispatch: AppDispatch }
>('news/createPost', async (post, { dispatch }) => {
  const formData = new FormData();

  const keys = Object.keys(post) as (keyof INewsMutation)[];

  keys.forEach((key) => {
    const value = post[key];

    if (value) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/news', formData);

  dispatch(getPosts());
});

export const deletePost = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>('news/deletePost', async (id, { dispatch }) => {
  await axiosApi.delete(`/news/${id}`);

  dispatch(getPosts());
});
