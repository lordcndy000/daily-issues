import { toArray } from 'rxjs/operator/toArray';
// import { FirebaseApp } from 'angularfire2/app';
import { Component, OnInit, NgModule } from '@angular/core';
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
  selectedIssue: boolean;
  selectedIssues: Array<any> = [];

  selectedAll: any;

  triggerSelectOpts: boolean;

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
          for (let i = 0; i < issues.length; i++) {
            issues[i]['selected'] = false;
          }
          // console.log(issues)

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
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    this.dateToday = (month < 10 ? '0' + month : month) + '/' + ((day.toString().length === 1) ? '0' + day.toString() : day) + '/' + year;

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

  // Archive issue
  archiveIssue(key) {
    this.afService.archiveIssue(key);
  }

  // Select all
  selectAll() {
    this.selectedIssues.splice(0, this.selectedIssues.length)
    if (this.triggerSelectOpts === true) {
      this.triggerSelectOpts = false;
      for (let i = 0; i < this.issues.length; i++) {
        this.issues[i].selected = false;
        this.selectedIssues.splice(0, this.selectedIssues.length)
      }
    } else {
      this.triggerSelectOpts = true;
      for (let i = 0; i < this.issues.length; i++) {
        this.issues[i].selected = this.selectedAll;
        this.selectedIssues.push(this.issues[i].$key);
      }
    }

    console.log(this.selectedIssues)

  }
  selectAllBtn() {
    if (this.selectedAll === true) {
      this.selectedAll = false;
    } else {
      this.selectedAll = true;
    }
    this.selectAll();
  }

  checkIfAllSelected(key) {
    if (this.selectedIssues.indexOf(key) === -1) {
      this.selectedIssues.push(key)
    } else {
      for (let i = this.selectedIssues.length - 1; i >= 0; i--) {
        if (this.selectedIssues[i] === key) {
          this.selectedIssues.splice(i, 1);
        }
      }
    }
    console.log(this.selectedIssues)
  }

  selected(key) {
    console.log(key);
  }

  // Select today
  selectToday() {
    console.log('today');
  }

  // Select resolved
  selectResolved() {
    console.log('resolved');
  }

  // Select low
  selectLow() {
    console.log('low');
  }

  // Select medium
  selectMid() {
    console.log('medium');
  }

  // Select high
  selectHigh() {
    console.log('high');
  }

  //  Delete selected
  deleteSelected() {
    const filterSelectedIssues = [...new Set(this.selectedIssues)];
    
  }

  // Select issue
  // selectIssue(key) {
  //   this.triggerSelectOpts = true;
  //   this.selectedIssues.push(key);
  //   console.log(this.selectedIssues);
  // }

  // Unselect/Select all using the head checkbox
  selectAllBox() {
    if (this.triggerSelectOpts === true) {
      this.triggerSelectOpts = false;
    } else {
      this.triggerSelectOpts = true;
    }
  }
}
