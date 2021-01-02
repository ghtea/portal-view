import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';
import * as actionsPortal from 'store/actions/portal';
import * as actionsStack from 'store/actions/stack';

import Portal from './Home/Portal';
import Stack from './Home/Stack';

import styles from './Home.module.scss';
import IconSort from 'svgs/basic/IconSort';
import IconHide from 'svgs/basic/IconHide';

import IconSortButton from 'svgs/basic/IconSortButton';


type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

    const readyListPortal = useSelector((state: StateRoot) => state['status']['ready']['listPortal']);
    const loadingListPortal = useSelector((state: StateRoot) => state['status']['loading']['listPortal']);
    const listPortal = useSelector((state: StateRoot) => state['portal']['listPortal']);

    const readyListStack = useSelector((state: StateRoot) => state['status']['ready']['listStack']);
    const loadingListStack = useSelector((state: StateRoot) => state['status']['loading']['listStack']);
    const listStack = useSelector((state: StateRoot) => state['stack']['listStack']);

    const sortingPortal = useSelector((state: StateRoot) => state.status.current.portal.sorting);
    const hidingPortal = useSelector((state: StateRoot) => state.status.current.portal.hiding);
    const sortingStack = useSelector((state: StateRoot) => state.status.current.stack.sorting);
    
    useEffect(()=>{
        if (readyUser && idUser) {
            dispatch(actionsPortal.return__GET_LIST_PORTAL({
                idUser: idUser
            }));
        }
    },[readyUser, idUser]);


    useEffect(()=>{
        if (readyUser && idUser && readyListPortal) {
            dispatch(actionsStack.return__GET_LIST_STACK({
                idUser: idUser
            }));
        }
    },[readyUser, idUser, readyListPortal]);


    const listPortalUsing = useMemo(()=>{
        const {inStacks} = hidingPortal;
        let result = [...listPortal];
        if (inStacks){
            let listIdPortalInStacks: string[] = [];
            for (const stackEach of listStack){
                listIdPortalInStacks = [...listIdPortalInStacks, ...stackEach.listIdPortalManual];
            }
            return result.filter(portalEach => !listIdPortalInStacks.includes(portalEach.id) )
        } 
        else {
            return result 
        }
    }, [listPortal, hidingPortal, listStack]);

    // event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    const onClick_Sort = useCallback(
        ( kindItem: 'portal' |'stack', propertyNew:'name' | 'hp' | 'dateVisited') => {
            
            let directionNew = 'ascending' as 'ascending' | 'descending';

            if (kindItem === 'portal'){
                if (sortingPortal.property === propertyNew) {
                    directionNew = (sortingPortal['direction'][propertyNew] === 'ascending') ? 'descending' : 'ascending';
                }
                else {
                    directionNew = 'ascending'
                }
                dispatch(actionsPortal.return__SORT_LIST_PORTAL({
                    property: propertyNew as 'hp' | 'dateVisited',
                    direction: directionNew,
                }) );
            }
            else if (kindItem === 'stack'){
                if (sortingStack.property === propertyNew) {
                    directionNew = (sortingStack['direction'][propertyNew] === 'ascending') ? 'descending' : 'ascending';
                }
                else {
                    directionNew = 'ascending'
                }
                dispatch(actionsStack.return__SORT_LIST_STACK({
                    property: propertyNew as 'name' | 'dateVisited',
                    direction: directionNew,
                }) );
            }

        }, [sortingPortal, sortingStack]
    );
    
    const onClick_Hide = useCallback(
        ( kindItem: 'portal' |'stack', option: 'inStacks') => {
            
            let valueBefore = hidingPortal[option];

            if (kindItem === 'portal'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'portal', 'hiding', option],
                    replacement: !valueBefore
                }) );
            }
            else if (kindItem === 'stack'){
               
            }
        }, [hidingPortal]
    );

  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >

            {loadingListPortal && !readyListPortal && <div>loading</div>}

            {readyListStack && 

            <div className={`${styles['part-stack']}`} >

                <div className={`${styles['filter-stack']}`} >
                    <ul className={`${styles['collection__option-sorting']}`} >
                        <li
                            className={`active----${sortingStack.property === 'name' }`}
                            onClick={()=>onClick_Sort('stack', 'name')}
                        >  
                            <div> name  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} direction={sortingStack['direction']['name']}/>  </div>
                        </li>

                        <li
                            className={`active----${sortingStack.property === 'dateVisited' }`}
                            onClick={()=>onClick_Sort('stack', 'dateVisited')}
                        >  
                            <div> visited date  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} direction={sortingStack['direction']['dateVisited']}/>  </div>
                        </li>
                    </ul>

                </div>

                <div className={`${styles['collection-stack']}`} >
                    {listStack.map( (stack:any, index:number)=>(
                        <Stack
                            key={`stack-${index}`}
                            stack={stack}
                        />
                    ))}
                </div>
            </div> 
            }


            {readyListPortal && 

            <div className={`${styles['part-portal']}`} >

                <div className={`${styles['filter-portal']}`} >
                    <div className={`${styles['head']}`} > <IconSort className={`${styles['icon-sort']}`} /> </div>
                    <ul className={`${styles['collection__option-sorting']}`} >
                        <li
                            className={`active----${sortingPortal.property === 'hp' }`}
                            onClick={()=>onClick_Sort('portal', 'hp')}
                        >  
                            <div> hp  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} direction={sortingPortal['direction']['hp']}/>  </div>
                        </li>

                        <li
                            className={`active----${sortingPortal.property === 'dateVisited' }`}
                            onClick={()=>onClick_Sort('portal', 'dateVisited')}
                        >  
                            <div> visited date  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} direction={sortingPortal['direction']['dateVisited']}/>  </div>
                        </li>
                    </ul>
                </div>

                <div className={`${styles['filter-portal']}`} >
                    <div className={`${styles['head']}`} > <IconHide className={`${styles['icon-hide']}`} kind='solid'/> </div>
                    <ul className={`${styles['collection__option-hiding']}`} >
                        <li
                            className={`active----${hidingPortal.inStacks}`}
                            onClick={()=>onClick_Hide('portal', 'inStacks')}
                        >  
                            <div> in stacks  </div>
                        </li>
                    </ul>

                </div>

                <div className={`${styles['collection-portal']}`} >
                    {listPortalUsing.map( (portal:any, index:number)=>(
                        <Portal
                            key={`portal-${index}`}
                            portal={portal}
                        />
                    ))}
                </div>
            </div> 
            }


        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

