import React, {useCallback, useMemo, useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';

import useInput from 'tools/hooks/useInput';
import calculateHp from 'tools/others/calculateHp';

import { FormattedMessage, useIntl } from 'react-intl';

import styles from './Portal.module.scss';

import IconMove from 'svgs/basic/IconFourArrows';
import IconEdit from 'svgs/basic/IconEdit';
import IconLayerPlus from 'svgs/basic/IconLayerPlus';

import IconPortalEnter from 'svgs/others/IconPortalEnter';
import IconLinkExternal from 'svgs/basic/IconLinkExternal';


type PropsPortal = {
    portal: actionsPortal.Portal 
};

function Portal({
    portal
}: PropsPortal) {
    
    const { 
        id,
        idUser,

        kind,
        name,
                                
        kindIcon,
        initials,
        urlImageIcon,
        
        url,
        
        lifespan,
        listBooleanVisited,
        dateChecked,
        dateStamped,
        dateVisited,
        dateUpdated,
        dateCreated,

        listTag,
        hue,
    } = portal;

    const dispatch = useDispatch();

    const idPortalOpen:string = useSelector((state: StateRoot) => state['status']['current']['portal']['open']);
    const idStackOpen:string = useSelector((state: StateRoot) => state['status']['current']['stack']['open']);

    const [open, setOpen] = useState(false); 

    const intl = useIntl();

    const inputSearch = useInput('');

    const {ratioHp, hpMax, hpCurrent, kindHp} = useMemo(()=>{

        const result = calculateHp(listBooleanVisited);
        console.log(result)

        return result;

    },[]);


    const stringVisitedLast = useMemo(()=>{
        const date = new Date(dateVisited); 

        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        return `${year}.${month}.${day}`
    },[dateVisited]);

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
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'stack', 'open'],
                    replacement: ''
                }));
            }
            else {
                if (side === 'left') {

                    dispatch(actionsPortal.return__VISIT_PORTAL({
                        id: id, 
                        stringSearching: inputSearch.value,
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
            else if (value === 'addToStack'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'addingToStack'],
                    replacement: id
                }));
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['showing', 'modal', 'addingPortalToStack'],
                    replacement: true
                }));
            }
        },[id, idUser]
    );
    

  return (
      
    <div className={`${styles['root']} open----${open} hue----${hue} kindHp----${kindHp}`} >

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
                    {kindIcon === 'image' ?
                        <img className={`${styles['image-icon']}`}  src={urlImageIcon}/>
                        :
                        <div className={`${styles['initials']} length-initials----${initials.length}`} >   {initials}   </div>
                    }                    
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
                        value='edit'
                        onClick={onClick_Action}
                    >   <IconEdit className={`${styles['icon-edit']}`} kind='light' />
                    </button>

                    <button 
                        value='addToStack'
                        onClick={onClick_Action}
                    >   <IconLayerPlus className={`${styles['icon-layer-plus']}`} kind='light' />
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
                    <div className={`${styles['hp']} kindHp----${kindHp}`}>
                        <div> HP </div>
                        <div 
                            className={`${styles['container__bar']}`}
                        >   <div style={{width: `${ratioHp * 100}%`}}/>
                        </div>
                        {/*<div>  {`${ratioHp * 100}%`} </div>*/}
                    </div>
                    <div
                        className={`${styles['last-visit']}`}
                    >  <div> {dateVisited && `last visit ${stringVisitedLast}`} </div>
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

