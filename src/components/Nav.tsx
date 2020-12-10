import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";

import styled, {ThemeProvider }  from 'styled-components';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsStatus from 'store/actions/status';

import Nav1 from "./Nav/Nav1";
import Nav2 from "./Nav/Nav2";

import styles from './Nav.module.scss';


// TS  https://velog.io/@velopert/create-typescript-react-component
type PropsNav = {};

function Nav({}: PropsNav) {
  
    let location = useLocation();

    const showingNav:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['all']);

    return (
        <div className={`${styles['root']} showing----${showingNav}`} >
            <Nav1 />
            <Nav2/>
        </div>
    )
  
}

export default Nav;


/*

 const reducer = (resultCurrent:boolean, pageCurrent:string):boolean => (new RegExp(`^${pageCurrent}`)).test(location.pathname) ? true : false;

  
  const isFullPage: boolean = listFullPage.reduce(reducer, false)
  
*/