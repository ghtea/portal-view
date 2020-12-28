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

    const idUserInApp = useSelector((state: StateRoot) => state.auth.user?.id);
    const idPortalEditing:string = useSelector((state: StateRoot) => state['status']['current']['portal']['editing']);
    const listPortal:any[] = useSelector((state: StateRoot) => state['portal']['listPortal']);

/*
    useEffect( ():any=>{
        return (
            dispatch(actionsStatus.return__REPLACE({
                listKey: ['current', 'portal', 'editing'], 
                replacement: ''
            })) 
        )
    },[]); */ 

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

        kindIcon: portalEditing.kindIcon as string,
        initials: portalEditing.initials as string,
        urlImageLocal : undefined as any,

        url: portalEditing.url as string,
        lifespan: portalEditing.lifespan as string,  // input.value is (maybe) always string!
        listTag: portalEditing.listTag as string[],
        hue: portalEditing.hue as string,

        tagCurrent: portalEditing.tagCurrent as string,
        hueOption: portalEditing.hueOption as string,
    });
    const urlImageIcon = portalEditing.urlImageIcon;

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
    

    const onChange_InputFile = useCallback( (event:React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: { files } } = event;
        const theFile = files && files[0];
        if (theFile){
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const result = finishedEvent?.target?.result;
                setDraft({...draft, urlImageLocal: result});
            };
            reader.readAsDataURL(theFile);  // then onloadend is triggered
        }
    },[draft]);
    const onClick_InputFile = useCallback( (event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.currentTarget.value = '';
    },[]);
    const onClick_ClearInputFile = useCallback( (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDraft({...draft, urlImageLocal: ''});
    },[]);


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
            dispatch(actionsPortal.return__MANIPULATE_PORTAL({
                kind: 'update',
                draft: draft,
                id: idPortalEditing,
                idOwner: portalEditing.idUser,
            }));
        }, [idPortalEditing]
    );

    const onClick_DeletePortal = useCallback(
        () => {
            const ok = window.confirm(intl.formatMessage({ id: 'Page.Home_ConfirmDeletingPortal'}));
                if (ok) {
                    dispatch(actionsPortal.return__DELETE_PORTAL({
                        id: idPortalEditing,
                        urlImageIcon: urlImageIcon, 
                        idUser: idUserInApp // owner of this portal
                    }));                
                }
        }, [idPortalEditing, idUserInApp]
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
                <div>  <FormattedMessage id={`Modal.EditingPortal_Title`} /> </div>
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
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_KindIcon`} /></div>

                    <div className={'container__input-radio'} > 
                        <input type="radio" name="kindIcon" value="initials" defaultChecked
                            id="kindIcon----initials"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kindIcon----initials">initials</label>

                        <input type="radio" name="kindIcon" value="image"
                            id="kindIcon----image"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="kindIcon----image">image</label>
                    </div>
                </div>
                {draft.kindIcon === 'initials' &&
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
                }   
                {draft.kindIcon === 'image' &&
                    <div className={`${stylesModal['content__section']}`} >
                        <div> <FormattedMessage id={`Modal.CreatingPortal_Image`} /> </div>
                        <div className={`container__input-file`} > 
                            <input type="file" accept="image/*" id='file-photo' 
                                onChange={onChange_InputFile} 
                                onClick={onClick_InputFile}
                            />
                            <label htmlFor='file-photo' > Upload Photo </label>
                            { draft.urlImageLocal && <button onClick={onClick_ClearInputFile}> Clear </button> }
                        </div> 
                    </div>
                }  

                
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
                    > <FormattedMessage id={`Modal.Update`} /> </button>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${stylesModal['button-delete']}`}
                        onClick={()=>onClick_DeletePortal()}
                    > <FormattedMessage id={`Modal.Delete`} /> </button>
                </div>

            </div>
        </div>

    </div>
  );
}

EditingPortal.defaultProps = {};

export default EditingPortal;


