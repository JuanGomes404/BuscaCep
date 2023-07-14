import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DetalhesEndereco } from 'src/app/model/Endereco/DetalhesEndereco';

@Injectable({
  providedIn: 'root',
})
export class CEPService {
  private BASE_URL: string = 'https://viacep.com.br/ws';
  private enderecoRES!: DetalhesEndereco;
  constructor(private http: HttpClient) {}

  buscarCEP(cep: string): Observable<DetalhesEndereco> {
    return this.http
      .get<DetalhesEndereco>(`${this.BASE_URL}/${cep}/json/`)
      .pipe(tap((data: DetalhesEndereco) => (this.enderecoRES = data)));
  }

  get endereco(): DetalhesEndereco{
    return this.enderecoRES;
  }
}
