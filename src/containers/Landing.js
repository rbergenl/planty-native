import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

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

class Landing extends React.Component {

    static navigationOptions = {
      title: 'Landing',
    };

   go() {
   }
    render() {
        return (
          <View>
            <Text>Landing Page</Text>


            <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Log in</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={ this.go}>
              <Text>Register</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} underlayColor='#f0f4f7' onPress={ this.go}>
              <Text>Google Login</Text>
            </TouchableHighlight>
          </View>
        )
    }
};

export default connect(mapStateToProps, { })( Landing );
