import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import Setting from "./Modal/Setting";
import CreatingPortal from "./Modal/CreatingPortal";
import EditingPortal from "./Modal/EditingPortal";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);
    const showingCreatingPortal:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingPortal']);
    const showingEditingPortal:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['editingPortal']);
  
    return (
        
        <>
            {showingSetting && <Setting />}
            {showingCreatingPortal && <CreatingPortal />}
            {showingEditingPortal && <EditingPortal />}
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

