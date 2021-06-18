import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cargar-page',
  templateUrl: './cargar-page.component.html',
  styleUrls: ['./cargar-page.component.css']
})
export class CargarPageComponent implements OnInit {

  mainFile?: File;
  splitChar: string = ',';
  showDataInput: boolean = true;

  formGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    lastnameControl: new FormControl('', [Validators.required]),
    phoneControl: new FormControl('', [Validators.required]),
    addresControl: new FormControl('', [Validators.required]),
    charSplit: new FormControl(','),
    word: new FormControl({value: '', disabled: this.showDataInput}),
    file: new FormControl('')
  });

  constructor(
    private httpService: HttpServiceService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) this.mainFile = event.target.files[0];
  }

  palabra(state: boolean){
    this.showDataInput = state;
    if(!state) this.formGroup.get('word')?.enable()
    else this.formGroup.get('word')?.disable()
  }

  clientAction(){
    let items = this.formGroup.controls
    let cht = this.showDataInput? this.formGroup.controls.charSplit.value : this.formGroup.controls.word.value;
    let list: number[] = [items.nameControl.value,items.lastnameControl.value,items.phoneControl.value,items.addresControl.value, cht];
    let file;
    if(this.mainFile != undefined)  {
      file = this.mainFile;
      this.httpService.postClients(file, list).subscribe(data => {
        if(data.msg == 'loaded') this.toast.showMsgGood('Clientes cargados correctamente');
        this.formGroup.reset();
        this.formGroup.controls.charSplit.setValue(',');
      });
    }
  }

}
