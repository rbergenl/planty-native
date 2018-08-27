import React from 'react';
import { connect } from 'react-redux';
import {
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import AuthLoadingScreen from './Auth/AuthLoadingScreen';
import SignInScreen from './Auth/SignInScreen';
import HomeScreen from './HomeScreen';
import OtherScreen from './OtherScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Other: OtherScreen
  }
);

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen
  }
);

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

const mapStateToProps = state => ({});

class Root extends React.Component {
  render() {
    return (
        <RootStack />
    );
  }
}

export default connect(mapStateToProps, { })( Root );
