import React from 'react';
import s from './MyPosts.module.css';
import {required,maxLengthCreator} from '../../../utils/validators/validators'
import Post from './Post/Post';
import { Field,reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormControls/FormsControls';

const MyPosts = React.memo((props) => {
    
    let postsElements =
        props.posts.map( p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    

    
    
    const onAddPost=(values)=>{
        props.addPost(values.newPostText); 
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
               <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
});
const maxLenght10 = maxLengthCreator(10);
const AddNewPostForm=(props)=>{
    
    return (
        <form onSubmit={props.handleSubmit}>
             <div>
                    <Field component={Textarea} name="newPostText" validate={[required, maxLenght10]} />
                </div>
                <div>
                    <button>Add post</button>
                </div>
        </form>
    )

}
const AddPostFormRedux =reduxForm({
    form:'ProfileAddNewPostForm'
})(AddNewPostForm)

export default MyPosts;