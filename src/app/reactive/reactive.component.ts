import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class ReactiveComponent implements OnInit {
  myForm: FormGroup;
  genders = ["male", "female"];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   "userData": new FormGroup({
    //     "username": new FormControl(null, Validators.required),
    //     "email": new FormControl(null, [
    //       Validators.required,
    //       Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])
    //     }),      
    //   "password": new FormControl(null, Validators.required),
    //   "gender": new FormControl("male"),
    //   "hobbies": new FormArray([
    //     new FormControl("Cooking", Validators.required)
    //   ])
    // });

    this.myForm = this.formBuilder.group({
      "userData": this.formBuilder.group({
        "username": this.formBuilder.control(null, [
          Validators.required, this.exampleValidator
        ]),
        "email": this.formBuilder.control(null, [
          Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ])
      }),
      "password": [null, Validators.required],
      "gender": ["male"],
      "hobbies": this.formBuilder.array([
        [null, Validators.required, this.asyncExampleValidator]
      ])
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if(control.value == "example"){
      return {example: true};
    }

    return null;
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value == "exmaple"){
            resolve({asyncExample: true});
          }

          resolve(null);
        }, 1500);
      }
    );

    return promise;
  }

  onSubmit(){
    console.log(this.myForm);
    this.myForm.reset();
  }

  get hobbiesFormGroups(){
    return this.myForm.get("hobbies") as FormArray;
  }

  onAddHobby(value: string){
    this.hobbiesFormGroups.push(new FormControl(value, Validators.required));
  }

}
