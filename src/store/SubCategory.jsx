import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subCategory: [],
    FirstClickedCategoryId: "",
};

const SubCategorySlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {
        onAddSubCategory(state, action) {
            state.subCategory = action.payload.items;
            console.log(state.subCategory);
        },
        onAddCategoryId(state, action) {
            state.FirstClickedCategoryId = action.payload.CategoryId;
        },
        onCartClear(state, action) {
            state.cartItems = [];
        },
    },
});

export const SubCategorActions = SubCategorySlice.actions;

export default SubCategorySlice;
