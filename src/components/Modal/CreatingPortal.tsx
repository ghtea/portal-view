import React, { useCallback, useEffect, useState, useMemo } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsPortal from 'store/actions/portal';

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconX from 'svgs/basic/IconX';

import styles from './CreatingPortal.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsCreatingPortal = {};

function CreatingPortal({}: PropsCreatingPortal) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idUser:string = useSelector((state: StateRoot) => state['auth']['user']['id']);


    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('CreatingPortal')],
                replacement: false
            }));
        },[]
    );

    const [draft,setDraft] = useState({
        // idUser 는 saga에서!
        
        kind: "normal",
        name: "",
        initials: "",
        url: "",
        lifespan: "15",  // input.value is (maybe) always string!
        listTag: [] as string[],
        hue: "180",

        tagCurrent: "",
        hueOption: "random"
    })

    // const [tagCurrent, setTagCurrent] = useState("");

    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const draftReplacement = {
                ...draft, 
                [event.currentTarget.name]: event.currentTarget.value
            }
            setDraft(draftReplacement);
            console.log(draftReplacement);
        },[draft]
    ); 
    


    const onClick_AddTagCurrent = useCallback(
        () => {
            const {tagCurrent, listTag} = draft;
            if ( tagCurrent !== "" && !listTag.includes(tagCurrent) ){
                const listTagReplacement = [...listTag, tagCurrent];
                setDraft({
                    ...draft,
                    listTag: listTagReplacement
                });
            }
        },[draft]
    );

    const onClick_DeleteTag = useCallback(
        (tagDeleting:string) => {
            const {listTag} = draft;
            const listTagReplacement = listTag.filter(tagEach => tagEach !== tagDeleting);
            setDraft({
                    ...draft,
                    listTag: listTagReplacement
                });
        },[draft]
    );
    
    const onClick_CreatePortal = useCallback(
        (draft) => {
            dispatch(actionsPortal.return__CREATE_PORTAL({
                ...draft
            }));
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
                <div>  <FormattedMessage id={`Modal.CreatingPortal_Title`} /> </div>
                <div
                    onClick={()=>onClick_HideModal()}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </div>
            </div>
        
            <div className={`${stylesModal['content']}`} >
                

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Kind`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="kind" value="normal" defaultChecked
                            id="kind----normal"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----normal">normal</label>

                        <input type="radio" name="kind" value="search"
                            id="kind----search"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----search">search</label>
                    </div>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingPortal_Name`} /> </div>
                    <div className={`${styles['container__input-name']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Name'})}
                            name='name'
                            value={draft.name}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingPortal_Initials`} /> </div>
                    <div className={`${styles['container__input-initials']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Initials'})}
                            name='initials'
                            value={draft.initials}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Url`} /></div>
                    <div className={`${styles['container__input-url']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Url'})}
                            name='url'
                            value={draft.url}
                            onChange={onChange_InputNormal} 
                        /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Life`} /></div>
                    <div className={`${styles['container__input-life']}`} >
                        <input   
                            type='range'
                            name='lifespan'
                            value={draft.lifespan}
                            min="1" max="30"  step="1"
                            onChange={onChange_InputNormal} 
                        />
                        <div> {`${draft.lifespan} days`} </div>
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Hue`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="hueOption" value="random" defaultChecked
                            id="hueOption----random"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="hueOption----random">random</label>

                        <input type="radio" name="hueOption" value="choose"
                            id="hueOption----choose"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="hueOption----choose">choose</label>

                        <input type="radio" name="hueOption" value="grey"
                            id="hueOption----grey"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="hueOption----grey">grey</label>
                    </div>

                    {draft.hueOption === 'choose' &&
                        <div className={`${styles['container__input-hue']}`} >
                            <input   
                                type='range'
                                name='hue'
                                value={draft.hue}
                                min="0" max="360"  step="10"
                                onChange={onChange_InputNormal} 
                            />
                        </div>
                    }   
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Tags`} /></div>

                    <div className={`${styles['list-tag']}`} > 
                        {draft.listTag.map((tag, index)=>
                            <div
                                key={`tag-${index}`}
                            >
                                <div> 
                                    {tag}
                                </div>
                                <div
                                    onClick={()=>onClick_DeleteTag(tag)}
                                > <IconX className={`${styles['icon-x']}`} /> </div>
                            </div>)}
                    </div>

                    <div className={`${styles['container__input-tag-current']}`} >
                        <input 
                            type='text'
                            placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Tags'})}
                            name='tagCurrent'
                            value={draft.tagCurrent}
                            onChange={onChange_InputNormal} 
                        />
                        <button
                            onClick={()=>onClick_AddTagCurrent()}
                        > Add </button>
                    </div>

                </div>
                

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${stylesModal['button-main']}`}
                        onClick={()=>onClick_CreatePortal(draft)}
                    > <FormattedMessage id={`Modal.CreatingPortal_Create`} /> </button>
                </div>


            </div>
        </div>

    </div>
  );
}

CreatingPortal.defaultProps = {};

export default CreatingPortal;


