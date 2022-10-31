import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { debounce, debounceTime, Observable, Subject, switchMap, of, distinctUntilChanged, catchError } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]> | any;
  public ofertas2: Oferta[] = [];
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((termo: string)=> {

          if(termo.trim()===''){
            return of<Oferta[]>([])
          }

          return this.ofertasService.pesquisaOFertas(termo);
        }),
        catchError((erro)=> {
          console.log(erro)
          return of<Oferta[]>([])
        })
      )


    this.ofertas.subscribe((ofertas: Oferta[]) =>  this.ofertas2=ofertas )
  }

  public pesquisa(textoDaBusca: string): void {
    this.subjectPesquisa.next(textoDaBusca)

    // this.ofertas = this.ofertasService.pesquisaOFertas(textoDaBusca);

    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas)
    // )

  }

  public limpaPesquisa(){
    this.subjectPesquisa.next('');
  }
}
