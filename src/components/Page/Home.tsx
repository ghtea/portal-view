import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

import * as actionsPortal from 'store/actions/portal';

import * as actionsNotification from 'store/actions/notification';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();    

    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const idUser:string = useSelector((state: StateRoot) => state['auth']['user']['_id']);

    useEffect(()=>{
        if (readyUser){
            
            dispatch(actionsPortal.return__GET_LIST_PORTAL({
                idUser: idUser
            }))
        }
    },[readyUser, idUser])
  
  
  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >




        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

