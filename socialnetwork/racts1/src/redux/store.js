import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReduser from "./sidebar-reduser";



let store={
    _state :{
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'Blabla', likesCount: 11},
                {id: 4, message: 'Dada', likesCount: 11}
            ],
            newPostText:'it_kamas.ru'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody:"12"
        },
        sidebar: {}}
, getState() {
    return this._state
},
_callSubscriber() {},


dispatch(action) {
   

        this._state.profilePage=profileReducer(this._state.profilePage,action)
        this._state.dialogsPage=dialogReducer(this._state.dialogsPage,action)
        this._state.sidebar =sidebarReduser(this._state.sidebar,action)
        this._callSubscriber(this._state);
    
},
subscribe(observer) {
    this._callSubscriber=observer;
},


}


export default store;