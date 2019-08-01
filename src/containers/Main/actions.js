import {
  GET_EMPLOYEES,
  OPEN_CREATE_MODAL,
  SET_CREATE_MODAL_FIELDS,
  CLEAR_ALL_EMPLOYEES
} from './constants';

export const setEmployees = () => ({
  type: GET_EMPLOYEES,
  data: JSON.parse(localStorage.getItem('employees'))
});

export const openCreateModal = isModal => ({
  type: OPEN_CREATE_MODAL,
  data: isModal
});

export const setCreateModalFields = field => ({
  type: SET_CREATE_MODAL_FIELDS,
  data: field
});
export const clearAllEmployees = () => {
  localStorage.clear();
  return {
    type: CLEAR_ALL_EMPLOYEES
  };
};
