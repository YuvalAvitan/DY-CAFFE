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
  TABLES_ADD_RESET,
  TABLES_UPDATE_REQUEST,
  TABLES_UPDATE_SUCCESS,
  TABLES_UPDATE_FAIL,
  TABLES_UPDATE_RESET,
  TABLES_DELETE_REQUEST,
  TABLES_DELETE_SUCCESS,
  TABLES_DELETE_FAIL,
} from "../constants/tableConstants";
//get all inside tables
export const insideTablesReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLES_INSIDE_REQUEST:
      return { loading: true, tables: [] };
    case TABLES_INSIDE_SUCCESS:
      return {
        loading: false,
        tables: action.payload,
      };
    case TABLES_INSIDE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//get all outside tables
export const outTablesReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLES_OUTSIDE_REQUEST:
      return { loading: true, tables: [] };
    case TABLES_OUTSIDE_SUCCESS:
      return {
        loading: false,
        tables: action.payload,
      };
    case TABLES_OUTSIDE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const availableUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLES_AVAILABLE_UPDATE_REQUEST:
      return { loading: true };
    case TABLES_AVAILABLE_UPDATE_SUCCESS:
      return {
        loading: false,
      };
    case TABLES_AVAILABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTableReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLES_BYID_REQUEST:
      return { loading: true };
    case TABLES_BYID_SUCCESS:
      return { loading: false, table: action.payload };
    case TABLES_BYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tableAddReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLES_ADD_REQUEST:
      return { loading: true };
    case TABLES_ADD_SUCCESS:
      return { loading: false, success: true };
    case TABLES_ADD_FAIL:
      return { loading: false, error: action.payload };
    case TABLES_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const tableUpdateReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLES_UPDATE_REQUEST:
      return { loading: true };
    case TABLES_UPDATE_SUCCESS:
      return { loading: false, success: true, table: action.payload };
    case TABLES_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLES_UPDATE_RESET:
      return { table: {} };
    default:
      return state;
  }
};

export const tableDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLES_DELETE_REQUEST:
      return { loading: true };
    case TABLES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TABLES_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
