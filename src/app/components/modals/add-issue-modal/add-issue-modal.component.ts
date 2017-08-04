import { Component, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MdDialog } from '@angular/material'
import { DateAdapter, MdDatepicker } from '@angular/material'
import { FirebaseService } from '../../../services/firebase.service'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.css']
})

export class AddIssueModalComponent implements OnInit {

  selectedPriority: string
  priorities = [
    { value: 'Low', viewValue: 'Low' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'High', viewValue: 'High' }
  ]
  issueTitle: string
  startDate: any
  endDate: any
  issueDetails: any
  isResolved: boolean
  // Date Picker options
  minDate = new Date(2017, 6, 1)
  maxDate = new Date(2020, 0, 1)

  issueFormControl = new FormControl('', [
    Validators.required])

  dateStart = new FormControl('', [
    Validators.required])

  dateEnd = new FormControl('', [
    Validators.required])

  issuePriority = new FormControl('', [
    Validators.required])

  // TinyMCE config
  options: Object = {
    charCounterCount: false,
    pluginsEnabled: ['lists', 'specialCharacters'],
    height: 160,
    toolbarButtons: ['bold', 'italic', 'underline', 'formatOL', 'formatUL', 'specialCharacters']
  }

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
      isResolved = false
    if (issueTitle === undefined || issueTitle === '' ||
      startDate === undefined || startDate === null ||
      endDate === undefined || endDate === null ||
      issueDetails === undefined || issueDetails === '' ||
      selectedPriority === undefined || selectedPriority === '') {
      return false
    } else {
      // Work with the dates
      // Start
      const toStringStart = JSON.stringify(startDate).replace(/"/g, '').substring(0, 10)
      const startYear = toStringStart.substring(0, 4)
      const startMonth = toStringStart.substring(5, 7)
      const startDay = toStringStart.substring(8, 10)
      const startDaytoInt = parseInt(startDay, 10)
      const startDayResult = startDaytoInt + 1

      // End
      const toStringEnd = JSON.stringify(endDate).replace(/"/g, '').substring(0, 10)
      const endYear = toStringEnd.substring(0, 4)
      const endMonth = toStringEnd.substring(5, 7)
      const endDay = toStringEnd.substring(8, 10)
      const endDaytoInt = parseInt(endDay, 10)
      const endDayResult = endDaytoInt + 1

      const toDateStart = startMonth + '/' + startDayResult.toString() + '/' + startYear
      const toDateEnd = endMonth + '/' + endDayResult.toString() + '/' + endYear


      const user = firebase.auth().currentUser
      if (user) {
        const issueObj = {
          userId: user.uid,
          title: issueTitle,
          startDate: toDateStart,
          endDate: toDateEnd,
          details: issueDetails,
          priority: selectedPriority,
          isResolved: isResolved
        }


        if (this.afService.addIssue(issueObj)) {
          this.dialog.closeAll()
        } else {
          return false
        }
      } else {
        return false
      }

    }

  }

}
