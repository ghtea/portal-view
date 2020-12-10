import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import Setting from "./Modal/Setting";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);
    const showingCreatingPortal:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingPortal']);

  
  return (
      
    <>
      
      {showingSetting && <Setting />}
      

    </>
      
  );
}

export default Modal;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

