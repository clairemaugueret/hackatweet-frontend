import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : {
        firstname: '',
        username: '',
        token: '',
        isConnected: false,
    }
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      login: (state, action) => {
        Object.assign(state.value, {
          firstname: action.payload.firstname,
          username: action.payload.username,
          token: action.payload.token,
          isConnected: true,
        });
      },
      logout: (state) => {
        Object.assign(state.value, {
          firstname: '',
          username: '',
          token: '',
          isConnected: false,
        });
      }
    }
  });

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer