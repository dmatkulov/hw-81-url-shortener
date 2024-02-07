import {configureStore} from '@reduxjs/toolkit';
import {urlReducer} from '../store/urlSlice';

export const store = configureStore({
  reducer: {
    shortUrls: urlReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;