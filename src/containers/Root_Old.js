import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Route, Switch, Redirect, withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'

import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import App from './App';
import AuthLoadingScreen from './AuthLoadingScreen';

//import { loggedInStatusChanged, loginUser } from '../actions/authActions';
//import Config from '../config';

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
});

const mapStateToProps = state => (
  { loggedIn: state.auth.loggedIn }
);

const AppStack = createStackNavigator({ App: App });
const AuthStack = createStackNavigator({ Landing: Landing, Login: Login });
const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

/*
const RootStack = createStackNavigator(
  {
    Landing: Landing,
    Login: Login
  },
  {
    initialRouteName: 'Landing',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      )
    }
  }
);
*/

class Root extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
    //loggedInStatusChanged: PropTypes.func.isRequired
  }

/*
  componentWillMount() {
    this.validateUserSession();
  }
*/
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
        <RootStack />
    );
/*
    return (
      <View style={styles.container}>
      <Text>Root</Text>
        <Switch>
          <Route
            path="/landing"
            exact
            render={() => {return loggedIn === true ? (<Redirect to={{pathname: '/'}} />) : (<Landing />)}}
          />
          <Route
            path="/login"
            render={() => {return <Login />}}
          />
          <Route
            path="/register"
            exact
            render={() => {return <h1>Register here</h1>}}
          />
          <Route path="/" render={() => {return loggedIn === false ? (<Redirect to={{pathname: '/landing'}} />) : (<App />)}} />
        </Switch>
      </View>
    );
*/
  }
}


export default connect(mapStateToProps, { })( Root );
