import React from 'react';
import MyPosts from './MyPosts';
import {addPostActionCreator,updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import { connect } from 'react-redux';

const mapStateToProps= (state) => {
    return {
        
        posts : state.profilePage.posts,
            newPostText : state.profilePage.newPostText
    }
}
const mapDipatchToProps = (dispatch) =>{
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text));
        }

    }
}


const MyPostsContainer=connect(mapStateToProps, mapDipatchToProps)(MyPosts)



export default MyPostsContainer;