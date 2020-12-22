import React, { useCallback, useEffect } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsAuth from 'store/actions/auth';

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
  const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const {currentTarget : {name, value}} = event;
            if (name === 'optionTheme'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'theme', 'option'],
                    replacement: value
                }) );
                Cookies.set('optionTheme', value, { expires: 14});
            }
            else if (name === 'language'){
                dispatch(actionsStatus.return__REPLACE({
                    listKey: ['current', 'language'],
                    replacement: value
                }) );
            }
        },[]
    ); 

    const onClick_LogOut = useCallback(
        () => {
            dispatch(actionsAuth.return__LOG_OUT());
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

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="optionTheme" value="auto" defaultChecked
                            id="optionTheme----auto"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----auto"> auto </label>

                        <input type="radio" name="optionTheme" value="always-light"
                            id="optionTheme----always-light"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----always-light"> light</label>

                        <input type="radio" name="optionTheme" value="always-dark"
                            id="optionTheme----always-dark"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----always-dark"> dark </label>
                    </div>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.Setting_Language`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="language" value="en" defaultChecked
                            id="language----en"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="language----en"> English </label>

                        <input type="radio" name="language" value="ko"
                            id="language----ko"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="language----ko"> 한국어 </label>

                    </div>

                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${styles['button-log-out']}`}
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


