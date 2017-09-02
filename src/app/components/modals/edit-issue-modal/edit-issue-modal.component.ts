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

    const editObj = {
      key: this.editIssueObj.key,
      issueTitle: this.editIssueObj.title,
      startDate: this.editIssueObj.startDate,
      endDate: this.editIssueObj.endDate,
      issueDetails: this.editIssueObj.details,
      selectedPriority: this.editIssueObj.priority
    };

    if (editObj.issueTitle === undefined || editObj.issueTitle === '' ||
      editObj.startDate === undefined || editObj.startDate === null ||
      editObj.endDate === undefined || editObj.endDate === null ||
      editObj.issueDetails === undefined || editObj.issueDetails === '' ||
      editObj.selectedPriority === undefined || editObj.selectedPriority === '') {
      return false;
    } else {
      if (typeof editObj.startDate === 'object') {
        const smonth = editObj.startDate.getMonth() + 1;
        const sday = editObj.startDate.getDate();
        const syear = editObj.startDate.getFullYear();

        const newStartDate = (smonth < 10 ? '0' + smonth : smonth) + '/'
          + ((sday.toString().length === 1) ? '0' + sday.toString() : sday) + '/' + syear;

        editObj.startDate = newStartDate;

      }

      if (typeof editObj.endDate === 'object') {
        const emonth = editObj.endDate.getMonth() + 1;
        const eday = editObj.endDate.getDate();
        const eyear = editObj.endDate.getFullYear();

        const newEndtDate = (emonth < 10 ? '0' + emonth : emonth) + '/'
          + ((eday.toString().length === 1) ? '0' + eday.toString() : eday) + '/' + eyear;

        editObj.endDate = newEndtDate;

      }

      if (this.afService.editIssue(editObj)) {
        this.dialog.closeAll();
      } else {
        return false;
      }
    }


  }
}
