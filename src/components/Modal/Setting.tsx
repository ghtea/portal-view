import React, { useCallback, useEffect } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import {pascalToCamel} from 'tools/vanilla/convertName';
import IconX from 'svgs/basic/IconX';

import styles from './Setting.module.scss';
import stylesModalA from 'components/Modal/Template/ModalA.module.scss';


type PropsSetting = {};

function Setting({}: PropsSetting) {
  
  const dispatch = useDispatch();

  const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
  const optionThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['option']);
  
  const onClick_HideModal = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'modal', pascalToCamel('Setting')],
        replacement: false
      }))
    },[]
  );
  
  // ~ template
  
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
    <>

    <div 
        className={`${stylesModalA['background-shadow']}`} 
        onClick={()=>onClick_HideModal()}
    />

    <div className={`${styles['modal']} ${stylesModalA['modal']}`} >

        <div className={`${stylesModalA['header']}`} >
            <div>  <FormattedMessage id={`Modal.Setting_Title`} /> </div>
            <div
                onClick={()=>onClick_HideModal()}
            > 
                <IconX className={`${stylesModalA['icon-x']}`} />
            </div>
        </div>
    
      
      <div className={`${stylesModalA['content']}`} >
        
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
    </>
  );
}

Setting.defaultProps = {};

export default Setting;


