"use strict";

const $http = (url) =>
{

    var core = {
        ajax: function (method, url, data) {
                let promise = new Promise(function (resolve, reject) {

                    let client = new XMLHttpRequest();
                    let uri = url;

                    client.withCredentials=true;

                    client.open(method, uri);
                    
                    client.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    client.setRequestHeader("Accept", "application/json,*/*");
                    
                    if (data!=null)
                    {
                        client.send(JSON.stringify(data));
                    }
                    else
                    {
                        client.send();
                    }

                    client.onload = function () {
                        if (this.status >= 200&&this.status<300) {
                            let result;
                            if (this.response!=null&&this.response.length>0)
                            {
                                result=JSON.parse(this.response);
                            }
                            resolve(result);
                        } else {
                            reject(this);
                        }
                    };
                    client.onerror = function () {
                        reject(this);
                    };
                });
                return promise;
        }
    };

    return {
        'get': function (args) {
            return core.ajax("GET", url, args);
        },
        'post': function (args) {
            return core.ajax("POST", url, args);
        },
        'put': function (args) {
            return core.ajax("PUT", url, args);
        },
        'delete': function (args) {
            return core.ajax("DELETE", url, args);
        }
    };
};


export default $http;
