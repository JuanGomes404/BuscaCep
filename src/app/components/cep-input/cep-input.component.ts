import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CEPService } from 'src/app/services/cep/cep.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-cep-input',
  templateUrl: './cep-input.component.html',
  styleUrls: ['./cep-input.component.sass'],
})
export class CepInputComponent implements OnInit {
  textoInput: string = 'Insira o CEP...';
  cep: string = '';
  form!: FormGroup;

  constructor(
    private cepService: CEPService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.inicializaForm();

  }

  inicializaForm(): void {
    this.form = this.formBuilder.group({
      cep: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      bairro: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ibge: ['', [Validators.required]],
    });
  }
  preencherCampos(): void {
    if (this.form.controls['cep'].valid) {
      this.buscarCep();
    }
  }

  buscarCep(): void {
    this.cepService
      .buscarCEP(this.form.controls['cep'].value)
      .subscribe((endereco) => {
        console.log(endereco);

        this.popularCampos();
      });
  }
  popularCampos() {
    let endereco = this.cepService.endereco;
    this.form.controls['bairro'].setValue(endereco.bairro);
    this.form.controls['rua'].setValue(endereco.logradouro);
    this.form.controls['cidade'].setValue(endereco.localidade);
    this.form.controls['estado'].setValue(endereco.uf);
    this.form.controls['ibge'].setValue(endereco.ibge);
  }
  limparCampos(): void{
    this.form.controls['bairro'].setValue('');
    this.form.controls['rua'].setValue('');
    this.form.controls['cidade'].setValue('');
    this.form.controls['estado'].setValue('');
    this.form.controls['ibge'].setValue('');
    this.form.controls['cep'].setValue('');
  }
  salvar() {
    this.localStorageService.set(this.cepService.endereco);
  }
  clicouEnter(e: KeyboardEvent){
    if(e.key == 'Enter'){
      this.preencherCampos();
    }
  }

}
