import styled from 'styled-components';

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

    div {
        padding: 1rem 3rem;
    }

    img{
        // padding: 0 2rem;
        // width:100%;
    }

`;