import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

import * as actionsNotification from 'store/actions/notification';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
  
  
  return (

    <div className={`${styles['root']}`} >

        <div className={`${styles['content']}`} >




        </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

