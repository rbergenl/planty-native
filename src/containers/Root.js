/**
 * Router component in charge of navigation when not signed in
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-native';

import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

import SensorsComponent from './BLE';
import { GoogleSignin } from 'react-native-google-signin';
//import Login from './Login';
//import Register from './Register';
//import App from './App';

import { connect } from 'react-redux';
//import { loggedInStatusChanged, loginUser } from '../actions/authActions';

//import Expo from 'expo';
//import Config from '../config';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
/*
    Expo.Google.logInAsync({
       androidClientId: Config.androidClientId,
       scopes: ['profile', 'email']
     }).then(function(result){
       console.log(result)
     }, function(e){
       console.log(e)
     });
  */
    //loginUser('username', 'password');
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends Component {

  componentDidMount() {
      this.setupGoogleSignin();
  }

  googleAuth() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  async setupGoogleSignin() {
    const settings = {
      webClientId: '76561713672-ldo9v3eel2fk1k1vivtou7eutphktg3u.apps.googleusercontent.com'
    }
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
      //  iosClientId: settings.iOSClientId,
        webClientId: settings.webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  login = () => {
    fakeAuth.authenticate(() => {
    //  this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={this.login}>
          <Text>Log in</Text>
        </TouchableHighlight>
        <TouchableOpacity onPress={this.googleAuth.bind(this)}>
          <Text>Login with Google 4</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  btn: {
    width: 200,
    backgroundColor: '#E94949',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  }
})

const Register = () => (
    <Text>Register Page</Text>
);
const App = () => (
    <Text>App Page</Text>
);
/**
 * Component that redirects user to the login page if not signed in
 */
const PrivateRoute = ({ component: TheComponent, authStatus, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={props => (
      authStatus === false ?
        (<Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />) :
        (<TheComponent {...props} />)
    )}
  />
);

PrivateRoute.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  component: PropTypes.func,
  location: PropTypes.object,
};

PrivateRoute.defaultProps = {
  component: null,
  location: null,
};


const PublicRoute = ({component: Component, authStatus, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

const mapStateToProps = state => (
  { loggedIn: state.auth.loggedIn }
);

class Root extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
    //loggedInStatusChanged: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.validateUserSession();
  }

  // Check browser sessionStorage to check logged in status
  validateUserSession() {
  //  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    //  this.props.loggedInStatusChanged(true);
  //  } else {
    //  this.props.loggedInStatusChanged(false);
  //  }
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <View style={styles.container}>
        <Switch>
          <PublicRoute
            path="/login"
            exact
            component={Login}
          />
          <PublicRoute
            path="/register"
            exact
            component={Register}
          />
          <PrivateRoute
            path="/"
            authStatus={loggedIn}
            component={App}
          />
        </Switch>
        <SensorsComponent />
      </View>
    );
  }
}


export default withRouter(connect(mapStateToProps, { })(Root));
