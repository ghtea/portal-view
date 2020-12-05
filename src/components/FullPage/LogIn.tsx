import React, { useCallback, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import useTranslationTyped from 'tools/hooks/useTranslationTyped'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';

//import IconLogIn from 'svgs/basic/IconLogIn';

import styles from './LogIn.module.scss';


type PropsLogIn = {};

function LogIn({}: PropsLogIn) {
  
  const dispatch = useDispatch();
  const { t } = useTranslationTyped();
  const history = useHistory();
  
  const onClick_LinkInsideApp = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
      history.push(destination);
    },[history]
  );
  
  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword = useInput(""); // {value, setValue, onChange};
  
  const onClick_LogIn = useCallback(
    () => {
      
      dispatch(actionsAuth.return__LOG_IN({
        email: inputEmail.value,
        password: inputPassword.value
      }));
      
    },
    [inputEmail, inputPassword]
  );
  
  return (
    <div className={`${styles['root']}`} >

        <div className={`${styles['title-page']}`} > {t('FullPage', 'LogIn', 'LogIn')}</div>
            
        <div className={`${styles['input-identity']}`} >
            <input 
                type='text'
                placeholder={t('FullPage', 'LogIn', 'EmailAddress')}
                value={inputEmail.value}
                onChange={inputEmail.onChange} 
            /> 
            <div> {t('FullPage', 'LogIn', 'EmailAddress')} </div>
        </div> 
            
        <div className={`${styles['input-password']}`} >
            <input 
                type='password'
                placeholder={t('FullPage', 'LogIn', 'Password')}
                value={inputPassword.value}
                onChange={inputPassword.onChange}
            /> 
            <div> {t('FullPage', 'LogIn', 'Password')} </div>
        </div> 
        
        <div> message </div>
        
        <div className={`${styles['button-enter']}`} >
            <button
                onClick={()=>onClick_LogIn()}
            > {t('FullPage', 'LogIn', 'LogIn')} 
            </button>
        </div> 
        
    
        <div> 
            <div> or Log In with </div>
        </div> 
        
        <div className={`${styles['collection-social']}`} >
            <button> Google </button>
            <button> Facebook </button>
            <button> Twitter </button>
        </div> 
        
        <div className={`${styles['collection-link']}`} >
            <div> 
                <a
                onClick={(event)=>onClick_LinkInsideApp(event, '/')}
                > Home </a> 
            </div>
            <div> <a
                onClick={(event)=>onClick_LinkInsideApp(event, '/sign-up')}
            > Sign Up </a> 
            </div>
        </div> 
            
    </div>
  );
}

LogIn.defaultProps = {};

export default LogIn;

