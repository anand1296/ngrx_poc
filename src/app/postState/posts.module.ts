import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { UpdatePostComponent } from '../components/update-post/update-post.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './posts.reducer';
import { POST_STATE_NAME } from './posts.selectors';

const routes: Routes = [
    {
        path: '', component: PostsComponent,
        children: [
          { path: 'add', component: AddPostComponent },
          { path: 'update/:id', component: UpdatePostComponent }
        ]
    },
];

@NgModule({
    declarations: [
        PostsComponent,
        AddPostComponent,
        UpdatePostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME, postsReducer)
    ]
})

export class PostsModule {}