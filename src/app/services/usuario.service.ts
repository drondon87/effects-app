import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'https://reqres.in/api';

  constructor(private _http: HttpClient) { }

  getUsers(){
    return this._http.get(`${this.URL}/users?page=2`)
      .pipe(
        map(resp => resp['data'] )
      );
  }

}
