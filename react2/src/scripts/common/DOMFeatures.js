"use strict";

const CalculateParentElementOffset=(reactEvent)=>
{
	let elem=reactEvent.currentTarget;
	if (elem==null)
	{
		return {offsetX:null, offsetY:null};
	}
	let x=0;
	let y=0;
	elem=elem.offsetParent;
	while (elem!=null)
	{
		x=x+elem.offsetLeft;
		y=y+elem.offsetTop;
		elem=elem.offsetParent;
	}
	return {X:x, Y:y};
}

export {CalculateParentElementOffset};