import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";


import * as actionsNotification from 'store/actions/notification';

import styles from './Home.module.scss';



type PropsHome = {};

function Home({}: PropsHome) {
  
  const dispatch = useDispatch();
  
  const onClick_AddTestingBanner = useCallback(
    (codeSituation:string) => {
      dispatch(actionsNotification.return__ADD_DELETE_BANNER({
        codeSituation: codeSituation
      }) )
    }, []
  );
  
  return (
    <div className={`${styles['root']}`} >

        <div className={`${styles['search']}`}>
            <input type='text' />
        </div>

        <div>
            <FormattedMessage id={`Content.Home_Welcome`} />
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
        
    </div>
  );
}

Home.defaultProps = {};

export default Home;

