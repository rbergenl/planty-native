import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

//import rootReducer from './reducers';

const rootReducer = (state, action) => {return {auth: {loggedIn:false}}};

const store = createStore(
  rootReducer,
  // Redux dev-tools chrome extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk),
);

export default store;
