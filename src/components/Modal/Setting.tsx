import React, { useCallback, useEffect } from "react";
import { firebaseAuth } from "firebaseApp";

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
import stylesModal from 'components/Modal.module.scss';


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

    const onClick_LogOut = useCallback(
        () => {
            firebaseAuth.signOut();
            // history
        }, []
    );

  
  return (
    
    <div className={`${styles['root']} ${stylesModal['root']}`} >
        
        <div 
            className={`${stylesModal['outside']}`} 
            onClick={()=>onClick_HideModal()}
        />

        <div 
            className={`${stylesModal['modal']}`} 
        >
            
            <div className={`${stylesModal['header']}`} >
                <div>  <FormattedMessage id={`Modal.Setting_Title`} /> </div>
                <div
                    onClick={()=>onClick_HideModal()}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </div>
            </div>
        
        
            <div className={`${stylesModal['content']}`} >
                
                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.Setting_Theme`} /> </div>
                    <div className={`${stylesModal['group-option']}`}>
                        <div className={`active----${optionThemeCurrent === 'auto'}`}
                            onClick={()=>onClick_ChangeOptionTheme('auto')}
                        > auto
                        </div>
                        <div className={`active----${optionThemeCurrent === 'always-light'}`}
                            onClick={()=>onClick_ChangeOptionTheme('always-light')}
                        > light
                        </div>
                        <div className={`active----${optionThemeCurrent === 'always-dark'}`}
                            onClick={()=>onClick_ChangeOptionTheme('always-dark')}
                        > dark
                        </div>
                    </div>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.Setting_Language`} /></div>
                    <div className={`${stylesModal['group-option']}`}>
                        <div className={`active----${languageCurrent === 'en'}`}
                            onClick={()=>onClick_ChangeLanguage('en')}
                        > English
                        </div>
                        <div className={`active----${languageCurrent === 'ko'}`}
                            onClick={()=>onClick_ChangeLanguage('ko')}
                        > 한국어
                        </div>
                    </div>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${stylesModal['button-normal']}`}
                        onClick={()=>onClick_LogOut()}
                    > <FormattedMessage id={`Modal.Setting_LogOut`} /> </button>
                </div>
                    
            </div>
        
        </div>
    </div>
    
  );
}

Setting.defaultProps = {};

export default Setting;


