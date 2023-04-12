import React from 'react';
import './App.css';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import { compose } from 'redux';
import UsersContainer from './components/Users/UsersContainer'
import {connect}  from "react-redux";
import Navbar from './components/Navbar/Navbar';
import {initialize} from './redux/app-reducer'
import { useEffect } from 'react';
import {Route,Routes} from 'react-router-dom'
import LoginPage from './components/Login/login'
import Setings from './components/Setings/Setings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Loader from './components/Users/Loader';
import sd from './sd'

const App = (props) => {
       useEffect(()=>{
              props.initialize();
          },[]) 
          sd();
          
    if (!props.initialized) {return <Loader/>}
    return (<>    
     
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                
         <Routes>
                    <Route path='/dialogs'
                           element={ <DialogsContainer  /> }/>

                    <Route path='/profile/:userId?'
                           element={<ProfileContainer /> }/>
                    <Route path='/settings'
                           element={<Setings
                                /> }/>      
                     <Route path='/users'
                           element={<UsersContainer
                                /> }/>      
                              
                     <Route path='/login'
                           element={<LoginPage
                                /> }/>      
                              </Routes>
                        
                </div>
            </div>
            
            
           </> 
        )
}
const mapStateToProps=(state)=>({
       initialized:state.app.initialized
})

export default compose(connect(mapStateToProps,{initialize})(App));
