"use strict"

import {LogLevel} from "./LogLevel";

const Logger= {
    log: (message, logLevel, src)=>
    {
        switch(logLevel)
        {
        	case LogLevel.Information:
        		console.info(message);
        		console.group(message+" details");
        		console.log(src);
        		console.groupEnd();
        		break;
        	case LogLevel.Warning:
        		console.warn(message);
        		console.group(message+" details");
        		console.log(src);
        		console.groupEnd();
        		break;
        	case LogLevel.Error:
        		console.error(message);
        		console.group(message+" details");
        		console.log(src);
        		console.groupEnd();
        		break;
        	default:
        		console.log(message);
        		console.group(message+" details");
        		console.log(src);
        		console.groupEnd();
        		break;
        }
    }
}

export default Logger;