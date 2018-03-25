import { SET_SEARCH_TEXT, SET_SEARCH_RESULT, SET_SEARCH_SELECTED } from '../actions/search';

const initialState = {
  text: '',
  result: [],
  selected: null,
};

export default (state, action) => {
  if (!state) {
    state = { ...initialState }; // eslint-disable-line no-param-reassign
  }

  if (action.type === SET_SEARCH_TEXT) {
    return {
      ...state,
      text: action.payload,
    };
  }

  if (action.type === SET_SEARCH_RESULT) {
    return {
      ...state,
      result: action.payload,
    };
  }

  if (action.type === SET_SEARCH_SELECTED) {
    return {
      ...state,
      selected: action.payload,
    };
  }
  return state;
};
