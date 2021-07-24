import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class TemplateDrivenComponent implements OnInit {
  user = {
    username: "Max Mustermann",
    email: "max.mustermann@beispiel.com",
    password: "test",
    gender: "male"
  }

  genders = ["male", "female"];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    console.log(f);
    f.resetForm();
  }

}
