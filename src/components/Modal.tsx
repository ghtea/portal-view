import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import CreatingPortal from "./Modal/CreatingPortal";
import EditingPortal from "./Modal/EditingPortal";
import CreatingStack from "./Modal/CreatingStack";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);
    const showingMyProfile:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['myProfile']); 
    const showingCreatingPortal:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingPortal']);
    const showingEditingPortal:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['editingPortal']);

    const showingCreatingStack:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['creatingStack']);

    return (
        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}
            {showingCreatingPortal && <CreatingPortal />}
            {showingEditingPortal && <EditingPortal />}
            {showingCreatingStack && <CreatingStack />}
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

