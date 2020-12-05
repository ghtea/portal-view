import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next'

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as convertName from 'tools/vanilla/convertName';

import styles from './CategoryDestination.module.scss';

import IconAngle from 'svgs/basic/IconAngle';


type PropsCategoryDestination = {
  idCategory: string,
  listIdLink: string[]
};

function CategoryDestination({
  idCategory,
  listIdLink
}: PropsCategoryDestination) {
  
  let history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  
  // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
  const onClick_LinkInsideApp = useCallback(
    (destination:string) => {
      history.push(destination);
    },[history]
  );
  
  
  const [idSpotlighted, setIdSpotlighted] = useState("");
	
	const onMouseEnter_CategoryDestination = useCallback(
    (newIdSpotlighted) => {
    		setIdSpotlighted(newIdSpotlighted);
    },
    [idSpotlighted]
  );
  const onMouseLeave_CategoryDestination = useCallback(
    (newIdSpotlighted) => {
    		setIdSpotlighted("");
    },
    [idSpotlighted]
  );
  
	const onClick_CategoryDestination_Title  = useCallback(
    (newIdSpotlighted) => {
    	
    	if (idSpotlighted !== newIdSpotlighted){
    		setIdSpotlighted(newIdSpotlighted);
    	}
    	else {
    		setIdSpotlighted("");
    	}
    	console.log(idSpotlighted)
    },
    [idSpotlighted]
  );
  
  
  
  return (
    
		<div className={`${styles['root']}`}
		    onMouseEnter ={()=> onMouseEnter_CategoryDestination(idCategory) }
            onMouseLeave ={()=> onMouseLeave_CategoryDestination("") }
		>
		
			<div className={`${styles['title']}`}
                onClick = {()=>onClick_CategoryDestination_Title(idCategory) }
			> 
			  <div> 
			    <a> {t(`Nav.${idCategory}`)}  </a>
			  </div>
			  <div> 
			    <IconAngle className={`${styles['icon-angle']}`} directon={"down"} /> 
			   </div>
			</div>
			
			<div className={`${styles['modal']} spotlighted----${idSpotlighted===idCategory}`}> 
				
				<div className={`${styles['modal__triangle-front']}`}/>
                <div className={`${styles['modal__triangle-back']}`}/>
                <div className={`${styles['modal__background-of-triangle']}`}/>
                
                <div className={`${styles['modal__box']}`}>
				    {listIdLink.map( (idLink, index) => (
                        <div className={`${styles['link']}`}
                            key={`idLink-${index}`}
                            onClick={()=>onClick_LinkInsideApp(`/${convertName.pascalToSnake(idCategory)}/${convertName.pascalToSnake(idLink)}`)}
                        > <a> {t(`Nav.${idCategory}_${idLink}`)} </a> 
  					    </div>
				    ))}
				</div>

				
			</div>
			
		</div>
  
  );
}

CategoryDestination.defaultProps = {};

export default CategoryDestination;



// <Div_Triangle lengthBasic={12} onClick = {(event)=>onClick_NavGroupItemTitle(event, 'Color') } />