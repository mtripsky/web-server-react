import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Provider } from "react-redux";
import App from './App';
// import configureStore from "../redux/configureStore.js";

// const Root = props => {
//   const store = configureStore();
const Root = () => {
  return (
    //<Provider store={store}>
    <App />
    // </Provider>
  );
};

export default Root;
