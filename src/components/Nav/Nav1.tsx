import React, { useCallback } from "react";

import history from 'historyApp';
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import styles from './Nav1.module.scss';

import IconLogo from 'svgs/others/IconLogo';
import IconThreeBars from 'svgs/basic/IconThreeBars';
import IconX from 'svgs/basic/IconX';
import IconUserCircle from 'svgs/basic/IconUserCircle';



type PropsNav1 = {};

function Nav1({}: PropsNav1) {
  
  // const history = useHistory();
  const dispatch = useDispatch();
  
  const showingNav:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['all']);
  const showingBoardNav1:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['boardNav1']);
  const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);

    const readyUser:boolean = useSelector((state: StateRoot) => state['status']['ready']['user']);

  //event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
  const onClick_LinkInsideApp = useCallback(
    ( destination:string) => {
      history.push(destination);
      dispatch(actionsStatus.return__REPLACE({
        listKey:['showing', 'nav', 'boardNav1'],
        replacement: false
      }))
    },[history]
  );
  
  
  const onClick_ShowHideBoard = useCallback(
    // event:React.MouseEvent<HTMLButtonElement> 
    () => {
      //event.preventDefault();
      
      console.log('heoo');
      dispatch(actionsStatus.return__REPLACE({
        listKey:['showing', 'nav', 'boardNav1'],
        replacement: !showingBoardNav1
      }))
      
    },
    
    [showingBoardNav1]
  );
  
  const onClick_ShowHideSetting = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', 'setting'],
        replacement: !showingSetting
      }))
    },[showingSetting]
  );

  // showingNav={showingNav}
  return (
    <header className={`${styles['root']} showing----${showingNav}`}>

        <div className={`${styles['bar']}`} >
            
            <div>
                <button
                    onClick={()=>onClick_ShowHideBoard()}
                >
                    {showingBoardNav1 ? ( <IconX className={`${styles['icon-x']}`} />) : (
                        <IconThreeBars className={`${styles['icon-three-bars']}`} />
                    )}
                </button>
            </div>

            <div>
                <button
                    onClick={()=>onClick_LinkInsideApp('/')}
                >   <IconLogo className={`${styles['icon-logo']}`} />
                </button>
            </div>
        
            
            <div>
                { !readyUser &&
                    <div className={`${styles['tool']}`} >
                        <a className={`${styles['link-main']}`} 
                            onClick={()=>onClick_LinkInsideApp('/log-in')} 
                        >
                            <FormattedMessage id="Nav.LogIn" />
                        </a>
                    </div>
                }
        
                { readyUser &&
                    <div className={`${styles['tool']}`} > 
                        <IconUserCircle className={`${styles['icon-user-circle']}`} />
                    </div>
                }
            </div>

            
        </div> 
      
      {showingBoardNav1 && (
          <>
        <div className={`${styles['board']}`} >
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp( '/')}
            >   <FormattedMessage id="Nav.Home" />
            </a>
          </div>
          <div> 
            <a
              onClick={()=>onClick_LinkInsideApp( '/')}
            >   <FormattedMessage id="Nav.System" />
            </a>
          </div>
          <div> 
            <a
              onClick={()=>onClick_ShowHideSetting()}
            >   <FormattedMessage id="Nav.Setting" />
            </a>
          </div>
        </div>
        <div 
            className={`${styles['shadow-of-board']}`} 
            onClick={()=>onClick_ShowHideBoard()}
        />
        </>
      )}
      
    </header>
  );
}

Nav1.defaultProps = {};

export default Nav1;
