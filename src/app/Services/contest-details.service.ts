import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContestDetailsService {
  constructor(private http: HttpClient) {}
  getData(c: any) {
    // var temp = contestId;
    var contestId = 1693 + c;
    console.log(contestId);
    let url =
      'https://codeforces.com/api/contest.ratingChanges?contestId=' + contestId;
    return this.http.get(url);
  }
}
