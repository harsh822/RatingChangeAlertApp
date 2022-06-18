import { Component } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rating-change-alert-app';
  userModel = new User('', '');
  mySet = new Set();  
  onSubmit(form:any) {
    this.mySet.add(this.userModel);
    this.userModel = new User('', '');
    console.log(this.mySet);
    form.reset();
  }
}
