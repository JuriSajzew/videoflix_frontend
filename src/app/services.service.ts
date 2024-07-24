import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  logIn(){
    console.log('Es hat funktioniert!');
  }
}
