import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { login } from 'actions/app';

const styles = theme => ({
  login: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: '200px',
  },
  loginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '600px',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

@connect(state => ({
  currentUser: state.app.get('currentUser'),
  loginError: state.app.get('loginError'),
}))

export default withStyles(styles)(class Login extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.string,
    loginError: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      login: '',
    };
    this.error = false;
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({
      login: value,
    });
  }

  login() {
    const { dispatch } = this.props;

    dispatch(login({ user: this.state.login }));
  }

  render() {
    const classes = this.props.classes;

    if (this.props.currentUser) {
      localStorage.setItem('user', this.props.currentUser);
      return <Redirect to='/' />;
    }

    let errorText;
    if (this.props.loginError) {
      errorText = <FormHelperText>Such user doesn't exist</FormHelperText>;
    }

    return (
      <div className={ classes.loginWrapper }>
        <div className={ classes.login }>
          <FormControl error={ this.props.loginError }>
            <InputLabel htmlFor='name-error'>Login</InputLabel>
            <Input
              value={ this.state.login }
              onChange={ this.handleChange.bind(this) }
              className={ classes.input }
              inputProps={ {
                'aria-label': 'Description',
              } }
            />
            { errorText }
          </FormControl>
          <Button raised color='primary' className={ classes.button } onClick={ this.login }>
            Sign in
          </Button>
        </div>
      </div>
    );
  }
});
