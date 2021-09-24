import { Component, createPlatform, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Post } from 'src/app/models/posts.model';
import { updatePost } from 'src/app/postState/posts.actions';
import { getPostById } from 'src/app/postState/posts.selectors';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  post: Post;
  postSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById, {id}).subscribe((data) => {
        this.post = data;
        // console.log(this.post);
        this.createForm();
      })
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }

  showErrors(field: string) {
    const formField = this.postForm.get(field);
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

  onUpdatePost(){
    console.log(this.postForm.value);
    if(!this.postForm.valid){
      return;
    }
    else {
      const post: Post = {
        id: this.post.id,
        title: this.postForm.value.title,
        description: this.postForm.value.description
      }

      this.store.dispatch(updatePost({post}));
      this.router.navigate(['posts'])
    }

  }

  ngOnDestroy() {
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }

}
