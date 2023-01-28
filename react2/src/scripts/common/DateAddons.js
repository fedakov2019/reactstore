"use strict";

const FormatDateInt=(date)=>
{
	if (date==null)
	{
		return null;
	}
	if (!(date instanceof Date))
	{
		return null;
	}
	if (date=="Invalid Date")
	{
		return null;
	}
    const y = date.getFullYear().toString();
    const m = (date.getMonth()+1).toString();
    const d = date.getDate().toString();
    const rslt = y+"-"+(m.length==1?"0":"")+m+"-"+(d.length==1?"0":"")+d;
    return rslt;
};

export {FormatDateInt};