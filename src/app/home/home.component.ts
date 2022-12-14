import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {
  ofertas: Oferta[] | any;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    // this.ofertas = this.ofertasService.getOfertras()
    // console.log(this.ofertas);

    this.ofertasService.getOfertas().subscribe(
      (res) => this.ofertas = res,
      (error) => error
    )
  }
}
