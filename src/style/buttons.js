import styled from 'styled-components';
import { COLORS, SIZES } from './constants';

export const Button = styled.button `
    padding: 1rem 5rem;
    margin: 2rem auto;
    font-family: 'Source Serif Pro', serif;
    font-weight: 900;
    color:${COLORS.white};
    background:${COLORS.primary};
    border: none;
    border-radius: 3rem;
    font-size: 2rem;
    transition: background 0.5s ease;
    cursor: pointer;
    

    :hover{
        background:${COLORS.secondary};
    }
`;

export const AuthBtn = styled(Button) `
    padding: .5rem 2rem;
    margin: 1.65rem 0;
    color:${COLORS.white};
    background:${COLORS.gold};
    font-size: 1.5rem;


    :hover{
        background:${COLORS.white};
        color:${COLORS.gold};
    }
`;