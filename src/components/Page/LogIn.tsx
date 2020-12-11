import React, { useCallback, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import history from 'historyApp';

import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';

//import IconLogIn from 'svgs/basic/IconLogIn';
import TopBar from './LogIn/TopBar';

import styles from './LogIn.module.scss';




type PropsLogIn = {};

function LogIn() {
  
  const dispatch = useDispatch();
    const intl = useIntl();
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
            setCodeSituationPassword('');
        }
        else if(listCodeSituationOthers.includes('LogIn_NoPassword')){
            setCodeSituationPassword('LogIn_NoPassword');
            setCodeSituationEmail('');
        }
        else if (listCodeSituationOthers.includes('LogIn_UnknownError')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('');
        }
        else {
            setCodeSituationEmail('');
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

  const onKeyPress_LogIn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onClick_LogIn();
      }
    },
    []
  );

  
  return (
    <div className={`${styles['root']}`} >

        <TopBar />

        <div className={`${styles['content']}`} >


            <div className={`${styles['title-page']}`} > 
                <FormattedMessage id={`Page.LogIn_LogIn`} />
            </div>
                
            <div className={`${styles['input-identity']}`} >
                <div> <FormattedMessage id={`Page.LogIn_EmailAddress`} /> </div>
                <div> { codeSituationEmail && <FormattedMessage id={`Notification.${codeSituationEmail}`} /> }  </div>
                <input 
                    type='text'
                    placeholder={intl.formatMessage({ id: 'Page.LogIn_EmailAddress'})}
                    value={inputEmail.value}
                    onChange={inputEmail.onChange} 
                /> 
            </div> 
                
            <div className={`${styles['input-password']}`} >
                <div> <FormattedMessage id={`Page.LogIn_Password`} /> </div>
                <div> { codeSituationPassword && <FormattedMessage id={`Notification.${codeSituationPassword}`}/>} </div>
                <input 
                    type='password'
                    placeholder={intl.formatMessage({ id: 'Page.LogIn_Password'})}
                    value={inputPassword.value}
                    onChange={inputPassword.onChange}
                    onKeyPress={onKeyPress_LogIn}
                /> 
            </div> 

            
            <div className={`${styles['button-enter']}`} >
                <button
                    onClick={()=>onClick_LogIn()}
                > <FormattedMessage id={`Page.LogIn_LogIn`} />
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
                    > <FormattedMessage id={`Nav.Home`} /> </a> 
                </div>
                <div> <a
                    onClick={(event)=>onClick_LinkInsideApp(event, '/sign-up')}
                > <FormattedMessage id={`Nav.SignUp`} /> </a> 
                </div>
            </div> 


        </div>
    </div>
  );
}

LogIn.defaultProps = {};

export default LogIn;
