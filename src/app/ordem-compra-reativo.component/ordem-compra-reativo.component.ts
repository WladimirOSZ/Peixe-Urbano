import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service';
import { Pedido } from '../shared/pedido.model'
import { itemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra-reativo',
  templateUrl: './ordem-compra-reativo.component.html',
  styleUrls: ['./ordem-compra-reativo.component.scss'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraReativoComponent implements OnInit {

  idPedidoCompra!: number;

  public itemsCarrinho: itemCarrinho[] = []




  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder
  ) { }

  public formulario: FormGroup = this.formBuilder.group({
    'endereco': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    'numero': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    'complemento': [null],
    'formaPagamento': [null, Validators.required]
  });

  ngOnInit() {
    this.itemsCarrinho = this.carrinhoService.exibirItems()
  }

  public confirmarCompra(): void {
    if(!this.formulario.valid){
      this.formulario.get('endereco')?.markAsTouched();
      this.formulario.get('numero')?.markAsTouched();
      this.formulario.get('formaPagamento')?.markAsTouched();
      return;
    }


    if(this.carrinhoService.exibirItems().length === 0){
      alert('nenhum item selecionado')
    }else{
      //let pedido: Pedido = this.formulario.value;
      let pedido = {
        items: this.itemsCarrinho,
        ...this.formulario.value
      }
      this.ordemCompraService.efetivarCompra(pedido).subscribe(
        (idPedido: number) => {
          this.idPedidoCompra=idPedido;
        }
      )
      this.carrinhoService.limparCarrinho();
    }


  }

  adicionar(item: itemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item);
  }
  remover(item: itemCarrinho) {
    this.carrinhoService.diminuirQuantidade(item);
  }
}
