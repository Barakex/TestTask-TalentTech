
import { combineReducers } from 'redux';
import MainReducer from '../Main/reducer';
import ModalReducer from '../Modal/reducer';

export default combineReducers({
  MainReducer,
  ModalReducer
});
