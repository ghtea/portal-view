import React from "react";


type PropsIcon = {
  className?: string;
  kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
} & typeof propsDefault;

const propsDefault = {  
  className: ''
};

// Text
const Icon = ({ className, kind }: PropsIcon) => {
  return (
    <div className={`${className} icon`} >
      <svg
        width="100%"
        height="100%"
        fill="currentColor"
        className=""
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
      {(!kind || kind === 'regular') && 
<path fill="currentColor" d="M432 32a16 16 0 0 1 16 16v80a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V96H256v336h48a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H144a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h48V96H48v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16z"></path>
      }
      {(kind === 'light') && 
<path fill="currentColor" d="M448 48v72a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8V64H240v384h72a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H136a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h72V64H32v56a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V48a16 16 0 0 1 16-16h416a16 16 0 0 1 16 16z"></path>
      }
      {(kind === 'solid') && 
<path fill="currentColor" d="M432 32a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32H264v304h40a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H144a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h40V112H64v32a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16z"></path>
      }
        
      </svg>
      
    </div>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
