import { FirebaseApp } from 'angularfire2/app'
import { Component, OnInit } from '@angular/core'
import { FirebaseService } from '../../services/firebase.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Rx'
import { Router } from '@angular/router'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'
import { AddIssueModalComponent } from '../modals/add-issue-modal/add-issue-modal.component'
import { DeleteIssueModalComponent } from '../modals/delete-issue-modal/delete-issue-modal.component'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  name: any
  issues: any
  addModalConfig = {
    height: '570px',
    width: '570px'
  }

  constructor(private af: AngularFireDatabase,
    private router: Router,
    private dialog: MdDialog,
    private afService: FirebaseService
  ) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName

        // Get Issues
        this.afService.getIssues().subscribe(issues => {
          this.issues = issues

        });
      } else {
        this.router.navigate([''])
      }
    });
  }

  // Add issue
  addIssueModal() {
    this.dialog.open(AddIssueModalComponent, this.addModalConfig)
  }

  // Delete issue
  confirmDeleteIssue(key) {
    const dialogRef = this.dialog.open(DeleteIssueModalComponent)
    dialogRef.componentInstance.key = key
  }

}
