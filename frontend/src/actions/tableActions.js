import axios from "axios";
import {
  TABLES_INSIDE_REQUEST,
  TABLES_INSIDE_SUCCESS,
  TABLES_INSIDE_FAIL,
  TABLES_OUTSIDE_REQUEST,
  TABLES_OUTSIDE_SUCCESS,
  TABLES_OUTSIDE_FAIL,
  TABLES_AVAILABLE_UPDATE_REQUEST,
  TABLES_AVAILABLE_UPDATE_SUCCESS,
  TABLES_AVAILABLE_UPDATE_FAIL,
  TABLES_BYID_REQUEST,
  TABLES_BYID_SUCCESS,
  TABLES_BYID_FAIL,
  TABLES_ADD_REQUEST,
  TABLES_ADD_SUCCESS,
  TABLES_ADD_FAIL,
  TABLES_UPDATE_REQUEST,
  TABLES_UPDATE_SUCCESS,
  TABLES_UPDATE_FAIL,
  TABLES_DELETE_REQUEST,
  TABLES_DELETE_SUCCESS,
  TABLES_DELETE_FAIL,
} from "../constants/tableConstants";

export const insideTables = () => async (dispatch) => {
  try {
    dispatch({ type: TABLES_INSIDE_REQUEST });

    const { data } = await axios.get(`/api/tables/inside`);

    dispatch({
      type: TABLES_INSIDE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TABLES_INSIDE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const outsideTables = () => async (dispatch) => {
  try {
    dispatch({ type: TABLES_OUTSIDE_REQUEST });

    const { data } = await axios.get(`/api/tables/outside`);

    dispatch({
      type: TABLES_OUTSIDE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TABLES_OUTSIDE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const availableUpdate = (tablesArr) => async (dispatch) => {
  try {
    dispatch({ type: TABLES_AVAILABLE_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/tables`, { tables: tablesArr });

    dispatch({
      type: TABLES_AVAILABLE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TABLES_AVAILABLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getTable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLES_BYID_REQUEST });

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

    const { data } = await axios.get(`/api/tables/${id}`, config);

    dispatch({
      type: TABLES_BYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TABLES_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteTable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLES_DELETE_REQUEST });

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
    await axios.delete("/api/tables/" + id, config);

    dispatch({
      type: TABLES_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TABLES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addTable =
  ({ TableNumber, Seats, isAvailable, Inside }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: TABLES_ADD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/tables`,
        { TableNumber, Seats, isAvailable, Inside },
        config
      );

      dispatch({
        type: TABLES_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TABLES_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updateTable = (table) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLES_UPDATE_REQUEST });

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
    await axios.put("/api/tables/" + table._id, table, config);

    dispatch({
      type: TABLES_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TABLES_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
