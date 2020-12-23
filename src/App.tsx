import React, {useEffect, useState, useMemo} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { firebaseAuth } from 'firebaseApp';

import { IntlProvider } from 'react-intl'
import translationEn from 'language/translation/en.json';
import translationKo from 'language/translation/ko.json';

import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';
import 'styles/once.scss';

import Nav from "components/Nav";
import Page from "components/Page";
import Modal from "components/Modal";
import Notification from "components/Notification";
import Action from "components/Action";

// TS  https://velog.io/@velopert/create-typescript-react-component
type PropsApp = {};

function App({}: PropsApp) {
  
  let location = useLocation();
  const dispatch = useDispatch();
  

    // Language
  
    const codeLanguageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
    const translationLanguageCurrent = useMemo(()=>{
        if (codeLanguageCurrent === 'ko'){
            return translationKo;
        }
        else {
            return translationEn;
        }
    },[codeLanguageCurrent])
    
    useEffect(()=>{
        if (codeLanguageCurrent === ''){
            dispatch(actionsStatus.return__DETECT_LANGUAGE() );
        }
        else {
            Cookies.set('codeLanguageStandard', codeLanguageCurrent, { expires: 30 });
        }
    },[codeLanguageCurrent])





    // theme

    const optionThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['option']);
    const nameThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['name']);

    useEffect(() => {
        dispatch(actionsStatus.return__READ_OPTION_THEME() );
    }, [optionThemeCurrent]);
    
    useEffect(()=>{
            if (nameThemeCurrent === 'dark'){
                document.body.classList.add('theme----dark');
                document.body.classList.remove('theme----light');
            }
            else {
                document.body.classList.add('theme----light');
                document.body.classList.remove('theme----dark');
            }
        
    }, [nameThemeCurrent])
    
  
    // log check
    useEffect(() => {

        dispatch( actionsStatus.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: true
        }) );

        try {
            firebaseAuth.onAuthStateChanged((user) => {
                console.log('hello!')
                if (user) {
                    dispatch(actionsAuth.return__LOG_CHECK_SUCCEEDED() );
                } 
                else {
                    dispatch(actionsAuth.return__LOG_CHECK_FAILED() );
                }
            });
        }
        catch (error){
            console.log(error);
        }
    }, []);
    

    // whenever log out, clear user information 
    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    useEffect(()=>{
        if (!readyUser){
            dispatch( actionsAuth.return__REPLACE({
                listKey: ['user'],
                replacement: {}
            }) );
        }
    },[readyUser])
  

  // https://dev.to/cmcwebcode40/simple-react-dark-mode-with-scss-lae
  return ( 
    <>
        <IntlProvider locale={codeLanguageCurrent || 'en'} messages={translationLanguageCurrent} >
            <Notification />
            <Modal />
            <Action/>
            <Nav/>
            <Page/>
        </IntlProvider>
    </>
    
  );
}

export default App;





    
  
  /*
  const [isFullPage, setIsFullPage] = useState(true);   // default value is true because if it was false, Nav is shown shortly after reload
  
  const listFullPage : string[] = [
    '/log-in', '/sign-up', '/lost'
  ];
  useEffect(() => {
    
    const listMatched: RegExpMatchArray | null = (location.pathname).match( /\/[^\/]+/ );
    let pathFirst: string = '/';
    if (listMatched !== null){
      pathFirst = listMatched[0];
    }
    //console.log(listMatched)
    //console.log(pathFirst)
    
    if (listFullPage.includes(pathFirst)){
      setIsFullPage(true);
    }
    else {
      setIsFullPage(false);
    }
    
  }, [location]);
  */
  