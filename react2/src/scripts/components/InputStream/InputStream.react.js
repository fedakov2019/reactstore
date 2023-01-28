"use strict";

import Tabulator from "../core/Tabulator.react";

import InputStreamRegistries from "./InputStreamRegistries.react";
import InputStreamFiles from "./InputStreamFiles.react";

const InputStream=(props)=>
	{
		let tabulatorConfig={
			'data-id':"tabs",
			hideEmpty:false,
			headersStyle:{
				width:"98%"
			},
			config:[
				{
					id:"regView",
					order:1,
					isActive:true,
					caption:"Реестры",
					elem:<InputStreamRegistries initials={props.initials}/>
				},
				{
					id:"fileView",
					order:2,
					caption:"Файлы",
					elem:<InputStreamFiles/>
				}
			]
		};
		return <Tabulator {...tabulatorConfig}/>;
	};

export default InputStream;