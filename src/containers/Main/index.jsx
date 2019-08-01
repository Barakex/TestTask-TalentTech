import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles'; // eslint-disable-line 
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { setEmployees, clearAllEmployees } from './actions';
import { isModal, clearModalFields } from '../Modal/actions';
import Modal from '../Modal';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    flexDirection: 'column'
  },
  table: matches => ({
    border: '1px solid grey',
    borderRadius: 4,
    width: matches ? '30%' : '100%',
    padding: 16,
    margin: 10
  }),
  tHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#e5e5e5'
  },
  tBody: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: '0.5s',
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      background: '#e5e5e5'
    }
  },
  tHeadItem: {
    textAlign: 'center',
    width: '100%',
    padding: 8
  },
  tBodyItem: {
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    padding: 8
  },
  buttons: {
    display: 'flex'
  },
  button: {
    margin: '0 10px'
  }
});

const Main = ({
  /* eslint-disable no-shadow */
  setEmployees,
  employees,
  clearAllEmployees,
  modalFormFields,
  isModal,
  clearModalFields
  /* eslint-enable no-shadow */
}) => {
  const matches = useMediaQuery('(min-width:750px)');
  const classes = useStyles(matches);

  const clearEmployees = () => {
    clearAllEmployees();
  };
  const submitForm = () => {
    const addNewEmployee = employees || [];
    const unicFormsId = modalFormFields;
    unicFormsId.id = employees && employees.length ? employees.length + 1 : 1;
    addNewEmployee.push(unicFormsId);
    const storage = JSON.stringify(addNewEmployee);
    localStorage.setItem('employees', storage);
    clearModalFields();
    setEmployees();
  };
  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div className={classes.container}>
      <Modal
        onSubmitForm={submitForm}
      />
      <div className={classes.table}>
        <div className={classes.tHead}>
          <div className={classes.tHeadItem}>Имя</div>
          <div className={classes.tHeadItem}>Фамилия</div>
          <div className={classes.tHeadItem}>Должность</div>
        </div>
        {employees && employees.map(item => (
          <Link to={`/employee/${item.id}`} key={item.id} className={classes.tBody}>
            <div className={classes.tBodyItem}>{item.name}</div>
            <div className={classes.tBodyItem}>{item.firstName}</div>
            <div className={classes.tBodyItem}>{item.position}</div>
          </Link>
        ))}
      </div>
      <div className={classes.buttons}>
        <Button
          disabled={employees.length === 0}
          className={classes.button}
          onClick={clearEmployees}
          variant="contained"
          color="primary"
        >
          Очистить
        </Button>
        <Button
          className={classes.button}
          onClick={() => isModal(true)}
          variant="contained"
          color="primary"
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

Main.propTypes = {
  setEmployees: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object),
  clearAllEmployees: PropTypes.func.isRequired,
  modalFormFields: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    firstName: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  isModal: PropTypes.func.isRequired,
  clearModalFields: PropTypes.func.isRequired
};

Main.defaultProps = {
  employees: []
};

const mapStateToProps = state => ({
  employees: state.MainReducer.employees,
  isModal: state.MainReducer.isModal,
  modalFormFields: state.ModalReducer.modalFormFields
});

const withConnect = connect(
  mapStateToProps,
  {
    setEmployees, isModal, clearAllEmployees, clearModalFields
  },
);

export default compose(withConnect)(Main);
