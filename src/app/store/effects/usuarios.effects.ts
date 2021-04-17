import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userActions from '../actions/usuarios.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsuarioService } from "src/app/services/usuario.service";
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

    constructor(private accions$: Actions,
                private _usuarioServices: UsuarioService ){}

    cargarUsuarios$ = createEffect(
        () => this.accions$.pipe(
            ofType(userActions.cargarUsuarios),
            mergeMap(
                () => this._usuarioServices.getUsers().pipe(
                    map(usuarios => userActions.cargarUsuariosSuccess({usuarios}) ),
                    catchError(payload => of(userActions.cargarUsuariosError({payload})))
                )
            )
        )
    );

}