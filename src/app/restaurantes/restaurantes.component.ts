import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Oferta[] | any;

  constructor( private ofertasService: OfertasService ) {
    this.ofertasService.getOfertasPorCategoria('restaurante').subscribe(
      (res) => this.restaurantes = res,
      (error) => error
    )
  }
  ngOnInit(): void {
  }

}
