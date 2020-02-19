import { Injectable } from '@angular/core';
import { Contact } from "./contact";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import {throwError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  deleteContact(id) {
    return this.http
      .delete("http://localhost:3000/contact/" + id)
      .pipe(map(res => res));
  }

  constructor(private http:HttpClient) { }
  //get All Contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>("http://localhost:3000/contacts").pipe(map((res) => res))
  }
  addContactS(newContact){
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post("http://localhost:3000/contact",newContact,
    ({headers:headers})).pipe(map((res)=> res))
  }
}
