import React from 'react';
import { FluidContainer, Container } from './style/default';


 const Default = (props) => {
    return(
        <FluidContainer bg={props.bg} height={props.height} footer={props.footer}>
            <Container maxWidth={props.maxWidth} padding={props.padding}>
                {props.children}
            </Container>
        </FluidContainer>
    )
}

export default Default;