import {
  GET_EMPLOYEES, CLEAR_ALL_EMPLOYEES
} from './constants';

const initialState = {
  employees: []
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES: {
      return { ...state, employees: action.data };
    }
    case CLEAR_ALL_EMPLOYEES: {
      return { ...state, employees: [] };
    }
    default: return state;
  }
};

export default MainReducer;
