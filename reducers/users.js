import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value : {
        firstname: '',
        username: '',
        token: '',
        isConnected: false,
        image: '',
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
          image: action.payload.image, 
        });
      },
      logout: (state) => {
        Object.assign(state.value, {
          firstname: '',
          username: '',
          token: '',
          isConnected: false,
          image: '',
        });
      },
      setPictureProfile: (state, action) => {
        Object.assign(state.value, {
          image: action.payload.image,
        });
      },
    }
  });

export const { login, logout, setPictureProfile } = usersSlice.actions;
export default usersSlice.reducer