import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service';
import { itemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {


  pedido!: Pedido;
  idPedidoCompra!: number;



  @ViewChild ('formulario') public f! : NgForm;

    confirmarCompra() {
      this.pedido = this.f.value;
      this.ordemCompraService.efetivarCompra(this.pedido)
        .subscribe(
          (idPedido:number)=> {
            this.idPedidoCompra = idPedido;
          }
        )
    }

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    console.log('Array de items do carrinho: ' + this.carrinhoService.exibirItems())
  }
}
