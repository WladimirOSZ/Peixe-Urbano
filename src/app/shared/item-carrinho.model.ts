import { OfertaImg } from "./ofertaImg.model"
export interface itemCarrinho{
  id: number,
  img: OfertaImg,
  titulo: string,
  descricao_oferta: string,
  valor: number,
  quantidade: number
}
