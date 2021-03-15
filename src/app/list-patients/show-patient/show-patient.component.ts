import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctors } from '@app/@shared/interfaces/doctors.model';
import { Patient } from '@app/@shared/interfaces/patient.model';
import { ListPatientsService } from '../list-patients.service';

export interface UserData {
  id: number;
  name: string;
  registeredDate: string;
  doctor: number;
  homeAddress: number;
}

@Component({
  selector: 'app-show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.scss'],
})
export class ShowPatientComponent implements OnInit {
  patient: Patient;
  doctors: Doctors[];
  title: string;
  mode: string;
  patientId: number;

  constructor(
    private listPatientsService: ListPatientsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.title = 'Patient Info';
    this.mode = 'show';

    this.patientId = +this.activatedRoute.snapshot.paramMap.get('id');

    this.listPatientsService.getSinglePatient(this.patientId).subscribe((data: Patient) => {
      this.patient = data;
    });

    this.listPatientsService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  editPatient(e: any): void {
    const choosenDoktor = e.doctor;
    this.doctors.filter((data) => {
      const element = data.firstName + ' ' + data.lastName + ', ' + data.title;
      if (element === choosenDoktor) {
        e.doctor = data.id;
      }
    });

    console.log('edit patient', e);
  }

  deletePatient(e: boolean): void {
    this.listPatientsService.deleteSinglePatient(this.patientId).subscribe((data) => {
      console.log('data deleted', data);
      this.router.navigateByUrl('/');
    });
  }
}
