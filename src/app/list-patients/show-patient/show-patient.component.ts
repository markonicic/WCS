import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  patient: any;
  patientDoctor: any;
  patientData: Array<any>;
  doctors: Array<any>;

  constructor(private listPatientsService: ListPatientsService, private router: Router) {}

  ngOnInit(): void {
    const singleData = this.listPatientsService.singlePatient;
    if (singleData) {
      this.patientData = this.listPatientsService.getPatients();
      this.doctors = this.listPatientsService.getDoctors();
      this.patient = this.patientData.find((element) => {
        return element.id === singleData.id;
      });
      this.patientDoctor = this.doctors.find((element) => {
        return element.id === this.patient.doctor;
      });
    } else {
      this.router.navigateByUrl('list-patients');
    }
  }
}
