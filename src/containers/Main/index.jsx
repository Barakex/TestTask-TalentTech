import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles'; // eslint-disable-line 
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { setEmployees, openCreateModal, clearAllEmployees } from './actions';
import CreateModal from './CreateModal';

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
  setEmployees, employees = [], openCreateModal, isCreateModal, clearAllEmployees
  /* eslint-enable no-shadow */
}) => {
  const matches = useMediaQuery('(min-width:750px)');
  const classes = useStyles(matches);
  const handleCloseModal = () => {
    openCreateModal(false);
    setEmployees();
  };
  const handleOpenModal = () => {
    openCreateModal(true);
  };
  const clearEmployees = () => {
    clearAllEmployees();
  };
  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div className={classes.container}>
      <CreateModal
        onClose={handleCloseModal}
        isOpen={isCreateModal}
        closeModal={handleCloseModal}
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
        <Button className={classes.button} onClick={clearEmployees} variant="contained" color="primary">Очистить</Button>
        <Button className={classes.button} onClick={handleOpenModal} variant="contained" color="primary">Добавить</Button>
      </div>

    </div>
  );
};

Main.propTypes = {
  setEmployees: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  openCreateModal: PropTypes.func.isRequired,
  isCreateModal: PropTypes.bool.isRequired,
  clearAllEmployees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.MainReducer.employees,
  isCreateModal: state.MainReducer.isCreateModal
});

const withConnect = connect(
  mapStateToProps,
  { setEmployees, openCreateModal, clearAllEmployees },
);

export default compose(withConnect)(Main);
