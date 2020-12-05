import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NameApp from "./FullPage/TopBar";

import LogIn from "./FullPage/LogIn";
import SignUp from "./FullPage/SignUp";

import styles from './FullPage.module.scss';

type PropsFullPage = {};

function FullPage({}: PropsFullPage) {
  return (
    
    <div className={`${styles['root']}`} >
        
        <NameApp/>
        
        <Switch>
          <Route path="/log-in" >
            <LogIn />
          </Route>
          
          <Route path="/sign-up" >
            <SignUp />
          </Route>
        </Switch>
        
        <div className={`${styles['background']}`} />
        
      </div>
     
  );
}

export default FullPage;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

