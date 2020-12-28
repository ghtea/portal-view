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
        return listStack.filter(stack => {
            const listIdPortal = stack?.listIdPortal;
            for (const idPortal of listIdPortal){
                const portalEach = listPortal.find(portal => portal.id === idPortal);
                if (portalEach?.kind === 'search'){
                    return true;
                } 
            }
        })
    },[listStack, listPortal]);

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


    const [option,setOption] = useState({
        stringSearching: '',
        kindItem: 'portal' as 'portal' | 'stack',
        idItem: '',
    });

    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const replacement = {
                ...option, 
                [event.currentTarget.name]: event.currentTarget.value
            }
            setOption(replacement);
            console.log(replacement);
        },[option]
    ); 


    const onSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const {stringSearching, kindItem, idItem} = option;

            if (kindItem === 'stack'){
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
            
        }, [option]
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
        
            <div className={`${styles['content']}`} >
                

                <div className={`${styles['content__section']}`} >
                    <div>  </div>
                    <div className={`${styles['container__input-name']}`} >
                        <input 
                            type='search'
                            placeholder={intl.formatMessage({ id: 'Global.Search'})}
                            name='stringSearching'
                            value={option.stringSearching}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>
                
                <ul className={`${styles['content__section']} ${styles['collection__input-submit']}`} >
                    {listStackSearching.map((stack, index)=>{
                        return (
                            <li
                                key={`stack-${index}`}
                                className={`${styles['container__input-submit']}`}
                            >   
                                <input 
                                    className={styles['search-stack']}
                                    type="submit"
                                    id={`checkbox-${stack?.id}`}
                                    name="idStack"
                                    value={stack.id}
                                /> 
                                <label htmlFor={`checkbox-${stack?.id}`}>  
                                    <div> <IconLinkExternal className={`${styles['icon-link-external']}`} kind='solid' /> </div>
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
                                className={`${styles['container__input-submit']}`}
                            >   
                                <input 
                                    className={styles['search-stack']}
                                    type="submit"
                                    id={`checkbox-${portal?.id}`}
                                    name="idStack"
                                    value={portal.id}
                                /> 
                                <label htmlFor={`checkbox-${portal?.id}`}>  
                                    <div> <IconLinkExternal className={`${styles['icon-link-external']}`} kind='solid' /> </div>
                                    <div> {portal?.name} </div> 
                                </label>
                            </li> 
                        )
                    })}
                </ul>

            </div>
        </div>

    </div>
  );
}

Searching.defaultProps = {};

export default Searching;


