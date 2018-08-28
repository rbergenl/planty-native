import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import SocialButton from '../../components/SocialButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  isSigninInProgress: false
});

class SignInScreen extends React.Component {

  static propTypes = {
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
        <SocialButton handleClick={this._signInAsyncGoogle} />
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signInAsyncGoogle}
          disabled={this.props.isSigninInProgress} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  _signInAsyncGoogle = async () => {
    try {
      const user = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    } catch(err) {
      console.log('WRONG SIGNIN', err);
    }
  }

}

export default connect(mapStateToProps, { })( SignInScreen );
