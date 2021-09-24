import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, StoreConfig } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Post } from '../models/posts.model'
import { deletePost, editPost } from '../postState/posts.actions';
import { getPosts } from '../postState/posts.selectors'
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterContentChecked {

  posts: Observable<Post[]>;
  postIndexToEdit: number = 1;
  editPost: boolean = false;
  editedpost: FormGroup;
  closeAddPost: boolean = true;

  constructor(private store: Store<AppState>, private service: PostsService) { 
    this.editedpost = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  ngAfterContentChecked() {
    this.closeAddPost = this.service.closeAddPost;
  }

  onClickEditPost(post, index) {
    console.log(post, index, 'edit');
    // console.log(this.posts);
    this.editPost = true;
    this.postIndexToEdit = index;
    this.editedpost.controls['title'].setValue(post.title);
    this.editedpost.controls['description'].setValue(post.description);
    console.log(this.editedpost.value);
    
  }

  onClickDeletePost(post) {
    console.log(post, 'delete');
    this.store.dispatch(deletePost({post}))
  }

  onClickDone(postId) {
    console.log(this.editedpost.value);
    let edited_post = {
      id: postId,
      title: this.editedpost.value.title,
      description: this.editedpost.value.description
    }
    this.editPost = false;
    console.log(edited_post);
    this.store.dispatch(editPost({post: edited_post}));

  }

  showErrors(field: string) {
    const formField = this.editedpost.get(field);
    const casedFormField = field.charAt(0).toUpperCase()+field.slice(1);
    if(formField.touched && !formField.valid){
      if(formField.errors.required) {
        return casedFormField+' is required'
      }

      if(formField.errors.minlength) {
        return casedFormField+' should be of minimum 10 characters'
      }
    }
  }

  addPost() {
    this.closeAddPost = this.service.closeAddPost = false;
  }

}
