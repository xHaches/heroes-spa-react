import React from 'react'
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, afterEach } from 'vitest';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {

    afterEach(() => {
        cleanup();
    });

    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            authState: {
                logged: false
            }
        }
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('Debe de mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            authState: {
                logged: true,
                user: {
                    id: '123123',
                    name: 'Hermenegildo'
                }
            }
        }
        
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    });
});