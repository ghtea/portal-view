import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter} from "react-router-dom";
import App from './App';
//import './index.css';
import {Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import 'language/i18n'

import store from './store';



const render = () => {
  
    ReactDOM.render(
        <React.StrictMode>
  
          <BrowserRouter>
          
            <CookiesProvider>
              <Provider store={store}>
              
                <Route path="/" component={App} /> 
                
              </Provider>
            </CookiesProvider>
          
          </BrowserRouter>
        
        </React.StrictMode>,
        document.getElementById('root')
    );
};



store.subscribe(render);

render();