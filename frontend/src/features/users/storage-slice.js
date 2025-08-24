import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storageOwnerId: 0,
  storageOwnerUsername: '',
  storageData: {},
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setActiveStorageOwner: (state, action) => {
      state.storageOwnerId = action.payload.id || 0;
      state.storageOwnerUsername = action.payload.username || '';
    },
    setActiveStorageData: (state, action) => {
      state.storageData = action.payload || {};
    }
  },
});

export const { setActiveStorageOwner, setActiveStorageData } = storageSlice.actions;
export default storageSlice.reducer;