import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { tap, lastValueFrom, last, Observable, Observer, map, catchError, throwError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }

    private readonly API = environment.URL_API;


  public getOfertas(): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.API}ofertas?destaque=true`)
      .pipe(
        res => res,
        error => error
      )
  }

  public getOfertasPorCategoria(categoria: string): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.API}ofertas?categoria=${categoria}`)
      .pipe(
        res => res,
        error => error
      )
  }

  public getOferta(id: number): Observable<Oferta>{
    return this.http.get<Oferta>(`${this.API}ofertas?id=${id}`)
    .pipe(
      res => res,
      error => error
    )
  }

  public pesquisaOFertas(termo: string): Observable<Oferta[]>{
    return this.http.get(`${this.API}ofertas?descricao_oferta_like=${termo}`)

      .pipe(
        retry(5),
        map((resposta: any) => resposta ),
        catchError((error: any)=> throwError(()=>"Algo deu errado!"))
      )
  }

  // public getOfertas2(): Promise<Oferta[]>{
  //   return new Promise( (resolve, reject) =>{
  //     //algum tipo de processamento que ao finalizar, chama o resolve ou reject
  //     let worked = false;

  //     console.log('passou por aqui');
  //     if(worked)
  //       setTimeout(()=> resolve(this.ofertas), 3000)
  //       // resolve(this.ofertas)
  //     else
  //       reject({codigo_erro: 404, mensagem_erro: 'Erro interno, tente novamente mais tarde'})
  //   })
  //   // .then( (ofertas: Oferta[] ) => {
  //   //   console.log('primeiro then');
  //   //   return ofertas
  //   // })

  // }
}
