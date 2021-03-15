import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctors } from '@app/@shared/interfaces/doctors.model';
import { Patient } from '@app/@shared/interfaces/patient.model';
import { AddPatientService } from './add-patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  doctors: Doctors[];
  title: string;
  mode: string;

  constructor(private addPatientService: AddPatientService, private router: Router) {}

  ngOnInit(): void {
    this.title = 'Add new Patient';
    this.mode = 'new';
    this.addPatientService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  savePatient(e: any): void {
    const choosenDoktor = e.doctor;
    this.doctors.filter((data) => {
      const element = data.firstName + ' ' + data.lastName + ', ' + data.title;
      if (element === choosenDoktor) {
        e.doctor = data.id;
      }
    });

    this.addPatientService.savePatient(e).subscribe((data) => {
      this.router.navigateByUrl('/');
      console.log('SAVED FORM', data);
    });
  }
}
