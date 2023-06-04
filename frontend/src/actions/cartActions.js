import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_TABLE,
} from "../constants/cartConstants";

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/items/${id}`);
  let newPrice = 0;
  let oldPrice = 0;
  // eslint-disable-next-line
  data.itemSize.map((s, i) => {
    if (s === size) {
      oldPrice = data.itemPrice[i];
      newPrice =
        Math.round(
          (data.itemPrice[i] * ((100 - data.itemDiscount) / 100) +
            Number.EPSILON) *
            100
        ) / 100;
    }
  });
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.itemName,
      image: data.itemPicture,
      price: oldPrice,
      new_price: newPrice,
      isAvailable: data.isAvailable,
      qty,
      size,
      itemDiscount: data.itemDiscount,
      id2: size + data._id + qty + oldPrice,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveTable = (tables) => (dispatch) => {
  dispatch({
    type: CART_SAVE_TABLE,
    payload: tables,
  });

  localStorage.setItem("Table", JSON.stringify(tables));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: item,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
