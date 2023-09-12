import {createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware  from 'redux-thunk'
// import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers'

const middlewares = [thunkMiddleware];

const composeEnhancers = typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;
  

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  const Store = createStore(blogReducer, undefined, enhancers);
  export default Store;