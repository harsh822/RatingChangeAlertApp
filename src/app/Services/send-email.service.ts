import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor(private http: HttpClient) {}
  sendMessage(body: any) {
    console.log('inside email service');
    console.log(body);
    return this.http.post('http://localhost:3000/email', body, {
      responseType: 'text',
    });
  }
}
