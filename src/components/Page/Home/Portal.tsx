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
import useInput from 'tools/hooks/useInput';


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
    
    const inputSearch = useInput('');

    const {ratioHp, hpMax, hpCurrent} = useMemo(()=>{

        let hpMax:number = 0;
        for (var i = 0; i < listBooleanVisited.length; i++){
            const numberToAdd = (30-i);
            hpMax += numberToAdd;
        }
        
        let hpCurrent:number = 0;
        for (var i = 0; i < listBooleanVisited.length; i++){
            if (listBooleanVisited[i] === true){
                const numberToAdd = (30-i);
                hpCurrent += numberToAdd;
            }
        }
        const ratioHp = Math.round((hpCurrent / hpMax) * 100) / 100;
        
        return {hpCurrent, hpMax, ratioHp}

    },[listBooleanVisited]);


    const stringVisitedLast = useMemo(()=>{
        const date = new Date(dateVisitedLast); 

        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        return `${year}.${month}.${day}`
    },[dateVisitedLast]);

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

                    dispatch(actionsPortal.return__VISIT_PORTAL({
                        portal: {
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
                        },
                        stringSearching: inputSearch.value
                    }));

                    setOpen(false);
                }
                else {  /// 'right'
                    setOpen(false);
                }
            }
        },[id, url, open, inputSearch]
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

                { kind === 'search' &&
                    <div className={`${styles['search']}`} >
                        <input type='text' value={inputSearch.value} onChange={inputSearch.onChange}/>
                    </div>
                }

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
                    <div className={`${styles['hp']}`}>
                        <div> HP </div>
                        <div 
                            className={`${styles['bar']}`}
                        >   <div style={{width: `${ratioHp * 100}%`}}/>
                        </div>
                        <div>  {`${ratioHp * 100}%`} </div>
                    </div>
                    <div
                        className={`${styles['last-visit']}`}
                    >  <div> last visit {stringVisitedLast} </div>
                    </div>
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

