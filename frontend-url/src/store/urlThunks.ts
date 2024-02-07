import {createAsyncThunk} from '@reduxjs/toolkit';
import {Url, UrlInput} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch} from '../app/store';
import {getShortUrl} from './urlSlice';

export const shortenUrl = createAsyncThunk<void, UrlInput, { dispatch: AppDispatch }>(
  'urls/create',
  async (urlData, thunkAPI) => {
    try {
      const responseData = await axiosApi.post('/links', urlData);
      const response = responseData.data;
      
      if (!response) {
        return;
      }
      
      const newUrl: Url = {
        _id: response._id,
        shortUrl: response.shortUrl,
        originalUrl: response.originalUrl
      };
      
      thunkAPI.dispatch(getShortUrl(newUrl));
      
    } catch (error) {
      console.error('Error while shortening URL:', error);
    }
  }
);