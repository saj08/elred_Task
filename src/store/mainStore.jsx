import { combineReducers, configureStore } from "@reduxjs/toolkit";
import OrdersListSlice from "./OrderList";
import OrdersSlice from "./Orders";
import SubCategorySlice from "./SubCategory";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  subCategory: SubCategorySlice.reducer,
  orders: OrdersSlice.reducer,
  orderList: OrdersListSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
