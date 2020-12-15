import React, {useCallback, useState, useEffect} from 'react';

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
  
    const dispatch = useDispatch();

    const idPortalOpen:string = useSelector((state: StateRoot) => state['status']['current']['portal']['open']);
    const [open, setOpen] = useState(false); 
    
    useEffect(()=>{
        if(idPortalOpen !== _id){
            setOpen(false);
        }
    },[idPortalOpen]);

    const onClick_Face = useCallback(
        () => {
            if(open===false){
                setOpen(true);
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'open'],
                    replacement: _id
                }));
            }
            else {
                window.open(url, "_blank");
                setOpen(false);
            }
        },[_id, url]
    );
    

  return (
      
    <div className={`${styles['root']} open----${open} hue----${hue}`} >
        
        <div 
            className={`${styles['center']}`}
            onClick={()=>onClick_Face()}
        >
            <div> {name} </div>
        </div>
        
        <div
            className={`${styles['top']}`}
        >
            top
        </div>

        <div
            className={`${styles['left']}`}
        >
            move
        </div>

        <div
            className={`${styles['right']}`}
        >
            edit
        </div>

        <div
            className={`${styles['bottom']}`}
        >
            bottom
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

