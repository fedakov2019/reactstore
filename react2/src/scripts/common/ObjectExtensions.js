"use strict";

const deepCopy=(dest, src)=>
{
	if (typeof src!=="object"||src==null)
	{
		dest=src;
		return dest;
	}
	if (Array.isArray(src))
	{
		dest=[];
		for (let item of src)
		{
			dest.push(deepCopy({}, item));
		}
	}
	else
	{
		for (let prop of Object.getOwnPropertyNames(src))
		{
			if (typeof src[prop]==="object"&&src[prop]!=null)
			{
				if (src[prop] instanceof Date)
				{
					dest[prop]=new Date(src[prop]);
				}
				else
				{
				    dest[prop]=deepCopy({}, src[prop]);
				}
			}
			else
			{
				dest[prop]=src[prop];
			}
		}
	}
	return dest;
}

export {deepCopy};