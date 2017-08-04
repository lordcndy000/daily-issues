import { Injectable } from '@angular/core'
import { Component } from '@angular/core'
import { MdDialog, MdDialogConfig } from '@angular/material'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database'
import { ifError } from 'assert'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Rx'
import { User, Issue } from '../interfaces/interface'

@Injectable()
export class FirebaseService {
  users: FirebaseListObservable<any[]>
  // user: FirebaseObjectObservable<any>
  issues: FirebaseListObservable<any[]>
  // issue: FirebaseObjectObservable<any>

  constructor(private dialog: MdDialog, private router: Router, private af: AngularFireDatabase) {
    this.users = this.af.list('/users') as FirebaseListObservable<User[]>
    this.issues = this.af.list('/issues') as FirebaseListObservable<Issue[]>
  }

  // Register
  register(email, password, name) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Create the object to be pushed to '/users' collection
        const userDataObj = {
          userId: user.uid,
          email: user.email,
          name: name
        }
        // push the object
        this.users.push(userDataObj)
        this.dialog.open(RegisterSuccessDialog)
        this.router.navigate([''])
        // firebase automatically signs in the user
      }).then(() => {
        // update the user profile
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: name,
          photoURL: ''
        }).then(() => {
          console.log(user.displayName)
        }, (error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        // handle errors
        const errorCode = error['code']
        if (errorCode === 'auth/email-already-in-use') {
          this.dialog.open(UserExistsDialog)
        }
      })
  }

  // Login
  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['dashboard'])
      })
      .catch((error) => {
        const errorCode = error['code']
        switch (errorCode) {
          case 'auth/user-disabled':
            this.dialog.open(UserDisabledDialog)
            break
          case 'auth/user-not-found':
            this.dialog.open(UserNotFoundDialog)
            break
          case 'auth/wrong-password':
            this.dialog.open(WrongPasswordDialog)
            break
        }

      })
  }

  // get Issues
  getIssues() {
    const user = firebase.auth().currentUser
    if (user) {
      return this.af.list('/issues', {
        query: {
          orderByChild: 'userId',
          equalTo: user.uid
        }
      }) as FirebaseListObservable<Issue[]>
    } else {
      this.router.navigate([''])
    }
  }

  // add issue
  addIssue(issueObj) {
    return this.issues.push(issueObj)
  }

  // delete issue
  deleteIssue(key) {
    return this.issues.remove(key)
  }

}

// Dialog
// Login

// Wrong password
@Component({
  selector: 'app-wrong-password-dialog',
  templateUrl: './dialog/wrong-password.html',
  styleUrls: ['./dialog/dialogstyles.css']
})

export class WrongPasswordDialog { }

// User not found
@Component({
  selector: 'app-user-not-found-dialog',
  templateUrl: './dialog/user-not-found.html',
  styleUrls: ['./dialog/dialogstyles.css']
})

export class UserNotFoundDialog {
  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['register'])
  }
}

// User disabled
@Component({
  selector: 'app-user-disabled-dialog',
  templateUrl: './dialog/user-disabled.html',
  styleUrls: ['./dialog/dialogstyles.css']
})

export class UserDisabledDialog { }

// Register
// If email already exists
@Component({
  selector: 'app-user-exists-dialog',
  templateUrl: './dialog/user-exists.html',
  styleUrls: ['./dialog/dialogstyles.css']
})

export class UserExistsDialog { }

// If success
@Component({
  selector: 'app-register-suvvess',
  templateUrl: './dialog/register-success.html',
  styleUrls: ['./dialog/dialogstyles.css']
})

export class RegisterSuccessDialog { }