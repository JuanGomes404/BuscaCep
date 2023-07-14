import { NgModule } from '@angular/core';
import { CepInputComponent } from '../../components/cep-input/cep-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CEPService } from 'src/app/services/cep/cep.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    CepInputComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    CepInputComponent
  ],
  providers:[
    CEPService
  ]
})
export class CepInputModule { }
