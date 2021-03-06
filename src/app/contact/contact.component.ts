import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ContactService } from "../contact.service";
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { FormControl,FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  id:string;
  first_name: string;
  last_name: string;
  number: Number;

  constructor(private service:ContactService) { }
  
  myForm:FormControl;

  contacts:Contact[];
  show = false;
  submit = true;
  contact:Contact;
  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      number: this.number
    };
    this.service.addContactS(newContact).toPromise().then( (contact:any) => {
      this.contacts.push(contact);
      this.ngOnInit();
    });
    this.show = true;
  }

  editContact(id:any){
    this.submit= false;
    const editContact = {
      _id:this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      number: this.number
    };
    var contacts = this.contacts;
    this.service.editContact(editContact,id).toPromise().then((contact:any)=>{
      this.contacts.push(contact);
      this.ngOnInit();
      if (contact == 1) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i]._id == id) {
            this.contacts.push(contact);
          }
        }
      }
    })
    this.myForm.reset();
  }

  deleteContact(id: any) {
    var contacts = this.contacts;
    this.service.deleteContact(id).subscribe(data => {
      this.ngOnInit();
      if (data == 1) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i]._id == id) {
            contacts.slice(i, 1);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.service
      .getAllContacts()
      .toPromise().then(res=> {this.contacts = res; console.log(this.contacts)})
  }

}
