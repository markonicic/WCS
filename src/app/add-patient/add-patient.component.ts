import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddPatientService } from './add-patient.service';

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  checked = false;

  advancedForm: FormGroup;

  doctors: Doctor[];

  addressTypes = [
    { key: 'Home', value: 'HOME' },
    { key: 'Second Home', value: 'SECOND_HOME' },
    { key: 'Work', value: 'WORK' },
    { key: 'Holiday', value: 'HOLIDAY' },
    { key: 'Relative', value: 'RELATIVE' },
  ];

  maxDate = new Date();

  constructor(private fb: FormBuilder, private addPatientService: AddPatientService, private router: Router) {}

  ngOnInit(): void {
    this.doctors = this.addPatientService.getDoctors();
    this.initForm();
  }

  get f(): FormArray {
    return this.advancedForm.get('homeAddress') as FormArray;
  }

  onAddAddress(): void {
    this.f.push(this.newFormAddress());
  }

  savePatient(): void {
    this.addPatientService.savePatient(this.advancedForm.value).subscribe((data) => {
      this.router.navigateByUrl('/');
      console.log('SAVED FORM', data);
    });
  }

  initForm() {
    this.advancedForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      vatCode: [''],
      email: ['', [Validators.required, Validators.email]],
      doctor: [''],
      homeAddress: this.fb.array([this.newFormAddress()]),
    });
  }

  /**
   * Add new address block to form array
   * @return FormGroup
   */
  newFormAddress(): FormGroup {
    return this.fb.group({
      type: new FormControl('HOME'),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9\s]+$/)]),
      city: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
    });
  }
}
