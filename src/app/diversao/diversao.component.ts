import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.scss']
})
export class DiversaoComponent implements OnInit {
  diversao: Oferta[] | any;

  constructor(private ofertaService: OfertasService) {
    this.ofertaService.getOfertasPorCategoria('diversao').subscribe(
      (res) => this.diversao = res,
      (error) => error
    )
  }

  ngOnInit(): void {

  }

}
