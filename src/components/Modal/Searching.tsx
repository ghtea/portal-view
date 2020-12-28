import React, { useCallback, useEffect, useState, useMemo } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';
import * as actionsStack from 'store/actions/stack';

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconLinkExternal from 'svgs/basic/IconLinkExternal';
import IconStack from 'svgs/basic/IconLayerGroup';

import styles from './Searching.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsSearching = {};

function Searching({}: PropsSearching) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id );
    const listStack = useSelector((state: StateRoot) => state.stack.listStack );
    const listPortal = useSelector((state: StateRoot) => state.portal.listPortal );

    const listStackSearching = useMemo(()=>{
        return listStack.filter(stackEach => stackEach.kindAction === 'search')
    },[listStack]);

    const listPortalSearching = useMemo(()=>{
        return listPortal.filter(portalEach => portalEach.kind === 'search')
    },[listPortal]);

    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('Searching')],
                replacement: false
            }));
        },[]
    );

    
    const [stringSearching, setStringSearching] = useState('');

    const onChange_InputSearch = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            setStringSearching(event.currentTarget.value);
        },[]
    ); 


    const onSubmit = useCallback(
        (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            event.preventDefault();

            console.log(event.currentTarget.value)

            const idItem = event.currentTarget.value;
            const kindItem = event.currentTarget.name;

            if (kindItem === 'idStack'){
                dispatch(actionsStack.return__VISIT_STACK({
                    id: idItem,
                    stringSearching: stringSearching,
                }));
            }
            else {
                dispatch(actionsPortal.return__VISIT_PORTAL({
                    id: idItem,
                    stringSearching: stringSearching,
                }));
            } 
            
        }, [stringSearching]
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
        
            <form className={`${styles['content']}`} autoComplete="off" >
                

                <div className={`${styles['content__section']}`} >
                    <div>  </div>
                    <div className={`${styles['container__input-name']}`} >
                        <input 
                            type='search'
                            placeholder={intl.formatMessage({ id: 'Global.Search'})}
                            name='stringSearching'
                            value={stringSearching}
                            onChange={onChange_InputSearch} 
                        /> 
                    </div>
                </div>
                
                <ul className={`${styles['content__section']} ${styles['collection__input-submit']}`} >
                    {listStackSearching.map((stack, index)=>{
                        return (
                            <li
                                key={`stack-${index}`}
                                className={`${styles['container__input-submit']} ${styles['stack']}`}
                            >   
                                <input 
                                    type="submit"
                                    id={`checkbox-${stack?.id}`}
                                    name="idStack"
                                    value={stack.id}
                                    onClick={onSubmit}
                                /> 
                                <label htmlFor={`checkbox-${stack?.id}`}>  
                                    <div> <IconStack className={`${styles['icon-stack']}`} kind='solid' /> </div>
                                    <div> {stack?.name} </div> 
                                </label>
                            </li> 
                        )
                    })}
                </ul>

                <ul className={`${styles['content__section']} ${styles['collection__input-submit']}`} >
                    {listPortalSearching.map((portal, index)=>{
                        return (
                            <li
                                key={`stack-${index}`}
                                className={`${styles['container__input-submit']}  ${styles['portal']}`}
                            >   
                                <input 
                                    type="submit"
                                    id={`checkbox-${portal?.id}`}
                                    name="idPortal"
                                    value={portal.id}
                                    onClick={onSubmit}
                                /> 
                                <label htmlFor={`checkbox-${portal?.id}`}>  
                                    <div> 
                                        <IconLinkExternal 
                                            className={`${styles['icon-link-external']} hue----${portal.hue}`} 
                                            kind='solid' 
                                        /> 
                                    </div>
                                    <div> {portal?.name} </div> 
                                </label>
                            </li> 
                        )
                    })}
                </ul>

            </form>
        </div>

    </div>
  );
}

Searching.defaultProps = {};

export default Searching;


