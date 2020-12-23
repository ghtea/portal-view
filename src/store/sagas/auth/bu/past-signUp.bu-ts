import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { useCookies } from 'react-cookie';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { Link, NavLink, useHistory } from 'react-router-dom';


import {getTimeStamp} from '../../tools/vanilla/time';



 const SignUp = ({
   language
   , addDeleteNotification
 }) => {

  const [cookies, setCookie, removeCookie] = useCookies(['logged']);

  const inputEmail1 = useInput(""); // {value, setValue, onChange};
  const inputEmail2 = useInput(""); // {value, setValue, onChange};
  
  //const inputUsername = useInput(""); 
  
  const inputPassword1 = useInput(""); 
  const inputPassword2 = useInput(""); 
  
  const inputBattletagPending1 = useInput(""); 
  const inputBattletagPending2 = useInput(""); 
  
  
  
  const onClick_SignUp = async (event) => {
    
   
    try {
        
        
      if (inputEmail1.value === "") {
        addDeleteNotification("auth01", language);
      }
      else if ( !(/\S+@\S+\.\S+/).test(inputEmail1.value) ){
        addDeleteNotification("auth021", language);
      }
      
      else if (inputPassword1.value === "" || inputPassword2.value === "") {
        addDeleteNotification("auth03", language);
      }
      else if (inputPassword1.value !== inputPassword2.value) {
        addDeleteNotification("auth04", language);
      }
      
      else {
        
        //const _id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
        const bodyRequest = {
            _id: uuid()
            , email: inputEmail1.value
            , password: inputPassword1.value
        }
        
        
        try {
          const res = await axios.post(`${config.URL_BACK}/auth-local/sign-up`, bodyRequest);
          
           // code_situation 가 존재하면 ( = 내가 지정한 오류에 속한 결과이면...)
          if (res.data.code_situation) {
            
            const code_situation = res.data.code_situation;
            removeCookie('logged');
            addDeleteNotification(code_situation, language);
          }
          
          // 성공시
          else if (res.status === 200) {
            addDeleteNotification("auth08", language);
            
            // 배틀태그 확인하러 여행!
            history.push( `${config.URL_FRONT}/log-in/`);
          }
          
          // 그 외 (에러는 못받아들이는듯)
          else { console.log(res) };
        }
        catch (error) {
          console.log(error);
          addDeleteNotification("auth09", language);
        }
        
      } // else
    } catch(error) {console.log(error); return;}  // 

  }
  
  /* <InputCommon {...inputUsername}  placeholder="username" /> */
  return (
  
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return {
    
    replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);