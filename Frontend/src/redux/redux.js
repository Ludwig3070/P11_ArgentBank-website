import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    loginReceivedFromLoginForm: false,    
    username: "",
    password: "",
    token: null,
    error : null,
    message : null,    
  },
  reducers: {
    loginRequest: (state, action) => {
      const { username, password, loginReceivedFromLoginForm } = action.payload;      
      state.username = username;
      state.password = password;
      state.loginReceivedFromLoginForm = loginReceivedFromLoginForm;
    },
      // Ajouter un reducer pour réinitialiser loginReceivedFromLoginForm à false
    resetLoginReceivedFromLoginForm: (state) => {
        state.loginReceivedFromLoginForm = false;
    },
    loginSuccess: (state, action) => {
      const { token, response } = action.payload;      
      state.token = action.payload.token;
      state.authorized = true;
      state.error = null;
      state.message = response;
    },
    loginFailure: (state, action) => {
      const { token, response } = action.payload;      
      state.token = null;
      state.authorized = false;
      state.error = action.payload.error;
      state.message = response;
    },
    resetLoginState : (state) => {
      state.authorized= false
      state.loginReceivedFromLoginForm= false    
      state.username= ""
      state.password= ""
      state.token= null
      state.error = null
      state.message = null      
    }
  },
});

export const { 
  loginRequest,
  resetLoginReceivedFromLoginForm,
  loginFailure,
  loginSuccess,
  resetLoginState
 } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
