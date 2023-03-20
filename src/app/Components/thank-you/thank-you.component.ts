import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/Services/user-details.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  constructor(private userService: UserDetailsService) {}
  userDetails: any;
  avatar: any;
  handle: any;
  ngOnInit(): void {
    var localStorageData: any = JSON.parse(
      localStorage.getItem('userDetails') || '{}'
    );
    // console.log(JSON.parse(localStorageData || '{}'));
    this.avatar =
      localStorageData != null ? localStorageData[0]?.titlePhoto : '';
    this.handle = localStorageData != null ? localStorageData[0]?.handle : '';
    // this.userDetails = JSON.parse(localStorageData);
  }
}
