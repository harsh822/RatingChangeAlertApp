import { Component } from '@angular/core';
import { User } from './user';
import { ContestDetailsService } from './contest-details.service';
import { EmailService } from './email.service';
import { UserDetailsService } from './user-details.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rating-change-alert-app';
  userModel = new User('', '');
  // mySet = new Set();
  users: string[] = [];
  onSubmit(form: any) {
    console.log(this.userModel);
    const data = {
      handle: this.userModel.handle,
      email: this.userModel.email,
    };
    this.userService.create(data).subscribe(
      (response) => {
        // console.log(data);
        console.log(response);
        console.log('Andaar');
      },
      (error) => {
        console.log(error);
      }
    );
    form.reset();
  }
  constructor(
    private contestDetail: ContestDetailsService,
    private emailService: EmailService,
    private userService: UserDetailsService
  ) {
    // var isTrue = false;
    var c = 0;
    setInterval(
      () =>
        this.contestDetail.getData(c).subscribe(
          (response) => {
            // isTrue = true;
            c++;
            var entry = Object.entries(response)[1][1];
            console.log(entry);
            // console.log(Object.entries(data)[1][1]);
            console.log(Object.entries(response)[0][1]);
            this.userService.getAll().subscribe(
              (data) => {
                this.users = data;
                console.log(data);
                console.log(this.users);
              },
              (error) => {
                console.log(error);
              }
            );
            for (const key in entry) {
              // console.log(this.users[0]);
              for (let index = 0; index < this.users.length; index++) {
                const element = Object.values(this.users[index]);
                // console.log(element[1]);
                if(entry[key].handle === element[1]) {
                  this.sendEmail(entry[key], element[2]);
                }
              }
            }
          },
          (error) => {
            // alert('An Unexpected Error Occured.');
            console.log(error);
          }
        ),
      10000
    );
  }
  sendEmail(ratings: any, email: any) {
    console.log('Here');
    console.log(ratings.oldRating + ' ' + ratings.newRating + ' ' + email);
    let reqObj = {
      email: email,
      oldRating: ratings.oldRating,
      newRating: ratings.newRating,
    };
    this.emailService.sendMessage(reqObj).subscribe((data) => {
      console.log(data);
    });
  }
}
