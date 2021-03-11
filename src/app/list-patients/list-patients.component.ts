import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ListPatientsService } from './list-patients.service';

export interface UserData {
  id: number;
  name: string;
  registeredDate: string;
  doctor: string;
  homeAddress: number;
}

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit, AfterViewInit {
  data: any;
  doctors: Array<any>;

  displayedColumns: string[] = ['name', 'registeredDate', 'doctor', 'homeAddress'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private listPatientsService: ListPatientsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data = this.listPatientsService.getPatients();
    this.doctors = this.listPatientsService.getDoctors();
    const users = Array.from({ length: this.data.length - 1 }, (_, k) => this.createNewUser(k));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClick(row: any): void {
    this.listPatientsService.singlePatient = row;
    this.router.navigateByUrl(`list-patients/${row.id}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Builds and returns a new User. */
  createNewUser(i: number): UserData {
    const patientDoctor = this.doctors.find((element) => {
      return element.id === this.data[i].doctor;
    });
    return {
      id: this.data[i].id,
      name: this.data[i].firstName + ' ' + this.data[i].lastName,
      registeredDate: this.data[i].registeredDate,
      doctor: patientDoctor.firstName + ' ' + patientDoctor.lastName,
      homeAddress: this.data[i].addresses[0].street,
    };
  }
}
