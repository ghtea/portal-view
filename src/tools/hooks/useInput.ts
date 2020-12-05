import React, {useState} from 'react';


const useInput = (initialValue:any) => {
	const [value, setValue] = useState(initialValue);
	
	const onChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
		setValue(event.target.value);
	}
	return {value, setValue, onChange};
}

export default useInput;