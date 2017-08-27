import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DateAdapter, MdDatepicker } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { FirebaseService } from '../../../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-issue-modal',
  templateUrl: './edit-issue-modal.component.html',
  styleUrls: ['./edit-issue-modal.component.css']
})
export class EditIssueModalComponent implements OnInit {
  public editIssueObj: any;
  selectedPriority: string;
  priorities = [
    { value: '1', viewValue: 'Low' },
    { value: '2', viewValue: 'Medium' },
    { value: '3', viewValue: 'High' }
  ];
  issueTitle: string;
  startDate: any;
  endDate: any;
  issueDetails: any;
  isResolved: boolean;
  // Date Picker options
  // minDate = new Date(2017, 6, 1);
  // maxDate = new Date(2020, 0, 1);

  issueFormControl = new FormControl('', [Validators.required]);

  dateStart = new FormControl('', [Validators.required]);

  dateEnd = new FormControl('', [Validators.required]);

  issuePriority = new FormControl('', [Validators.required]);

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

  constructor(
    private afService: FirebaseService,
    private dialog: MdDialog,
    public dialogRefEdit: MdDialogRef<EditIssueModalComponent>
  ) { }

  ngOnInit() { }
  editIssueSubmit() {

    let editObj = {
      key: this.editIssueObj.key,
      issueTitle: this.editIssueObj.title,
      startDate: this.editIssueObj.startDate,
      endDate: this.editIssueObj.endDate,
      issueDetails: this.editIssueObj.details,
      selectedPriority: this.editIssueObj.priority
    }

    if (editObj.issueTitle === undefined || editObj.issueTitle === '' ||
      editObj.startDate === undefined || editObj.startDate === null ||
      editObj.endDate === undefined || editObj.endDate === null ||
      editObj.issueDetails === undefined || editObj.issueDetails === '' ||
      editObj.selectedPriority === undefined || editObj.selectedPriority === '') {
      return false;
    } else {
      if (typeof editObj.startDate === 'object') {
        const toStringStart = JSON.stringify(editObj.startDate).replace(/"/g, '').substring(0, 10);
        const startYear = toStringStart.substring(0, 4);
        const startMonth = toStringStart.substring(5, 7);
        const startDay = toStringStart.substring(8, 10);
        const startDaytoInt = parseInt(startDay, 10);

        let startDayResult;
        if (startDaytoInt < 31) {
          startDayResult = startDaytoInt + 1;
        }

        const toDateStart = startMonth + '/' + startDayResult.toString() + '/' + startYear;

        editObj.startDate = toDateStart;

      }

      if (typeof editObj.endDate === 'object') {
        const toStringEnd = JSON.stringify(editObj.endDate).replace(/"/g, '').substring(0, 10);
        const endYear = toStringEnd.substring(0, 4);
        const endMonth = toStringEnd.substring(5, 7);
        const endDay = toStringEnd.substring(8, 10);
        const endDaytoInt = parseInt(endDay, 10);

        let endDayResult;
        if (endDaytoInt < 31) {
          endDayResult = endDaytoInt + 1;
        }
        const toDateEnd = endMonth + '/' + endDayResult.toString() + '/' + endYear;

        editObj.endDate = toDateEnd;

      }

      if (this.afService.editIssue(editObj)) {
        this.dialog.closeAll();
      } else {
        return false;
      }
    }


  }
}
