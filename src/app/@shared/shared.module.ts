import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { SinglePatientComponent } from './components/single-patient/single-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  declarations: [LoaderComponent, SinglePatientComponent],
  exports: [LoaderComponent, SinglePatientComponent],
})
export class SharedModule {}
