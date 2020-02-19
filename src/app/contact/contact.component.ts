import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ContactService } from "../contact.service";
// import { FormControl,FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  first_name: string;
  last_name: string;
  number: Number;

  constructor(private service:ContactService) { }

  contacts:Contact[];
  contact:Contact;
  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      number: this.number
    };
    this.service.addContactS(newContact).subscribe( (contact:any) => {
      this.contacts.push(contact);
      this.service
        .getAllContacts()
        .toPromise().then((contacts) => {this.contacts = contacts ;console.log(this.contacts)});
    });
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
      // .subscribe((contacts) => this.contacts = contacts );
  }

}
