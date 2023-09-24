import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    toggleModalOpen(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    setModalType(state, action) {
      state.modalType = action.payload;
    },
  },
});

export const { toggleModalOpen, setModalType } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
