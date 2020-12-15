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
    url:string,
    tags: string[],
    hue: string
};

function Portal({
    _id,
    kind,
    name,
    url,
    tags,
    hue
}: PropsPortal) {
  
  // const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['Portal']['setting']);
    const dispatch = useDispatch();

    
    const onClick_Face = useCallback(
        (url:string) => {
            window.location.href = url;
        },[]
    );
    

  return (
      
    <div className={`${styles['root']} hue----${hue}`} >
        
        <div 
            className={`${styles['face']}`}
            
        >
            <div> {name} </div>
        </div>
        

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

