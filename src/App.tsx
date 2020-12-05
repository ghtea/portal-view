import React, {useEffect, useState, useMemo} from 'react';
import { useHistory, useLocation } from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

import 'styles/once.scss';

import Nav from "./components/Nav";
import Content from "./components/Content";
import FullPage from "./components/FullPage";
import Modal from "./components/Modal";
import Notification from "./components/Notification";

// TS  https://velog.io/@velopert/create-typescript-react-component
type PropsApp = {};

function App({}: PropsApp) {
  
  let location = useLocation();
  const dispatch = useDispatch();
  
  
  
  const [isFullPage, setIsFullPage] = useState(false);
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
  
  
  
  // read languge from result of i18Next detector
  useEffect(() => {
    dispatch(actionsStatus.return__READ_LANGUAGE() );
  }, []);
  
  
  
  const nameThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['name']);
  
  useEffect(() => {
    dispatch(actionsStatus.return__READ_OPTION_THEME() );
  }, []);
  
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
    dispatch(actionsAuth.return__LOG_CHECK() );
  }, []);
  
  
  // https://dev.to/cmcwebcode40/simple-react-dark-mode-with-scss-lae
  return ( 
    <>
    <Notification />
    <Modal />
    
    {isFullPage && <FullPage/>}
    
    {!isFullPage && 
        <>
        <Nav/>
        <Content/>
        </>
    }
    </>
    
  );
}

export default App;


/*
    <ThemeProvider 
      theme={ themeCurrent }
    >
    
      <GlobalStyle />
      
      <Notification />
      <Modal />
      
      {isFullPage && <FullPage/>}
      
      {!isFullPage && 
        <>
          <Nav/>
          <Content/>
        </>
      }
      
    </ThemeProvider>
    */