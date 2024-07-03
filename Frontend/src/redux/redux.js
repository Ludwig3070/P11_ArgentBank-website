import { configureStore, createSlice } from "@reduxjs/toolkit";
/* slice user */
const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    username: "",
    password: "",
    token: null,
    error: null,
    message: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
    },
    loginSuccess: (state, action) => {
      const { token, response } = action.payload;
      state.token = token;
      state.authorized = true;
      state.error = null;
      state.message = response;
    },
    loginFailure: (state, action) => {
      const { error, response } = action.payload;
      state.token = null;
      state.authorized = false;
      state.error = error;
      state.message = response;
    },
    resetLoginState: (state) => {
      state.authorized = false;      
      state.username = "";
      state.password = "";
      state.token = null;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  loginRequest,  
  loginFailure,
  loginSuccess,
  resetLoginState,
} = userSlice.actions;

/* slice profil */

const profilSlice = createSlice({
  name : "profil",
  initialState:{
    email : "",
    firstName : "",
    lastName : "",
    userName : "",
    createdAt : "",
    id : "",
    userInfosButton : "false"
  },
  reducers:{
    resetProfil : (state)=>{
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.createdAt = "";
      state.id = "";
    },
    fillProfil : (state,action)=>{
      const {email,firstName,lastName,userName,createdAt,id} = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.createdAt = createdAt;
      state.id = id;
    },
    validateUserInfos : (state)=>{
      state.userInfosButton = !state.userInfosButton
    },
    resetValidateUserInsfos : (state)=>{
      state.userInfosButton = "false"
    }
  }
})


export const {
  resetProfil,
  fillProfil,
  validateUserInfos,
  resetValidateUserInsfos
} = profilSlice.actions;


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profil: profilSlice.reducer
  },
});
