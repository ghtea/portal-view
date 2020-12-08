import React, { useCallback, useEffect, useState } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, injectIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';

import Cookies from 'js-cookie';


//import IconSignUp from 'svgs/basic/IconSignUp';

import styles from './SignUp.module.scss';
import stylesLogIn from './LogIn.module.scss';

type PropsSignUp = {intl: any};

function SignUp({intl}: PropsSignUp) {
  
  const dispatch = useDispatch();
  
  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword1 = useInput(""); // {value, setValue, onChange};
  const inputPassword2 = useInput(""); // {value, setValue, onChange};
  
  const [codeSituationEmail, setCodeSituationEmail] = useState('');
  const [codeSituationPassword, setCodeSituationPassword] = useState('');
  // 나머지는 나중에... LogIn 참고...
  
  const onClick_LinkInsideApp = useCallback(
    (destination:string) => {
      history.push(destination);
    },[history]
  );
  
  const onClick_SignUp = useCallback(
    () => {
      
      dispatch(actionsAuth.return__SIGN_UP({
        email: inputEmail.value,
        password1: inputPassword1.value,
        password2: inputPassword2.value
      }));
      
    },
    [inputEmail, inputPassword1, inputPassword2]
  );
  
  
  // (event: React.ChangeEvent<HTMLInputElement>)
  const onKeyPress_SignUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onClick_SignUp();
      }
    },
    []
  );
  
  
  return (
    <div className={`${styles['root']}`} >
        
        <div className={`${stylesLogIn['title-page']}`} >  
            <FormattedMessage id={`FullPage.SignUp`} />
        </div>
        
        <div className={`${stylesLogIn['input-identity']}`} >
            <div> <FormattedMessage id={`FullPage.EmailAddress`} /> </div>
            <div> <FormattedMessage id={`Notification.${codeSituationEmail}`} /> </div>
          <input 
            type='text' 
            placeholder={intl.formatMessage({ id: 'FullPage.EmailAddress'})} 
            value={inputEmail.value}
            onChange={inputEmail.onChange} 
          /> 
        </div>
        
        
        <div className={`${stylesLogIn['input-password']}`} >
            <div> <FormattedMessage id={`FullPage.Password`} /> </div>
            <div> <FormattedMessage id={`Notification.${codeSituationPassword}`} /></div>
          <input 
            type='password'
            placeholder={intl.formatMessage({ id: 'FullPage.Password'})}
            value={inputPassword1.value}
            onChange={inputPassword1.onChange}
          /> 
        </div>
        
        <div className={`${stylesLogIn['input-password']}`} >
            <div> <FormattedMessage id={`FullPage.PasswordAgain`} /> </div>
          <input 
            type='password'
            placeholder={intl.formatMessage({ id: 'FullPage.PasswordAgain'})}
            
            value={inputPassword2.value}
            onChange={inputPassword2.onChange}
            onKeyPress={onKeyPress_SignUp}
          /> 
        </div> 
        
        
        
        <div className={`${stylesLogIn['button-enter']}`} >
          <button
            onClick={()=>onClick_SignUp()}
          > <FormattedMessage id={`FullPage.SignUp`} />
          </button>
        </div>
        
        <div className={`${stylesLogIn['collection-link']}`} > 
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp( '/')}
            > <FormattedMessage id={`Nav.Home`} /> </a> 
          </div>
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp('/log-in')}
            > <FormattedMessage id={`Nav.LogIn`} /> </a> 
          </div>
        </div>
        
        
    </div>
  );
}

SignUp.defaultProps = {};

export default injectIntl(SignUp);
