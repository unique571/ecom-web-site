import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "raect-tiasify"
import { authService } from "./userService"
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      return thunkAPI.rejectedWithValue(error)
    }
  }
)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      return thunkAPI.rejectedWithValue(error)
    }
  }
)
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState = {
  user: getCustomerfromLocalStorage ,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdUser=action.payload;
          if(state.isSuccess===true){
            toast.info("user created successfully")
          }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError===true){
            toast.error(action.error)
          }
      })


      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.User=action.payload;
          if(state.isSuccess===true){
            localStorage.setItem("token", action.payload.token)
            toast.info("user logged in successfully")
          }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          if(state.isError===true){
            toast.error(action.error)
          }
      })
  }
})

export default authSlice.reducer;
