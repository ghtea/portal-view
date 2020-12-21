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

import stylesCreatingPortal from './CreatingPortal.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsEditingPortal = {};

function EditingPortal({}: PropsEditingPortal) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const idPortalEditing:string = useSelector((state: StateRoot) => state['status']['current']['portal']['editing']);
    const listPortal:any[] = useSelector((state: StateRoot) => state['portal']['listPortal']);

    const portalEditing: any = useMemo(()=>{
        return listPortal.find(portalEach => portalEach.id === idPortalEditing);
    },[idPortalEditing, listPortal])

    const onClick_HideModal = useCallback(
        () => {
            dispatch(actionsStatus.return__REPLACE({ 
                listKey: ['showing', 'modal', pascalToCamel('EditingPortal')],
                replacement: false
            }));
        },[]
    );

    const [draft,setDraft] = useState({

        idUser: portalEditing.idUser as string,

        kind: portalEditing.kind as string,
        name: portalEditing.name as string,
        initials: portalEditing.initials as string,
        url: portalEditing.url as string,
        lifespan: portalEditing.lifespan as string,  // input.value is (maybe) always string!
        listTag: portalEditing.listTag as string[],
        hue: portalEditing.hue as string,

        tagCurrent: portalEditing.tagCurrent as string,
        hueOption: portalEditing.hueOption as string,
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
    
    const onClick_EditPortal = useCallback(
        (draft) => {
            dispatch(actionsPortal.return__EDIT_PORTAL({
                ...draft,
                id: idPortalEditing
            }));
        }, []
    );
  
  return (
    <div className={`${stylesCreatingPortal['root']} ${stylesModal['root']}`} >

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

                    <form className={`form-radio`} > 
                        <input type="radio" name="kind" value="normal" defaultChecked
                            id="kind----normal"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----normal">normal</label>

                        <input type="radio" name="kind" value="search"
                            id="kind----search"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kind----search">search</label>
                    </form>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingPortal_Name`} /> </div>
                    <div className={`${stylesCreatingPortal['container__input-name']}`} >
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
                    <div className={`${stylesCreatingPortal['container__input-initials']}`} >
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
                    <div className={`${stylesCreatingPortal['container__input-url']}`} >
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
                    <div className={`${stylesCreatingPortal['container__input-life']}`} >
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

                    <form className={`form-radio`} > 
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
                    </form>

                    {draft.hueOption === 'choose' &&
                        <div className={`${stylesCreatingPortal['container__input-hue']}`} >
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

                    <div className={`${stylesCreatingPortal['list-tag']}`} > 
                        {draft.listTag.map((tag, index)=>
                            <div
                                key={`tag-${index}`}
                            >
                                <div> 
                                    {tag}
                                </div>
                                <div
                                    onClick={()=>onClick_DeleteTag(tag)}
                                > <IconX className={`${stylesCreatingPortal['icon-x']}`} /> </div>
                            </div>)}
                    </div>

                    <div className={`${stylesCreatingPortal['container__input-tag-current']}`} >
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
                        onClick={()=>onClick_EditPortal(draft)}
                    > <FormattedMessage id={`Modal.EditingPortal_Update`} /> </button>
                </div>

            </div>
        </div>

    </div>
  );
}

EditingPortal.defaultProps = {};

export default EditingPortal;

