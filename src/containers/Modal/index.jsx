import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setModalFields, isModal } from './actions';

const Modal = ({
  /* eslint-disable no-shadow */
  isOpen,
  setModalFields,
  modalFormFields,
  onSubmitForm,
  isModal,
  currentObject
  /* eslint-enable no-shadow */
}) => {
  const isButtonDisabled = modalFormFields.name.length === 0;
  useEffect(() => {
    setModalFields(currentObject);
  }, []);
  const handleSubmit = () => {
    onSubmitForm();
    isModal(false);
  };
  const handleChange = (e) => {
    const fields = {
      ...modalFormFields,
      [e.target.name]: e.target.value
    };
    setModalFields(fields);
  };

  const closeModal = () => {
    isModal(false);
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Создать сотрудника</DialogTitle>
        <DialogContent>
          <TextField
            required
            autocomplite="off"
            name="name"
            label="Имя"
            value={modalFormFields.name}
            margin="normal"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="firstName"
            label="Фамилия"
            margin="normal"
            value={modalFormFields.firstName}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="position"
            label="Должность"
            margin="normal"
            value={modalFormFields.position}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="description"
            label="Описание"
            margin="normal"
            value={modalFormFields.description}
            fullWidth
            multiline
            rows="4"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isButtonDisabled} onClick={handleSubmit} variant="contained" color="primary">Подтвердить</Button>
          <Button onClick={closeModal} variant="contained" color="primary">Закрыть</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

Modal.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalFields: PropTypes.func.isRequired,
  modalFormFields: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    firstName: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  currentObject: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    firstName: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string
  }),
  isModal: PropTypes.func.isRequired
};

Modal.defaultProps = {
  currentObject: {
    id: null,
    name: '',
    firstName: '',
    position: '',
    description: ''
  }
};

const mapStateToProps = state => ({
  modalFormFields: state.ModalReducer.modalFormFields,
  employees: state.MainReducer.employees,
  isOpen: state.ModalReducer.isOpen
});

const withConnect = connect(
  mapStateToProps,
  {
    setModalFields, isModal
  },
);

export default compose(withConnect)(Modal);
