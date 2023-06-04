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
// List of all categories
export const categoriesListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORIES_LIST_SUCCESSES:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Add category
export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_ADD_CATEGORY_REQUEST:
      return { loading: true };
    case CATEGORIES_ADD_CATEGORY_SUCCESSES:
      return {
        loading: false,
        name: action.payload,
      };
    case CATEGORIES_ADD_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Delete category
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case CATEGORIES_DELETE_CATEGORY_SUCCESSES:
      return {
        loading: false,
        success: true,
      };
    case CATEGORIES_DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
