import {applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reduser"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import  thunkMiddleware  from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer"
const reducer =combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form : formReducer,
    app:appReducer
})
const store=createStore(reducer,applyMiddleware(thunkMiddleware));
export default store;