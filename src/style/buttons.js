import styled from 'styled-components';
import {COLORS, SIZES } from './constants'

export const Button = styled.button `
    padding: 1rem ;
    margin: 0 auto;
    font-family: 'Source Serif Pro', serif;
    font-weight: 900;
    color:${COLORS.white};
    background: ${COLORS.primary};
    border: none;
    border-radius: 3rem;
    font-size: 3rem;

`;