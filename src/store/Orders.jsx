import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        onAddOrders(state, action) {
            state.orders = action.payload.items;
            console.log(state.orders);
        },
        onClearOrder(state, action) {
            state.orders = [];
        },
    },
});

export const OrdersActions = OrdersSlice.actions;

export default OrdersSlice;
