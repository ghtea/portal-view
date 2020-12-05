import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import Setting from "./Modal/Setting";

import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
  const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);
  const dispatch = useDispatch();
  
  const onClick_HideModal = useCallback(
    (idModal:string) => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', idModal],
        replacement: false
      }))
    },[showingSetting]
  );
  
  return (
      
    <>
      
      {showingSetting && 
        <>
            <div 
                className={`${styles['shadow-of-modal']}`} 
                onClick={()=>onClick_HideModal('setting')}
            />
            <Setting />
        </>
      }
      
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

