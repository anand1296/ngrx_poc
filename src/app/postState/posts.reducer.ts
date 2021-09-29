import { createReducer, on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, editPost, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { initialState } from './posts.state'

const _postsReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        let post = {...action.post};
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(deletePostSuccess, (state, {id}) => {
        // let post = {...action.post};
        // let postsArray = [...state.posts];
        // console.log(postsArray);
        // let updatedPostsArray = postsArray.filter((value) => {
        //     return value.id !== post.id
        // });
        const updatedPostsArray = state.posts.filter((post) => {
            return post.id !== id
        })
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
    on(updatePostSuccess, (state, action) => {
        let updatedPostsArray = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        console.log(updatedPostsArray);
        return {
            ...state,
            posts: updatedPostsArray
        }
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
    
);

export function postsReducer(state, action) {
    return _postsReducer(state, action);
}