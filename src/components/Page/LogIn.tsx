import React, { useCallback, useEffect, useState } from "react";
import firebaseApp, { firebaseAuth } from 'firebaseApp';
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
  
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

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
        if (readyUser) {
            history.push('/');
        }
    },[readyUser, loadingUser]);

    useEffect(()=>{
        if(listCodeSituationOthers.includes('LogIn_NoEmail__E')){
            setCodeSituationEmail('LogIn_NoEmail__E');
            setCodeSituationPassword('');
        }
        else if(listCodeSituationOthers.includes('LogIn_InvalidEmail__E')){
            setCodeSituationEmail('LogIn_InvalidEmail__E');
            setCodeSituationPassword('');
        }
        else if (listCodeSituationOthers.includes('LogIn_NoPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('LogIn_NoPassword__E');
        }
        else if (listCodeSituationOthers.includes('LogIn_WrongPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('LogIn_WrongPassword__E');
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
                console.log('hero!')
                console.log(inputEmail.value)
                onClick_LogIn();
            }
        },
        [inputEmail, inputPassword]
    );
    

    const onClick_LogInSocial = useCallback(
        (event) => {
            const {target: {name}} = event;
            
            if (name === 'google'){
                dispatch(actionsAuth.return__LOG_IN_GOOGLE() );
            }
            else if (name === 'github'){
                dispatch(actionsAuth.return__LOG_IN_GITHUB() );
            }
                
        }, []
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
                <input 
                    type='email'
                    placeholder={intl.formatMessage({ id: 'Page.LogIn_EmailAddress'})}
                    value={inputEmail.value}
                    required
                    onChange={inputEmail.onChange} 
                /> 
                <div> { codeSituationEmail && <FormattedMessage id={`Notification.${codeSituationEmail}`} /> }  </div>
            </div> 
                
            <div className={`${styles['input-password']}`} >
                <div> <FormattedMessage id={`Page.LogIn_Password`} /> </div>
                <input 
                    type='password'
                    placeholder={intl.formatMessage({ id: 'Page.LogIn_Password'})}
                    value={inputPassword.value}
                    required
                    onChange={inputPassword.onChange}
                    onKeyPress={onKeyPress_LogIn}
                /> 
                <div> { codeSituationPassword && <FormattedMessage id={`Notification.${codeSituationPassword}`}/>} </div>
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
                <button 
                    name='google'
                    onClick={(event)=>onClick_LogInSocial(event)}
                > Google </button>
                <button 
                    name='apple'
                    onClick={(event)=>onClick_LogInSocial(event)}
                > Apple </button>
                <button 
                    name='github'
                    onClick={(event)=>onClick_LogInSocial(event)}
                > GitHub </button>
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

