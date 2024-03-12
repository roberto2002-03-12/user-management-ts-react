import { createSlice } from '@reduxjs/toolkit';

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    loadingState: 'loading', // loading | finished
    cat: {},
    cats: {
      count: 0,
      page: 1,
      data: []
    }
  },
  reducers: {
    onLoadDataCat: (state) => {
      state.loadingState = 'loading';
    },
    onLoadedCats: (state, { payload }) => {
      state.loadingState = 'finished';
      state.cats = payload;
    },
    onLoadedCat: (state, { payload }) => {
      state.cat = payload // voy a mostrar data en un modal
    },
    onChangeLoadStateCat:(state) => {
      state.loadingState = 'finished';
    }
  }
});

export const {
  onLoadDataCat,
  onLoadedCat,
  onLoadedCats,
  onChangeLoadStateCat
} = catSlice.actions;