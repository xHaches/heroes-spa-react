import React from 'react'
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext, LoginPage } from '../../src/auth';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRoute />', () => {
    
    afterEach(() => {
        cleanup();
    });
    
    test('Debe de mostrar el children si no está autenticado', () => {
        
        const contextValue = {
            authState: {
                logged: false
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {
        const contextValue = {
            authState: {
                logged: true,
                user: {
                    id: '1123',
                    name: 'Luisin123'
                }
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                {/* la ruta en la que me encuentro */}
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='/login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>
                        <Route path='/marvel' element={<h1>Página Marvel</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});