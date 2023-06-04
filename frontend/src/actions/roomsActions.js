import axios from "axios";
import {
  ROOMS_LIST_REQUEST,
  ROOMS_LIST_SUCCESSES,
  ROOMS_LIST_FAIL,
} from "../constants/roomsConstants";

// Get list of all rooms
export const roomsList = () => async (dispatch) => {
  try {
    dispatch({ type: ROOMS_LIST_REQUEST });

    const { data } = await axios.get(`/api/rooms`);

    dispatch({
      type: ROOMS_LIST_SUCCESSES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOMS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
