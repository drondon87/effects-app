import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as userActions from '../actions/';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsuarioService } from "src/app/services/usuario.service";
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    constructor(private accions$: Actions,
                private _usuarioServices: UsuarioService ){}

    cargarUsuario$ = createEffect(
        () => this.accions$.pipe(
            ofType(userActions.cargarUsuario),
            mergeMap(
                (action) => this._usuarioServices.getUserById(action.id).pipe(
                    map(usuario => userActions.cargarUsuarioSuccess({usuario}) ),
                    catchError(payload => of(userActions.cargarUsuarioError({payload})))
                )
            )
        )
    );

}