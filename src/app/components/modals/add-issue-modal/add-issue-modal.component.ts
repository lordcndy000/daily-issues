import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { DateAdapter, MdDatepicker } from '@angular/material';
import { FirebaseService } from '../../../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.css']
})

export class AddIssueModalComponent implements OnInit {

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
  archived: boolean;
  // Date Picker options
  minDate = new Date(2017, 6, 1);
  maxDate = new Date(2022, 0, 1);

  issueFormControl = new FormControl('', [
    Validators.required]);

  dateStart = new FormControl('', [
    Validators.required]);

  dateEnd = new FormControl('', [
    Validators.required]);

  issuePriority = new FormControl('', [
    Validators.required]);

  // TinyMCE config
  options: Object = {
    charCounterCount: false,
    pluginsEnabled: ['lists', 'specialCharacters'],
    height: 160,
    toolbarButtons: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'specialCharacters']
  };

  constructor(private afService: FirebaseService,
    private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  addIssueSubmit() {
    const issueTitle = this.issueTitle,
      startDate = this.startDate,
      endDate = this.endDate,
      issueDetails = this.issueDetails,
      selectedPriority = this.selectedPriority,
      isResolved = false,
      archived = false;
    if (issueTitle === undefined || issueTitle === '' ||
      startDate === undefined || startDate === null ||
      endDate === undefined || endDate === null ||
      issueDetails === undefined || issueDetails === '' ||
      selectedPriority === undefined || selectedPriority === '') {
      return false;
    } else {
      // Work with dates
      const smonth = startDate.getMonth() + 1;
      const sday = startDate.getDate();
      const syear = startDate.getFullYear();

      const emonth = startDate.getMonth() + 1;
      const eday = startDate.getDate();
      const eyear = startDate.getFullYear();

      const newStartDate = (smonth < 10 ? '0' + smonth : smonth) + '/'
        + ((sday.toString().length === 1) ? '0' + sday.toString() : sday) + '/' + syear;

      const newEndtDate = (emonth < 10 ? '0' + emonth : emonth) + '/'
        + ((eday.toString().length === 1) ? '0' + eday.toString() : eday) + '/' + eyear;

      const user = firebase.auth().currentUser;

      if (user) {
        const issueObj = {
          userId: user.uid,
          title: issueTitle,
          startDate: newStartDate,
          endDate: newEndtDate,
          details: issueDetails,
          priority: selectedPriority,
          isResolved: isResolved,
          resolveMessage: '',
          timeStamp: Date.now(),
          archived: archived
        };


        if (this.afService.addIssue(issueObj)) {
          this.dialog.closeAll();
        } else {
          return false;
        }
      } else {
        return false;
      }

    }

  }

}
