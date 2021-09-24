import { createReducer, on } from "@ngrx/store";
import { addPost, deletePost, editPost, updatePost } from "./posts.actions";
import { initialState } from './posts.state'

const _postsReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        let post = {...action.post};
        if(state.posts.length < 1){
            post.id = '1';
        }
        else {
            post.id = (parseInt(state.posts[state.posts.length-1].id)+1).toString();
        }
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(deletePost, (state, action) => {
        let post = {...action.post};
        let postsArray = [...state.posts];
        console.log(postsArray);
        let updatedPostsArray = postsArray.filter((value) => {
            return value.id !== post.id
        });
        console.log(updatedPostsArray);
        return {
            ...state,
            posts: updatedPostsArray
        }
    }),
    on(editPost, (state, action) => {
        let post = {...action.post};
        let postsArray = [...state.posts];
        let updatedPostsArray = postsArray.map((element) => {
            return post.id === element.id ? post : element
        });
        console.log(postsArray);
        return {
            ...state,
            posts: updatedPostsArray
        }
    }),
    on(updatePost, (state, action) => {
        let updatedPostsArray = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        console.log(updatedPostsArray);
        return {
            ...state,
            posts: updatedPostsArray
        }
    })
    
);

export function postsReducer(state, action) {
    return _postsReducer(state, action);
}