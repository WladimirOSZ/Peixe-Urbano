import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "./shared/pedido.model";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class OrdemCompraService {
    constructor(private http: HttpClient){}
    private readonly URL_API = environment.URL_API;

    public efetivarCompra(pedido: Pedido): Observable<number> {
        console.log(pedido);
        return this.http.post(
            `${this.URL_API}pedidos`,
            pedido,
        )
        .pipe(
          map((resposta: any) => resposta.id)
        )
    }
}
