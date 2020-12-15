import React, {useCallback, useState} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

// import Setting from "./Portal/Setting";

import styles from './Portal.module.scss';

import IconThreeDots from 'svgs/basic/IconThreeDots';
import IconPlus from 'svgs/basic/IconPlus';
import IconCopy from 'svgs/basic/IconCopy';
import IconShare from 'svgs/basic/IconShare';


type PropsPortal = {
    _id:string,
    kind:string,
    name:string,
    url:string
};

function Portal({
    _id,
    kind,
    name,
    url
}: PropsPortal) {
  
  // const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['Portal']['setting']);
  const dispatch = useDispatch();

    /*
    const onClick_ShowModal = useCallback(
        (idModal:string) => {
        dispatch(actionsStatus.return__REPLACE({ 
            listKey: ['showing', 'modal', idModal],
            replacement: true
        }))
        },[]
    );
    */

  return (
      
    <div className={`${styles['root']}`} >
        
        <div> {_id} </div>
        <div> {kind} </div>
        <div> {name} </div>
        <div> {url} </div>

    </div>
      
  );
}

export default Portal;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

