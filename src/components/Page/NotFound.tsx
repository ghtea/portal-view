import React, { useCallback, useEffect, useState } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';


import TopBar from './LogIn/TopBar';

//import IconLogIn from 'svgs/basic/IconLogIn';

import styles from './NotFound.module.scss';
import stylesLogIn from './LogIn.module.scss';

type PropsNotFound = {};

function NotFound({}: PropsNotFound) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

  
  return (
    <div className={`${stylesLogIn['root']}`} >
        
        <TopBar />

        <div className={`${stylesLogIn['content']}`} >  

        <div> Not Found </div>

        </div>     
    </div>
  );
}

NotFound.defaultProps = {};

export default NotFound;
