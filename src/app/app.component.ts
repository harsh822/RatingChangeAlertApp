import { Component } from '@angular/core';
import { User } from './user';
import { ContestDetailsService } from './contest-details.service';
import { EmailService } from './email.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rating-change-alert-app';
  userModel = new User('', '');
  mySet = new Set();
  onSubmit(form: any) {
    if (!this.mySet.has(this.userModel)) {
      this.mySet.add(this.userModel);
    }
    this.userModel = new User('', '');
    console.log(this.mySet);
    form.reset();
  }
  constructor(private contestDetail: ContestDetailsService,private emailService:EmailService) {
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
            for (const key in entry) {
              if (entry[key].handle === 'harsh822')
                // var email = ;
                this.sendEmail(entry[key],"hp996847@gmail.com"); 
                // console.log(entry[key].oldRating + '  ' + entry[key].newRating);
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
  sendEmail(ratings:any,email:any) {
    console.log("Hetere");
    console.log(ratings.oldRating+" "+ratings.newRating+" "+email);
    let reqObj = {
      email:email,
      oldRating:ratings.oldRating,
      newRating:ratings.newRating
    }
    this.emailService.sendMessage(reqObj).subscribe(data=>{
      console.log(data);
    })
  }
  
}
