import { Component, OnInit } from '@angular/core';
import { ClientClass } from '../../clases/clientClass';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  clientes: ClientClass[] = [];

  constructor(
    private httpService: HttpServiceService,
  ) { }

  ngOnInit(): void {
    this.httpService.getClients().subscribe(clientes => this.clientes = clientes);
  }

}
