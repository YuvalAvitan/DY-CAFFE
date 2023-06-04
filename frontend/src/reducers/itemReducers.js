// Constants
import {
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_RESET,
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
  ITEM_UPDATE_RESET,
  ITEM_UPDATE_SUCCESSES,
  ITEM_TOP_REQUEST,
  ITEM_TOP_FAIL,
  ITEM_TOP_SUCCESSES,
} from "../constants/itemsConstans.js";

// List of all itemss
export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] };
    case ITEM_LIST_SUCCESSES:
      return {
        loading: false,
        items: action.payload,
      };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get single items
export const getItemReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_REQUEST:
      return { loading: true };
    case ITEM_SUCCESSES:
      return { loading: false, item: action.payload };
    case ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete a item
export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESSES:
      return { loading: false, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create a item
export const itemCreateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true };
    case ITEM_CREATE_SUCCESSES:
      return { loading: false, success: true, item: action.payload };
    case ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Update a item
export const itemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESSES:
      return { loading: false, success: true, item: action.payload };
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return { item: {} };
    default:
      return state;
  }
};

// Top rated reducer
export const TopRatedReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_TOP_REQUEST:
      return { loading: true, items: [] };
    case ITEM_TOP_SUCCESSES:
      return { loading: false, items: action.payload };
    case ITEM_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
