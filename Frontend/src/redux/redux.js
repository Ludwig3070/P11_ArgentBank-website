import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    loginReceivedFromLoginForm: false,    
    username: "",
    password: "",
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
  },
});

export const { loginRequest,resetLoginReceivedFromLoginForm } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
