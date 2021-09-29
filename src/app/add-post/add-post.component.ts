import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Post } from '../models/posts.model';
import { addPost } from '../postState/posts.actions';
import { PostsService } from '../services/posts.service'
import { setLoadingSpinner } from '../shared/shared.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, AfterContentChecked {

  postForm: FormGroup;
  closeAddPost: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, 
    private service: PostsService) { }

  ngOnInit(): void {
    // this.postForm = new FormGroup({
    //   title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    //   description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    // });

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
    
  }

  ngAfterContentChecked() {
    this.closeAddPost = this.service.closeAddPost;
  }

  onAddPost() {
    console.log(this.postForm.value);
    if(!this.postForm.valid) {
      return;
    }
    else{
      const post: Post = {
        title: this.postForm.value.title,
        description: this.postForm.value.description
      };
      this.service.closeAddPost = this.closeAddPost = true;
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.store.dispatch(addPost({post}));
      this.postForm.reset();
    }
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if(descriptionForm.touched && !descriptionForm.valid){
      if(descriptionForm.errors.required) {
        return 'Description is required'
      }

      if(descriptionForm.errors.minlength) {
        return 'Description should be of minimum 10 characters'
      }
    }
  }

  onClose() {
    console.log('Close');
    console.log(this.service.closeAddPost);
    this.service.closeAddPost = this.closeAddPost = true;
    console.log(this.service.closeAddPost);
  }

}
