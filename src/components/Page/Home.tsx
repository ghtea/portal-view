import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
import IconSortButton from 'svgs/basic/IconSortButton';


type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

    const readyListPortal = useSelector((state: StateRoot) => state['status']['ready']['listPortal']);
    const loadingListPortal = useSelector((state: StateRoot) => state['status']['loading']['listPortal']);
    const listPortal = useSelector((state: StateRoot) => state['portal']['listPortal']);

    const readyListStack = useSelector((state: StateRoot) => state['status']['ready']['listStack']);
    const loadingListStack = useSelector((state: StateRoot) => state['status']['loading']['listStack']);
    const listStack = useSelector((state: StateRoot) => state['stack']['listStack']);

    const {property: propertySortingPortal, direction: directionSortingPortal} = useSelector((state: StateRoot) => state.status.current.portal.sorting);
    const {property: propertySortingStack, direction: directionSortingStack} = useSelector((state: StateRoot) => state.status.current.stack.sorting);
    
    useEffect(()=>{
        if (readyUser) {
            dispatch(actionsPortal.return__GET_LIST_PORTAL({
                idUser: idUser
            }));
        }
    },[readyUser, idUser]);


    useEffect(()=>{
        if (readyUser && readyListPortal) {
            dispatch(actionsStack.return__GET_LIST_STACK({
                idUser: idUser
            }));
        }
    },[readyUser, idUser, readyListPortal]);

  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >

            {loadingListPortal && !readyListPortal && <div>loading</div>}

            {readyListStack && <>
                <div className={`${styles['sort-stack']}`} >
                    <div>
                        <IconSort className={`${styles['icon-sort']}`} />
                    </div>

                    <ul className={`${styles['collection__option-sorting']}`} >
                        <li
                            className={`active----${propertySortingPortal === 'dateVisited'}`}
                        >  
                            <div> visited date  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} direction={directionSortingPortal}/>  </div>
                        </li>

                        <li>  
                            <div> name  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} />  </div>
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
            </> }


            {readyListPortal && <>
                <div className={`${styles['sort-portal']}`} >
                    <div>
                        <IconSort className={`${styles['icon-sort']}`} />
                    </div>

                    <ul className={`${styles['collection__option-sorting']}`} >
                        <li>  
                            <div> visited date  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} />  </div>
                        </li>

                        <li>  
                            <div> hp  </div>
                            <div> <IconSortButton className={`${styles['icon-sort-button']}`} />  </div>
                        </li>
                    </ul>
                </div>

                <div className={`${styles['collection-portal']}`} >
                    {listPortal.map( (portal:any, index:number)=>(
                        <Portal
                            key={`portal-${index}`}
                            portal={portal}
                        />
                    ))}
                </div>
            </> }


        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

