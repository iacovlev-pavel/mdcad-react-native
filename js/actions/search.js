export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export function setSearchResult(payload) {
  return {
    type: SET_SEARCH_RESULT,
    payload,
  };
}

export const SET_SEARCH_SELECTED = 'SET_SEARCH_SELECTED';
export function setSearchSelected(payload) {
  return {
    type: SET_SEARCH_SELECTED,
    payload,
  };
}
