import React from 'react'
import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

// se usa como referencia para un to haveBeenCalled en los tests
const mockedUseNavigate = vi.fn();

vi.mock('react-router-dom', async() => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        useNavigate: () => mockedUseNavigate
    }
})

describe('Pruebas en <SearchPage />', () => {

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });


    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del QueryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');
        expect(input.value).toBe('batman');
        const img = screen.getByRole<HTMLImageElement>('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
        const heroEmpty = screen.getByLabelText<HTMLDivElement>('input-empty');
        expect(heroEmpty.style.display).toBe('none')
    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        const heroError = screen.getByLabelText<HTMLDivElement>('input-not-found');
        expect(heroError.style.display).toBe('')
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: {name: 'searchText', value: 'superman'}});
        const form = screen.getByLabelText('form');
        fireEvent.submit(form);
        // fireEvent.submit(input);
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman')
    });

});