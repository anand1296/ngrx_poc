import { Injectable } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from '../postState/posts.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from '../shared/shared.actions';

@Injectable()

export class PostsEffects {
    constructor(private action$: Actions, private postService: PostsService, private store: Store) {}

    loadPosts$ = createEffect(() => {
        return this.action$.pipe(ofType(loadPosts), mergeMap((action) => {
            return this.postService.getPosts().pipe(map((posts) => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                console.log(posts);
                return loadPostsSuccess({ posts });
            }));
        }));
    });

    addPost$ = createEffect(() => {
        return this.action$.pipe(ofType(addPost), mergeMap((action) => {
            console.log(action);
            return this.postService.addPost(action.post).pipe(map((data) => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                console.log(data);
                const post = {...action.post, id: data.name};
                return addPostSuccess({ post });
            }))
        }))
    })

    updatePost$ = createEffect(() => {
        return this.action$.pipe(ofType(updatePost), switchMap((action) => {
            console.log(action);
            return this.postService.updatePost(action.post).pipe(map((data) => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                console.log(data);
                return updatePostSuccess({ post:  action.post });
            }))
        }))
    })

    deletePost$ = createEffect(() => {
        return this.action$.pipe(ofType(deletePost), switchMap((action) => {
            console.log(action);
            return this.postService.deletePost(action.id).pipe(map((data) => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                console.log(data);
                return deletePostSuccess({ id:  action.id });
            }))
        }))
    })
}