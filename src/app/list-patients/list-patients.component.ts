import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patients } from '@app/@shared/interfaces/patients.model';
import { ListPatientsService } from './list-patients.service';

export interface ShowPatient {
  id: number;
  name: string;
  registeredDate: string;
  doctor: string;
  homeAddress: string;
}

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit, AfterViewInit {
  patients: Patients[];
  doctors: Array<any>;

  displayedColumns: string[] = ['name', 'registeredDate', 'doctor', 'homeAddress'];
  dataSource: MatTableDataSource<ShowPatient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private listPatientsService: ListPatientsService) {}

  ngOnInit(): void {
    // this.getData();
  }

  getData(): void {
    this.listPatientsService.getPatients().subscribe((data) => {
      this.patients = data;
      this.listPatientsService.getDoctors().subscribe((data) => {
        this.doctors = data;
        const users = Array.from({ length: this.patients.length - 1 }, (_, k) => this.createNewUser(k));

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  ngAfterViewInit() {
    this.getData();
  }

  onRowClick(row: any): void {
    this.router.navigateByUrl(`list-patients/${row.id}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new Patient to list. */
  createNewUser(i: number): ShowPatient {
    const patientDoctor = this.doctors.find((element) => {
      return element.id === this.patients[i].doctor;
    });
    return {
      id: this.patients[i].id,
      name: this.patients[i].firstName + ' ' + this.patients[i].lastName,
      registeredDate: this.patients[i].registeredDate,
      doctor: patientDoctor.firstName + ' ' + patientDoctor.lastName,
      homeAddress: this.patients[i].addresses[0].street,
    };
  }
}
