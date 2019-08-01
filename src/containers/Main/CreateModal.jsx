import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setCreateModalFields } from './actions';

const CreateModal = ({
  /* eslint-disable no-shadow */
  isOpen, onClose, setCreateModalFields, createModalFormFields, employees
  /* eslint-enable no-shadow */
}) => {
  const isButtonDisabled = createModalFormFields.name.length === 0;
  const handleSubmit = () => {
    const addeNewEmployee = employees || [];
    addeNewEmployee.push(createModalFormFields);
    const storage = JSON.stringify(addeNewEmployee);
    localStorage.setItem('employees', storage);
    onClose();
  };
  const handleChange = (e) => {
    const fields = {
      ...createModalFormFields,
      [e.target.name]: e.target.value,
      id: employees && employees.length ? employees.length + 1 : 1
    };
    setCreateModalFields(fields);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Создать сотрудника</DialogTitle>
        <DialogContent>
          <TextField
            required
            autocomplite="off"
            name="name"
            label="Имя"
            value={createModalFormFields.name}
            margin="normal"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="firstName"
            label="Фамилия"
            margin="normal"
            value={createModalFormFields.firstName}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="position"
            label="Должность"
            margin="normal"
            value={createModalFormFields.position}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autocomplite="off"
            name="description"
            label="Описание"
            margin="normal"
            value={createModalFormFields.description}
            fullWidth
            multiline
            rows="4"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isButtonDisabled} onClick={handleSubmit} variant="contained" color="primary">Подтвердить</Button>
          <Button onClick={onClose} variant="contained" color="primary">Закрыть</Button>
        </DialogActions>
      </form>

    </Dialog>
  );
};

CreateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setCreateModalFields: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  createModalFormFields: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    firstName: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  createModalFormFields: state.MainReducer.createModalFormFields,
  employees: state.MainReducer.employees
});

const withConnect = connect(
  mapStateToProps,
  { setCreateModalFields },
);

export default compose(withConnect)(CreateModal);
