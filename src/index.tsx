import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router} from "react-router-dom";
import historyApp from './historyApp';

import App from './App';
//import './index.css';
import {Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import 'language/i18n'

import store from './store';



const render = () => {
  
    ReactDOM.render(
        <React.StrictMode>
  
          <Router history={historyApp}>
          
            <CookiesProvider>
              <Provider store={store}>
              
                <Route path="/" component={App} /> 
                
              </Provider>
            </CookiesProvider>
          
          </Router>
        
        </React.StrictMode>,
        document.getElementById('root')
    );
};



store.subscribe(render);

render();