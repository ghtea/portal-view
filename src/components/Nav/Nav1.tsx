import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import useTranslationTyped from 'tools/hooks/useTranslationTyped'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import styles from './Nav1.module.scss';

import IconHome from 'svgs/basic/IconHome';
import IconThreeBars from 'svgs/basic/IconThreeBars';
import IconX from 'svgs/basic/IconX';



type PropsNav1 = {};

function Nav1({}: PropsNav1) {
  
  const history = useHistory();
  const { t } = useTranslationTyped();
  const dispatch = useDispatch();
  
  const showingNav:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['all']);
  const showingBoardNav1:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['boardNav1']);
  const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['modal']['setting']);

  const onClick_LinkInsideApp = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
      history.push(destination);
      dispatch(actionsStatus.return__REPLACE({
        listKey:['showing', 'nav', 'boardNav1'],
        replacement: false
      }))
    },[history]
  );
  
  
  const onClick_ShowHideBoard = useCallback(
    
    (event:React.MouseEvent<HTMLButtonElement> ) => {
      event.preventDefault();
      
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
                    onClick={(event)=>onClick_LinkInsideApp(event, '/')}
                >   <IconHome className={`${styles['icon-logo']}`} />
                </button>
            </div>
        
            <div>
            (title)
            </div>
        
            <div>
            <button
                onClick={(event)=>onClick_ShowHideBoard(event)}
            >
                {showingBoardNav1 ? ( <IconX className={`${styles['icon-x']}`} />) : (
                    <IconThreeBars className={`${styles['icon-three-bars']}`} />
                )}
            </button>
            </div>
            
        </div> 
      
      {showingBoardNav1 && (
        <div className={`${styles['board']}`} >
          <div> 
            <a
              onClick={(event)=>onClick_LinkInsideApp(event, '/')}
            > {t('Nav', 'Home')}
            </a>
          </div>
          <div> 
            <a
              onClick={(event)=>onClick_LinkInsideApp(event, '/')}
            > {t('Nav', 'System')}
            </a>
          </div>
          <div> 
            <a
              onClick={(event)=>onClick_LinkInsideApp(event, '/log-in')}
            > {t('Nav', 'LogIn')}
            </a>
          </div>
          <div> 
            <a
              onClick={()=>onClick_ShowHideSetting()}
            > {t('Nav', 'Setting')}
            </a>
          </div>
        </div>
      )}
      
    </header>
  );
}

Nav1.defaultProps = {};

export default Nav1;
