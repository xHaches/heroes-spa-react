import React from 'react'
import { cleanup, render, screen } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en el <PrivateRoute />', () => {
    afterEach(() => {
        cleanup();
    });
    
    test('Debe de mostrar el children si está autenticado', () => {

        Storage.prototype.setItem = vi.fn();
        
        const contextValue = {
            authState: {
                logged: true,
                user: {
                    id: 'abc123',
                    name: 'Luisito'
                }
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    });
});