import {
  SET_MODAL_FIELDS,
  CLEAR_MODAL_FIELDS,
  IS_MODAL
} from './constants';

export const setModalFields = field => ({
  type: SET_MODAL_FIELDS,
  data: field
});

export const clearModalFields = () => ({
  type: CLEAR_MODAL_FIELDS
});

export const isModal = bool => ({
  type: IS_MODAL,
  data: bool
});
