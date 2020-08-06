import styled from 'styled-components';
import {COLORS, SIZES } from './constants';


// Headings
export const H1 = styled.h1 `
    padding: 1rem 0rem;
    margin: 0 auto;
    font-family: 'Source Serif Pro', serif;
    font-weight: 900;
    color:${props => props.darkBlue ? COLORS.darkBlue : COLORS.white};
    font-size: 3rem;
    text-align: ${props => props.center ? "center" : "left"};
`;

export const H2 = styled(H1) `
    color: ${COLORS.gold};
    font-size: 2rem;
`;

export const H3 = styled(H1) `  
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 2.5rem;
    padding: ${props => props.padding ? props.padding : "1rem 0rem"}
`;


// Body Copy
export const P = styled.p `
    padding: 1rem 0rem;
    margin: 0 auto;
    font-family: 'Source Serif Pro', serif;
    font-weight: 400;
    color:${props => props.color ? props.color : COLORS.white};
    font-size: 1.5rem;
    line-height: 1.75rem;
`;


// a links

export const A = styled.a `
    color: ${props => props.color ? props.color : COLORS.white};
    font-family: 'Source Serif Pro', serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.75rem;
    transition: color 0.5s ease;
    text-decoration: none;
    cursor: pointer;

    :hover{
        color: ${COLORS.gold};
        text-decoration: underline;
    }
`;