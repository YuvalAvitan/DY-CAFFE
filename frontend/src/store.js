import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  itemListReducer,
  getItemReducer,
  itemDeleteReducer,
  itemCreateReducer,
  itemUpdateReducer,
  TopRatedReducer,
} from "./reducers/itemReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  insideTablesReducer,
  outTablesReducer,
  availableUpdateReducer,
  getTableReducer,
  tableAddReducer,
  tableUpdateReducer,
  tableDeleteReducer,
} from "./reducers/tableReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  orderPaidReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  categoriesListReducer,
  addCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/categoriesReducers";
import { roomsListReducer } from "./reducers/roomsReducers";
const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: getItemReducer,
  itemDelete: itemDeleteReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
  TopRated: TopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  insideTables: insideTablesReducer,
  outsideTables: outTablesReducer,
  availableUpdate: availableUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  categoriesList: categoriesListReducer,
  roomsList: roomsListReducer,
  addCategory: addCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  orderPaid: orderPaidReducer,
  getTable: getTableReducer,
  tableAdd: tableAddReducer,
  tableUpdate: tableUpdateReducer,
  tableDelete: tableDeleteReducer,
  orderDelete: orderDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
