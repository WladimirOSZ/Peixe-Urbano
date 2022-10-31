import { itemCarrinho } from "./item-carrinho.model";

export interface Pedido {
  endereco: string,
  numero: string,
  complemento: string,
  formaPagamento: string,
  items: Array<itemCarrinho>
}
