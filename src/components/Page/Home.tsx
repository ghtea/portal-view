import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";

import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

import * as actionsNotification from 'store/actions/notification';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
    const dispatch = useDispatch();     
  
    useEffect(()=>{
        dispatch(actionsStatus.return__REPLACE({
            listKey: ['showing', 'nav', 'all'],
            replacement: true
        }));

        return () => {
            dispatch(actionsStatus.return__REPLACE({
                listKey: ['showing', 'nav', 'all'],
                replacement: false
            }));
        }

    },[]);


  const onClick_AddTestingBanner = useCallback(
    (codeSituation:string) => {
      dispatch(actionsNotification.return__ADD_DELETE_BANNER({
        codeSituation: codeSituation
      }) )
    }, []
  );

  const onClick_TestAxios = useCallback(
    async () => {

        const bodyRequest = {
            email: 's', 
            password: 's'
        };

        try {
            const codeSituation = await fetch(`${process.env.REACT_APP_URL_BACK}/auth/log-in`, {
                method: 'POST', // or 'PUT'
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyRequest),
            })
            .then(response => response.json())
            .then(response => ( response.data.codeSituation ))
            .catch(error => { alert(error); return ( error.response.data.codeSituation )})

            console.log(codeSituation);
            alert(codeSituation);

        }
        catch(error) {
            alert(error);
        }
        

    }, []
  );
  
  return (

    <div className={`${styles['root']}`} >
        <div className={`${styles['content']}`} >


        <div className={`${styles['search']}`}>
            <input type='text' />
        </div>

        <div>
            <FormattedMessage id={`Page.Home_Welcome`} />
        </div>
        
        <div> 
          <button
            onClick={event=>onClick_AddTestingBanner('Test1')}
          > test 1 
          </button>
        </div>
        
        <div> 
          <button
            onClick={event=>onClick_AddTestingBanner('Test2')}
          > test 2 
          </button>
        </div>

        <div> 
          <button
            onClick={event=>onClick_TestAxios()}
          > test axios 
          </button>
        </div>


        </div>
    </div>
  );
}

Home.defaultProps = {};

export default Home;

