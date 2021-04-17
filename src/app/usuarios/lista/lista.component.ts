import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from '../../store/app.reducers';
import * as userActions from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit , OnDestroy {

  lista : Usuario[] = [];
  loading: boolean = false;
  error: any;
  usuariosSubs: Subscription;

  /* constructor(private _usuarioService: UsuarioService) { } */
  constructor(private store: Store<AppState>) { }
 
  ngOnInit() {
    this.store.dispatch(userActions.cargarUsuarios());
    this.usuariosSubs = this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.lista = users;
      this.loading = loading;
      this.error = error;
    });
    /* this._usuarioService.getUsers()
        .subscribe(users => this.lista = users); */
  }

  ngOnDestroy(): void {
    this.usuariosSubs.unsubscribe();
  }

}
