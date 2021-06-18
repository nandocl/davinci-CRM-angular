import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name: string = 'Davinci 2021';

  text: string = 'Cra 123A # 45A - 67 Bogotá<br>Telefono (1) 23456<br>Todos los derechos reservados';

  constructor() { }

  ngOnInit(): void {
  }

}
