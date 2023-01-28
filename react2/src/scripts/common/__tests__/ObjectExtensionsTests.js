"use strict";

import {deepCopy} from "../ObjectExtensions";

console.log(1233456);

jest.dontMock("../ObjectExtensions");

describe("deepCopy", function(){
	it("deepCopy test deep object", function(){
		
		let origin=[
		{
			a:1,
			b:"asdsd",
			c:null,
			d:new Date(),
			e:true,
			f:function(a){return a;},
			g:[1,2,3, function(f){return "origin-g-f"}, {a:1, f:function(){return "origin-g-o-f"}}],
			h:{
				a:1,
				b:{
					c:function(){return "origin-h-b-c"},
					d:{
						a:function(){return "origin-h-b-d-a"}
					}
				}
			}
		},
		{}
		];
		let copy=deepCopy({}, origin);
		origin[0].h.b.a=1;
		expect(copy[0].h.b.a).toBe(undefined);
		console.log("!", origin[0].d.toString());
		expect(copy[0].d instanceof Date).toBe(true);
	});
});