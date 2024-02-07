import {Url} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {shortenUrl} from './urlThunks';
import {RootState} from '../app/store';

interface UrlState {
  shortUrl: Url | null,
  isCreating: boolean,
  isLoaded: boolean,
}

const initialState: UrlState = {
  shortUrl: null,
  isCreating: false,
  isLoaded: false
};

export const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    getShortUrl: (state, {payload: url}: PayloadAction<Url>) => {
      state.shortUrl = url;
    }
  },
  extraReducers: builder => {
    builder.addCase(shortenUrl.pending, (state) => {
      state.isCreating = true;
    }).addCase(shortenUrl.fulfilled, (state) => {
      state.isCreating = false;
      state.isLoaded = true;
    }).addCase(shortenUrl.rejected, (state) => {
      state.isCreating = false;
    });
  }
});

export const urlReducer = urlSlice.reducer;
export const {
  getShortUrl
} = urlSlice.actions;
export const selectShorUrl = (state: RootState) => state.shortUrls.shortUrl;
export const selectIsCreating = (state: RootState) => state.shortUrls.isCreating;
export const selectIsLoaded = (state: RootState) => state.shortUrls.isLoaded;