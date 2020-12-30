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


type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

    const readyListPortal:any = useSelector((state: StateRoot) => state['status']['ready']['listPortal']);
    const loadingListPortal:any = useSelector((state: StateRoot) => state['status']['loading']['listPortal']);
    const listPortal:any = useSelector((state: StateRoot) => state['portal']['listPortal']);

    const readyListStack:any = useSelector((state: StateRoot) => state['status']['ready']['listStack']);
    const loadingListStack:any = useSelector((state: StateRoot) => state['status']['loading']['listStack']);
    const listStack:any = useSelector((state: StateRoot) => state['stack']['listStack']);


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

            <div className={`${styles['sort']}`} >
                <div>
                    <IconSort className={`${styles['icon-sort']}`} />
                </div>

                <ul>
                    <li>  accessed  </li>
                    <li>  hp  </li>
                    <li>  tags  </li>
                </ul>
            </div>

            {loadingListPortal && !readyListPortal && <div>loading</div>}

            {readyListStack && 
                <div className={`${styles['collection-stack']}`} >
                    {listStack.map( (stack:any, index:number)=>(
                        <Stack
                            key={`stack-${index}`}
                            stack={stack}
                        />
                    ))}
                </div>
            }

            {readyListPortal && 
                <div className={`${styles['collection-portal']}`} >
                    {listPortal.map( (portal:any, index:number)=>(
                        <Portal
                            key={`portal-${index}`}
                            portal={portal}
                        />
                    ))}
                </div>
            }


        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

