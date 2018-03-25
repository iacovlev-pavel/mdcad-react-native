import { SET_SEARCH_RESULT, SET_SEARCH_SELECTED } from '../actions/search';

const initialState = {
  searchResult: [],
  searchSelected: null,
};

export default (state, action) => {
  if (!state) {
    state = { ...initialState }; // eslint-disable-line no-param-reassign
  }

  if (action.type === SET_SEARCH_RESULT) {
    return {
      ...state,
      searchResult: action.payload,
    };
  }
  if (action.type === SET_SEARCH_SELECTED) {
    return {
      ...state,
      searchSelected: action.payload,
    };
  }
  return state;
};
