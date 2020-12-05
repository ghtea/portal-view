import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';

import CategoryDestination from './Nav2/CategoryDestination';
import SoloDestination from './Nav2/SoloDestination';

import * as Styled from './Nav2_Styled';


import IconHome from 'svgs/basic/IconHome';
import IconSignIn from 'svgs/basic/IconSignIn';
import IconSetting from 'svgs/basic/IconSetting';
import IconGlobe from 'svgs/basic/IconGlobe';


type PropsNav2 = {};

function Nav2({}: PropsNav2) {
  
  let history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const showingNav:boolean = useSelector((state: StateRoot) => state['status']['showing']['nav']['all']);
  const showingSetting:boolean = useSelector((state: StateRoot) => state['status']['showing']['popup']['setting']);
  
  const nameTheme:string = useSelector((state: StateRoot) => state['status']['current']['theme']['name']);
  const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);

  const onClick_LinkInsideApp = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
      history.push(destination);
    },[history]
  );
  
  const onClick_ShowSetting = useCallback(
    () => {
      dispatch(actionsStatus.return__REPLACE({ 
        listKey: ['showing', 'popup', 'setting'],
        replacement: true
      }))
    },[]
  );
  
  
  return (
    <Styled.Header__Nav2
      showingNav={showingNav}
    >
      <Styled.Div__NameApp>
        <button
          onClick={(event)=>onClick_LinkInsideApp(event, '/')}
        >
          <div>
            <IconHome
              listKeyTheme={['color', 'Nav', 'nav2_name_app___logo']}
              width={'36px'}
              height={'36px'}
            />
          </div>
        </button>
        <button
          onClick={(event)=>onClick_LinkInsideApp(event, '/')}
        >
          {t('Nav.name_app')}
        </button>
      </Styled.Div__NameApp>
      
      
      <Styled.Div__CollectionDestination>
        <CategoryDestination 
          idCategory={'categoryA'}
          listIdLink={['linkA1', 'linkA2']}
        />
  		  <SoloDestination 
  		    idSolo={'soloA'}
  		  />
      </Styled.Div__CollectionDestination>

      
      <Styled.Div__CollectionTool>
      
        <Styled.Div__Tool>
          <a
            onClick={(event)=>onClick_LinkInsideApp(event, '/log-in')}
          >
            <IconSignIn
              color={'inherit'}
              width={'28px'}
              height={'28px'}
            />
            <div> {t('Nav.log_in')} </div>
          </a>
        </Styled.Div__Tool>
        
        <Styled.Div__Tool>
          <a
            onClick={()=>onClick_ShowSetting()}
          >
            <IconSetting
              color={'inherit'}
              width={'26px'}
              height={'26px'}
            />
          </a>
        </Styled.Div__Tool>
        
      </Styled.Div__CollectionTool>
      
    </Styled.Header__Nav2>
  );
}

Nav2.defaultProps = {};

export default Nav2;


// 브라우저 상의 특정 요소 위치 파악
// https://stackoverflow.com/questions/37200019/how-to-get-elements-clientx-and-clienty-of-an-element

// <Div_Triangle lengthBasic={12} onClick = {(event)=>onClick_NavGroupItemTitle(event, 'Color') } />