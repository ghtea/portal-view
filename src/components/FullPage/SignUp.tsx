import React, { useCallback, useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import useTranslationTyped from 'tools/hooks/useTranslationTyped'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInput from 'tools/hooks/useInput';

import Cookies from 'js-cookie';


//import IconSignUp from 'svgs/basic/IconSignUp';

import styles from './SignUp.module.scss';
import stylesLogIn from './LogIn.module.scss';

type PropsSignUp = {};

function SignUp({}: PropsSignUp) {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslationTyped();
  
  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword1 = useInput(""); // {value, setValue, onChange};
  const inputPassword2 = useInput(""); // {value, setValue, onChange};
  
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  
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
        
        <div className={`${stylesLogIn['title-page']}`} >  Sign Up </div>
        
        <div className={`${stylesLogIn['input-identity']}`} >
            <div> Email Address </div>
            <div> {messageEmail} </div>
          <input 
            type='text' 
            placeholder='Email Address' 
            value={inputEmail.value}
            onChange={inputEmail.onChange} 
          /> 
        </div>
        
        
        <div className={`${stylesLogIn['input-password']}`} >
            <div> Password </div>
            <div> {messagePassword} </div>
          <input 
            type='password'
            placeholder='Password'
            value={inputPassword1.value}
            onChange={inputPassword1.onChange}
          /> 
        </div>
        
        <div className={`${stylesLogIn['input-password']}`} >
            <div> Password Again </div>
            <div> {messagePassword} </div>
          <input 
            type='password'
            placeholder='Password Again'
            
            value={inputPassword2.value}
            onChange={inputPassword2.onChange}
            onKeyPress={onKeyPress_SignUp}
          /> 
        </div> 
        
        
        
        <div className={`${stylesLogIn['button-enter']}`} >
          <button
            onClick={()=>onClick_SignUp()}
          > Sign Up 
          </button>
        </div>
        
        <div className={`${stylesLogIn['collection-link']}`} > 
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp( '/')}
            > Home </a> 
          </div>
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp('/log-in')}
            > Log In </a> 
          </div>
        </div>
        
        
    </div>
  );
}

SignUp.defaultProps = {};

export default SignUp;
