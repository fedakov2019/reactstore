import React from 'react';
import MyPosts from './MyPosts';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import { connect } from 'react-redux';

const mapStateToProps= (state) => {
    return {
        
        posts : state.profilePage.posts
    }
}
const mapDipatchToProps = (dispatch) =>{
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }

    }
}


const MyPostsContainer=connect(mapStateToProps, mapDipatchToProps)(MyPosts)



export default MyPostsContainer;