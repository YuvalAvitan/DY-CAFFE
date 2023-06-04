import axios from "axios";
import {
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESSES,
  CATEGORIES_LIST_FAIL,
  CATEGORIES_ADD_CATEGORY_REQUEST,
  CATEGORIES_ADD_CATEGORY_SUCCESSES,
  CATEGORIES_ADD_CATEGORY_FAIL,
  CATEGORIES_DELETE_CATEGORY_REQUEST,
  CATEGORIES_DELETE_CATEGORY_SUCCESSES,
  CATEGORIES_DELETE_CATEGORY_FAIL,
} from "../constants/categoriesConstants";

// Get list of all categories
export const categoriesList = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });

    const { data } = await axios.get(`/api/categories`);

    dispatch({
      type: CATEGORIES_LIST_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Add  category
export const addCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIES_ADD_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/categories`, { name }, config);

    dispatch({
      type: CATEGORIES_ADD_CATEGORY_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_ADD_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete category
export const DeleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORIES_DELETE_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/categories/${id}`, config);

    dispatch({
      type: CATEGORIES_DELETE_CATEGORY_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_DELETE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
