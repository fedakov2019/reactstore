"use strict";

const uniNumber=(str)=> {
    var validLim = 1.1 .toString().substring(1, 2);
    let res=str.replace(/\.|,/g, validLim).replace(/\s/g, "");
    return res;
}

export {uniNumber};