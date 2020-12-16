import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

// import Setting from "./Portal/Setting";

import styles from './Portal.module.scss';

import IconEdit from 'svgs/basic/IconEdit';
import IconMove from 'svgs/basic/IconFourArrows';
import IconPortalEnter from 'svgs/others/IconPortalEnter';
import IconLinkExternal from 'svgs/basic/IconLinkExternal';


type PropsPortal = {
    _id: string,
    user: string,   //  normal, search
    kind: string,
             
    name: string,
    initials: string,
    url: string,
    
    life: number,
    listBooleanVisited: boolean[],  // [true, false, ...(30days)] 
    dateVisitedLast: Date, 

    tags: string[],
    hue: string
};

function Portal({
    _id,
    user,   //  normal, search
    kind,
             
    name,
    initials,
    url,
    
    life,
    listBooleanVisited,  // [true, false, ...(30days)] 
    dateVisitedLast, 

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
                console.log('hi');
                window.open(url, "_blank");
                setOpen(false);
            }
        },[_id, url, open]
    );

    const onClick_Close = useCallback(
        () => {
            setOpen(false);
        },[]
    );
    

  return (
      
    <div className={`${styles['root']} open----${open} hue----${hue}`} >
        
        <div 
            className={`${styles['center']}`}
            onClick={()=>onClick_Face()}
        >   
            <div className={`${styles['face']} length-initials----${initials.length}`}>
                {initials}
            </div>

            <div className={`${styles['body']}`}>
                { !open && 
                    <div className={`${styles['name']}`} > {name} </div> 
                }
                { open && 
                    <>
                        <div> <IconLinkExternal className={`${styles['icon-link-external']}`} kind='solid' /> </div>
                        <div> Enter </div>
                    </> 
                }
            </div>

        </div>
        
        <div
            className={`${styles['top']}`}
        >
            {name}
        </div>

        <button
            className={`${styles['left']}`}
        >
            <IconMove className={`${styles['icon-move']}`} kind='light' />
        </button>

        <button
            className={`${styles['right']}`}
        >
            <IconEdit className={`${styles['icon-edit']}`} kind='light' />
        </button>

        <div
            className={`${styles['bottom']}`}
            onClick={()=>onClick_Close()}
        >   
            <button>Close</button>
            <div>
                <div> bar graph 1</div>
                <div> bar graph 2</div>
            </div>
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

