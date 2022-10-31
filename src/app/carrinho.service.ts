import { Injectable } from '@angular/core';
import { itemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public items: itemCarrinho[] = [];

  itemCarrinho!: itemCarrinho;

  constructor() {
  }

  exibirItems() {
    return this.items;
  }

  incluirItem(oferta: Oferta){
    console.log(oferta);

    this.itemCarrinho = {
      id: oferta.id,
      img: oferta.imagens[0],
      titulo: oferta.titulo,
      descricao_oferta: oferta.descricao_oferta,
      valor: oferta.valor,
      quantidade: 1
    }

    let itemCarrinhoEncontrado = this.items.find((item: itemCarrinho) => item.id === this.itemCarrinho.id);

    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade+=1;
      return
    }

    this.items.push(this.itemCarrinho);
  }

  totalCarrinhoCompras(): number{
    let total: number = 0;

    this.items.map((item:itemCarrinho) => {
      total = total+ (item.valor * item.quantidade)
    });
    return total;
  }

  adicionarQuantidade(item: itemCarrinho) {
    let itemCarrinhoEncontrado = this.items.find((item: itemCarrinho) => item.id === this.itemCarrinho.id);

    if(itemCarrinhoEncontrado){
      itemCarrinhoEncontrado.quantidade+=1;
    }
  }

  diminuirQuantidade(item: itemCarrinho) {
    let itemCarrinhoEncontrado = this.items.find((item: itemCarrinho) => item.id === this.itemCarrinho.id);

    if(itemCarrinhoEncontrado){
      if(itemCarrinhoEncontrado.quantidade===1){
        this.items.splice(this.items.indexOf(itemCarrinhoEncontrado),1);
      }
      itemCarrinhoEncontrado.quantidade-=1;
    }
  }

  limparCarrinho(): void{
    this.items=[];
  }
}
