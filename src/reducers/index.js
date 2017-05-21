import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import stockReducer from './stock_reducer';
const rootReducer = combineReducers({
  
  data:stockReducer
});

export default rootReducer;
