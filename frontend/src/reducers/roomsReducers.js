import {
  ROOMS_LIST_REQUEST,
  ROOMS_LIST_SUCCESSES,
  ROOMS_LIST_FAIL,
} from "../constants/roomsConstants";

// List of all rooms
export const roomsListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOMS_LIST_REQUEST:
      return { loading: true, rooms: [] };
    case ROOMS_LIST_SUCCESSES:
      return {
        loading: false,
        rooms: action.payload,
      };
    case ROOMS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
