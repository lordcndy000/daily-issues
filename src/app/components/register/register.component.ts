import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PasswordValidationComponent } from '../password-validation/password-validation.component';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private afService: FirebaseService,
              private router: Router,
              private fb: FormBuilder) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: ['', Validators.required]
    }, {
        validator: PasswordValidationComponent.MatchPassword // your validation method
      })
  }

  ngOnInit() {
  }

  registerSubmit() {
    let registerInfo = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    if (registerInfo.name === undefined || registerInfo.name === '' ||
      registerInfo.email === undefined || registerInfo.email === '' || EMAIL_REGEX.test(registerInfo.email) === false ||
      registerInfo.password === undefined || registerInfo.password === '' ||
      registerInfo.password !== registerInfo.confirmPassword ||
      registerInfo.password.length < 8) {
      return false;
    } else {
      this.afService.register(registerInfo.email, registerInfo.password, registerInfo.name);

    }
  }
}
