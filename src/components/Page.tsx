import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "./Page/Home";
import LogIn from "./Page/LogIn";
import SignUp from "./Page/SignUp";
import NotFound from "./Page/NotFound";

//import SignUp from "./components/Auth/SignUp";

import styles from './Page.module.scss';


type PropsPage = {};

function Page({}: PropsPage) {
  return (
    
    <div className={`${styles['root']}`} >
      
          <Switch>
            
            <Route exact path="/" >
                <Home />
            </Route>

            <Route path="/log-in" >
                <LogIn />
            </Route>
            
            <Route path="/sign-up" >
                <SignUp />
            </Route>
            
            <Route >
                <NotFound />
            </Route>

          </Switch>
        
      </div>
  );
}

export default Page;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

