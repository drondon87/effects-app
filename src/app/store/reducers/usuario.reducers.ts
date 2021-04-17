import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions/';
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuarioState {
    id: string,
    user: Usuario,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuarioInitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state, { id } ) => ({ ...state, loading: true, id, error: null})),
    on(cargarUsuarioSuccess, (state, { usuario }) => ({ 
        ...state, 
        loading: false, 
        loaded: true, 
        user: {...usuario},
        error: null
    })),
    on(cargarUsuarioError, (state, { payload }) => ({ 
        ...state, 
        loading: false, 
        loaded: false, 
        error: {
            status: payload.status,
            url: payload.url,
            name: payload.name,
            message: payload.message
        },
        user: null,
        id: null
    })),
);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}