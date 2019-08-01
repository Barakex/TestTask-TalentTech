import {
  GET_EMPLOYEES,
  CLEAR_ALL_EMPLOYEES
} from './constants';

export const setEmployees = () => ({
  type: GET_EMPLOYEES,
  data: JSON.parse(localStorage.getItem('employees')) || []
});

export const clearAllEmployees = () => {
  localStorage.clear();
  return {
    type: CLEAR_ALL_EMPLOYEES
  };
};
