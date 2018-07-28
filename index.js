import React from 'react';
import { AppRegistry } from 'react-native';

//import App from './App';

// Router
import { NativeRouter } from 'react-router-native';
import Root from './src/containers/Root';

// Redux
import configureStore from './src/configureStore';
import { Provider } from 'react-redux';
const store = configureStore;

// App Shell
class Shell extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Root />
        </NativeRouter>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('PlantyNative', () => Shell);
