import React, { useCallback, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import history from 'historyApp';

import { FormattedMessage, injectIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';

//import IconLogIn from 'svgs/basic/IconLogIn';

import styles from './LogIn.module.scss';


type PropsLogIn = {intl:any};

function LogIn({intl}: PropsLogIn) {
  
  const dispatch = useDispatch();

    // when login button is pushed, notification code of reaction is added to  this list, when login button is pushed again this list cleared once 
    const listCodeSituationOthers:string[] = useSelector((state: StateRoot) => state['notification']['listCodeSituationOthers']);

  
  const onClick_LinkInsideApp = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
      history.push(destination);
    },[history]
  );
  
  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword = useInput(""); // {value, setValue, onChange};
  
  const [codeSituationEmail, setCodeSituationEmail] = useState('');
  const [codeSituationPassword, setCodeSituationPassword] = useState('');
  
    useEffect(()=>{
        if(listCodeSituationOthers.includes('LogIn_NoEmail')){
            setCodeSituationEmail('LogIn_NoEmail');
        }
        else {
            setCodeSituationEmail('');
        }
        if(listCodeSituationOthers.includes('LogIn_NoPassword')){
            setCodeSituationPassword('LogIn_NoPassword');
        }
        else {
            setCodeSituationPassword('');
        }
    },[listCodeSituationOthers])

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

        <div className={`${styles['title-page']}`} > 
            <FormattedMessage id={`FullPage.LogIn`} />
        </div>
            
        <div className={`${styles['input-identity']}`} >
            <div> <FormattedMessage id={`FullPage.EmailAddress`} /> </div>
            <div> <FormattedMessage id={`Notification.${codeSituationEmail}`} /> </div>
            <input 
                type='text'
                placeholder={intl.formatMessage({ id: 'FullPage.EmailAddress'})}
                value={inputEmail.value}
                onChange={inputEmail.onChange} 
            /> 
        </div> 
            
        <div className={`${styles['input-password']}`} >
            <div> <FormattedMessage id={`FullPage.Password`} /> </div>
            <div> <FormattedMessage id={`Notification.${codeSituationPassword}`} /></div>
            <input 
                type='password'
                placeholder={intl.formatMessage({ id: 'FullPage.Password'})}
                value={inputPassword.value}
                onChange={inputPassword.onChange}
            /> 
        </div> 

        
        <div className={`${styles['button-enter']}`} >
            <button
                onClick={()=>onClick_LogIn()}
            > <FormattedMessage id={`FullPage.LogIn`} />
            </button>
        </div> 
        
    
        <div className={`${styles['division']}`} > 
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

export default injectIntl(LogIn);

