import React, { useCallback, useEffect, useState } from "react";

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


    const onClick_HideModal = useCallback(
        () => {
        dispatch(actionsStatus.return__REPLACE({ 
            listKey: ['showing', 'modal', pascalToCamel('CreatingPortal')],
            replacement: false
        }));
        },[]
    );


    const [kind, setKind] = useState("normal");

    const inputName = useInput(""); // {value, setValue, onChange};
    const inputInitials = useInput(""); // {value, setValue, onChange};
    const inputUrl = useInput(""); // {value, setValue, onChange};
    
    const inputLifespan = useInput(15); // {value, setValue, onChange};
    
    const inputTagCurrent = useInput("");
    const [tags, setTags] = useState<string[]>([]);

    const [hueOption, setHueOption] = useState("random");  // 0, 10, ..., 350   grey   random
    const inputHueNumber = useInput(180);


    const onClick_AddTagCurrent = useCallback(
        () => {
            if ( inputTagCurrent.value !== "" && !tags.includes(inputTagCurrent.value) ){
                const tagsNew = [...tags, inputTagCurrent.value];
                setTags(tagsNew);
            }
        },[inputTagCurrent, tags]
    );
    const onClick_DeleteTag = useCallback(
        (tagDeleting:string) => {
            const tagsNew = tags.filter(tagEach => tagEach !== tagDeleting);
            setTags(tagsNew);
        },[inputTagCurrent, tags]
    );

    const onClick_CreatePortal = useCallback(
        () => {
            let hue = hueOption;
            if (hueOption === 'choose' ){
                hue = (inputHueNumber.value).toString();
            }
            dispatch(actionsPortal.return__CREATE_PORTAL({
                
                kind: kind,
                
                name: inputName.value,
                initials: inputInitials.value,
                url: inputUrl.value,
                
                lifespan: inputLifespan.value,

                tags: tags,
                hue: hue

            }));
        
        },
        [kind, inputName, inputInitials, inputUrl, inputLifespan, tags, hueOption, inputHueNumber]
    );
  
  // ~ template
  
  /*
    const onClick_ChangeOptionTheme = useCallback(
        (replacement:string) => {
            dispatch(actionsStatus.return__REPLACE({
                listKey: ['current', 'theme', 'option'],
                replacement: replacement
            }) );
            Cookies.set('optionTheme', replacement, { expires: 14});
        }, []
    );
  */
  
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
                    <div> <FormattedMessage id={`Modal.CreatingPortal_Name`} /> </div>
                    <div className={`${styles['input-name']}`} >
                            <input 
                                type='text'
                                placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Name'})}
                                value={inputName.value}
                                onChange={inputName.onChange} 
                            /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div> <FormattedMessage id={`Modal.CreatingPortal_Initials`} /> </div>
                    <div className={`${styles['input-initials']}`} >
                            <input 
                                type='text'
                                placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Initials'})}
                                value={inputInitials.value}
                                onChange={inputInitials.onChange} 
                            /> 
                    </div>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Url`} /></div>
                    <div className={`${styles['container__input-url']}`} >
                            <input 
                                type='text'
                                placeholder={intl.formatMessage({ id: 'Modal.CreatingPortal_Url'})}
                                value={inputUrl.value}
                                onChange={inputUrl.onChange} 
                            /> 
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Life`} /></div>
                    <div className={`${styles['container__input-life']}`} >
                        <input   
                            type='range'
                            value={inputLifespan.value}
                            min="1" max="30"  step="1"
                            onChange={inputLifespan.onChange} 
                        />
                        <div> {`${inputLifespan.value} days`} </div>
                    </div>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Hue`} /></div>

                    <div className={`${stylesModal['group-option']}`} > 
                        <div className={`${styles['button-option']} active----${hueOption === 'random'}`}
                            onClick={()=>setHueOption('random')}
                        > random
                        </div>
                        <div className={`${styles['button-option']} active----${hueOption === 'choose'}`}
                            onClick={()=>setHueOption('choose')}
                        > choose
                        </div>
                        <div className={`${styles['button-option']} active----${hueOption === 'grey'}`}
                            onClick={()=>setHueOption('grey')}
                        > grey
                        </div>
                    </div>
                    {hueOption === 'choose' &&
                        <div className={`${styles['container__input-hue']}`} >
                            <input   
                                type='range'
                                value={inputHueNumber.value}
                                min="0" max="360"  step="10"
                                onChange={inputHueNumber.onChange} 
                            />
                        </div>
                    }   

                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <div>  <FormattedMessage id={`Modal.CreatingPortal_Tags`} /></div>

                    <div className={`${styles['list-tag']}`} > 
                        {tags.map((tag, index)=>
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
                            value={inputTagCurrent.value}
                            onChange={inputTagCurrent.onChange} 
                        />
                        <button
                            onClick={()=>onClick_AddTagCurrent()}
                        > Add </button>
                    </div>

                </div>
                

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        className={`${stylesModal['button-main']}`}
                        onClick={()=>onClick_CreatePortal()}
                    > <FormattedMessage id={`Modal.CreatingPortal_Create`} /> </button>
                </div>


            </div>
        </div>

    </div>
  );
}

CreatingPortal.defaultProps = {};

export default CreatingPortal;


