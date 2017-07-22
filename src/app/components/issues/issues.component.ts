import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
name: any;

  constructor(private af: AngularFireDatabase,
              private router: Router ) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.name = user.displayName;
      } else {
        this.router.navigate(['']);
      }
    });
  }

}
