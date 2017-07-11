import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

declare const $: any;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  passwordFormControl = new FormControl('', [
    Validators.required]);

  constructor(
    private router: Router,
    private afService: FirebaseService, ) {

  }

  ngOnInit() {

  }

  loginSubmit() {
    let loginObj = {
      email: this.email,
      password: this.password
    }
    if (loginObj.email === undefined || loginObj.email === '' ||
      EMAIL_REGEX.test(loginObj.email) === false || loginObj.password === undefined
      || loginObj.password === '') {
      return false;
    } else {
      this.afService.login(loginObj.email, loginObj.password);
    }

  }

  registerNav() {
    this.router.navigate(['register']);
  }


}


