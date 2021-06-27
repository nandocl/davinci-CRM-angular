import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IClientRes } from '../interfaces/client.interface';
import { ClientClass } from '../clases/clientClass';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  backEndPoint: string = 'http://localhost:3000/api/clients/';

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<ClientClass[]>{
    return this.http.get<IClientRes>(this.backEndPoint).pipe(
      map(clients => clients.data.map(cliente => ClientClass.fromJson(cliente)))
    );
  }
  
  postClients(file: File, pos: any[]): Observable<IClientRes>{
    const formData = new FormData();
    formData.append('pos', JSON.stringify(pos));
    formData.append('file', file);
    return this.http.post<IClientRes>(this.backEndPoint, formData);
  }

  deleteClient(clientId: string): Observable<number>{
    return this.http.delete<number>(`${this.backEndPoint}${clientId}`);
  }
}
