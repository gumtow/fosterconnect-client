import styled from 'styled-components';

export const FluidContainer = styled.div `
    padding: 0rem ;
    margin: 0 auto;
    background: ${props => props.bg};
    background-size:cover;
`;

export const Container = styled.div`
    padding: 0;
    max-width:${props => props.maxWidth ? "100%" : "1200px"};
    margin: 0 auto;
    @media screen and (min-width: 768px){
        padding: ${props => props.maxWidth ? "0" : "8rem"};
    }
`;