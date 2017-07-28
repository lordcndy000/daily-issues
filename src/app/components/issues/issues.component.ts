import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AddIssueModalComponent } from '../modals/add-issue-modal/add-issue-modal.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  name: any;
  config = {
    panelClass: 'no-padding'
  };

  constructor(private af: AngularFireDatabase,
    private router: Router,
    private dialog: MdDialog) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  addIssueModal() {
    this.dialog.open(AddIssueModalComponent, this.config);
  }

}
