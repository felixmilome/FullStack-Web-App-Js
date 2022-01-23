import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

//RDX
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './components/Midwares/rdx/reducers/index.js'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
        <App/>
    </Provider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('mzizi')
);


