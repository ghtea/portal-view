interface Object {
  [key: string ]: any;
}

const putValueToNestedObject = function (obj:Object, listKey: (string | number)[], value:any) {

	// Cache the path length and current spot in the object
	const length:number = listKey.length;
	let current:Object = obj;

	// Loop through the path
	listKey.forEach( (key: (string | number), index:number) => {

		// If this is the last item in the loop, assign the value
		if (index === length -1) {

			current[key] = value;
		
		} // if

		// Otherwise, update the current place in the object
		else {

			// If the key doesn't exist, create it
			if (!current[key]) {
				current[key] = {};
			}
			// Update the current place in the object
			current = current[key];

		} // else

	});

};


export default putValueToNestedObject;