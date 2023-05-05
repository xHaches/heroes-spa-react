import React from 'react'

import { describe, test, expect, afterAll, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui/components/Navbar';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = vi.fn();

// Mock de una libreria, solo sobreescribiendo metodos especificos
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        useNavigate: () => mockedUseNavigate}
});

describe('Pruebas en <Navbar />', () => {

    const authState = {
        authState: {
            logged: true,
            user: {
                id: '123',
                name: 'Luisin'
            }
        },
        logout: vi.fn()
    };

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    test('Debe de mostrar el nombre del usuario logueado', () => {

        render(
            <AuthContext.Provider value={authState}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Luisin')).toBeTruthy();

    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton logout', () => {
        render(
            <AuthContext.Provider value={authState}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const button = screen.getByText('Logout');
        fireEvent.click(button);
        expect(authState.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true});
    });


});