import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(baseUrl);
  }
  create(data: any) {
    // console.log("Inside the service");
    return this.http.post(baseUrl, data);
  }
  isValidCodeforcesUser(userDetails: any) {
    const userInfoAPIUrl =
      'https://codeforces.com/api/user.info?handles=' + userDetails.handle;
    const response = this.http.get(userInfoAPIUrl);
    console.log('Responsse:::', response);
    return response;
  }

  getLastContestDetails(handle: any) {
    var apiUrl = 'https://codeforces.com/api/user.rating?handle=' + handle;
    const response = this.http.get(apiUrl);
    console.log('last Contest details :::', response);
    return response;
  }
}
