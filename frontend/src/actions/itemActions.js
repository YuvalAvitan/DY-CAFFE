// Constants
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESSES,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESSES,
  ITEM_FAIL,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESSES,
  ITEM_REQUEST,
  ITEM_SUCCESSES,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESSES,
  ITEM_TOP_FAIL,
  ITEM_TOP_REQUEST,
  ITEM_TOP_SUCCESSES,
} from "../constants/itemsConstans";
// Node packages
import axios from "axios";

// Get list of all items
export const ItemsList = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });

    const { data } = await axios.get(`/api/items`);

    dispatch({
      type: ITEM_LIST_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get single item
export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_REQUEST });

    const { data } = await axios.get(`/api/items/${id}`);

    dispatch({
      type: ITEM_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete a item
export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // Make a json request & get the token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    // (url,data,config)
    await axios.delete("/api/items/" + id, config);

    dispatch({
      type: ITEM_DELETE_SUCCESSES,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create items
export const createItem = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // Make a json request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    // (url,data,config)
    const { data } = await axios.post("/api/items", {}, config);

    dispatch({
      type: ITEM_CREATE_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update items
export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    // Make a json request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
    };
    // (url,data,config)
    await axios.put("/api/items/" + item._id, item, config);

    dispatch({
      type: ITEM_UPDATE_SUCCESSES,
    });
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get list of Top rated items
export const topItemsList = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_TOP_REQUEST });

    const { data } = await axios.get(`/api/items/top`);

    dispatch({
      type: ITEM_TOP_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
