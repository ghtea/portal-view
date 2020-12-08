import React, { useCallback, useEffect } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';


import IconX from 'svgs/basic/IconX';

import styles from './Setting.module.scss';
import stylesModal from '../Modal.module.scss';


type PropsSetting = {};

function Setting({}: PropsSetting) {
  
  const dispatch = useDispatch();

  const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
  const optionThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['option']);
  
  const onClick_HideSetting = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', 'setting'],
        replacement: false
      }))
    },[]
  );
  
  const onClick_LinkInsideApp = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
      history.push(destination);
    },[history]
  );
  
  
  const onClick_ChangeOptionTheme = useCallback(
    (replacement:string) => {
      dispatch(actionsStatus.return__REPLACE({
        listKey: ['current', 'theme', 'option'],
        replacement: replacement
      }) );
      Cookies.set('optionTheme', replacement, { expires: 14});
    }, []
  );
  
  const onClick_ChangeLanguage = useCallback(
    (replacement:string) => {

      dispatch(actionsStatus.return__REPLACE({
        listKey: ['current', 'language'],
        replacement: replacement
      }) );

    }, []
  );
  
  
  return (
    <div className={`${styles['root']} ${stylesModal['root']}`} >
      
      <div className={`${styles['header']}`} >
        <div>  <FormattedMessage id={`Modal.Setting_Title`} /> </div>
        <div
          onClick={()=>onClick_HideSetting()}
        > 
            <IconX className={`${styles['icon-x']}`} />
        </div>
      </div>
      
      
      <div className={`${styles['content']}`} >
        
        <div className={`${styles['content__section']}`} >
          <div> <FormattedMessage id={`Modal.Setting_Theme`} /> </div>
          <div>
            <div className={`${styles['button-option']} active----${optionThemeCurrent === 'auto'}`}
                onClick={()=>onClick_ChangeOptionTheme('auto')}
            > auto
            </div>
            <div className={`${styles['button-option']} active----${optionThemeCurrent === 'always-light'}`}
                onClick={()=>onClick_ChangeOptionTheme('always-light')}
            > light
            </div>
            <div className={`${styles['button-option']} active----${optionThemeCurrent === 'always-dark'}`}
                onClick={()=>onClick_ChangeOptionTheme('always-dark')}
            > dark
            </div>
          </div>
        </div>
        
        <div className={`${styles['content__section']}`} >
          <div>  <FormattedMessage id={`Modal.Setting_Language`} /></div>
          <div>
            <div className={`${styles['button-option']} active----${languageCurrent === 'en'}`}
              onClick={()=>onClick_ChangeLanguage('en')}
            > English
            </div>
            <div className={`${styles['button-option']} active----${languageCurrent === 'ko'}`}
              onClick={()=>onClick_ChangeLanguage('ko')}
            > 한국어
            </div>
          </div>
        </div>
        
      </div>
        
        
    </div>
  );
}

Setting.defaultProps = {};

export default Setting;


