import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainCategory: []

};


export const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    setData: (state, action) => {
       state.mainCategory= action.payload.MainCategories;
    },
    deleteRows: (state, action) => {
      return state.mainCategory.filter((item) => !action.payload.includes(item.id));
    },
  },
});

export const { setData, deleteRows } =
mainCategorySlice.actions;
export default mainCategorySlice.reducer;
