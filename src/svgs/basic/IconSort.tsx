import React from "react";


type PropsIcon = {
  className?: string;
  kind?: 'regular' | 'solid' | 'light';  // thin, light, regular, solid, ...
} & typeof propsDefault;

const propsDefault = {  
  className: ''
};

// Sort
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
        viewBox="0 0 384 512"
      >
      {(!kind || kind === 'regular') && 
<path fill="currentColor" d="M164 384h-44V48a16 16 0 0 0-16-16H88a16 16 0 0 0-16 16v336H28a12 12 0 0 0-8.73 20.24l68 72a12 12 0 0 0 17.44 0l68-72A12 12 0 0 0 164 384zm200.72-276.24l-68-72a12 12 0 0 0-17.44 0l-68 72A12 12 0 0 0 220 128h44v336a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16V128h44a12 12 0 0 0 8.72-20.24z"></path>
      }
      {(kind === 'light') && 
<path fill="currentColor" d="M364.5 117.81l-84.06-82.3a11.94 11.94 0 0 0-16.87 0l-84 82.32a12 12 0 0 0-.09 17l5.61 5.68a11.93 11.93 0 0 0 16.91.09l54-52.67V472a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V88.08l53.94 52.35a12 12 0 0 0 16.92 0l5.64-5.66a12 12 0 0 0 0-16.96zM198.93 371.56a11.93 11.93 0 0 0-16.91-.09l-54 52.67V40a8 8 0 0 0-8-8H104a8 8 0 0 0-8 8v383.92l-53.94-52.35a12 12 0 0 0-16.92 0l-5.64 5.66a12 12 0 0 0 0 17l84.06 82.3a11.94 11.94 0 0 0 16.87 0l84-82.32a12 12 0 0 0 .09-17z"></path>
      }
      {(kind === 'solid') && 
<path fill="currentColor" d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm203.29-219.31l-80-96a16 16 0 0 0-22.62 0l-80 96C186.65 142.74 193.78 160 208 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.19 0 21.36-17.24 11.29-27.31z"></path>
      }
        
      </svg>
      
    </div>
  );
};
Icon.defaultProps = propsDefault;
//

export default Icon;
