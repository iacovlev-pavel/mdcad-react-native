import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import drawer from './drawer';
import search from './search';

export default combineReducers({
  form: formReducer,
  drawer,
  search,
});
