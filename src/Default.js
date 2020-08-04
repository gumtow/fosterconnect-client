import React from 'react';
import { FluidContainer, Container } from './style/default';


 const Default = (props) => {
    return(
        <FluidContainer bg={props.bg} height={props.height}>
            <Container props={props.maxWidth}>
                {props.children}
            </Container>
        </FluidContainer>
    )
}

export default Default;