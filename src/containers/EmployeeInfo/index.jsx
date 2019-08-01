import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/styles'; // eslint-disable-line 
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { setEmployees } from '../Main/actions';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vw'
  },
  wrapper: {
    maxWidth: '30%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  button: {
    marginTop: 16
  },
  position: {
    margin: '10px 0',
    color: 'rgba(0, 0, 0, .5 )'
  }
});

const EmployeeInfo = ({
  /* eslint-disable no-shadow */
  match, employees, setEmployees
  /* eslint-enable no-shadow */
}) => {
  const { id } = match.params; // eslint-disable-line react/prop-types
  const employee = employees.find(item => +id === item.id);
  const classes = useStyles();

  useEffect(() => { // Иммитация реста
    setEmployees();
  }, []);

  return (
    <>
      {
        employee && (
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <Typography variant="h4">
                { `${employee.name} ${employee.firstName}` }
              </Typography>
              <Typography variant="h5" className={classes.position}>{employee.position}</Typography>
              <Typography>{employee.description}</Typography>
              <Button
                className={classes.button}
                size="medium"
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Редактировать
              </Button>
              <Button
                className={classes.button}
                size="medium"
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Назад
              </Button>
            </div>
          </div>
        )
      }

    </>
  );
};

EmployeeInfo.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEmployees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.MainReducer.employees
});

const withConnect = connect(
  mapStateToProps,
  { setEmployees },
);

export default compose(withConnect, withRouter)(EmployeeInfo);
