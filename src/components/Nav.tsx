import React, { useCallback, useEffect } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsNotification from 'store/actions/notification';

import styles from './Nav.module.scss';

import IconLogo from 'svgs/others/IconLogo';
import IconSearch from 'svgs/basic/IconSearch'; 
import IconPlus from 'svgs/basic/IconPlus';
import IconAddStack from 'svgs/basic/IconLayerPlus';
import IconStack from 'svgs/basic/IconLayerGroup';

import IconSetting from 'svgs/basic/IconSetting';
import IconUserCircle from 'svgs/basic/IconUserCircle';


type PropsNav = {};

function Nav({}: PropsNav) {

    const dispatch = useDispatch();
    const location = useLocation();
    
    
    const showingNav = useSelector((state: StateRoot) => state['status']['showing']['nav']);
    
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);
    
    const user = useSelector((state: StateRoot) => state['auth']['user']);

    useEffect(()=>console.log(user),[user])

    useEffect(() => {

        console.log(location.pathname);
        if (  (/^\/log-in/).test(location.pathname) || (/^\/sign-up/).test(location.pathname)  ) {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'nav'],
                replacement: false
            }));
        }
        else {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'nav'],
                replacement: true
            }));
        }
    }, [location]);


    // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
    const onClick_LinkInsideApp = useCallback(
        (destination:string) => {
        history.push(destination);
        },[history]
    );
    
    const onClick_ShowModal = useCallback(
        (idModal:string) => {

        if (idModal === 'creatingPortal' && !readyUser){
            dispatch(actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
            history.push('/log-in');
        }
        else {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', idModal],
                replacement: true
            }));
        }
        
        },[history, readyUser]
    );
  
  
  return (
    <header className={`${styles['root']} showing----${showingNav}`}>

        <div className={`${styles['left']}`} >
            <a
                className={`${styles['logo-app']}`}
                onClick={()=>onClick_LinkInsideApp('/')}
            >
                <div>
                    <IconLogo className={`${styles['icon-logo']}`} />
                </div>
                <div>
                    <FormattedMessage id={`Nav.NameApp`} />
                </div>
            </a>
        </div>
      
        <div className={`${styles['middle']}`} >
            <button
                className={`${styles['tool-main']}`}
                onClick={()=>onClick_ShowModal('searching')}
            > 
                <div> <IconSearch className={`${styles['icon-search']}`} /> </div>
                <div> <FormattedMessage id={`Global.Search`} /> </div>
            </button>

            <button
                className={`${styles['tool-main']}`}
                onClick={()=>onClick_ShowModal('creatingPortal')}
            > 
                <div> <IconPlus className={`${styles['icon-plus']}`} kind='light' /> </div>
                <div> <FormattedMessage id={`Global.Portal`} /> </div>
            </button>

            <button
                className={`${styles['tool-main']}`}
                onClick={()=>onClick_ShowModal('creatingStack')}
            > 
                <div> <IconStack className={`${styles['icon-stack']}`} kind='light' /> </div>
                <div> <FormattedMessage id={'Global.Stack'} /> </div>
            </button>
        </div>

      

      <div className={`${styles['right']}`} >
        
        { !readyUser && !loadingUser &&
            <a className={`${styles['log-in']}`} 
                onClick={()=>onClick_LinkInsideApp('/log-in')} 
            >
                <div> <FormattedMessage id={`Nav.LogIn`} /> </div>
            </a>
        }
        
        { readyUser &&
            <button className={`${styles['user']}`} 
                onClick={()=>onClick_ShowModal('myProfile')}
            >
            {user?.photoURL ? 
                <div> <img className={`${styles['photo-profile']}`} src={user.photoURL} /> </div>
                :
                <div> <IconUserCircle className={`${styles['icon-user-circle']}`} kind="solid"/> </div>
            }

            </button>
        }

        <button className={`${styles['setting']}`} 
            onClick={()=>onClick_ShowModal('setting')}
        >
          <div> <IconSetting className={`${styles['icon-setting']}`} /> </div>
        </button>
        
      </div>
      
    </header>
  );
}

Nav.defaultProps = {};

export default Nav;


// 브라우저 상의 특정 요소 위치 파악
// https://stackoverflow.com/questions/37200019/how-to-get-elements-clientx-and-clienty-of-an-element

// <Div_Triangle lengthBasic={12} onClick = {(event)=>onClick_NavGroupItemTitle(event, 'Color') } />



/*
<a onClick={(event)=>onClick_LinkInsideApp(event, '/sign-up')} >
            {t('Nav', 'SignUp')}
          </a>
*/