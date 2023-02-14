import React,{useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {Home_ROUTE} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Error from '../pages/Error';
 
export function AppRoute(){
    const {store} = useContext(Context)
 
    console.log(store)
    return (
        <Routes>
            {store.isRedirect && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<
                    Component/> }/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path}  path={path} element={<Component/>} />
            )}
            <Route path='*' element={<Error/>} />
           
        </Routes>
    );
};
 

export default observer(AppRoute);