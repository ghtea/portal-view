import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';

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
    () => {
      dispatch(actionsAuth.return__LOG_IN({
        email: 'd',
        password: 'dd'
      }) );
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

