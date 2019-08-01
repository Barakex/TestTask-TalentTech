import {
  SET_MODAL_FIELDS,
  CLEAR_MODAL_FIELDS,
  IS_MODAL
} from './constants';

const modalFormFields = {
  id: null,
  name: '',
  firstName: '',
  position: '',
  description: ''
};

const initialState = {
  modalFormFields,
  isOpen: false
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_FIELDS: {
      return { ...state, modalFormFields: action.data };
    }
    case CLEAR_MODAL_FIELDS: {
      return {
        ...state, modalFormFields
      };
    }
    case IS_MODAL: {
      return { ...state, isOpen: action.data };
    }
    default: return state;
  }
};

export default ModalReducer;
