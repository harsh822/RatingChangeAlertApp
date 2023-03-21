import { Component, OnInit } from '@angular/core';
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
    private userService: UserDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
