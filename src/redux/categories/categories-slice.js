import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categories-operations";
const categories = [
  { _id: "6471096a9af3d469961187e6", name: "Main expenses", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187e7", name: "Products", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187e8", name: "Car", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187e9", name: "Self care", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187ea", name: "Child care", type: "EXPENSE" },
  {
    _id: "6471096a9af3d469961187eb",
    name: "Household products",
    type: "EXPENSE",
  },
  { _id: "6471096a9af3d469961187ec", name: "Education", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187ed", name: "Leisure", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187ef", name: "Entertainment", type: "EXPENSE" },
  { _id: "6471096a9af3d469961187f0", name: "Income", type: "INCOME" },
  {
    _id: "6473544cf09b05df28a84d32",
    name: "Other Expenses",
    type: "EXPENSE",
  },
];
const initialState = {
  allCategories: [],
  isLoading: false,
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.allCategories = categories;
        console.log(state.allCategories);
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});
export default categoriesSlice.reducer;