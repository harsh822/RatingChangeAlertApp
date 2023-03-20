import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { ContestDetailsService } from '../../Services/contest-details.service';
import { SendEmailService } from '../../Services/send-email.service';
import { UserDetailsService } from '../../Services/user-details.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm = new FormGroup({
    handle: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });
  users: string[] = [];
  isSubmitDisable: boolean = false;

  constructor(
    private contestDetail: ContestDetailsService,
    private emailService: SendEmailService,
    private userService: UserDetailsService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // var isTrue = false;
    var c = 0;
    // setInterval(
    //   () =>
    //     this.contestDetail.getData(c).then(
    //       (response: any) => {
    //         // isTrue = true;
    //         c++;
    //         var entry: any = Object.entries(response)[1][1];
    //         console.log(entry);
    //         // console.log(Object.entries(data)[1][1]);
    //         console.log(Object.entries(response)[0][1]);
    //         this.userService.getAll().then(
    //           (data: any) => {
    //             this.users = data;
    //             console.log(data);
    //             console.log(this.users);
    //           },
    //           (error: any) => {
    //             console.log(error);
    //           }
    //         );
    //         for (const key in entry) {
    //           // console.log(this.users[0]);
    //           for (let index = 0; index < this.users.length; index++) {
    //             const element = Object.values(this.users[index]);
    //             // console.log(element[1]);
    //             if (entry[key].handle === element[1]) {
    //               this.sendEmail(entry[key], element[2]);
    //             }
    //           }
    //         }
    //       },
    //       (error: any) => {
    //         // alert('An Unexpected Error Occured.');
    //         console.log(error);
    //       }
    //     ),
    //   10000
    // );
  }

  async onSubmit() {
    console.log(this.userForm);
    const data = {
      handle: this.userForm.value.handle,
      email: this.userForm.value.email,
      contestId: 0,
      contestName: '',
    };
    var isAlreadySubscribed = false;
    this.userService.getAll().subscribe((res: any) => {
      console.log('All existing users', res);
      res.forEach((element: any) => {
        if (element.handle == data.handle) {
          isAlreadySubscribed = true;
        }
      });
      if (isAlreadySubscribed) {
        alert('you have already subscribed');
      } else {
        this.userService.isValidCodeforcesUser(data).subscribe(
          (response: any) => {
            console.log('Response:::', response);
            if (response?.status == 'OK') {
              console.log('result', response?.result);
              localStorage.setItem(
                'userDetails',
                JSON.stringify(response.result)
              );

              this.userService
                .getLastContestDetails(data.handle)
                .subscribe((res: any) => {
                  var lastContestDetails: any;
                  if (res.result.length > 0) {
                    lastContestDetails = res.result[res.result.length - 1];
                    data.contestId = lastContestDetails.contestId;
                    data.contestName = lastContestDetails.contestName;
                  }
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
                  console.log('Api data for last contest details', res);
                });

              console.log(this.router.url);
              this.router.navigate(['/thank-you']);
            }
          },
          (error) => {
            console.log('ERROR', error);
            alert('Invalid Codeforces User');
          }
        );
      }
    });

    // this.userForm.reset();
  }

  // sendEmail(ratings: any, email: any) {
  //   console.log('Here');
  //   console.log(ratings.oldRating + ' ' + ratings.newRating + ' ' + email);
  //   let reqObj = {
  //     email: email,
  //     oldRating: ratings.oldRating,
  //     newRating: ratings.newRating,
  //   };
  //   this.emailService.sendMessage(reqObj).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
