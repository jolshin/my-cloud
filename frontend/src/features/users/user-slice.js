import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  userUsername: "",
  userEmail: "",
  userFullname: "",
  userIsStaff: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userId = action.payload.id || 0;
      state.userUsername = action.payload.username || "";
      state.userEmail = action.payload.email || "";
      state.userFullname = action.payload.fullname || "";
      state.userIsStaff = action.payload.is_staff || false;
    },
  },
});

export const { setActiveUser } = userSlice.actions;
export default userSlice.reducer;
