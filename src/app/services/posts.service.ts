import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  closeAddPost: boolean = true;

  constructor() { }
}
