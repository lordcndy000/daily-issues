import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-resolve-issue-modal',
  templateUrl: './resolve-issue-modal.component.html',
  styleUrls: ['./resolve-issue-modal.component.css']
})
export class ResolveIssueModalComponent implements OnInit {
  public resolveObj: any;
  resolveMessage: any;

  // TinyMCE config
  options: Object = {
    charCounterCount: false,
    pluginsEnabled: ['lists', 'specialCharacters'],
    height: 160,
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'formatOL',
      'formatUL',
      'specialCharacters'
    ]
  };
  constructor(private afService: FirebaseService,
    private dialog: MdDialog,
    public resolveRefEdit: MdDialogRef<ResolveIssueModalComponent>) { }

  ngOnInit() {
  }

  resolveIssue() {
    let resolveObj = {
      key: this.resolveObj.key,
      isResolved: true,
      resolveMessage : this.resolveMessage
    };

    if (resolveObj.resolveMessage === undefined || resolveObj.resolveMessage === '') {
      return false;

    } else {
      if (this.afService.resolveIssue(resolveObj)) {
        this.dialog.closeAll();
      } else {
        return false;
      }
    }
  }
}
