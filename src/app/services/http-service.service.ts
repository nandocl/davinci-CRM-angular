import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IClientRes } from '../interfaces/client.interface';
import { ClientClass } from '../clases/clientClass';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  backEndPoint: string = 'http://localhost:3000/api/clients/';

  constructor(
    private http: HttpClient
  ) { }

  getClients(){
    return this.http.get<IClientRes>(this.backEndPoint).pipe(
      map(clients => clients.data.map(cliente => ClientClass.fromJson(cliente)))
    );
  }

  postClients(file: File, pos: number[]){
    const formData = new FormData();
    formData.append('pos', JSON.stringify(pos));
    formData.append('file', file);
    return this.http.post<IClientRes>(this.backEndPoint, formData);
  }

  deleteClient(clientId: string){
    return this.http.delete(`${this.backEndPoint}${clientId}`);
  }
}
