import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';
import * as actionsPortal from 'store/actions/portal';

import Portal from './Home/Portal';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const idUser:string = useSelector((state: StateRoot) => state['auth']['user']['_id']);

    const readyListPortal:any = useSelector((state: StateRoot) => state['status']['ready']['listPortal']);
    const loadingListPortal:any = useSelector((state: StateRoot) => state['status']['loading']['listPortal']);
    const listPortal:any = useSelector((state: StateRoot) => state['portal']['listPortal']);

    useEffect(()=>{
        if ('readyUser'){
            
            dispatch(actionsPortal.return__GET_LIST_PORTAL({
                idUser: 'idUser'
            }))
        }
    },[readyUser, idUser]);
  
  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >

            {loadingListPortal && !readyListPortal && <div>loading</div>}

            {readyListPortal && 
                listPortal.map( (portal:any, index:number) =>(
                    <Portal
                        key={`portal-${index}`}
                        _id={portal._id}
                        kind={portal.kind}
                        name={portal.name}
                        url={portal.url}
                    />
                ))
            }


        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

