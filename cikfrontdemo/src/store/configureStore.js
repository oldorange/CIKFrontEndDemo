import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import reducer from '../reducers';

export default function configureStore(history, initialState) {

  const middleware = [
    thunk,
    routerMiddleware(history)
    ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];

  const reducers = combineReducers({
    router: connectRouter(history),
    reducer
  });
  // const isDevelopment = process.env.NODE_ENV === 'development';
  // if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  //   enhancers.push(window.devToolsExtension());
  // }
  console.log(reducers);
  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
