import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';

// import Setting from "./Portal/Setting";

import styles from './Portal.module.scss';

import IconEdit from 'svgs/basic/IconEdit';
import IconMove from 'svgs/basic/IconFourArrows';
import IconPortalEnter from 'svgs/others/IconPortalEnter';
import IconLinkExternal from 'svgs/basic/IconLinkExternal';


type PropsPortal = {
    id: string,
    idUser: string,   //  normal, search
    kind: string,
             
    name: string,
    initials: string,
    url: string,
    
    lifespan: number,
    listBooleanVisited: boolean[],  // [true, false, ...(30days)] 
    dateVisitedLast: number, 
    dateCreated: number

    listTag: string[],
    hue: string
};

function Portal({
    id,
    idUser,   //  normal, search
    kind,
             
    name,
    initials,
    url,
    
    lifespan,
    listBooleanVisited,  // [true, false, ...(30days)] 
    dateVisitedLast, 
    dateCreated,

    listTag,
    hue
}: PropsPortal) {
  
    const dispatch = useDispatch();

    const idPortalOpen:string = useSelector((state: StateRoot) => state['status']['current']['portal']['open']);
    const [open, setOpen] = useState(false); 
    
    const hpMax:number = useMemo(()=>{
        let temp:number = 0;
        for (var i = 0; i < listBooleanVisited.length; i++){
            const numberToAdd = (30-i);
            temp += numberToAdd;
        }
        return temp;
    },[listBooleanVisited]);

    const hpCurrent = useMemo(()=>{
        let temp:number = 0;
        for (var i = 0; i < listBooleanVisited.length; i++){
            if (listBooleanVisited[i] === true){
                const numberToAdd = (30-i);
                temp += numberToAdd;
            }
        }
        return temp;
    },[listBooleanVisited]);

    useEffect(()=>{
        if(idPortalOpen !== id){
            setOpen(false);
        }
    },[idPortalOpen]);

    const onClick_Face = useCallback(
        (side: string) => {
            if(open===false){
                setOpen(true);
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'open'],
                    replacement: id
                }));
            }
            else {
                if (side === 'left') {
                    window.open(url, "_blank");

                    dispatch(actionsPortal.return__VISIT_PORTAL({
                        id,
                        idUser,   //  normal, search
                        
                        lifespan,
                        listBooleanVisited,  // [true, false, ...(30days)] 
                        dateVisitedLast,
                        dateCreated
                    }));

                    setOpen(false);
                }
                else {  /// 'right'
                    setOpen(false);
                }
            }
        },[id, url, open]
    );


    const onClick_Close = useCallback(
        () => {
            setOpen(false);
        },[]
    );

    const onClick_Action = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const {currentTarget: { value }} = event;
            if (value === 'edit'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'editing'],
                    replacement: id
                }));
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['showing', 'modal', 'editingPortal'],
                    replacement: true
                }));
            }
            else if (value === 'move'){
                // move
            }
        },[]
    );
    

  return (
      
    <div className={`${styles['root']} open----${open} hue----${hue}`} >

        <div 
            className={`${styles['outside']}`} 
            onClick={()=>onClick_Close()}
        />

        <div className={`${styles['portal']}`} >

            <div 
                className={`${styles['face']}`}
            >   
                <div 
                    className={`${styles['left']}`}
                    onClick={()=>onClick_Face('left')}
                >
                    <div className={`length-initials----${initials.length}`} >   {initials}   </div>
                    <div> <IconLinkExternal className={`${styles['icon-link-external']}`} kind='solid' /> </div>
                </div>
    
                <div 
                    className={`${styles['right']}`}
                    onClick={()=>onClick_Face('right')}
                >
                    <div className={`${styles['name']}`} > {name} </div> 
                    <div> Close </div>
                </div>

            </div>
            
            
            <div className={`${styles['body']}`}>

                <div className={`${styles['name']}`} >   
                    <div> {name}</div>
                </div>

                <div className={`${styles['empty']}`} >   
                </div>

                <div className={`${styles['actions']}`}>
                    <button 
                        value='move'
                        onClick={onClick_Action}
                    >   <IconMove className={`${styles['icon-move']}`} kind='light' />
                    </button>
                    
                    <button 
                        value='edit'
                        onClick={onClick_Action}
                    >   <IconEdit className={`${styles['icon-edit']}`} kind='light' />
                    </button>
                </div>

                <div className={`${styles['others']}`}>
                    <div className={`${styles['list-tag']}`}>
                        {listTag.map((tag, index)=>(
                            <div
                                key={`tag-${index}`}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div> {hpCurrent} / {hpMax}</div>
                    <div> last visit </div>
                    <div> created </div>
                </div>

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

