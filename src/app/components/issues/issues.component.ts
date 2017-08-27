import { toArray } from 'rxjs/operator/toArray';
// import { FirebaseApp } from 'angularfire2/app';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AddIssueModalComponent } from '../modals/add-issue-modal/add-issue-modal.component';
import { DeleteIssueModalComponent } from '../modals/delete-issue-modal/delete-issue-modal.component';
import { EditIssueModalComponent } from '../modals/edit-issue-modal/edit-issue-modal.component';
import { ResolveIssueModalComponent } from '../modals/resolve-issue-modal/resolve-issue-modal.component';
import { EditResoModalComponent } from '../modals/edit-reso-modal/edit-reso-modal.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  name: any;
  issues: any;
  modalConfig = {
    height: '570px',
    width: '570px'
  };
  resolveModalConfig = {
    height: '378px',
    width: '570px'
  };
  // Issue object
  $key?: string;
  title: string;
  startDate: string;
  endDate: string;
  details: string;
  priority: string;
  isResolved: boolean;
  dateToday: any;


  constructor(private af: AngularFireDatabase,
    private router: Router,
    private dialog: MdDialog,
    private afService: FirebaseService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName;

        // Get Issues
        this.afService.getIssues().subscribe((issues) => {
          this.issues = issues;
        });

        // Get date
        this.dateNow();
      } else {
        this.router.navigate(['']);
      }
    });

  }

  dateNow() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    this.dateToday = (month < 10 ? '0' + month : month) + '/' + day + '/' + year;
    console.log(this.dateToday);
  }
  // Add issue
  addIssueModal() {
    this.dialog.open(AddIssueModalComponent, this.modalConfig);
  }

  // Delete issue
  confirmDeleteIssue(key) {
    const dialogRefDel = this.dialog.open(DeleteIssueModalComponent);
    dialogRefDel.componentInstance.key = key;
  }

  // Edit issue
  editIssue(key, title, startDate, endDate, details, priority) {
    const editIssueObj = {
      key,
      title,
      startDate,
      endDate,
      details,
      priority
    };
    const dialogRefEdit = this.dialog.open(EditIssueModalComponent, this.modalConfig);
    dialogRefEdit.componentInstance.editIssueObj = editIssueObj;
  }

  // Resolve issue
  resolveIssue(key, isResolved, resolveMessage) {
    const resolveObj = {
      key,
      isResolved,
      resolveMessage
    };

    const resolveRefEdit = this.dialog.open(ResolveIssueModalComponent, this.resolveModalConfig);
    resolveRefEdit.componentInstance.resolveObj = resolveObj;
  }

  // Unresolve issue
  unresolveIssue(key) {
    this.afService.unresolveIssue(key);
  }

  // Edit resolution
  editResolution(key, resolveMessage) {
    const resoObj = {
      key,
      resolveMessage
    };

    const resoRefEdit = this.dialog.open(EditResoModalComponent, this.resolveModalConfig);
    resoRefEdit.componentInstance.resoObj = resoObj;
  }
}
