import styled from 'styled-components';
import { COLORS, SIZES } from './constants';

export const FluidContainer = styled.div `
    padding: 0rem ;
    margin: 0 auto;
    background: ${props => props.bg};
    background-size:cover;
    height: ${props => props.height ? props.height : "auto"};
    position: ${props => props.footer ? "absolute" : "relative"};
    bottom: ${props => props.footer ? "0" : "inherit"};
    width: 100%;
`;

export const Container = styled.div`
    padding: 0;
    max-width:${props => props.maxWidth ? "100%" : "1200px"};
    margin: 0 auto;
    @media screen and (min-width: 768px){
        padding: ${props => props.padding ? props.padding : "0"};
    }
`;


export const FlexContainer = styled.div `
    display:flex;
    margin: 0 auto;
    flex-direction: ${props => props.reverse ? props.reverse : "row" };
    padding: 3rem;
    @media screen and (min-width: 768px){
 
    }

    a {
        margin: 0 auto;
    }

    

    img{
        // padding: 0 2rem;
        max-width:100%;
    }

`;

export const ChildMapFlex = styled.div `
    display:flex;
    margin: 0 2rem;
    flex-direction: ${props => props.reverse ? props.reverse : "row" };
    padding: 0rem;
    @media screen and (min-width: 768px){
 
    }

    img{
        // padding: 0 2rem;
        max-width:100%;
    }

`;


export const GridContainer = styled.div `
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    @media screen and (min-width: 768px){
        grid-template-columns: 3fr 9fr;
        gap: 1.5rem;
    }
`;

export const ChildMapGrid = styled.div `
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    @media screen and (min-width: 768px){
        grid-template-columns: 5fr 9fr 9fr;
        gap: .25rem;
        padding: 2rem 0rem;
        border-bottom: 1px solid ${COLORS.gold}

    }

`;

export const ItemMapGrid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 0 auto;
    justify-content:center;
    @media screen and (min-width: 768px){
        grid-template-columns: 3fr 3fr 3fr 3fr;
        gap: .25rem;
        padding: 2rem 0rem;
        border-bottom: 1px solid ${COLORS.light}

    }

    div {
        display:grid;
        justify-content: center;
        align-items: center;
    }

    img {
        max-width:100%;
    }

    .doc {
        background: ${COLORS.light};
        min-height: 200px;
    }

`;

export const HomeGrid = styled.div `
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    grid-auto-flow:dense;
    @media screen and (min-width: 768px){
        grid-template-columns: ${props => props.reverse ? "8fr 3fr" : "3fr 8fr" };
        gap: 3rem;
        padding: 2rem 5rem;
    }
    .a{
        grid-column: 2;
    }
    .b{
        grid-column: 1;
    }
    img {
        max-width: 100%;
    }
`;