import { AsyncStorage } from 'react-native';

import { SET_SEARCH_TEXT, SET_SEARCH_RESULT, SET_SEARCH_SELECTED, SET_SEARCH_HISTORY } from '../actions/search';

const initialState = {
  text: '',
  result: [],
  selected: null,
  history: [],
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
    const history = state.history.slice(0);

    if (action.payload) {
      history.push(action.payload);
      if (history.length > 10) {
        history.shift();
      }
      AsyncStorage.setItem('history', JSON.stringify(history));
    }

    return {
      ...state,
      selected: action.payload,
      history,
    };
  }

  if (action.type === SET_SEARCH_HISTORY) {
    return {
      ...state,
      history: action.payload,
    };
  }

  return state;
};
