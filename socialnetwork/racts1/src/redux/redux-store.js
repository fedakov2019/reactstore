import {combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reduser"
import usersReducer from "./users-reducer"
const reducer =combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer
})
const store=createStore(reducer);
export default store;