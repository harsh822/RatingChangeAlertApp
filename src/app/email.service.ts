import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpReq:HttpClient) { }
  sendMessage(body:any) {
    console.log("inside email service");
    console.log(body);
    return this.httpReq.post("http://localhost:3000/email",body,{responseType: 'text'});
  }
}
