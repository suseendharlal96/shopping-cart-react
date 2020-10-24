import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import authReducer from "./store/reducers/authReducer";
import productReducer from "./store/reducers/productReducer";
import orderReducer from "./store/reducers/orderReducer";
import cartReducer from "./store/reducers/cartReducer";
import {
  watchAuth,
  watchProducts,
  watchCart,
  watchOrders,
} from "./store/sagas/index";
import "./index.css";
import App from "./App";

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  orderReducer,
  cartReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProducts);
sagaMiddleware.run(watchCart);
sagaMiddleware.run(watchOrders);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
