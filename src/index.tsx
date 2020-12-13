import React, {useEffect, useState, useMemo} from 'react';
import ReactDOM from 'react-dom';
import { Route, Router} from "react-router-dom";  // BrowserRouter
import history from 'historyApp';
import Cookies from 'js-cookie';

import App from './App';
//import './index.css';
import {Provider} from 'react-redux'
import { StateRoot} from 'store/reducers';

import { CookiesProvider } from 'react-cookie';

import * as actionsStatus from 'store/actions/status';

import store from './store';



const render = () => {
    

    ReactDOM.render(
        <React.StrictMode>
  
          <Router history={history}>

            <CookiesProvider>
                <Provider store={store}>
                    <App /> 
                </Provider>
            </CookiesProvider>
          
          </Router>
        
        </React.StrictMode>,
        document.getElementById('root')
    );
};



store.subscribe(render);

render();