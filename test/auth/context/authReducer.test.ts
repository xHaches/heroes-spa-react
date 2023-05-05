import { describe, test, expect } from 'vitest'
import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {

    const initialState = {logged: false}

    test('Debe retornar el estado por defecto', () => {
        const defaultState = authReducer(initialState, {type: types.default});
        expect(defaultState).toEqual(initialState);
    });

    test('al llamar con el type login debe autenticar y establecer el user', () => {
        const user = {
            id: '1',
            name: 'Luisin',
        }
        const resultLogin = authReducer(initialState, {type: types.login, user})
        expect(resultLogin).toEqual({
            logged: true,
            user
        })
    });

    test('al llamar con el type logout debe cerrar sesion y borrar el user', () => {
        const resultLogout = authReducer(initialState, {type: types.logout});
        expect(resultLogout).toEqual({
            logged: false
        });
    });
});