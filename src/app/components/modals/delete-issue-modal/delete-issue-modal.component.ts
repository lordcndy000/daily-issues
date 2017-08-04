import { Component, OnInit } from '@angular/core'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'
import { FirebaseService } from '../../../services/firebase.service'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-delete-issue-modal',
  templateUrl: './delete-issue-modal.component.html',
  styleUrls: ['./delete-issue-modal.component.css']
})
export class DeleteIssueModalComponent implements OnInit {
  public key: any;


  constructor(private afService: FirebaseService,
    private dialog: MdDialog,
    public dialogRef: MdDialogRef<DeleteIssueModalComponent>) { }

  ngOnInit() {

  }

  deleteIssue(key) {
    this.afService.deleteIssue(key)
  }
}
