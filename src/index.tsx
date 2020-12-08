import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router} from "react-router-dom";  // BrowserRouter
import history from 'historyApp';

import App from './App';
//import './index.css';
import {Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';


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