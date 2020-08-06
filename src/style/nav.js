import styled from 'styled-components';
import { COLORS, SIZES } from './constants';

export const Nav = styled.div`
    display:flex;
    justify-content: space-between;
    h1 {
        
        margin:0;
        padding: 1rem 0rem;
        font-family: 'Source Serif Pro', serif;
        font-weight: 900;
        color:${COLORS.white};
        font-size: 3rem;
    }
`;