import React, {useCallback, useState} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

// import Setting from "./Action/Setting";

import styles from './Action.module.scss';

import IconThreeDots from 'svgs/basic/IconThreeDots';
import IconPlus from 'svgs/basic/IconPlus';
import IconCopy from 'svgs/basic/IconCopy';
import IconShare from 'svgs/basic/IconShare';


type PropsAction = {};

function Action({}: PropsAction) {
  
  // const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['Action']['setting']);
  const dispatch = useDispatch();

  const [isOpenAction, setIsOpenAction] = useState(false)
  

  const onClick_OpenCloseAction = useCallback(
    (decision?:boolean) => {
        if (decision === true || decision === false){
            setIsOpenAction(decision);
        }
        else {
            setIsOpenAction(!isOpenAction);
        }
    },[isOpenAction]
  );

  const onClick_ShowModal = useCallback(
    (idModal:string) => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', idModal],
        replacement: true
      }))
    },[]
  );
  

  return (
      
    <div className={`${styles['root']} is-open----${isOpenAction}`} >

        <div className={`${styles['main']}`} >
            <button
                onClick={()=>onClick_OpenCloseAction()}
            > <IconThreeDots className={`${styles['icon-three-dots']}`} /> 
            </button>
        </div>

        
        <div className={`${styles['menu']}`} >

            <button
                
            > <IconCopy className={`${styles['icon-copy']}`} /> 
            </button>
            <button
                
            > <IconShare className={`${styles['icon-share']}`} /> 
            </button>
        </div>
        
        {isOpenAction &&
            <div 
                className={`${styles['shadow-of-action']}`} 
                onClick={()=>onClick_OpenCloseAction(false)}
            />
        }

    </div>
      
  );
}

export default Action;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

