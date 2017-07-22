import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  uid: any;
  name: any;

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        this.name = user.displayName;
      }
    });
  }

  toDashboard() {
    this.router.navigate(['dashboard/' + this.uid]);
  }

  signout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
