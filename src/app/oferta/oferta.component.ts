import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  idOferta: number = -1;
  oferta: Oferta[] | any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) {

   }

  ngOnInit(): void {
    //console.log(`id: `+ this.route.snapshot.params['id']);
    this.route.params.subscribe((parametro: any)=> {
      this.idOferta=parametro.id;
      this.ofertasService.getOferta(this.idOferta).subscribe(
        (res: any)=> {this.oferta=res[0]; },
        (error)=>error
      )
    });
  }

  adicionarItemCarrinho(){
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItems());
  }

}
