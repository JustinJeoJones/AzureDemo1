import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './models/post';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  allPosts:Post[] =[];
  formPost:Post = {} as Post;
  constructor(private http:HttpClient){}

  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.http.get<Post[]>("https://webapplication320240705110610.azurewebsites.net/api/Posts")
      .subscribe((response:Post[]) => {
        this.allPosts = response;
      })
  }

  addPost(){
    this.http.post<void>("https://webapplication320240705110610.azurewebsites.net/api/Posts", this.formPost)
      .subscribe(() => {
        this.getAll();
      })
  }
}
