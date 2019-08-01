import {
  GET_EMPLOYEES, OPEN_CREATE_MODAL, SET_CREATE_MODAL_FIELDS, CLEAR_ALL_EMPLOYEES
} from './constants';

const initialState = {
  employees: [],
  isCreateModal: false,
  isModal: false,
  createModalFormFields: {
    id: null,
    name: '',
    firstName: '',
    position: '',
    description: ''
  }
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES: {
      return { ...state, employees: action.data };
    }
    case OPEN_CREATE_MODAL: {
      return { ...state, isCreateModal: action.data };
    }
    case SET_CREATE_MODAL_FIELDS: {
      return { ...state, createModalFormFields: action.data };
    }
    case CLEAR_ALL_EMPLOYEES: {
      return { ...state, employees: [] };
    }
    default: return state;
  }
};

export default MainReducer;
