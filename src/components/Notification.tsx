import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsNotification from 'store/actions/notification';

import {Banner as TypeBanner} from 'store/reducers/notification';

import Banner from "./Notification/Banner";

import styles from './Notification.module.scss';




type PropsNotification = {};

function Notification({}: PropsNotification) {
  
  const dispatch = useDispatch();
  
  const listBanner:TypeBanner[] = useSelector((state: StateRoot) => state['notification']['listBanner']);

  return (
    
    <div className={`${styles['root']}`} >
        {listBanner.map( (banner, iBanner)=> 
            <Banner
                banner={banner}
                key={`banner-${iBanner}`}
            />
        )}
    </div>
      
  );
}

export default Notification;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

