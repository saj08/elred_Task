import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ordersList: [],
};

const OrdersListSlice = createSlice({
    name: "ordersList",
    initialState,
    reducers: {
        onAddOrdersList(state, action) {
            state.ordersList = action.payload.items;
            console.log(state.ordersList);
        },
        onClearOrderList(state, action) {
            state.ordersList = [];
        },
    },
});

export const OrdersListActions = OrdersListSlice.actions;

export default OrdersListSlice;
