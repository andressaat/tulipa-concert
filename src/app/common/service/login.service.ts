import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router
  ) {}

  validarLogin(dados){
    if(dados.login === "concert" && dados.password === "prova"){
      this.loggedIn.next(true);
      this.router.navigate([''])
    }
  }
}
