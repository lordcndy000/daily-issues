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
  selector: 'app-edit-reso-modal',
  templateUrl: './edit-reso-modal.component.html',
  styleUrls: ['./edit-reso-modal.component.css']
})
export class EditResoModalComponent implements OnInit {
  public resoObj: any;
  resolution: any;

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
    public resoRefEdit: MdDialogRef<EditResoModalComponent>) { }

  ngOnInit() {
  }

  editResolution() {
    let editResoObj = {
      key: this.resoObj.key,
      resolution: this.resoObj.resolveMessage
    }

    if(editResoObj.resolution === undefined || editResoObj.resolution === '' ) {
      return false;
    } else {
      if(this.afService.editResolution(editResoObj.key, editResoObj.resolution)) {
        this.dialog.closeAll();
      } else {
        return false;
      }
    }
  }
}
