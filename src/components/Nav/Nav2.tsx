import React, { useCallback } from "react";
import history from 'historyApp';
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import CategoryDestination from './Nav2/CategoryDestination';
import SoloDestination from './Nav2/SoloDestination';

import styles from './Nav2.module.scss';

import IconLogo from 'svgs/others/IconLogo';
// import IconSignIn from 'svgs/basic/IconSignIn';
import IconSetting from 'svgs/basic/IconSetting';
import IconUserCircle from 'svgs/basic/IconUserCircle';


type PropsNav2 = {};

function Nav2({}: PropsNav2) {
  
    const dispatch = useDispatch();
    
    const showingNav:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['all']);
    
    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);
    
  
// event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
  const onClick_LinkInsideApp = useCallback(
    (destination:string) => {
      history.push(destination);
    },[history]
  );
  
  const onClick_ShowSetting = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', 'setting'],
        replacement: true
      }));
    },[]
  );
  
  
  return (
    <header className={`${styles['root']} showing----${showingNav}`}>

      <div className={`${styles['name-app']}`} >
        <button
          onClick={()=>onClick_LinkInsideApp('/')}
        >
          <div>
            <IconLogo className={`${styles['icon-logo']}`} />
          </div>
        </button>
        <button
          onClick={()=>onClick_LinkInsideApp('/')}
        >
            <FormattedMessage id={`Nav.NameApp`} />
        </button>
      </div>
      
      
      <div className={`${styles['collection-destination']}`} >
        <CategoryDestination 
          idCategory={'System'}
          listIdLink={['State', 'Styles', 'Language']}
        />
  		  <SoloDestination 
  		    idSolo={'Diary'}
  		  />
      </div>

      
      <div className={`${styles['collection-tool']}`} >
        
        <div className={`${styles['tool']}`} >
          <a
            onClick={()=>onClick_ShowSetting()}
          > <IconSetting className={`${styles['icon-setting']}`} />
          </a>
        </div>
        
        
        { !readyUser &&
            <div className={`${styles['tool']}`} >
                <a className={`${styles['link-main']}`} 
                    onClick={()=>onClick_LinkInsideApp('/log-in')} 
                >
                    <FormattedMessage id={`Nav.LogIn`} />
                </a>
            </div>
        }
        
        { readyUser &&
            <div className={`${styles['tool']}`} > 
                <IconUserCircle className={`${styles['icon-user-circle']}`} />
            </div>
        }
        
      </div>
      
    </header>
  );
}

Nav2.defaultProps = {};

export default Nav2;


// 브라우저 상의 특정 요소 위치 파악
// https://stackoverflow.com/questions/37200019/how-to-get-elements-clientx-and-clienty-of-an-element

// <Div_Triangle lengthBasic={12} onClick = {(event)=>onClick_NavGroupItemTitle(event, 'Color') } />



/*
<a onClick={(event)=>onClick_LinkInsideApp(event, '/sign-up')} >
            {t('Nav', 'SignUp')}
          </a>
*/