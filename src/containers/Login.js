import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

import { GoogleSignin } from 'react-native-google-signin';

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

const mapStateToProps = state => ({
});

class Login extends Component {

  static navigationOptions = {
    title: 'Login',
  };
//  const { history } = this.props;

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
  //  history.push('/landing')
  }


  render() {

//    const { from } = this.props.location.state || { from: { pathname: '/' } }
console.log(this.props)

    return (
      <View>
      <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={this.login}>
        <Text>Log in (router)</Text>
      </TouchableHighlight>
        <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={this.login}>
          <Text>Log in</Text>
        </TouchableHighlight>
        <TouchableOpacity onPress={this.googleAuth.bind(this)}>
          <Text>Login with Google</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

export default withRouter(connect(mapStateToProps, { })( Login ));
